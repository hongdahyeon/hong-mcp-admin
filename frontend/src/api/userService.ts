import api from './index';
import { BaseResponse } from '@/types/common';
import { UserViewResponse } from '@/types/user';

/**
 * 👤 User Related API Services
 */
export const userService = {
    /**
     * 내 정보 조회 (내 정보 관리용)
     * GET /api/user/me
     */
    findMe: async (): Promise<UserViewResponse> => {
        const response = await api.get<BaseResponse<UserViewResponse>>('/api/user/me');
        return response.data.data;
    },
};
