import { getProjectDialogForm, getTaskDialogForm, newProjectButton, newTaskButton } from "./DOMManipulation.js"

const projects = [];

newTaskButton();
getTaskDialogForm();
newProjectButton();
getProjectDialogForm();

function addProject(project) {
    projects.push(project);
}

export { addProject }