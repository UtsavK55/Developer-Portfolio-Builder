
interface Developer<T = {}>{
    developerName: string;
    age: number;
    isEmployed: boolean;
    skills: string[];
    projects: Project[];
    experience: number;
    email: string;
    [key: string]: T;
}

interface Project{
    projectName: string;
    techStack: string[];
    isCompleted: boolean;
}

type Developers=Developer[];