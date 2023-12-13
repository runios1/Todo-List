import { Task } from "./task";

class Project {
  #DOMElement;

  #tasks;

  #sort;

  constructor(name, color = "var(--colorPickerOption1)") {
    this.name = name;
    this.color = color;
    this.#DOMElement = document.createElement("button");
    this.#tasks = [];
    if (JSON.parse(localStorage.getItem(name))) {
      JSON.parse(localStorage.getItem(name)).forEach((taskObject) => {
        this.#tasks.push(
          new Task(
            this,
            taskObject.name,
            taskObject.time,
            taskObject.description,
            taskObject.priority,
          ),
        );
      });
    }
    this.#sort = "default";
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
      return this.#tasks.toSorted((a, b) => {
        if (Number.isNaN(a.time.value.valueOf())) {
          if (Number.isNaN(b.time.value.valueOf())) return 0;
          return 1;
        }
        return a.time.value - b.time.value;
      });
    return [...this.#tasks];
  }

  getSortedTasks() {
    return this.getTasks(this.#sort);
  }

  updateTaskStorage() {
    const tasksObjectArrayForStorage = [];
    this.#tasks.forEach((taskInstance) =>
      tasksObjectArrayForStorage.push({
        name: taskInstance.name.value,
        time: taskInstance.time.value,
        description: taskInstance.description.value,
        priority: taskInstance.priority.value,
      }),
    );
    localStorage.setItem(this.name, JSON.stringify(tasksObjectArrayForStorage));
  }

  addTask(task) {
    this.#tasks.push(task);
    this.updateTaskStorage();
  }

  deleteTask(task) {
    const index = this.#tasks.indexOf(task);
    if (index > -1) {
      this.#tasks.splice(index, 1);
      this.updateTaskStorage();
    }
  }
}

const projects = (() => {
  const projectsArray = [];

  const updateProjectsStorage = () =>
    localStorage.setItem("projects", JSON.stringify(projectsArray));

  const isNameDuplicate = (name) =>
    projectsArray.some((project) => project.name === name);

  const addProject = (project) => {
    projectsArray.push(project);
    updateProjectsStorage();
  };
  const deleteProject = (project) => {
    const index = projectsArray.indexOf(project);
    if (index > -1) {
      projectsArray.splice(index, 1);
    }
  };
  const getProjects = () => projectsArray;

  const getProjectArrayFromStorage = () => {
    if (localStorage.length > 0) {
      const parsedJSONProjectArray = JSON.parse(
        localStorage.getItem("projects"),
      );
      parsedJSONProjectArray.forEach((object) =>
        projectsArray.push(new Project(object.name, object.color)),
      );
    }
  };

  return {
    addProject,
    deleteProject,
    getProjects,
    getProjectArrayFromStorage,
    updateProjectsStorage,
    isNameDuplicate,
  };
})();

export { Project, projects };
