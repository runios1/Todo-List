import Project from "./project";
import { deselectProject, selectProject } from "./selectedProject";
import colorPickerClickHandler from "./colorPickerDOM";
import { displayProjectCard } from "./mainDOM";

const projects = (function () {
  const projectsArray = [];
  const addProject = (project) => {
    projectsArray.push(project);
  };
  const getProjects = () => projectsArray;

  return { addProject, getProjects };
})();

const projectDialog = document.querySelector("dialog.project");
let selectedProjectDOMElement = null;

function displayProjects() {
  selectedProjectDOMElement = null;
  deselectProject();

  const container = document.getElementById("projects");
  container.innerHTML = "";
  projects.getProjects().forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.addEventListener("click", () => {
      if (selectedProjectDOMElement) {
        selectedProjectDOMElement.className = "";
      }
      selectProject(project);
      displayProjectCard(project);
      selectedProjectDOMElement = projectElement;
      projectElement.className = "selected";
    });

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
      displayProjects();
    }
    projectDialog.close();
  });
}

getProjectDialogForm();
newProjectButton();
displayProjects();
