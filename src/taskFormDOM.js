import { selectedProject } from "./selectedProject";
import { Task, maxPriority, minPriority } from "./task";

const taskDialog = document.querySelector("dialog.task");

function noSelectedProjectHandler() {
  alert("No selected project");
}

function newTaskSubmitHandler() {
  if (selectedProject) {
    const newTask = new Task(
      selectedProject,
      document.querySelector("#name").value,
      document.querySelector("#time").value,
      document.querySelector("#description").value,
      document.querySelector("#priority").value,
    );
    selectedProject.addTask(newTask);
  } else {
    noSelectedProjectHandler();
  }
}

function newTaskButton() {
  const addTaskButton = document.getElementById("addTaskButton");
  addTaskButton.addEventListener("click", () => {
    const form = taskDialog.querySelector("form");
    form.reset();
    form.querySelector("button[type='submit']").textContent = "Submit";
    form.querySelector("#deleteTaskButton").style.display = "none";
    form.addEventListener("submit", newTaskSubmitHandler);
    taskDialog.showModal();
  });
  addTaskButton.style.display = "none";
}

// Close dialog when click is outside dialog box
function dialogBackdropClickHandler(event, formDOMElements) {
  const rect = taskDialog.getBoundingClientRect();
  const isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width;

  let isInteractingWithForm = false;
  formDOMElements.forEach((element) => {
    if (document.activeElement === element) isInteractingWithForm = true;
  });

  if (!isInDialog && !isInteractingWithForm) {
    taskDialog.close();
  }
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function createForm() {
  const form = document.createElement("form");
  form.method = "dialog";
  form.className = "task";

  const task = new Task();
  let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(task));
  properties = properties.slice(1, properties.length);

  const formDOMElements = [];

  properties.forEach((property) => {
    if (task[property].inputType === "N/A") return;
    const label = document.createElement("label");
    label.for = task[property].name;
    label.textContent = `${capitalize(task[property].name)}: `;
    form.appendChild(label);
    const input = task[property].formQuery();
    form.appendChild(input);
    formDOMElements.push(input);
  });

  const nameInput = form.querySelector("#name");
  nameInput.autofocus = true;
  nameInput.maxLength = "30";
  nameInput.pattern = "^[a-zA-Z0-9\\(\\),\\/:._+ =!@#$%^&*'`~\\-\\?]+$";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.for = "description";
  descriptionLabel.textContent = "Description";
  form.appendChild(descriptionLabel);
  const description = document.createElement("textarea");
  description.name = "description";
  description.id = "description";
  description.rows = 8;
  form.appendChild(description);
  formDOMElements.push(description);

  const priority = form.querySelector("#priority");
  priority.max = maxPriority;
  priority.min = minPriority;

  const buttons = document.createElement("div");
  buttons.id = "taskFormButtons";
  form.appendChild(buttons);

  const submit = document.createElement("button");
  submit.textContent = "Submit";
  submit.type = "submit";
  submit.className = "coloredButton";
  buttons.appendChild(submit);
  formDOMElements.push(submit);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.type = "button";
  deleteButton.className = "coloredButton";
  deleteButton.style.display = "none";
  deleteButton.id = "deleteTaskButton";
  buttons.appendChild(deleteButton);
  formDOMElements.push(deleteButton);

  taskDialog.addEventListener("click", (event) => {
    dialogBackdropClickHandler(event, formDOMElements);
  });

  return form;
}

function getTaskDialogForm() {
  const container = taskDialog.querySelector(".formContainer");
  const close = taskDialog.querySelector("button");
  close.addEventListener("click", () => taskDialog.close());
  container.appendChild(createForm());
}

newTaskButton();
getTaskDialogForm();

export default newTaskSubmitHandler;
