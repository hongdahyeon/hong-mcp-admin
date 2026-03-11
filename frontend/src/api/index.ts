import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

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
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// [Response Interceptor] 401(만료/인증실패) 및 공통 예외(ErrorResponse) 처리
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        const data = error.response?.data as any; // ErrorResponse { code, message, status }

        // 백엔드 HongException (ErrorResponse) 구조 대응
        const errorCode = data?.code;
        let errorMessage = data?.message || error.message || '알 수 없는 오류가 발생했습니다.';

        // 만약 errorMessage가 객체라면 (예외 상황) 문자열로 변환
        if (typeof errorMessage === 'object') {
            errorMessage = JSON.stringify(errorMessage);
        }

        // 401 에러 중 실제 세션 만료인 경우만 체크 (A001: Unauthorized, A002: Invalid Token)
        // U002(비밀번호 불일치) 등은 401이지만 세션 만료로 처리하지 않음
        const isSessionError = errorCode === 'A001' || errorCode === 'A002';

        if (status === 401 && isSessionError) {
            // ✅ 세션 만료 처리: 사용자 경험을 고려하여 알림 후 리다이렉트
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.clear();

            // 현재 페이지가 로그인 페이지가 아닐 때만 리다이렉트 (무한 루프 방지)
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        } else if (status) {
            // ✅ 401 중 비즈니스 예외 또는 기타 에러 발생 시 ErrorResponse의 메시지 노출
            alert(errorMessage);
            console.error(`[API Error] ${errorCode || 'Unknown'}:`, errorMessage);
        }

        return Promise.reject(error);
    }
);

export default api;