export interface Developer{
    developerName: string;
    age: number;
    isEmployed: boolean;
    skills: string[];
    projects: Project[];
    experience: number;
    email: string;
}

export interface Project{
    projectName: string;
    techStacks: string[];
    isCompleted: boolean;
}