import api from './index';
import { BaseResponse, PageResponseDto, PageRequestDto } from '@/types/common';
import { UserListResponse, SearchUserRequest, UserAccessLogList } from '@/types/user';

/**
 * 🛠️ Admin Management API Service
 */
export const adminService = {
    /**
     * 사용자 목록 조회 (Paging)
     */
    findUserPage: async (params: SearchUserRequest): Promise<PageResponseDto<UserListResponse>> => {
        const response = await api.get<BaseResponse<PageResponseDto<UserListResponse>>>('/api/admin/user/page', { params });
        return response.data.data;
    },

    /**
     * 접속 이력 조회 (Paging)
     */
    findAccessLogPage: async (params: PageRequestDto): Promise<PageResponseDto<UserAccessLogList>> => {
        const response = await api.get<BaseResponse<PageResponseDto<UserAccessLogList>>>('/api/admin/user-access/page', { params });
        return response.data.data;
    }
};
