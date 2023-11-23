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
        this._priority = new TaskProperty('priority', '', 'N/A');
    }

    /**
     * @param {{ value: text; }} newName
     */
    set name(newName) {
        this.name.value = newName;
    }

    /**
     * @param {{ value: time; }} newTime
     */
    set time(newTime) {
        this.time.value = newTime;
    }

    /**
     * @param {{ value: text; }} newDescription
     */
    set description(newDescription) {
        this.description.value = newDescription;
    }

    /**
     * @param {{ value: number; }} newPriority
     */
    set priority(newPriority) {
        this.priority.value = newPriority;
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
    form.appendChild(description);
    formDOMElements.push(description)


    
    const submit = document.createElement('button');
    submit.textContent = "Submit";
    submit.type = "submit";
    submit.className = "coloredButton";
    submit.autofocus = true;
    form.appendChild(submit);
    formDOMElements.push(submit);

    form.addEventListener('submit',() => 
    {
        ___WEBPACK_IMPORTED_MODULE_0__.selectedProject ? ___WEBPACK_IMPORTED_MODULE_0__.selectedProject.addTask(task) : noSelectedProjectHandler()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOENBQWUsR0FBRyw4Q0FBZTtBQUN6QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDL0ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbG9yUGlja2VyRE9NLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza0Zvcm1ET00uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBjb2xvckJ1dHRvbihjb2xvcixjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KXtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRvbUVsZW1lbnQuY2xhc3NOYW1lID0gXCJjb2xvclBpY2tlclwiO1xyXG4gICAgZG9tRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICAgIGRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBjb2xvckNvbnRhaW5lci5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcik7XHJcbiAgICAgICAgY29sb3JDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgY29sb3JQaWNrZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgcHJvamVjdC5jb2xvciA9IGNvbG9yO1xyXG4gICAgfSlcclxuICAgIGNvbG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb2xvclBpY2tlckNsaWNrSGFuZGxlcihldmVudCxwcm9qZWN0KSB7XHJcbiAgICBjb25zdCBjb2xvclBpY2tlciA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICBjb25zdCBjb2xvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29sb3JDb250YWluZXIuY2xhc3NOYW1lID0gXCJjb2xvckNvbnRhaW5lclwiO1xyXG4gICAgY29sb3JQaWNrZXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY29sb3JDb250YWluZXIsY29sb3JQaWNrZXIpO1xyXG4gICAgY29sb3JQaWNrZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29sb3JCdXR0b24oJ3JlZCcsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbignZ3JlZW4nLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ2JsdWUnLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ3llbGxvdycsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y29sb3JQaWNrZXJDbGlja0hhbmRsZXJ9XHJcbiIsImltcG9ydCB7IHByb2plY3RTdGFydHVwLCBkaXNwbGF5UHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0RE9NLmpzXCJcclxuaW1wb3J0IHsgdGFza0Zvcm1TdGFydHVwIH0gZnJvbSBcIi4vdGFza0Zvcm1ET00uanNcIjtcclxuXHJcbmNvbnN0IHByb2plY3RzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgcHJvamVjdHNBcnJheS5wdXNoKHByb2plY3QpO1xyXG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHNBcnJheTtcclxuXHJcbiAgICByZXR1cm4ge2FkZFByb2plY3QsZ2V0UHJvamVjdHN9O1xyXG59KSgpO1xyXG5cclxubGV0IHNlbGVjdGVkUHJvamVjdCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICBjb25zb2xlLmxvZyhgUHJvamVjdCAke3Byb2plY3QubmFtZX0gaXMgc2VsZWN0ZWQhYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc2VsZWN0UHJvamVjdCgpe1xyXG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gbnVsbDtcclxuICAgIGNvbnNvbGUubG9nKGBzZWxlY3RlZFByb2plY3Qgbm93IG51bGwhYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKXtcclxuICAgIHJldHVybiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG5cclxudGFza0Zvcm1TdGFydHVwKCk7XHJcbnByb2plY3RTdGFydHVwKCk7XHJcblxyXG5leHBvcnQgeyBwcm9qZWN0cywgc2VsZWN0UHJvamVjdCwgZGVzZWxlY3RQcm9qZWN0LCBjYXBpdGFsaXplLCBzZWxlY3RlZFByb2plY3QgfSIsImNsYXNzIFByb2plY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLGNvbG9yPSdyZWQnKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UHJvamVjdH0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBkZXNlbGVjdFByb2plY3QsIHByb2plY3RzLCBzZWxlY3RQcm9qZWN0LCBzZWxlY3RlZFByb2plY3QgfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgeyBjb2xvclBpY2tlckNsaWNrSGFuZGxlciB9IGZyb20gXCIuL2NvbG9yUGlja2VyRE9NXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nLnByb2plY3QnKTtcclxubGV0IHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQgPSBudWxsO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RTdGFydHVwKCl7XHJcbiAgICBnZXRQcm9qZWN0RGlhbG9nRm9ybSgpO1xyXG4gICAgbmV3UHJvamVjdEJ1dHRvbigpO1xyXG4gICAgZGlzcGxheVByb2plY3RzKCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCl7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5tZXRob2QgPSBcImRpYWxvZ1wiO1xyXG4gICAgZm9ybS5jbGFzc05hbWUgPSBcInByb2plY3RcIlxyXG5cclxuICAgIGNvbnN0IGNvbG9yUGlja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb2xvclBpY2tlci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGNvbG9yUGlja2VyKTtcclxuXHJcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIG5hbWUudHlwZSA9ICd0ZXh0JztcclxuICAgIG5hbWUucGxhY2Vob2xkZXIgPSAnTmFtZSc7XHJcbiAgICBuYW1lLmF1dG9mb2N1cyA9IHRydWU7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Byb2plY3RCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3RCdXR0b24nKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBwcm9qZWN0RGlhbG9nLnNob3coKTtcclxuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGlhbG9nRm9ybSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1Db250YWluZXInKTtcclxuICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICBuYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCgpID0+IHtcclxuICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUgIT09ICcnKXtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdHMoKSB7XHJcbiAgICBzZWxlY3RlZFByb2plY3RET01FbGVtZW50ID0gbnVsbDtcclxuICAgIGRlc2VsZWN0UHJvamVjdCgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvcihsZXQgcHJvamVjdCBvZiBwcm9qZWN0cy5nZXRQcm9qZWN0cygpKXtcclxuICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZFByb2plY3RET01FbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgc2VsZWN0UHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCA9IHByb2plY3RFbGVtZW50O1xyXG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb2xvci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICAgICAgY29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChldmVudCkgPT4gY29sb3JQaWNrZXJDbGlja0hhbmRsZXIoZXZlbnQscHJvamVjdCkpO1xyXG4gICAgICAgIGNvbG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHByb2plY3QuY29sb3I7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29sb3IpO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBwcm9qZWN0U3RhcnR1cCwgZGlzcGxheVByb2plY3RzIH07IiwiY2xhc3MgVGFza1Byb3BlcnR5IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHZhbHVlLCBpbnB1dFR5cGUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmlucHV0VHlwZSA9IGlucHV0VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtUXVlcnkoKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGlucHV0Lm5hbWUgPSB0aGlzLm5hbWU7XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGlucHV0LnR5cGUgPSB0aGlzLmlucHV0VHlwZTtcclxuICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5ldyBUYXNrUHJvcGVydHkoJ25hbWUnLCAnJywgJ3RleHQnKTtcclxuICAgICAgICB0aGlzLl90aW1lID0gbmV3IFRhc2tQcm9wZXJ0eSgndGltZScsICcnLCAnZGF0ZXRpbWUtbG9jYWwnKTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IG5ldyBUYXNrUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgJycsICdOL0EnKTtcclxuICAgICAgICB0aGlzLl9wcmlvcml0eSA9IG5ldyBUYXNrUHJvcGVydHkoJ3ByaW9yaXR5JywgJycsICdOL0EnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGV4dDsgfX0gbmV3TmFtZVxyXG4gICAgICovXHJcbiAgICBzZXQgbmFtZShuZXdOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lLnZhbHVlID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGltZTsgfX0gbmV3VGltZVxyXG4gICAgICovXHJcbiAgICBzZXQgdGltZShuZXdUaW1lKSB7XHJcbiAgICAgICAgdGhpcy50aW1lLnZhbHVlID0gbmV3VGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGV4dDsgfX0gbmV3RGVzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc2V0IGRlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi52YWx1ZSA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiBudW1iZXI7IH19IG5ld1ByaW9yaXR5XHJcbiAgICAgKi9cclxuICAgIHNldCBwcmlvcml0eShuZXdQcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkudmFsdWUgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IG5hbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGltZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb24udmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHByaW9yaXR5KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByaW9yaXR5LnZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Rhc2t9OyIsImltcG9ydCB7IGNhcGl0YWxpemUsIHNlbGVjdGVkUHJvamVjdCB9IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XHJcblxyXG5jb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nLnRhc2snKTtcclxuXHJcbmZ1bmN0aW9uIHRhc2tGb3JtU3RhcnR1cCgpe1xyXG4gICAgbmV3VGFza0J1dHRvbigpO1xyXG4gICAgZ2V0VGFza0RpYWxvZ0Zvcm0oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3VGFza0J1dHRvbigpIHtcclxuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza0J1dHRvbicpO1xyXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgIHRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGFza0RpYWxvZ0Zvcm0oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjbG9zZSA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gdGFza0RpYWxvZy5jbG9zZSgpKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVGb3JtKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIGZvcm0ubWV0aG9kID0gXCJkaWFsb2dcIjtcclxuICAgIGZvcm0uY2xhc3NOYW1lID0gXCJ0YXNrXCI7XHJcblxyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXModGFzayk7XHJcblxyXG4gICAgY29uc3QgZm9ybURPTUVsZW1lbnRzID0gW107XHJcblxyXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcclxuICAgICAgICBpZih0YXNrW3Byb3BlcnR5XS5pbnB1dFR5cGUgPT09IFwiTi9BXCIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgbGFiZWwuZm9yID0gdGFza1twcm9wZXJ0eV0ubmFtZTtcclxuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGAke2NhcGl0YWxpemUodGFza1twcm9wZXJ0eV0ubmFtZSl9OiBgO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGFza1twcm9wZXJ0eV0uZm9ybVF1ZXJ5KCk7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgZm9ybURPTUVsZW1lbnRzLnB1c2goaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICBkZXNjcmlwdGlvbkxhYmVsLmZvciA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICBkZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gJ0Rlc2NyaXB0aW9uJztcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25MYWJlbCk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICBkZXNjcmlwdGlvbi5uYW1lID0gJ2Rlc2NyaXB0aW9uJztcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgZm9ybURPTUVsZW1lbnRzLnB1c2goZGVzY3JpcHRpb24pXHJcblxyXG5cclxuICAgIFxyXG4gICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBzdWJtaXQudGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xyXG4gICAgc3VibWl0LnR5cGUgPSBcInN1Ym1pdFwiO1xyXG4gICAgc3VibWl0LmNsYXNzTmFtZSA9IFwiY29sb3JlZEJ1dHRvblwiO1xyXG4gICAgc3VibWl0LmF1dG9mb2N1cyA9IHRydWU7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICBmb3JtRE9NRWxlbWVudHMucHVzaChzdWJtaXQpO1xyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoKSA9PiBcclxuICAgIHtcclxuICAgICAgICBzZWxlY3RlZFByb2plY3QgPyBzZWxlY3RlZFByb2plY3QuYWRkVGFzayh0YXNrKSA6IG5vU2VsZWN0ZWRQcm9qZWN0SGFuZGxlcigpXHJcbiAgICB9KTtcclxuXHJcbiAgICB0YXNrRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZGlhbG9nQmFja2Ryb3BDbGlja0hhbmRsZXIoZXZlbnQsZm9ybURPTUVsZW1lbnRzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmb3JtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaWFsb2dCYWNrZHJvcENsaWNrSGFuZGxlcihldmVudCwgZm9ybURPTUVsZW1lbnRzKXsgLy9DbG9zZSBkaWFsb2cgd2hlbiBjbGljayBpcyBvdXRzaWRlIGRpYWxvZyBib3hcclxuICAgIGNvbnN0IHJlY3QgPSB0YXNrRGlhbG9nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgaXNJbkRpYWxvZyA9IChyZWN0LnRvcCA8PSBldmVudC5jbGllbnRZICYmIGV2ZW50LmNsaWVudFkgPD0gcmVjdC50b3AgKyByZWN0LmhlaWdodCAmJlxyXG4gICAgICAgIHJlY3QubGVmdCA8PSBldmVudC5jbGllbnRYICYmIGV2ZW50LmNsaWVudFggPD0gcmVjdC5sZWZ0ICsgcmVjdC53aWR0aCk7XHJcbiAgICBcclxuICAgIGxldCBpc0ludGVyYWN0aW5nV2l0aEZvcm0gPSBmYWxzZTtcclxuICAgIGZvcihjb25zdCBlbGVtZW50IG9mIGZvcm1ET01FbGVtZW50cyl7XHJcbiAgICAgICAgaWYoaXNJbnRlcmFjdGluZ1dpdGhGb3JtKSBicmVhaztcclxuICAgICAgICBpc0ludGVyYWN0aW5nV2l0aEZvcm0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNJbkRpYWxvZyAmJiAhaXNJbnRlcmFjdGluZ1dpdGhGb3JtKSB7XHJcbiAgICAgICAgdGFza0RpYWxvZy5jbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBub1NlbGVjdGVkUHJvamVjdEhhbmRsZXIoKXtcclxuICAgIGFsZXJ0KFwiTm8gc2VsZWN0ZWQgcHJvamVjdFwiKTtcclxufVxyXG5cclxuZXhwb3J0IHsgdGFza0Zvcm1TdGFydHVwIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9