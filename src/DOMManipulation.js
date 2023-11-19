import { Task } from "./task";

const dialog = document.querySelector('dialog');

function newTaskButton(){
    const newTaskButton = document.getElementById('addTaskButton');
    newTaskButton.addEventListener('click',() => dialog.showModal());
}

function getDialogForm(){
    const container = document.getElementById('formContainer');
    const close = dialog.querySelector('button');
    close.addEventListener('click',() => dialog.close());
    container.appendChild(Task.createForm());
    
}

export {newTaskButton,getDialogForm};