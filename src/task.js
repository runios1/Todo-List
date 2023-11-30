import TaskProperty from "./taskProperty";

const minPriority = 1;
const maxPriority = 5;

class Task {
  #name; 
  
  #time; 
  
  #description; 
  
  #priority;
  
  constructor(nameVal = '', timeVal = '', descriptionVal = '', priorityVal = '') {
    this.#name = new TaskProperty('name', nameVal, 'text');
    this.#time = new TaskProperty('time', timeVal, 'datetime-local');
    this.#description = new TaskProperty('description', descriptionVal, 'N/A');
    this.#priority = new TaskProperty('priority', priorityVal, 'number');
  }

  get name() {
    return this.#name;
  }

  /**
     * @param {{ value: text; }} newName
     */
  set name(newName) {
    this.#name.value = newName;
  }

  get time() {
    return this.#time;
  }

  /**
     * @param {{ value: time; }} newTime
     */
  set time(newTime) {
    this.#time.value = newTime;
  }

  get description() {
    return this.#description;
  }

  /**
     * @param {{ value: text; }} newDescription
     */
  set description(newDescription) {
    this.#description.value = newDescription;
  }

  get priority() {
    return this.#priority;
  }

  /**
     * @param {{ value: number; }} newPriority
     */
  set priority(newPriority) {
    // if (newPriority > maxPriority || newPriority < minPriority) {
    //   alert('Invalid priority value');
    // } else {
      this.#priority.value = newPriority;
    // }
  }

}

// function validateTaskForm(time, description, priority) {

// }

export { Task, minPriority, maxPriority };
