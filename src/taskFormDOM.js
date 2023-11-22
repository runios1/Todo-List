import { capitalize, selectedProject } from ".";
import { Task } from "./task";

const taskDialog = document.querySelector('dialog.task');

function taskFormStartup(){
    newTaskButton();
    getTaskDialogForm();
}

function newTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    taskDialog.addEventListener('click', (event) => {
        dialogBackdropClickHandler(event);
    });
    addTaskButton.addEventListener('click',() => {
        taskDialog.showModal();
    });
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
        if(task[property].name === "description") return;
        const label = document.createElement('label');
        label.for = task[property].name;
        label.textContent = `${capitalize(task[property].name)}: `;
        form.appendChild(label);
        const input = task[property].formQuery();
        form.appendChild(input);
    });

    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'description';
    descriptionLabel.textContent = 'Description';
    form.appendChild(descriptionLabel);
    const description = document.createElement('textarea');
    description.name = 'description';
    form.appendChild(description);


    
    const submit = document.createElement('button');
    submit.textContent = "Submit";
    submit.type = "submit";
    submit.className = "coloredButton";
    submit.autofocus = true;
    form.appendChild(submit);

    form.addEventListener('submit',() => 
    {
        selectedProject ? selectedProject.addTask(task) : noSelectedProjectHandler()
    });

    return form;
}

function dialogBackdropClickHandler(event){ //Close dialog when click is outside dialog box
    const rect = taskDialog.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        taskDialog.close();
    }
}

function noSelectedProjectHandler(){
    alert("No selected project");
}

export { taskFormStartup }