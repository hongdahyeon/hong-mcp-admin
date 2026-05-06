import { PageRequestDto } from './common';

/**
 * 👤 User Management Related Types
 */

export type UserRole = 'ROLE_USER' | 'ROLE_HOST' | 'ROLE_ADMIN';

export interface UserListResponse {
    id: number;
    email: string;
    username: string;
    role: UserRole;
    isApproved: boolean;
    isLocked: boolean;
    isDeleted: boolean;
    isEnabled: boolean;
    lastPasswordChangedDate: string; // LocalDateTime from backend
}

export interface SearchUserRequest extends PageRequestDto {
    search?: string;
}

export interface UserAccessLogList {
    id: number;
    userId: number;
    userName: string;
    userEmail: string;
    ipAddress: string;
    userAgent: string;
    loginAt: string;
}

export interface UserViewResponse {
    id: number;
    email: string;
    username: string;
    role: UserRole;
    isApproved: boolean;
    isLocked: boolean;
    isDeleted: boolean;
    isEnabled: boolean;
    lastPasswordChangedDate: string;
}
