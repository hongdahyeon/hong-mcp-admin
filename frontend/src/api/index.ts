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

// [Response Interceptor] 401(만료/인증실패) 발생 시 처리
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // ✅ 세션 만료 처리: 사용자 경험을 고려하여 알림 후 리다이렉트
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.clear();

            // 현재 페이지가 로그인 페이지가 아닐 때만 리다이렉트 (무한 루프 방지)
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;