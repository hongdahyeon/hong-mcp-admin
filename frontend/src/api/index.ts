import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { authService } from './auth';

/**
 * 🚀 Axios 공통 인스턴스 설정
 * 백엔드와의 Stateless JWT 통신을 위한 핵심 설정입니다.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// [Request Interceptor] 모든 요청 전에 토큰 삽입
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const authDataStr = localStorage.getItem('AUTH_DATA');
        if (authDataStr) {
            try {
                const authData = JSON.parse(authDataStr);
                const token = authData.accessToken;
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (e) {
                console.error('Failed to parse AUTH_DATA from localStorage', e);
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 토큰 재발급 중복 방지를 위한 플래그
let isRefreshing = false;

// [Response Interceptor] 401(만료/인증실패) 및 공통 예외(ErrorResponse) 처리
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as any;
        const data = error.response?.data as any;
        const errorCode = data?.code;
        const errorMessage = data?.message || '오류가 발생했습니다.';

        console.log("--- Axios Error Detected ---");

        // [AUTH-005] Access Token 만료 시 처리
        if (errorCode === 'AUTH-005') {
            console.log("Detected AUTH-005 - Attempting Reissue");

            // 이미 한 번 시도한 요청이라면 즉시 종료 (무한 루프 방지)
            if (originalRequest._retry) {
                localStorage.removeItem('AUTH_DATA');
                alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            // 중복 재발급 요청 방지
            if (isRefreshing) {
                await new Promise(resolve => setTimeout(resolve, 500));
                return api(originalRequest);
            }

            const authDataStr = localStorage.getItem('AUTH_DATA');
            if (authDataStr) {
                originalRequest._retry = true;
                isRefreshing = true;
                try {
                    const authData = JSON.parse(authDataStr);
                    const refreshToken = authData.refreshToken;

                    // 토큰 재발급 호출
                    const newTokenData = await authService.reissue(refreshToken);

                    // 새 토큰으로 재시도
                    originalRequest.headers.Authorization = `Bearer ${newTokenData.accessToken}`;
                    return api(originalRequest);
                } catch (reissueError: any) {
                    console.error('Silent refresh failed:', reissueError);
                } finally {
                    isRefreshing = false;
                }
            }

            // 재발급이 불가능하거나 실패하면 세션 종료
            localStorage.removeItem('AUTH_DATA');
            alert('세션 정보가 만료되었습니다. 다시 로그인해주세요.');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // [AUTH-001] Unauthorized, [AUTH-002] Invalid Token, [AUTH-003] User Not Found
        if (errorCode === 'AUTH-001' || errorCode === 'AUTH-002' || errorCode === 'AUTH-003') {
            localStorage.removeItem('AUTH_DATA');
            location.href = '/login';
            return Promise.reject(error);
        }

        // 일반 비즈니스 예외 및 기타 서버 에러
        if (errorCode) {
            alert(errorMessage);
        } else if (error.response?.status) {
            alert(`서버 응답 오류: ${error.response.status}`);
        }

        return Promise.reject(error);
    }
);

export default api;