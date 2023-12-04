// eslint-disable-next-line import/no-mutable-exports
let selectedProject = null;

function toggleSelectedProject(project) {
  selectedProject = project === selectedProject ? null : project;
}

function isSelectedProject(project) {
  return project === selectedProject;
}

function deleteTaskFromSelectedProject(task) {
  selectedProject.deleteTask(task);
}

export {
  toggleSelectedProject,
  isSelectedProject,
  deleteTaskFromSelectedProject,
  selectedProject,
};
