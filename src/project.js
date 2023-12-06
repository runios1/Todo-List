class Project {
  #name;

  #DOMElement;

  #tasks;

  #sort;

  constructor(name, color = "var(--colorPickerOption1)") {
    this.#name = name;
    this.color = color;
    this.#DOMElement = document.createElement("button");
    this.#tasks = [];
    this.#sort = "default";
  }

  get name() {
    return this.#name;
  }

  get DOMElement() {
    return this.#DOMElement;
  }

  getTasks(sort) {
    this.#sort = sort;
    if (sort === "priority")
      return this.#tasks.toSorted(
        (a, b) => a.priority.value - b.priority.value,
      );
    if (sort === "time")
      return this.#tasks.toSorted((a, b) => a.time.value - b.time.value);
    return [...this.#tasks];
  }

  getSortedTasks() {
    return this.getTasks(this.#sort);
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  deleteTask(task) {
    const index = this.#tasks.indexOf(task);
    if (index > -1) {
      this.#tasks.splice(index, 1);
    }
  }
}

const projects = (function () {
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
