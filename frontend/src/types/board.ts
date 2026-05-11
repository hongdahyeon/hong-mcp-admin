import { PageRequestDto } from './common';

/**
 * 📋 Board Management Related Types
 */

export interface BoardListResponse {
    id: number;
    boardCode: string;
    boardCodeDescription: string;
    name: string;
    isUsed: boolean;
    isDeleted: boolean;
}

export interface SearchBoardRequest extends PageRequestDto {
    search?: string;
}
