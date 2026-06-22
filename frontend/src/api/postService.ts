import api from './index';
import { BaseResponse, PageResponseDto } from '@/types/common';
import { PostListResponse, SearchPostRequest } from '@/types/post';

/**
 * 📝 Post API Service
 */
export const postService = {
    /**
     * 게시글 목록 조회 (Paging)
     * GET /api/user/post/page
     */
    findPostPage: async (params: SearchPostRequest): Promise<PageResponseDto<PostListResponse>> => {
        const response = await api.get<BaseResponse<PageResponseDto<PostListResponse>>>('/api/user/post/page', { params });
        return response.data.data;
    }
};
