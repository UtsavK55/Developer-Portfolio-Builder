import { addDeveloper } from "./developer.js";
import { addProject, countCompletedProjects, listProjects } from "./project.js";
const developerForm = document.getElementById(
  "developerForm"
) as HTMLFormElement;
const projectForm = document.getElementById("projectForm") as HTMLFormElement;

export const developers: Developers = [];
const developer: Developer = {
  developerName: "",
  age: 0,
  isEmployed: false,
  skills: [],
  projects: [],
  experience: 0,
  email: "",
};

const project: Project = {
  projectName: "",
  techStack: [],
  isCompleted: false,
};

developerForm.addEventListener("submit", (event) =>
  addDeveloper(event, developers, developer)
);
projectForm.addEventListener("submit", (event) =>
  addProject(event, developer, project)
);
