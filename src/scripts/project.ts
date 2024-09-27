const projectName = document.getElementById("projectName") as HTMLInputElement;
const techStack = document.getElementById("techStack") as HTMLInputElement;
const isCompleted = document.getElementById("isCompleted") as HTMLSelectElement;

// Add Project
export const addProject = (
  event: Event,
  developer: Developer,
  project: Project
) => {
  event.preventDefault();
  if (!validateProject()) return;
  project.projectName = projectName.value;
  techStack.value.split(",").map((tech) => project.techStack.push(tech));
  project.isCompleted = isCompleted.value === "yes";
  developer?.projects.push({ ...project });
  resetProjectForm(project);
};

// Reset form
export const resetProjectForm = (project: Project) => {
  projectName.value = "";
  techStack.value = "";
  isCompleted.value = "yes";
  project.projectName = "";
  project.techStack = [];
  project.isCompleted = true;
};

// Validate Project
export const validateProject = () => {
  if (techStack.value.split(",").length < 2) {
    alert(
      "Your project must have more than 2 technologies in tech Stack. Currently, It doesn't qualify."
    );
    return false;
  }
  return true;
};

// list Projects
export const listProjects = (developer: Developer) => {
  const { projects } = developer;
  if (projects.length === 0) {
    alert("No projects exist");
    return;
  }
  return projects;
};

// Count Completed Projects
export const countCompletedProjects = (developer: Developer) => {
  const { projects } = developer;
  if (projects.length === 0) {
    alert("No project exist");
    return;
  }
  let counter: number = 0;
  projects.forEach((project) => project.isCompleted && counter++);
  if (counter === 0) {
    alert("No completed project exists");
  } else {
    return counter;
  }
};
