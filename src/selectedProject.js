// eslint-disable-next-line import/no-mutable-exports
let selectedProject = null;

function selectProject(project) {
  selectedProject = project;
  console.log(`Project ${project.name} is selected!`);
}

function deselectProject() {
  selectedProject = null;
  console.log(`selectedProject now null!`);
}

export { selectProject, deselectProject, selectedProject };
