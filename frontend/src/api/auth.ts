import client from './client';
import api from './index';
import { UserSaveRequest, TokenResponse } from '@/types/auth';
import { BaseResponse } from '@/types/common';

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
            const response = await api.post<BaseResponse<TokenResponse>>('/api/auth/login', { email, password });
            const data = response.data.data;

            // ✅ 백엔드 TokenResponse 구조에 맞게 하나의 객체로 저장
            const authData = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                username: data.username,
                role: data.role
            };
            localStorage.setItem('AUTH_DATA', JSON.stringify(authData));

            return data;
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
        const response = await api.get<BaseResponse<boolean>>('/api/auth-user/check-email', { params: { email } });
        return response.data.data;
    },

    /**
     * 사용자 아이디 중복 체크
     */
    checkUsernameDuplicate: async (username: string): Promise<boolean> => {
        const response = await api.get<BaseResponse<boolean>>('/api/auth-user/check-username', { params: { username } });
        return response.data.data;
    },

    /**
     * 사용자 역할 목록 조회
     */
    findUserRoles: async (): Promise<string[]> => {
        const response = await api.get<BaseResponse<string[]>>('/api/auth-user/roles');
        return response.data.data;
    },

    /**
     * 회원가입 요청
     */
    signup: async (userData: UserSaveRequest): Promise<number> => {
        const response = await api.post<BaseResponse<number>>('/api/auth-user/signup', userData);
        return response.data.data; // userId
    },

    /**
     * 토큰 재발급 요청 (Silent Refresh)
     * @param refreshToken 리프레시 토큰
     */
    reissue: async (refreshToken: string): Promise<TokenResponse> => {
        // [주의] reissue 요청은 interceptor에서 무한 루프에 빠지지 않도록 처리 필요
        const response = await client.post<BaseResponse<TokenResponse>>('/api/auth/reissue', { refreshToken });
        const data = response.data.data;

        const authData = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            username: data.username,
            role: data.role
        };
        localStorage.setItem('AUTH_DATA', JSON.stringify(authData));

        return data;
    }
};