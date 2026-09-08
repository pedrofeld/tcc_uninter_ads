export interface ProjectDTO {
    name: string;
    resume: string;
    description: string;
    sector: 'TECH' | 'HEALTH' | 'EDUCATION' | 'ENVIRONMENT' | 'SOCIAL' | 'OTHER';
    obstacles: string;
    typesOfSupportSought: ('FINANCIAL' | 'MENTORSHIP' | 'PARTNERSHIP' | 'EQUIPMENT' | 'TECHNOLOGICAL' | 'PROMOTION' | 'SPACE' | 'OTHER')[];
    city: string;
    state: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    projectImageUrl?: string;
}
