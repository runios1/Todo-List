/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/colorPickerDOM.js":
/*!*******************************!*\
  !*** ./src/colorPickerDOM.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorPickerClickHandler: () => (/* binding */ colorPickerClickHandler)
/* harmony export */ });

function colorButton(color,colorPicker,colorContainer,project){
    const domElement = document.createElement('button');
    domElement.className = "colorPicker";
    domElement.style.backgroundColor = color;
    domElement.addEventListener('click',() => {
        colorContainer.parentElement.insertBefore(colorPicker,colorContainer);
        colorContainer.remove();
        colorPicker.style.backgroundColor = color;
        project.color = color;
    })
    colorContainer.appendChild(domElement);
}

function colorPickerClickHandler(event,project) {
    const colorPicker = event.target;

    const colorContainer = document.createElement('div');
    colorContainer.className = "colorContainer";
    colorPicker.parentElement.insertBefore(colorContainer,colorPicker);
    colorPicker.remove();

    colorButton('red',colorPicker,colorContainer,project);
    colorButton('green',colorPicker,colorContainer,project);
    colorButton('blue',colorPicker,colorContainer,project);
    colorButton('yellow',colorPicker,colorContainer,project);
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   deselectProject: () => (/* binding */ deselectProject),
/* harmony export */   projects: () => (/* binding */ projects),
/* harmony export */   selectProject: () => (/* binding */ selectProject),
/* harmony export */   selectedProject: () => (/* binding */ selectedProject)
/* harmony export */ });
/* harmony import */ var _projectDOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectDOM.js */ "./src/projectDOM.js");
/* harmony import */ var _taskFormDOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskFormDOM.js */ "./src/taskFormDOM.js");



const projects = (function() {
    const projectsArray = [];
    const addProject = (project) => {
        projectsArray.push(project);
        (0,_projectDOM_js__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();
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

(0,_taskFormDOM_js__WEBPACK_IMPORTED_MODULE_1__.taskFormStartup)();
(0,_projectDOM_js__WEBPACK_IMPORTED_MODULE_0__.projectStartup)();



/***/ }),

/***/ "./src/mainDOM.js":
/*!************************!*\
  !*** ./src/mainDOM.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayProjectCard: () => (/* binding */ displayProjectCard),
/* harmony export */   displayTasks: () => (/* binding */ displayTasks)
/* harmony export */ });

function displayProjectCard(project) {
    const main = document.querySelector('main > div.card');

    main.innerHTML = '';

    const header = document.createElement('div');
    header.id = "card-header";
    header.style.backgroundColor = project.color;
    main.appendChild(header);

    const headerText = document.createElement('h3');
    headerText.textContent = project.name;
    header.appendChild(headerText);

    const tasks = document.createElement('div');
    tasks.id = "task-list";
    main.appendChild(tasks);

    displayTasks(project);
}

function displayTasks(project) {
    const tasks = document.getElementById("task-list");
    for(const task of project.tasks){
        const taskDiv = document.createElement('div');
        tasks.appendChild(taskDiv);

        const name = document.createElement('span');
        name.textContent = task.name;
        taskDiv.appendChild(name);

        const date = document.createElement('span');
        date.textContent = task.date;
        taskDiv.appendChild(date);
    }
}



/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project)
/* harmony export */ });
class Project{
    constructor(name,color='red'){
        this.name = name;
        this.color = color;
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
    }
}



/***/ }),

/***/ "./src/projectDOM.js":
/*!***************************!*\
  !*** ./src/projectDOM.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayProjects: () => (/* binding */ displayProjects),
/* harmony export */   projectStartup: () => (/* binding */ projectStartup)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _colorPickerDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colorPickerDOM */ "./src/colorPickerDOM.js");
/* harmony import */ var _mainDOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mainDOM */ "./src/mainDOM.js");






const projectDialog = document.querySelector('dialog.project');
let selectedProjectDOMElement = null;


function projectStartup(){
    getProjectDialogForm();
    newProjectButton();
    displayProjects();
}


function createForm(){
    const form = document.createElement('form');
    form.method = "dialog";
    form.className = "project"

    const colorPicker = document.createElement('button');
    colorPicker.className = "colorPicker";
    form.appendChild(colorPicker);

    const name = document.createElement('input');
    name.type = 'text';
    name.placeholder = 'Name';
    name.autofocus = true;
    form.appendChild(name);

    
    return form;
}

function newProjectButton() {
    const addProjectButton = document.getElementById('addProjectButton');
    const nameInput = projectDialog.querySelector('input[type="text"]');
    addProjectButton.addEventListener('click',() => {
        projectDialog.show();
        nameInput.value = '';
    });
}

function getProjectDialogForm() {
    const container = projectDialog.querySelector('.formContainer');
    const form = createForm();
    container.appendChild(form);
    const nameInput = form.querySelector('input[type="text"]');
    nameInput.addEventListener('focusout',() => {
        if(nameInput.value !== ''){
            const project = new _project__WEBPACK_IMPORTED_MODULE_0__.Project(nameInput.value);
            _index__WEBPACK_IMPORTED_MODULE_1__.projects.addProject(project);
        }
        projectDialog.close();
    });
}

function displayProjects() {
    selectedProjectDOMElement = null;
    (0,_index__WEBPACK_IMPORTED_MODULE_1__.deselectProject)();
    
    const container = document.getElementById('projects');
    container.innerHTML = '';
    for(let project of _index__WEBPACK_IMPORTED_MODULE_1__.projects.getProjects()){
        const projectElement = document.createElement('div');
        projectElement.addEventListener('click', () => {
            if(selectedProjectDOMElement){
                selectedProjectDOMElement.className = "";
            } 
            (0,_index__WEBPACK_IMPORTED_MODULE_1__.selectProject)(project);
            (0,_mainDOM__WEBPACK_IMPORTED_MODULE_3__.displayProjectCard)(project);
            selectedProjectDOMElement = projectElement;
            projectElement.className = "selected";
        });
        
        const color = document.createElement('button');
        color.className = "colorPicker";
        color.addEventListener('click',(event) => (0,_colorPickerDOM__WEBPACK_IMPORTED_MODULE_2__.colorPickerClickHandler)(event,project));
        color.style.backgroundColor = project.color;
        projectElement.appendChild(color);

        const name = document.createElement('span');
        name.textContent = project.name;
        projectElement.appendChild(name);

        container.appendChild(projectElement);
    }
}




/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class TaskProperty {
    constructor(name, value, inputType) {
        this.name = name;
        this.value = value;
        this.inputType = inputType;
    }

    formQuery() {
        const input = document.createElement('input');
        input.name = this.name;
        input.id = this.name;
        input.value = this.value;
        input.type = this.inputType;
        return input;
    }
}

class Task {
    constructor() {
        this._name = new TaskProperty('name', '', 'text');
        this._time = new TaskProperty('time', '', 'datetime-local');
        this._description = new TaskProperty('description', '', 'N/A');
        this._priority = new TaskProperty('priority', '', 'number');
    }

    /**
     * @param {{ value: text; }} newName
     */
    set name(newName) {
        this._name.value = newName;
    }

    /**
     * @param {{ value: time; }} newTime
     */
    set time(newTime) {
        this._time.value = newTime;
    }

    /**
     * @param {{ value: text; }} newDescription
     */
    set description(newDescription) {
        this._description.value = newDescription;
    }

    /**
     * @param {{ value: number; }} newPriority
     */
    set priority(newPriority) {
        this._priority.value = newPriority;
    }


    get name(){
        return this._name.value;
    }

    get time(){
        return this._time.value;
    }
    
    get description(){
        return this._description.value;
    }

    get priority(){
        return this._priority.value;
    }
}



/***/ }),

/***/ "./src/taskFormDOM.js":
/*!****************************!*\
  !*** ./src/taskFormDOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   taskFormStartup: () => (/* binding */ taskFormStartup)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _mainDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainDOM */ "./src/mainDOM.js");




const taskDialog = document.querySelector('dialog.task');

function taskFormStartup(){
    newTaskButton();
    getTaskDialogForm();
}

function newTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
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

    const task = new _task__WEBPACK_IMPORTED_MODULE_1__.Task();
    const properties = Object.keys(task);

    const formDOMElements = [];

    properties.forEach(property => {
        if(task[property].inputType === "N/A") return;
        const label = document.createElement('label');
        label.for = task[property].name;
        label.textContent = `${(0,___WEBPACK_IMPORTED_MODULE_0__.capitalize)(task[property].name)}: `;
        form.appendChild(label);
        const input = task[property].formQuery();
        form.appendChild(input);
        formDOMElements.push(input);
    });

    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'description';
    descriptionLabel.textContent = 'Description';
    form.appendChild(descriptionLabel);
    const description = document.createElement('textarea');
    description.name = 'description';
    description.id = 'description';
    description.rows = 8;
    form.appendChild(description);
    formDOMElements.push(description)

    const priority = form.querySelector('#priority');
    priority.max = 5;
    priority.min = 1;

    
    const submit = document.createElement('button');
    submit.textContent = "Submit";
    submit.type = "submit";
    submit.className = "coloredButton";
    submit.autofocus = true;
    form.appendChild(submit);
    formDOMElements.push(submit);

    form.addEventListener('submit',() => 
    {
        if(___WEBPACK_IMPORTED_MODULE_0__.selectedProject) {
            task.name = document.querySelector("#name").textContent;
            task.description = document.querySelector("#description").textContent;
            task.priority = document.querySelector("#priority").textContent;
            task.time = document.querySelector("#time").textContent;
            ___WEBPACK_IMPORTED_MODULE_0__.selectedProject.addTask(task);
            (0,_mainDOM__WEBPACK_IMPORTED_MODULE_2__.displayTasks)(___WEBPACK_IMPORTED_MODULE_0__.selectedProject);
        }else{ 
            noSelectedProjectHandler()
        }
    });

    taskDialog.addEventListener('click', (event) => {
        dialogBackdropClickHandler(event,formDOMElements);
    });

    return form;
}

function dialogBackdropClickHandler(event, formDOMElements){ //Close dialog when click is outside dialog box
    const rect = taskDialog.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    
    let isInteractingWithForm = false;
    for(const element of formDOMElements){
        if(isInteractingWithForm) break;
        isInteractingWithForm = document.activeElement === element;
    }

    if (!isInDialog && !isInteractingWithForm) {
        taskDialog.close();
    }
}

function noSelectedProjectHandler(){
    alert("No selected project");
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbG9yUGlja2VyRE9NLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbWFpbkRPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza0Zvcm1ET00uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBjb2xvckJ1dHRvbihjb2xvcixjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KXtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRvbUVsZW1lbnQuY2xhc3NOYW1lID0gXCJjb2xvclBpY2tlclwiO1xyXG4gICAgZG9tRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICAgIGRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBjb2xvckNvbnRhaW5lci5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcik7XHJcbiAgICAgICAgY29sb3JDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgY29sb3JQaWNrZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgcHJvamVjdC5jb2xvciA9IGNvbG9yO1xyXG4gICAgfSlcclxuICAgIGNvbG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb2xvclBpY2tlckNsaWNrSGFuZGxlcihldmVudCxwcm9qZWN0KSB7XHJcbiAgICBjb25zdCBjb2xvclBpY2tlciA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICBjb25zdCBjb2xvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29sb3JDb250YWluZXIuY2xhc3NOYW1lID0gXCJjb2xvckNvbnRhaW5lclwiO1xyXG4gICAgY29sb3JQaWNrZXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY29sb3JDb250YWluZXIsY29sb3JQaWNrZXIpO1xyXG4gICAgY29sb3JQaWNrZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29sb3JCdXR0b24oJ3JlZCcsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbignZ3JlZW4nLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ2JsdWUnLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ3llbGxvdycsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y29sb3JQaWNrZXJDbGlja0hhbmRsZXJ9XHJcbiIsImltcG9ydCB7IHByb2plY3RTdGFydHVwLCBkaXNwbGF5UHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0RE9NLmpzXCJcclxuaW1wb3J0IHsgdGFza0Zvcm1TdGFydHVwIH0gZnJvbSBcIi4vdGFza0Zvcm1ET00uanNcIjtcclxuXHJcbmNvbnN0IHByb2plY3RzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgcHJvamVjdHNBcnJheS5wdXNoKHByb2plY3QpO1xyXG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHNBcnJheTtcclxuXHJcbiAgICByZXR1cm4ge2FkZFByb2plY3QsZ2V0UHJvamVjdHN9O1xyXG59KSgpO1xyXG5cclxubGV0IHNlbGVjdGVkUHJvamVjdCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICBjb25zb2xlLmxvZyhgUHJvamVjdCAke3Byb2plY3QubmFtZX0gaXMgc2VsZWN0ZWQhYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc2VsZWN0UHJvamVjdCgpe1xyXG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gbnVsbDtcclxuICAgIGNvbnNvbGUubG9nKGBzZWxlY3RlZFByb2plY3Qgbm93IG51bGwhYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKXtcclxuICAgIHJldHVybiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG5cclxudGFza0Zvcm1TdGFydHVwKCk7XHJcbnByb2plY3RTdGFydHVwKCk7XHJcblxyXG5leHBvcnQgeyBwcm9qZWN0cywgc2VsZWN0UHJvamVjdCwgZGVzZWxlY3RQcm9qZWN0LCBjYXBpdGFsaXplLCBzZWxlY3RlZFByb2plY3QgfSIsIlxyXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdENhcmQocHJvamVjdCkge1xyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gPiBkaXYuY2FyZCcpO1xyXG5cclxuICAgIG1haW4uaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBoZWFkZXIuaWQgPSBcImNhcmQtaGVhZGVyXCI7XHJcbiAgICBoZWFkZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcHJvamVjdC5jb2xvcjtcclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuXHJcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICAgIGhlYWRlclRleHQudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XHJcblxyXG4gICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tzLmlkID0gXCJ0YXNrLWxpc3RcIjtcclxuICAgIG1haW4uYXBwZW5kQ2hpbGQodGFza3MpO1xyXG5cclxuICAgIGRpc3BsYXlUYXNrcyhwcm9qZWN0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRhc2tzKHByb2plY3QpIHtcclxuICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWxpc3RcIik7XHJcbiAgICBmb3IoY29uc3QgdGFzayBvZiBwcm9qZWN0LnRhc2tzKXtcclxuICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQodGFza0Rpdik7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcclxuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGRhdGUudGV4dENvbnRlbnQgPSB0YXNrLmRhdGU7XHJcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZChkYXRlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgZGlzcGxheVByb2plY3RDYXJkLCBkaXNwbGF5VGFza3MgfSIsImNsYXNzIFByb2plY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLGNvbG9yPSdyZWQnKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UHJvamVjdH0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBkZXNlbGVjdFByb2plY3QsIHByb2plY3RzLCBzZWxlY3RQcm9qZWN0LCBzZWxlY3RlZFByb2plY3QgfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgeyBjb2xvclBpY2tlckNsaWNrSGFuZGxlciB9IGZyb20gXCIuL2NvbG9yUGlja2VyRE9NXCI7XHJcbmltcG9ydCB7IGRpc3BsYXlQcm9qZWN0Q2FyZCB9IGZyb20gXCIuL21haW5ET01cIlxyXG5cclxuXHJcbmNvbnN0IHByb2plY3REaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cucHJvamVjdCcpO1xyXG5sZXQgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCA9IG51bGw7XHJcblxyXG5cclxuZnVuY3Rpb24gcHJvamVjdFN0YXJ0dXAoKXtcclxuICAgIGdldFByb2plY3REaWFsb2dGb3JtKCk7XHJcbiAgICBuZXdQcm9qZWN0QnV0dG9uKCk7XHJcbiAgICBkaXNwbGF5UHJvamVjdHMoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oKXtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcbiAgICBmb3JtLmNsYXNzTmFtZSA9IFwicHJvamVjdFwiXHJcblxyXG4gICAgY29uc3QgY29sb3JQaWNrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbG9yUGlja2VyLmNsYXNzTmFtZSA9IFwiY29sb3JQaWNrZXJcIjtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY29sb3JQaWNrZXIpO1xyXG5cclxuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgbmFtZS50eXBlID0gJ3RleHQnO1xyXG4gICAgbmFtZS5wbGFjZWhvbGRlciA9ICdOYW1lJztcclxuICAgIG5hbWUuYXV0b2ZvY3VzID0gdHJ1ZTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3UHJvamVjdEJ1dHRvbigpIHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ1dHRvbicpO1xyXG4gICAgY29uc3QgbmFtZUlucHV0ID0gcHJvamVjdERpYWxvZy5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgIHByb2plY3REaWFsb2cuc2hvdygpO1xyXG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByb2plY3REaWFsb2dGb3JtKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gcHJvamVjdERpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybUNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0oKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsKCkgPT4ge1xyXG4gICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZSAhPT0gJycpe1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvamVjdERpYWxvZy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0cygpIHtcclxuICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQgPSBudWxsO1xyXG4gICAgZGVzZWxlY3RQcm9qZWN0KCk7XHJcbiAgICBcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZm9yKGxldCBwcm9qZWN0IG9mIHByb2plY3RzLmdldFByb2plY3RzKCkpe1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBzZWxlY3RQcm9qZWN0KHByb2plY3QpO1xyXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdENhcmQocHJvamVjdCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQgPSBwcm9qZWN0RWxlbWVudDtcclxuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29sb3IuY2xhc3NOYW1lID0gXCJjb2xvclBpY2tlclwiO1xyXG4gICAgICAgIGNvbG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpID0+IGNvbG9yUGlja2VyQ2xpY2tIYW5kbGVyKGV2ZW50LHByb2plY3QpKTtcclxuICAgICAgICBjb2xvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwcm9qZWN0LmNvbG9yO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKGNvbG9yKTtcclxuXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgcHJvamVjdFN0YXJ0dXAsIGRpc3BsYXlQcm9qZWN0cyB9OyIsImNsYXNzIFRhc2tQcm9wZXJ0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2YWx1ZSwgaW5wdXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybVF1ZXJ5KCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBpbnB1dC5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LmlkID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbnB1dC50eXBlID0gdGhpcy5pbnB1dFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuZXcgVGFza1Byb3BlcnR5KCduYW1lJywgJycsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IG5ldyBUYXNrUHJvcGVydHkoJ3RpbWUnLCAnJywgJ2RhdGV0aW1lLWxvY2FsJyk7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXcgVGFza1Byb3BlcnR5KCdkZXNjcmlwdGlvbicsICcnLCAnTi9BJyk7XHJcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBuZXcgVGFza1Byb3BlcnR5KCdwcmlvcml0eScsICcnLCAnbnVtYmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld05hbWVcclxuICAgICAqL1xyXG4gICAgc2V0IG5hbWUobmV3TmFtZSkge1xyXG4gICAgICAgIHRoaXMuX25hbWUudmFsdWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0aW1lOyB9fSBuZXdUaW1lXHJcbiAgICAgKi9cclxuICAgIHNldCB0aW1lKG5ld1RpbWUpIHtcclxuICAgICAgICB0aGlzLl90aW1lLnZhbHVlID0gbmV3VGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGV4dDsgfX0gbmV3RGVzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc2V0IGRlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24udmFsdWUgPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogbnVtYmVyOyB9fSBuZXdQcmlvcml0eVxyXG4gICAgICovXHJcbiAgICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLl9wcmlvcml0eS52YWx1ZSA9IG5ld1ByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWUudmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbi52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJpb3JpdHkoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHkudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7VGFza307IiwiaW1wb3J0IHsgY2FwaXRhbGl6ZSwgc2VsZWN0ZWRQcm9qZWN0IH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcclxuaW1wb3J0IHsgZGlzcGxheVRhc2tzIH0gZnJvbSBcIi4vbWFpbkRPTVwiO1xyXG5cclxuY29uc3QgdGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZy50YXNrJyk7XHJcblxyXG5mdW5jdGlvbiB0YXNrRm9ybVN0YXJ0dXAoKXtcclxuICAgIG5ld1Rhc2tCdXR0b24oKTtcclxuICAgIGdldFRhc2tEaWFsb2dGb3JtKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Rhc2tCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tCdXR0b24nKTtcclxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEaWFsb2dGb3JtKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybUNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2xvc2UgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHRhc2tEaWFsb2cuY2xvc2UoKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRm9ybSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcbiAgICBmb3JtLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhc2spO1xyXG5cclxuICAgIGNvbnN0IGZvcm1ET01FbGVtZW50cyA9IFtdO1xyXG5cclxuICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgaWYodGFza1twcm9wZXJ0eV0uaW5wdXRUeXBlID09PSBcIk4vQVwiKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsLmZvciA9IHRhc2tbcHJvcGVydHldLm5hbWU7XHJcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgJHtjYXBpdGFsaXplKHRhc2tbcHJvcGVydHldLm5hbWUpfTogYDtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRhc2tbcHJvcGVydHldLmZvcm1RdWVyeSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgICAgIGZvcm1ET01FbGVtZW50cy5wdXNoKGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgZGVzY3JpcHRpb25MYWJlbC5mb3IgPSAnZGVzY3JpcHRpb24nO1xyXG4gICAgZGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9ICdEZXNjcmlwdGlvbic7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uTGFiZWwpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgZGVzY3JpcHRpb24ubmFtZSA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICBkZXNjcmlwdGlvbi5pZCA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICBkZXNjcmlwdGlvbi5yb3dzID0gODtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgZm9ybURPTUVsZW1lbnRzLnB1c2goZGVzY3JpcHRpb24pXHJcblxyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG4gICAgcHJpb3JpdHkubWF4ID0gNTtcclxuICAgIHByaW9yaXR5Lm1pbiA9IDE7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHN1Ym1pdC50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XHJcbiAgICBzdWJtaXQudHlwZSA9IFwic3VibWl0XCI7XHJcbiAgICBzdWJtaXQuY2xhc3NOYW1lID0gXCJjb2xvcmVkQnV0dG9uXCI7XHJcbiAgICBzdWJtaXQuYXV0b2ZvY3VzID0gdHJ1ZTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgIGZvcm1ET01FbGVtZW50cy5wdXNoKHN1Ym1pdCk7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCgpID0+IFxyXG4gICAge1xyXG4gICAgICAgIGlmKHNlbGVjdGVkUHJvamVjdCkge1xyXG4gICAgICAgICAgICB0YXNrLm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eVwiKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgdGFzay50aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aW1lXCIpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3QuYWRkVGFzayh0YXNrKTtcclxuICAgICAgICAgICAgZGlzcGxheVRhc2tzKHNlbGVjdGVkUHJvamVjdCk7XHJcbiAgICAgICAgfWVsc2V7IFxyXG4gICAgICAgICAgICBub1NlbGVjdGVkUHJvamVjdEhhbmRsZXIoKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRhc2tEaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBkaWFsb2dCYWNrZHJvcENsaWNrSGFuZGxlcihldmVudCxmb3JtRE9NRWxlbWVudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpYWxvZ0JhY2tkcm9wQ2xpY2tIYW5kbGVyKGV2ZW50LCBmb3JtRE9NRWxlbWVudHMpeyAvL0Nsb3NlIGRpYWxvZyB3aGVuIGNsaWNrIGlzIG91dHNpZGUgZGlhbG9nIGJveFxyXG4gICAgY29uc3QgcmVjdCA9IHRhc2tEaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBpc0luRGlhbG9nID0gKHJlY3QudG9wIDw9IGV2ZW50LmNsaWVudFkgJiYgZXZlbnQuY2xpZW50WSA8PSByZWN0LnRvcCArIHJlY3QuaGVpZ2h0ICYmXHJcbiAgICAgICAgcmVjdC5sZWZ0IDw9IGV2ZW50LmNsaWVudFggJiYgZXZlbnQuY2xpZW50WCA8PSByZWN0LmxlZnQgKyByZWN0LndpZHRoKTtcclxuICAgIFxyXG4gICAgbGV0IGlzSW50ZXJhY3RpbmdXaXRoRm9ybSA9IGZhbHNlO1xyXG4gICAgZm9yKGNvbnN0IGVsZW1lbnQgb2YgZm9ybURPTUVsZW1lbnRzKXtcclxuICAgICAgICBpZihpc0ludGVyYWN0aW5nV2l0aEZvcm0pIGJyZWFrO1xyXG4gICAgICAgIGlzSW50ZXJhY3RpbmdXaXRoRm9ybSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0luRGlhbG9nICYmICFpc0ludGVyYWN0aW5nV2l0aEZvcm0pIHtcclxuICAgICAgICB0YXNrRGlhbG9nLmNsb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vU2VsZWN0ZWRQcm9qZWN0SGFuZGxlcigpe1xyXG4gICAgYWxlcnQoXCJObyBzZWxlY3RlZCBwcm9qZWN0XCIpO1xyXG59XHJcblxyXG5leHBvcnQgeyB0YXNrRm9ybVN0YXJ0dXAgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=