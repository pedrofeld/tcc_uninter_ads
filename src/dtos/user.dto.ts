export interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'VISIONARY' | 'INVESTOR' | 'ADMIN';
    city: string;
    state: string;
}
