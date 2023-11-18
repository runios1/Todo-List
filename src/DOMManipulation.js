import { Task } from "./task";

const dialog = document.querySelector('dialog');
const newTaskButton = document.getElementById('addTaskButton');
newTaskButton.addEventListener('click',() => dialog.showModal());


function getDialogForm(){
    const container = document.getElementById('formContainer');
    container.appendChild(Task.createForm());
}

export {getDialogForm};