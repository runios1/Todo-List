import { projectStartup, displayProjects } from "./projectDOM.js"
import { taskFormStartup } from "./taskFormDOM.js";

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

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1);
}

taskFormStartup();
projectStartup();

export { projects, selectProject, deselectProject, capitalize, selectedProject }