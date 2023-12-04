import { Project, projects } from "./project";
import { toggleSelectedProject, isSelectedProject } from "./selectedProject";
import colorPickerClickHandler from "./colorPickerDOM";
import { displayProjectCard } from "./mainDOM";
import deleteIcon from "./icons";

const projectDialog = document.querySelector("dialog.project");
let selectedProjectDOMElement = null;
const projectsUpdatedEvent = new Event("projectsUpdated");

function selectProject(project) {
  if (selectedProjectDOMElement) {
    selectedProjectDOMElement.classList.toggle("selected");
  }
  toggleSelectedProject(project);
  displayProjectCard(project);
  selectedProjectDOMElement = project.DOMElement;
  project.DOMElement.classList.toggle("selected");
}

function deselectProject(project) {
  if (project.DOMElement !== selectedProjectDOMElement) return false;
  selectedProjectDOMElement.classList.toggle("selected");
  toggleSelectedProject(project);
  displayProjectCard(null);
  selectedProjectDOMElement = null;
  document.getElementById("addTaskButton").style.display = "none";
  return true;
}

function deleteClickHandler(project) {
  if (isSelectedProject(project)) deselectProject(project);
  projects.deleteProject(project);
  document.dispatchEvent(projectsUpdatedEvent);
}

function displayProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";
  projects.getProjects().forEach((project) => {
    const projectElement = project.DOMElement;
    projectElement.innerHTML = "";

    const color = document.createElement("button");
    color.className = "colorPicker";
    color.addEventListener("click", (event) =>
      colorPickerClickHandler(event, project),
    );
    color.style.backgroundColor = project.color;
    projectElement.appendChild(color);

    const name = document.createElement("span");
    name.textContent = project.name;
    projectElement.appendChild(name);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = deleteIcon;
    deleteButton.className = "editProjectButton";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents the containing div click event
      deleteClickHandler(project);
    });
    projectElement.appendChild(deleteButton);

    container.appendChild(projectElement);
  });
}

function newProjectButton() {
  const addProjectButton = document.getElementById("addProjectButton");
  const nameInput = projectDialog.querySelector('input[type="text"]');
  addProjectButton.addEventListener("click", () => {
    const alert = document.querySelector(".formContainer.project > .alert");
    alert.style.display = "none";
    projectDialog.show();
    nameInput.value = "";
  });
}

function formAlert(alert) {
  const alertContainer = document.querySelector(
    ".formContainer.project > .alert",
  );
  alertContainer.textContent = alert;
  alertContainer.style.display = "block";
}

function validateProjectForm(name) {
  const regex = /^[a-zA-Z0-9\\(\\),\\/:._+ =!@#$%^&*'`~\\-\\?]+$/;
  if (name === "") return false;
  if (name.length > 16) {
    formAlert("Name is too long");
    return false;
  }
  if (!regex.test(name)) {
    formAlert("Name can only contain English alphanumerics and punctuation");
    return false;
  }
  return true;
}

function getProjectDialogForm() {
  const form = document.querySelector("form.project");
  form.style.display = "flex";
  const nameInput = form.querySelector('input[type="text"]');

  function formSubmitHandler() {
    if (validateProjectForm(nameInput.value)) {
      const project = new Project(nameInput.value);
      projects.addProject(project);
      project.DOMElement.addEventListener("click", () =>
        selectProject(project),
      );
      document.dispatchEvent(projectsUpdatedEvent);
      selectProject(project);
      projectDialog.close();
    }
    if (nameInput.value === "") projectDialog.close();
  }

  nameInput.addEventListener("focusout", formSubmitHandler);
  nameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameInput.blur();
    }
  });
}

getProjectDialogForm();
newProjectButton();
document.addEventListener("projectsUpdated", displayProjects);
