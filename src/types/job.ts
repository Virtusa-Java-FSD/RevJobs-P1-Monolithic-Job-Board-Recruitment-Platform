// src/types/job.ts

export interface Job {
    id: number;
    title: string;
    company: string;
    location?: string;
    salary?: string;
    skills?: string[];
}
