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

export type BoardCode = 
    | 'NOTICE' 
    | 'FREE' 
    | 'QNA' 
    | 'FAQ' 
    | 'TERMS' 
    | 'PRIVACY';

export interface SaveBoardRequest {
    code: string;
    name: string;
    isUsed: boolean;
}

export interface ChangeBoardRequest {
    name: string;
    isUsed: boolean;
}
