import { Project, projects } from "./project";
import { toggleSelectedProject, isSelectedProject } from "./selectedProject";
import colorPickerClickHandler from "./colorPickerDOM";
import { displayProjectCard } from "./mainDOM";
import deleteIcon from "./icons";

const projectDialog = document.querySelector("dialog.project");
let selectedProjectDOMElement = null;
const projectsUpdatedEvent = new Event('projectsUpdated');

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
  if(project.DOMElement !== selectedProjectDOMElement) return false;
  selectedProjectDOMElement.classList.toggle("selected");
  toggleSelectedProject(project);
  displayProjectCard(null);
  selectedProjectDOMElement = null;
  document.getElementById('addTaskButton').style.display = "none";
  return true;
}

function deleteClickHandler(project) {
  if(isSelectedProject(project))
   deselectProject(project);
  projects.deleteProject(project);
  document.dispatchEvent(projectsUpdatedEvent);
}

function displayProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";
  projects.getProjects().forEach((project) => {
    const projectElement = project.DOMElement;
    projectElement.innerHTML = '';

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
    deleteButton.addEventListener('click',(event) => {
      event.stopPropagation(); // Prevents the containing div click event
      deleteClickHandler(project)
    });
    projectElement.appendChild(deleteButton);

    container.appendChild(projectElement);
  });
}

function createForm(previousName="") {
  const form = document.createElement("form");
  form.method = "dialog";
  form.className = "project";

  const colorPicker = document.createElement("button");
  colorPicker.className = "colorPicker";
  form.appendChild(colorPicker);

  const name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Name";
  name.autofocus = true;
  name.value = previousName;
  form.appendChild(name);

  return form;
}

function newProjectButton() {
  const addProjectButton = document.getElementById("addProjectButton");
  const nameInput = projectDialog.querySelector('input[type="text"]');
  addProjectButton.addEventListener("click", () => {
    projectDialog.show();
    nameInput.value = "";
  });
}

function getProjectDialogForm() {
  const container = projectDialog.querySelector(".formContainer");
  const form = createForm();
  container.appendChild(form);
  const nameInput = form.querySelector('input[type="text"]');
  nameInput.addEventListener("focusout", () => {
    if (nameInput.value !== "") {
      const project = new Project(nameInput.value);
      projects.addProject(project);
      project.DOMElement.addEventListener("click", () => selectProject(project));
      document.dispatchEvent(projectsUpdatedEvent);
      selectProject(project);
    }
    projectDialog.close();
  });
}

getProjectDialogForm();
newProjectButton();
document.addEventListener('projectsUpdated', displayProjects);