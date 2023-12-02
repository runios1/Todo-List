class Project {
  #name

  #DOMElement

  constructor(name, color = "var(--colorPickerOption1)") {
    this.#name = name;
    this.color = color;
    this.#DOMElement = document.createElement('button');
    this.tasks = [];
  }

  get name() {
    return this.#name;
  }

  get DOMElement() {
    return this.#DOMElement;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}


const projects = (function() {
  const projectsArray = [];
  const addProject = (project) => {
    projectsArray.push(project);
  };
  const deleteProject = (project) => {
    const index = projectsArray.indexOf(project);
    if (index > -1) {
      projectsArray.splice(index, 1);
    }
  };
  const getProjects = () => projectsArray;

  return { addProject, deleteProject, getProjects };
})();

export { Project, projects };
