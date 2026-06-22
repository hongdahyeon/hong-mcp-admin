import { PageRequestDto } from './common';

/**
 * 📝 Post Management Related Types
 */

export interface SearchPostRequest extends PageRequestDto {
    search?: string;
    boardId?: number;
}

export interface PostBoardInfo {
    id: number;
    boardCode: string;
    boardCodeDescription: string;
    name: string;
    isUsed: boolean;
    isDeleted: boolean;
}

export interface PostListResponse {
    id: number;
    hBoard: PostBoardInfo;
    boardName: string;
    title: string;
    content: string;
    viewCount: number;
}
