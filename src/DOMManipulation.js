import { Task } from "./task";
import { Project } from "./project";
import { projects } from "./index";

const taskDialog = document.querySelector('dialog.task');
const projectDialog = document.querySelector('dialog.project');

function newTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click',() => taskDialog.showModal());
}

function getTaskDialogForm() {
    const container = taskDialog.querySelector('.formContainer');
    const close = taskDialog.querySelector('button');
    close.addEventListener('click',() => taskDialog.close());
    container.appendChild(Task.createForm());
}

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
        // projectDialog.close();
    });
}

function displayProjects() {
    const container = document.getElementById('projects');
    container.innerHTML = '';
    for(let project of projects.getProjects()){
        const projectElement = document.createElement('div');
        
        const color = document.createElement('div');
        color.className = "colorPicker";
        projectElement.appendChild(color);

        const name = document.createElement('span');
        name.textContent = project.name;
        projectElement.appendChild(name);

        container.appendChild(projectElement);
    }
}


export {newTaskButton,getTaskDialogForm,newProjectButton,getProjectDialogForm,displayProjects};