import { PageRequestDto } from './common';
import { Address } from './address';
import { UserRole } from './user';

export interface Workshop {
    id: string;
    title: string;
    region: string;
    category: string;
    price: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    instructor: string;
    description: string;
    curriculum: string[];
    instructorBio: string;
}

export interface HUser {
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

export interface WorkshopListResponse {
    id: number;
    hUser: HUser;
    name: string;
    description: string;
    address: Address;
    isApproved: boolean;
    isOpen: boolean;
}

export interface SearchWorkshopRequest extends PageRequestDto {
    search?: string;
}
