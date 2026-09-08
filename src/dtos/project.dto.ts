export interface ProjectDTO {
    name: string;
    resume: string;
    description: string;
    sector: 'TECHNOLOGY' | 'HEALTHCARE' | 'EDUCATION' | 'ENERGY' | 'AGRICULTURE' | 'FINANCE' | 'ENTERTAINMENT' | 'OTHER';
    obstacles: string;
    typesOfSupportSought: ('FINANCIAL' | 'MENTORSHIP' | 'PARTNERSHIP' | 'OTHER')[];
    city: string;
    state: string;
    status?: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
    projectImageUrl?: string;
}