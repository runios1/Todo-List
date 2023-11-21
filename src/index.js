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

let selectedProject = null;

function selectProject(project) {
    selectedProject = project;
    console.log(`Project ${project.name} is selected!`);
}

function deselectProject(){
    selectedProject = null;
    console.log(`selectedProject now null!`);
}

newTaskButton();
getTaskDialogForm();
getProjectDialogForm();
newProjectButton();
displayProjects();

export { projects, selectProject, deselectProject }