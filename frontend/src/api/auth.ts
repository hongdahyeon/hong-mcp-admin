import api from './index';
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
            const response = await api.post<TokenResponse>('/api/auth/login', { email, password });

            // ✅ 백엔드 TokenResponse 구조에 맞게 저장
            const { accessToken, username } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('username', username);

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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        window.location.href = '/login';
    },

    /**
     * 이메일 중복 체크
     */
    checkEmailDuplicate: async (email: string): Promise<boolean> => {
        const response = await api.get<boolean>('/api/auth-user/check-email', { params: { email } });
        return response.data;
    },

    /**
     * 사용자 아이디 중복 체크
     */
    checkUsernameDuplicate: async (username: string): Promise<boolean> => {
        const response = await api.get<boolean>('/api/auth-user/check-username', { params: { username } });
        return response.data;
    },

    /**
     * 사용자 역할 목록 조회
     */
    findUserRoles: async (): Promise<string[]> => {
        const response = await api.get<string[]>('/api/auth-user/roles');
        return response.data;
    },

    /**
     * 회원가입 요청
     */
    signup: async (userData: UserSaveRequest): Promise<number> => {
        const response = await api.post<number>('/api/auth-user/signup', userData);
        return response.data; // userId
    }
};