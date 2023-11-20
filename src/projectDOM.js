import { Project } from "./project";
import { projects } from "./index";
import { colorPickerClickHandler } from "./colorPickerDOM";

const projectDialog = document.querySelector('dialog.project');

function newProjectButton() {
    const addProjectButton = document.getElementById('addProjectButton');
    const nameInput = projectDialog.querySelector('input[type="text"]');
    addProjectButton.addEventListener('click',() => {
        projectDialog.show();
        nameInput.value = '';
    });
}

function getProjectDialogForm() {
    const container = projectDialog.querySelector('.formContainer');
    const form = Project.createForm();
    container.appendChild(form);
    const nameInput = form.querySelector('input[type="text"]');
    nameInput.addEventListener('focusout',() => {
        if(nameInput.value !== ''){
            const project = new Project(nameInput.value);
            projects.addProject(project);
        }
        projectDialog.close();
    });
}

function displayProjects() {
    const container = document.getElementById('projects');
    container.innerHTML = '';
    for(let project of projects.getProjects()){
        const projectElement = document.createElement('div');
        
        const color = document.createElement('button');
        color.className = "colorPicker";
        color.addEventListener('click',(event) => colorPickerClickHandler(event,project));
        color.style.backgroundColor = project.color;
        projectElement.appendChild(color);

        const name = document.createElement('span');
        name.textContent = project.name;
        projectElement.appendChild(name);

        container.appendChild(projectElement);
    }
}


export {newProjectButton,getProjectDialogForm,displayProjects};