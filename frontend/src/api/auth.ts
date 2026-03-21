import client from './client';
import { UserSaveRequest, TokenResponse } from '@/types/auth';

/**
 * 🔐 Authentication API Service
 */
export const authService = {
    /**
     * 로그인 요청
     * @param email 사용자 이메일
     * @param password 사용자 비밀번호
     */
    login: async (email: string, password: string): Promise<TokenResponse> => {
        try {
            const response = await client.post<TokenResponse>('/api/auth/login', { email, password });

            // ✅ 백엔드 TokenResponse 구조에 맞게 하나의 객체로 저장
            const authData = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                username: response.data.username,
                role: response.data.role
            };
            localStorage.setItem('AUTH_DATA', JSON.stringify(authData));

            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    /**
     * 로그아웃 처리
     */
    logout: (): void => {
        localStorage.removeItem('AUTH_DATA');
        window.location.href = '/login';
    },

    /**
     * 이메일 중복 체크
     */
    checkEmailDuplicate: async (email: string): Promise<boolean> => {
        const response = await client.get<boolean>('/api/auth-user/check-email', { params: { email } });
        return response.data;
    },

    /**
     * 사용자 아이디 중복 체크
     */
    checkUsernameDuplicate: async (username: string): Promise<boolean> => {
        const response = await client.get<boolean>('/api/auth-user/check-username', { params: { username } });
        return response.data;
    },

    /**
     * 사용자 역할 목록 조회
     */
    findUserRoles: async (): Promise<string[]> => {
        const response = await client.get<string[]>('/api/auth-user/roles');
        return response.data;
    },

    /**
     * 회원가입 요청
     */
    signup: async (userData: UserSaveRequest): Promise<number> => {
        const response = await client.post<number>('/api/auth-user/signup', userData);
        return response.data; // userId
    },

    /**
     * 토큰 재발급 요청 (Silent Refresh)
     * @param refreshToken 리프레시 토큰
     */
    reissue: async (refreshToken: string): Promise<TokenResponse> => {
        // [주의] reissue 요청은 interceptor에서 무한 루프에 빠지지 않도록 처리 필요
        const response = await client.post<TokenResponse>('/api/auth/reissue', { refreshToken });

        const authData = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            username: response.data.username,
            role: response.data.role
        };
        localStorage.setItem('AUTH_DATA', JSON.stringify(authData));

        return response.data;
    }
};