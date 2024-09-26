import { projects } from "./app.js";
import { Developer } from "./interface/interface.js";

const devName = (document.getElementById('name') as HTMLInputElement);
const devAge = (document.getElementById('age') as HTMLInputElement);
const devIsEmployed = (document.getElementById('isEmployed') as HTMLSelectElement);
const devSkills = (document.getElementById('skills') as HTMLInputElement);
const devExperience = (document.getElementById('experience') as HTMLInputElement);
const devEmail = (document.getElementById('email') as HTMLInputElement);


export const addDeveloper = (event:Event, developers:Developer[], developer:Developer)=>{
    event.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(devEmail.value)){
        alert('Please enter a valid email address.');
        return;
    }
    if(isNaN(parseInt(devAge.value)) || isNaN(parseInt(devExperience.value)) || parseInt(devAge.value)< parseInt(devExperience.value)){
        alert('Please enter correct entries');
        return;
    }
    if(developers.some(item=>item.email === devEmail.value )){
        alert('Developer with this email already exists.');
        return;
    }
    developer.developerName = devName.value;
    developer.age = parseInt(devAge.value);
    developer.isEmployed = devIsEmployed.value === 'yes';
    addSkill(developer.skills);
    developer.experience = parseInt(devExperience.value);
    developer.email = devEmail.value;
    developers.push({...developer});
    resetForm(developer);
}
export const addSkill = (skills:string[])=>{
    const currSkill = devSkills.value.split(',');
    currSkill.map(skill => skills.push(skill.trim()));
}
const resetForm = (developer: Developer)=>{
    devName.value = '';
    devAge.value = '';
    devIsEmployed.value = 'No';
    devSkills.value = '';
    devExperience.value = '';
    devEmail.value = '';
    developer.developerName = '';
    developer.age = 0;
    developer.isEmployed = false;
    developer.skills = [];
    developer.experience = 0;
    developer.email = '';
}