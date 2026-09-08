export interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'VISIONARY' | 'INVESTOR' | 'ADMIN';
    city: string;
    state: string;
    profession: string | null;
    studyArea: string | null;
    biography: string | null;
    phoneNumber: string | null;
    linkedIn: string | null;
    investorType: 'COMPANY' | 'INDIVIDUAL' | null;
    companyName: string | null;
    position: string | null;
    companyWebsite: string | null;
}
