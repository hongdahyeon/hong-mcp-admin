import api from './index';
import { BaseResponse, PageResponseDto, PageRequestDto } from '@/types/common';
import { UserListResponse, SearchUserRequest, UserAccessLogList } from '@/types/user';
import { BoardListResponse, SearchBoardRequest, BoardCode, SaveBoardRequest, ChangeBoardRequest } from '@/types/board';

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
    },

    /**
     * 게시판 목록 조회 (Paging)
     */
    findBoardPage: async (params: SearchBoardRequest): Promise<PageResponseDto<BoardListResponse>> => {
        const response = await api.get<BaseResponse<PageResponseDto<BoardListResponse>>>('/api/admin/board/page', { params });
        return response.data.data;
    },

    /**
     * 게시판 코드 목록 조회
     */
    findBoardCodes: async (): Promise<BoardCode[]> => {
        const response = await api.get<BaseResponse<BoardCode[]>>('/api/admin/board/codes');
        return response.data.data;
    },

    /**
     * 게시판 생성
     */
    saveBoard: async (request: SaveBoardRequest): Promise<number> => {
        const response = await api.post<BaseResponse<number>>('/api/admin/board', request);
        return response.data.data;
    },

    /**
     * 게시판 수정
     */
    changeBoard: async (id: number, request: ChangeBoardRequest): Promise<number> => {
        const response = await api.put<BaseResponse<number>>(`/api/admin/board/${id}`, request);
        return response.data.data;
    }
};
