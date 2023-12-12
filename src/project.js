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
      return this.#tasks.toSorted((a, b) => a.time.value - b.time.value);
    return [...this.#tasks];
  }

  getSortedTasks() {
    return this.getTasks(this.#sort);
  }

  // FIXME: changes to the task are not saved
  #updateTaskStorage() {
    const tasksObjectArrayForStorage = [];
    this.#tasks.forEach((taskInstance) =>
      tasksObjectArrayForStorage.push({
        name: taskInstance.name.value,
        time: taskInstance.time.value,
        description: taskInstance.description.value,
        priority: taskInstance.priority.value,
      }),
    );
    localStorage.setItem(this.name, JSON.stringify(tasksObjectArrayForStorage)); // FIXME: name is not unique
  }

  addTask(task) {
    this.#tasks.push(task);
    this.#updateTaskStorage();
  }

  deleteTask(task) {
    const index = this.#tasks.indexOf(task);
    if (index > -1) {
      this.#tasks.splice(index, 1);
      this.#updateTaskStorage();
    }
  }
}

const projects = (function () {
  const projectsArray = [];
  const addProject = (project) => {
    projectsArray.push(project);
    localStorage.setItem("projects", JSON.stringify(projectsArray)); // FIXME: doesn't resave when color changes
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

  return { addProject, deleteProject, getProjects, getProjectArrayFromStorage };
})();

export { Project, projects };
