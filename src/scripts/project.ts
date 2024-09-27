const projectName = document.getElementById("projectName") as HTMLInputElement;
const techStack = document.getElementById("techStack") as HTMLInputElement;
const isCompleted = document.getElementById("isCompleted") as HTMLSelectElement;

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

export const resetProjectForm = (project: Project) => {
  projectName.value = "";
  techStack.value = "";
  isCompleted.value = "yes";

  project.projectName = "";
  project.techStack = [];
  project.isCompleted = true;
};

export const validateProject = () => {
  if (techStack.value.split(",").length < 2) {
    alert(
      "Your project must have more than 2 technologies in tech Stack. Currently, It doesn't qualify."
    );
    return false;
  }
  return true;
};

export const listProjects = (developer: Developer) => {
  const { projects } = developer;
  if (!projects.length) {
    alert("No projects exist");
    return;
  }
  return projects;
};

export const countCompletedProjects = (developer: Developer) => {
  const { projects } = developer;
  if (!projects.length) {
    alert("No project exist");
    return;
  }

  const counter = projects.reduce((acc, project) => {
    return project.isCompleted ? acc + 1 : acc;
  }, 0);

  if (counter === 0) {
    alert("No completed project exists");
  } else {
    return counter;
  }
};
