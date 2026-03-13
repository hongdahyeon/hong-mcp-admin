/**
 * 👤 Member Auth Related Types
 */

export interface UserSaveRequest {
    email: string;
    username: string;
    password?: string; // Optional for cases where it's not needed (e.g. preview)
    role: string;
}

export interface UserResponse {
    id: number;
    email: string;
    username: string;
    role: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
    role: string;
}
