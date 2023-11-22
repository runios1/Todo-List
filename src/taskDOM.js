import { Task } from "./task";

const taskDialog = document.querySelector('dialog.task');

function newTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click',() => taskDialog.showModal());
}

function getTaskDialogForm() {
    const container = taskDialog.querySelector('.formContainer');
    const close = taskDialog.querySelector('button');
    close.addEventListener('click',() => taskDialog.close());
    container.appendChild(createForm());
}

function createForm() {
    const form = document.createElement('form');
    form.method = "dialog";
    form.className = "task";

    const task = new Task();
    const properties = Object.keys(task);

    properties.forEach(property => {
        const label = document.createElement('label');
        label.for = task[property].name;
        label.textContent = `${task[property].name}: `;
        form.appendChild(label);
        const input = task[property].formQuery();
        form.appendChild(input);
    });
    const submit = document.createElement('button');
    submit.textContent = "Submit";
    submit.type = "submit";
    submit.className = "coloredButton";
    form.appendChild(submit);
    return form;
}

export {newTaskButton,getTaskDialogForm}