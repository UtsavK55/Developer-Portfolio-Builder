import { addDeveloper } from "./developer.js";

const projectForm = document.getElementById('projectForm') as HTMLFormElement;
export const developers : Developers=[];
export const projects : Project[] = [];

const developer : Developer ={
    developerName: '',
    age: 0,
    isEmployed: false,
    skills: [],
    projects: projects,
    experience: 0,
    email: ''
}
projectForm.addEventListener('submit',(event)=>addDeveloper(event,developers, developer) )
