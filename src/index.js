import { getProjectDialogForm, newProjectButton, displayProjects} from "./projectDOM.js"
import { newTaskButton,getTaskDialogForm } from "./taskDOM.js";

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