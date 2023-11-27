import { capitalize, selectedProject } from '.';
import { Task, maxPriority, minPriority } from './task';
import { displayTasks } from './mainDOM';

const taskDialog = document.querySelector('dialog.task');

function taskFormStartup() {
  newTaskButton();
  getTaskDialogForm();
}

function newTaskButton() {
  const addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', () => {
    const form = taskDialog.querySelector('form');
    form.reset();
    form.addEventListener('submit', newTaskSubmitHandler);
    taskDialog.showModal();
  });
  addTaskButton.style.display = 'none';
}

function getTaskDialogForm() {
  const container = taskDialog.querySelector('.formContainer');
  const close = taskDialog.querySelector('button');
  close.addEventListener('click', () => taskDialog.close());
  taskDialog.addEventListener('close', () => displayTasks(selectedProject));
  container.appendChild(createForm());
}

function createForm() {
  const form = document.createElement('form');
  form.method = 'dialog';
  form.className = 'task';

  const task = new Task();
  const properties = Object.keys(task);

  const formDOMElements = [];

  properties.forEach((property) => {
    if (task[property].inputType === 'N/A') return;
    const label = document.createElement('label');
    label.for = task[property].name;
    label.textContent = `${capitalize(task[property].name)}: `;
    form.appendChild(label);
    const input = task[property].formQuery();
    form.appendChild(input);
    formDOMElements.push(input);
  });

  const descriptionLabel = document.createElement('label');
  descriptionLabel.for = 'description';
  descriptionLabel.textContent = 'Description';
  form.appendChild(descriptionLabel);
  const description = document.createElement('textarea');
  description.name = 'description';
  description.id = 'description';
  description.rows = 8;
  form.appendChild(description);
  formDOMElements.push(description);

  const priority = form.querySelector('#priority');
  priority.max = maxPriority;
  priority.min = minPriority;

  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  submit.type = 'submit';
  submit.className = 'coloredButton';
  submit.autofocus = true;
  form.appendChild(submit);
  formDOMElements.push(submit);

  taskDialog.addEventListener('click', (event) => {
    dialogBackdropClickHandler(event, formDOMElements);
  });

  return form;
}

function dialogBackdropClickHandler(event, formDOMElements) { // Close dialog when click is outside dialog box
  const rect = taskDialog.getBoundingClientRect();
  const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

  let isInteractingWithForm = false;
  for (const element of formDOMElements) {
    if (isInteractingWithForm) break;
    isInteractingWithForm = document.activeElement === element;
  }

  if (!isInDialog && !isInteractingWithForm) {
    taskDialog.close();
  }
}

function noSelectedProjectHandler() {
  alert('No selected project');
}

function newTaskSubmitHandler() {
  if (selectedProject) {
    if (validateTaskForm()) {
      const newTask = new Task(document.querySelector('#name').value, document.querySelector('#time').value, document.querySelector('#description').value, document.querySelector('#priority').value);
      selectedProject.addTask(newTask);
      displayTasks(selectedProject);
    }
  } else {
    noSelectedProjectHandler();
  }
}

export { taskFormStartup, newTaskSubmitHandler };
