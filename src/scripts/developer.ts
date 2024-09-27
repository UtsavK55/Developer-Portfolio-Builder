import { emailPattern } from "./constants/constants.js";

const devName = document.getElementById("name") as HTMLInputElement;
const devAge = document.getElementById("age") as HTMLInputElement;
const devIsEmployed = document.getElementById(
  "isEmployed"
) as HTMLSelectElement;
const devSkills = document.getElementById("skills") as HTMLInputElement;
const devExperience = document.getElementById("experience") as HTMLInputElement;
const devEmail = document.getElementById("email") as HTMLInputElement;

// Add Developer on submitting
export const addDeveloper = (
  event: Event,
  developers: Developers,
  developer: Developer
) => {
  event.preventDefault();

  if (!emailPattern.test(devEmail.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (
    isNaN(parseInt(devAge.value)) ||
    isNaN(parseInt(devExperience.value)) ||
    parseInt(devAge.value) < parseInt(devExperience.value)
  ) {
    alert("Please enter correct entries");
    return;
  }

  if (developers.some(({ email }) => email === devEmail.value)) {
    alert("Developer with this email already exists.");
    return;
  }

  developer.developerName = devName.value;
  developer.age = parseInt(devAge.value);
  developer.isEmployed = devIsEmployed.value === "yes";
  addSkill(developer.skills);
  developer.experience = parseInt(devExperience.value);
  developer.email = devEmail.value;
  developers.push({ ...developer });
  console.log(developers);
  resetForm(developer);
};

//Add Skill
export const addSkill = (skills: string[]) => {
  const currentSkill = devSkills.value.split(",");
  currentSkill.map((skill) => skills.push(skill.trim()));
};

// Reset Form
const resetForm = (developer: Developer) => {
  devName.value = "";
  devAge.value = "";
  devIsEmployed.value = "No";
  devSkills.value = "";
  devExperience.value = "";
  devEmail.value = "";
  developer.developerName = "";
  developer.age = 0;
  developer.isEmployed = false;
  developer.skills = [];
  developer.experience = 0;
  developer.email = "";
};

//Add Property of developer object
export const addProperty = <T>(developer: Developer, additionalProps?: T) => {
  if (additionalProps) {
    Object.assign(developer, { additionalProperties: additionalProps });
  }
  return {
    ...developer,
    additionalProperties: additionalProps,
  };
};

// Update Developer's Skill
export const updateSkill = (
  developers: Developers,
  developer: Developer,
  oldSkill: string,
  newSkill: string
) => {
  const currentDeveloper = developers?.find(
    ({ email }) => email === developer.email
  );

  if (currentDeveloper) {
    const index = currentDeveloper?.skills?.indexOf(oldSkill);

    if (index > -1) {
      currentDeveloper.skills.splice(index, 1, newSkill);
      developers.splice(
        developers.findIndex((item) => item === developer),
        1,
        currentDeveloper
      );
    }
  }
};

// Condition for removing a Developer
export const conditionForRemoving = (developer: Developer) =>
  developer.age < 18;

// Remove Developer By Condition
export const removeDeveloperByCondition = (
  developers: Developers,
  conditionForRemoving: (developer: Developer) => boolean
) => {
  const devToBeRemoved = developers.filter(conditionForRemoving);
  devToBeRemoved.forEach((item) =>
    developers.splice(developers.indexOf(item), 1)
  );
};

// Sort Developer by Employment and Age
export const sortDeveloperByEmploymentAndAge = (developers: Developers) => {
  console.log(
    developers.sort((a, b) => {
      const statusOrder = {
        true: 1,
        false: 2,
      };
      const statusComparison =
        statusOrder[`${a.isEmployed}`] - statusOrder[`${b.isEmployed}`];
      if (statusComparison !== 0) {
        return statusComparison;
      }

      return a.age - b.age;
    })
  );
};

// list Skills
export const listSkills = (developers: Developers, developer: Developer) => {
  const currentDeveloper = developers?.find(
    ({ email }) => email === developer.email
  );
  currentDeveloper?.skills.forEach((skill) => console.log(skill));
};

//find developers by skills
export const findDevelopersBySkill = (developers: Developers, skill: string) => {
   const filterdArrr= developers.filter(item=> item.skills.indexOf(skill) !== -1)
    console.log(filterdArrr);
};

// Update Developer 
  export const updateDeveloper = (developer: Developer, updates: Partial<Developer>) => {
    for (const key in updates) {
        if (updates.hasOwnProperty(key) && key in developer) {
            developer[key] = updates[key] as any; 
        }
    }
    console.log(developer);
};

// Clone developer

export const cloneDeveloper = (developer:Developer)=>{
  const deepClone = structuredClone(developer);
  return deepClone;
}