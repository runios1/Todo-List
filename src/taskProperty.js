class TaskProperty {
  constructor(name, value, inputType) {
    this.name = name;
    this.value = value;
    this.inputType = inputType;
  }

  formQuery() {
    const input = document.createElement("input");
    input.name = this.name;
    input.id = this.name;
    input.value = this.value;
    input.type = this.inputType;
    return input;
  }
}

export default TaskProperty;
