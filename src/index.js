import { getProjectDialogForm, getTaskDialogForm, newProjectButton, newTaskButton, displayProjects} from "./DOMManipulation.js"

const projects = (function() {
    const projectsArray = [];
    const addProject = (project) => {
        projectsArray.push(project);
        displayProjects();
    };
    const getProjects = () => projectsArray;

    return {addProject,getProjects};
})();

newTaskButton();
getTaskDialogForm();
getProjectDialogForm();
newProjectButton();
displayProjects();

export { projects }