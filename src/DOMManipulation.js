import { Task } from "./task";
import { Project } from "./project";

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
    addProjectButton.addEventListener('click',() => {
        projectDialog.showModal();
    });
}

function getProjectDialogForm() {
    const container = projectDialog.querySelector('.formContainer');
    const form = Project.createForm();
    container.appendChild(form);
    const nameInput = form.querySelector('input[type="text"]');
    nameInput.addEventListener('focusout',() => {
        form.submit();
        projectDialog.close();
    });
}


export {newTaskButton,getTaskDialogForm,newProjectButton,getProjectDialogForm};