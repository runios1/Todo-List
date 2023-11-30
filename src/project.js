class Project {
  #name

  #DOMElement

  constructor(name, color = "red") {
    this.#name = name;
    this.color = color;
    this.#DOMElement = document.createElement('div');
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

export default Project;
