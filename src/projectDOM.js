import Project from "./project";
import { changeSelectedProject } from "./selectedProject";
import colorPickerClickHandler from "./colorPickerDOM";
import { displayProjectCard } from "./mainDOM";

const projects = (function() {
  const projectsArray = [];
  const addProject = (project) => {
    projectsArray.push(project);
  };
  const getProjects = () => projectsArray;

  return { addProject, getProjects };
})();

const projectDialog = document.querySelector("dialog.project");
let selectedProjectDOMElement = null;

function selectProject(project) {
  if (selectedProjectDOMElement) {
    selectedProjectDOMElement.classList.toggle("selected");
  }
  changeSelectedProject(project);
  displayProjectCard(project);
  selectedProjectDOMElement = project.DOMElement;
  project.DOMElement.classList.toggle("selected");
}

function displayProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";
  projects.getProjects().forEach((project) => {
    const projectElement = project.DOMElement;
    projectElement.innerHTML = '';
    projectElement.addEventListener("click", () => selectProject(project));

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

    container.appendChild(projectElement);
  });
}

function createForm() {
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
      displayProjects(project);
      selectProject(project);
    }
    projectDialog.close();
  });
}

getProjectDialogForm();
newProjectButton();
displayProjects();
