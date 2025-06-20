import request from "../utils/request";

export interface UserModel {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    phoneNumber?: string;
    isDeleted: string;
    roles: string[];
}

export interface UserApiResponse {
    data: UserModel[];
    totalCount: number;
    message: string;
}

export const UserService = {
    getAllUsers: async (): Promise<UserModel[]> => {
        try {
            const response = await request.get('/api/user');
            // Filter out Admin users
            const users = response.data.filter((user: UserModel) =>
                !user.roles.includes('Admin')
            );
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}; 