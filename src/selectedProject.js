// eslint-disable-next-line import/no-mutable-exports
let selectedProject = null;

function toggleSelectedProject(project) {
  selectedProject = (project === selectedProject ? null : project);
}

function isSelectedProject(project) {
  return project === selectedProject;
}

export { toggleSelectedProject, isSelectedProject, selectedProject };
