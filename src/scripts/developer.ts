import { boolValuesforSorting, emailPattern } from "./constants/constants.js";

const devName = document.getElementById("name") as HTMLInputElement;
const devAge = document.getElementById("age") as HTMLInputElement;
const devIsEmployed = document.getElementById(
  "isEmployed"
) as HTMLSelectElement;
const devSkills = document.getElementById("skills") as HTMLInputElement;
const devExperience = document.getElementById("experience") as HTMLInputElement;
const devEmail = document.getElementById("email") as HTMLInputElement;

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
  resetForm(developer);
};

export const addSkill = (skills: string[]) => {
  const currentSkill = devSkills.value.split(",");
  currentSkill.map((skill) => skills.push(skill.trim().toLowerCase()));
};

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

export const addProperty = <T>(developer: Developer, additionalProps?: T) => {
  if (additionalProps) {
    Object.assign(developer, { additionalProperties: additionalProps });
  }
  return {
    ...developer,
    additionalProperties: additionalProps,
  };
};

export const updateSkill = (
  developer: Developer,
  oldSkill: string,
  newSkill: string
) => {
  const { skills } = developer;
  const oldSkillIndex = skills?.indexOf(oldSkill.toLowerCase());
  const newSkillIndex = skills?.indexOf(newSkill.toLowerCase());
  if (oldSkillIndex === -1) {
    alert(`${oldSkill} does not exist.`);
    return;
  }

  if (newSkillIndex === -1) {
    alert(`${newSkill} is already present.`);
    return;
  }
  skills[oldSkillIndex] = newSkill;
};

// Condition for removing a Developer
export const conditionForRemoving = (developer: Developer) =>
  developer.age < 18;

// Remove Developer By Condition
export const removeDeveloperByCondition = (
  developers: Developers,
  conditionForRemoving: (developer: Developer) => boolean
) => {
  return developers.filter((developer) => !conditionForRemoving(developer));
};

export const sortDeveloperByEmploymentAndAge = (developers: Developers) => {
  return developers.sort((firstDev, secondDev) => {
    const statusComparison =
      boolValuesforSorting[`${firstDev.isEmployed}`] -
      boolValuesforSorting[`${secondDev.isEmployed}`];
    if (statusComparison !== 0) {
      return statusComparison;
    }

    return firstDev.age - secondDev.age;
  });
};

export const listSkills = (developer: Developer) => {
  const { skills } = developer;
  if (!skills.length) {
    alert("No skills exist");
    return;
  }
  return skills;
};

export const findDevelopersBySkill = (
  developers: Developers,
  skill: string
) => {
  const filteredArr = developers.filter(
    ({ skills }) => skills.indexOf(skill.toLowerCase()) !== -1
  );
  if (!filteredArr.length) {
    alert("No developer found");
    return;
  }
  return filteredArr;
};

export const updateDeveloper = (
  developer: Developer,
  updates: Partial<Developer>
) => {
  for (const key in updates) {
    if (key in developer) {
      developer[key] = updates[key] as Developer[typeof key];
    }
  }
};

export const cloneDeveloper = (developer: Developer) => {
  const deepClone = structuredClone(developer);
  return deepClone;
};

// Approach 2
export const cloneDevByRecursion = <T>(developer: T): T => {
  if (developer === null || typeof developer !== "object") {
    return developer;
  }

  const clonedObj: T = {} as T;

  if (Array.isArray(developer)) {
    return developer.map((item) => cloneDevByRecursion(item)) as T;
  }

  for (const key in developer) {
    clonedObj[key] = cloneDevByRecursion(developer[key]);
  }

  return clonedObj;
};
