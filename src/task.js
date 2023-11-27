const minPriority = 1;
const maxPriority = 5;

class TaskProperty {
  constructor(name, value, inputType) {
    this.name = name;
    this.value = value;
    this.inputType = inputType;
  }

  formQuery() {
    const input = document.createElement('input');
    input.name = this.name;
    input.id = this.name;
    input.value = this.value;
    input.type = this.inputType;
    return input;
  }
}

class Task {
  constructor(nameVal = '', timeVal = '', descriptionVal = '', priorityVal = '') {
    this._name = new TaskProperty('name', nameVal, 'text');
    this._time = new TaskProperty('time', timeVal, 'datetime-local');
    this._description = new TaskProperty('description', descriptionVal, 'N/A');
    this._priority = new TaskProperty('priority', priorityVal, 'number');
  }

  /**
     * @param {{ value: text; }} newName
     */
  set name(newName) {
    this._name.value = newName;
  }

  /**
     * @param {{ value: time; }} newTime
     */
  set time(newTime) {
    this._time.value = newTime;
  }

  /**
     * @param {{ value: text; }} newDescription
     */
  set description(newDescription) {
    this._description.value = newDescription;
  }

  /**
     * @param {{ value: number; }} newPriority
     */
  set priority(newPriority) {
    if (newPriority > maxPriority || newPriority < minPriority) {
      alert('Invalid priority value');
    } else {
      this._priority.value = newPriority;
    }
  }

  get name() {
    return this._name.value;
  }

  get time() {
    return this._time.value;
  }

  get description() {
    return this._description.value;
  }

  get priority() {
    return this._priority.value;
  }
}

function validateTaskForm(time, description, priority) {

}

export { Task, minPriority, maxPriority };
