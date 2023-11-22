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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCZ0I7QUFDRztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWU7QUFDZiw4REFBYztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYb0M7QUFDZ0Q7QUFDekI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZDQUFPO0FBQ3ZDLFlBQVksNENBQVE7QUFDcEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFEQUFhO0FBQ3pCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdFQUF1QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRWdEO0FBQ2xCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVDQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNkNBQVUsc0JBQXNCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4Q0FBZSxHQUFHLDhDQUFlO0FBQ3pDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMvRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29sb3JQaWNrZXJET00uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0RE9NLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrRm9ybURPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIGNvbG9yQnV0dG9uKGNvbG9yLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3Qpe1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZG9tRWxlbWVudC5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICBkb21FbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xyXG4gICAgZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgIGNvbG9yQ29udGFpbmVyLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyKTtcclxuICAgICAgICBjb2xvckNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICBjb2xvclBpY2tlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICBwcm9qZWN0LmNvbG9yID0gY29sb3I7XHJcbiAgICB9KVxyXG4gICAgY29sb3JDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbG9yUGlja2VyQ2xpY2tIYW5kbGVyKGV2ZW50LHByb2plY3QpIHtcclxuICAgIGNvbnN0IGNvbG9yUGlja2VyID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgIGNvbnN0IGNvbG9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb2xvckNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbG9yQ29udGFpbmVyXCI7XHJcbiAgICBjb2xvclBpY2tlci5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjb2xvckNvbnRhaW5lcixjb2xvclBpY2tlcik7XHJcbiAgICBjb2xvclBpY2tlci5yZW1vdmUoKTtcclxuXHJcbiAgICBjb2xvckJ1dHRvbigncmVkJyxjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KTtcclxuICAgIGNvbG9yQnV0dG9uKCdncmVlbicsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbignYmx1ZScsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbigneWVsbG93Jyxjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KTtcclxufVxyXG5cclxuZXhwb3J0IHtjb2xvclBpY2tlckNsaWNrSGFuZGxlcn1cclxuIiwiaW1wb3J0IHsgcHJvamVjdFN0YXJ0dXAgfSBmcm9tIFwiLi9wcm9qZWN0RE9NLmpzXCJcclxuaW1wb3J0IHsgdGFza0Zvcm1TdGFydHVwIH0gZnJvbSBcIi4vdGFza0Zvcm1ET00uanNcIjtcclxuXHJcbmNvbnN0IHByb2plY3RzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgcHJvamVjdHNBcnJheS5wdXNoKHByb2plY3QpO1xyXG4gICAgICAgIGRpc3BsYXlQcm9qZWN0cygpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHNBcnJheTtcclxuXHJcbiAgICByZXR1cm4ge2FkZFByb2plY3QsZ2V0UHJvamVjdHN9O1xyXG59KSgpO1xyXG5cclxubGV0IHNlbGVjdGVkUHJvamVjdCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICBjb25zb2xlLmxvZyhgUHJvamVjdCAke3Byb2plY3QubmFtZX0gaXMgc2VsZWN0ZWQhYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc2VsZWN0UHJvamVjdCgpe1xyXG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gbnVsbDtcclxuICAgIGNvbnNvbGUubG9nKGBzZWxlY3RlZFByb2plY3Qgbm93IG51bGwhYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKXtcclxuICAgIHJldHVybiBzdHJpbmdbMF0udG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG5cclxudGFza0Zvcm1TdGFydHVwKCk7XHJcbnByb2plY3RTdGFydHVwKCk7XHJcblxyXG5leHBvcnQgeyBwcm9qZWN0cywgc2VsZWN0UHJvamVjdCwgZGVzZWxlY3RQcm9qZWN0LCBjYXBpdGFsaXplLCBzZWxlY3RlZFByb2plY3QgfSIsImNsYXNzIFByb2plY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLGNvbG9yPSdyZWQnKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UHJvamVjdH0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBkZXNlbGVjdFByb2plY3QsIHByb2plY3RzLCBzZWxlY3RQcm9qZWN0LCBzZWxlY3RlZFByb2plY3QgfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgeyBjb2xvclBpY2tlckNsaWNrSGFuZGxlciB9IGZyb20gXCIuL2NvbG9yUGlja2VyRE9NXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nLnByb2plY3QnKTtcclxubGV0IHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQgPSBudWxsO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RTdGFydHVwKCl7XHJcbiAgICBnZXRQcm9qZWN0RGlhbG9nRm9ybSgpO1xyXG4gICAgbmV3UHJvamVjdEJ1dHRvbigpO1xyXG4gICAgZGlzcGxheVByb2plY3RzKCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCl7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5tZXRob2QgPSBcImRpYWxvZ1wiO1xyXG4gICAgZm9ybS5jbGFzc05hbWUgPSBcInByb2plY3RcIlxyXG5cclxuICAgIGNvbnN0IGNvbG9yUGlja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb2xvclBpY2tlci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGNvbG9yUGlja2VyKTtcclxuXHJcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIG5hbWUudHlwZSA9ICd0ZXh0JztcclxuICAgIG5hbWUucGxhY2Vob2xkZXIgPSAnTmFtZSc7XHJcbiAgICBuYW1lLmF1dG9mb2N1cyA9IHRydWU7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Byb2plY3RCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3RCdXR0b24nKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBwcm9qZWN0RGlhbG9nLnNob3coKTtcclxuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGlhbG9nRm9ybSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1Db250YWluZXInKTtcclxuICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICBuYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCgpID0+IHtcclxuICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUgIT09ICcnKXtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdHMoKSB7XHJcbiAgICBzZWxlY3RlZFByb2plY3RET01FbGVtZW50ID0gbnVsbDtcclxuICAgIGRlc2VsZWN0UHJvamVjdCgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvcihsZXQgcHJvamVjdCBvZiBwcm9qZWN0cy5nZXRQcm9qZWN0cygpKXtcclxuICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZFByb2plY3RET01FbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgc2VsZWN0UHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCA9IHByb2plY3RFbGVtZW50O1xyXG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb2xvci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICAgICAgY29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChldmVudCkgPT4gY29sb3JQaWNrZXJDbGlja0hhbmRsZXIoZXZlbnQscHJvamVjdCkpO1xyXG4gICAgICAgIGNvbG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHByb2plY3QuY29sb3I7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29sb3IpO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBwcm9qZWN0U3RhcnR1cCB9OyIsImNsYXNzIFRhc2tQcm9wZXJ0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2YWx1ZSwgaW5wdXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybVF1ZXJ5KCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBpbnB1dC5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbnB1dC50eXBlID0gdGhpcy5pbnB1dFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuZXcgVGFza1Byb3BlcnR5KCduYW1lJywgJycsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IG5ldyBUYXNrUHJvcGVydHkoJ3RpbWUnLCAnJywgJ2RhdGV0aW1lLWxvY2FsJyk7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXcgVGFza1Byb3BlcnR5KCdkZXNjcmlwdGlvbicsICcnLCAnTi9BJyk7XHJcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBuZXcgVGFza1Byb3BlcnR5KCdwcmlvcml0eScsICcnLCAnTi9BJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld05hbWVcclxuICAgICAqL1xyXG4gICAgc2V0IG5hbWUobmV3TmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZS52YWx1ZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRpbWU7IH19IG5ld1RpbWVcclxuICAgICAqL1xyXG4gICAgc2V0IHRpbWUobmV3VGltZSkge1xyXG4gICAgICAgIHRoaXMudGltZS52YWx1ZSA9IG5ld1RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld0Rlc2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24udmFsdWUgPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogbnVtYmVyOyB9fSBuZXdQcmlvcml0eVxyXG4gICAgICovXHJcbiAgICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5LnZhbHVlID0gbmV3UHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBuYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWUudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZS52YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcmlvcml0eSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eS52YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtUYXNrfTsiLCJpbXBvcnQgeyBjYXBpdGFsaXplLCBzZWxlY3RlZFByb2plY3QgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5cclxuY29uc3QgdGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZy50YXNrJyk7XHJcblxyXG5mdW5jdGlvbiB0YXNrRm9ybVN0YXJ0dXAoKXtcclxuICAgIG5ld1Rhc2tCdXR0b24oKTtcclxuICAgIGdldFRhc2tEaWFsb2dGb3JtKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Rhc2tCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tCdXR0b24nKTtcclxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEaWFsb2dGb3JtKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybUNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2xvc2UgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHRhc2tEaWFsb2cuY2xvc2UoKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRm9ybSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcbiAgICBmb3JtLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhc2spO1xyXG5cclxuICAgIGNvbnN0IGZvcm1ET01FbGVtZW50cyA9IFtdO1xyXG5cclxuICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgaWYodGFza1twcm9wZXJ0eV0uaW5wdXRUeXBlID09PSBcIk4vQVwiKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsLmZvciA9IHRhc2tbcHJvcGVydHldLm5hbWU7XHJcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgJHtjYXBpdGFsaXplKHRhc2tbcHJvcGVydHldLm5hbWUpfTogYDtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRhc2tbcHJvcGVydHldLmZvcm1RdWVyeSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgICAgIGZvcm1ET01FbGVtZW50cy5wdXNoKGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgZGVzY3JpcHRpb25MYWJlbC5mb3IgPSAnZGVzY3JpcHRpb24nO1xyXG4gICAgZGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9ICdEZXNjcmlwdGlvbic7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uTGFiZWwpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgZGVzY3JpcHRpb24ubmFtZSA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgIGZvcm1ET01FbGVtZW50cy5wdXNoKGRlc2NyaXB0aW9uKVxyXG5cclxuXHJcbiAgICBcclxuICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgc3VibWl0LnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcclxuICAgIHN1Ym1pdC50eXBlID0gXCJzdWJtaXRcIjtcclxuICAgIHN1Ym1pdC5jbGFzc05hbWUgPSBcImNvbG9yZWRCdXR0b25cIjtcclxuICAgIHN1Ym1pdC5hdXRvZm9jdXMgPSB0cnVlO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChzdWJtaXQpO1xyXG4gICAgZm9ybURPTUVsZW1lbnRzLnB1c2goc3VibWl0KTtcclxuXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsKCkgPT4gXHJcbiAgICB7XHJcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0ID8gc2VsZWN0ZWRQcm9qZWN0LmFkZFRhc2sodGFzaykgOiBub1NlbGVjdGVkUHJvamVjdEhhbmRsZXIoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGFza0RpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGRpYWxvZ0JhY2tkcm9wQ2xpY2tIYW5kbGVyKGV2ZW50LGZvcm1ET01FbGVtZW50cyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlhbG9nQmFja2Ryb3BDbGlja0hhbmRsZXIoZXZlbnQsIGZvcm1ET01FbGVtZW50cyl7IC8vQ2xvc2UgZGlhbG9nIHdoZW4gY2xpY2sgaXMgb3V0c2lkZSBkaWFsb2cgYm94XHJcbiAgICBjb25zdCByZWN0ID0gdGFza0RpYWxvZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IGlzSW5EaWFsb2cgPSAocmVjdC50b3AgPD0gZXZlbnQuY2xpZW50WSAmJiBldmVudC5jbGllbnRZIDw9IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgJiZcclxuICAgICAgICByZWN0LmxlZnQgPD0gZXZlbnQuY2xpZW50WCAmJiBldmVudC5jbGllbnRYIDw9IHJlY3QubGVmdCArIHJlY3Qud2lkdGgpO1xyXG4gICAgXHJcbiAgICBsZXQgaXNJbnRlcmFjdGluZ1dpdGhGb3JtID0gZmFsc2U7XHJcbiAgICBmb3IoY29uc3QgZWxlbWVudCBvZiBmb3JtRE9NRWxlbWVudHMpe1xyXG4gICAgICAgIGlmKGlzSW50ZXJhY3RpbmdXaXRoRm9ybSkgYnJlYWs7XHJcbiAgICAgICAgaXNJbnRlcmFjdGluZ1dpdGhGb3JtID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzSW5EaWFsb2cgJiYgIWlzSW50ZXJhY3RpbmdXaXRoRm9ybSkge1xyXG4gICAgICAgIHRhc2tEaWFsb2cuY2xvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbm9TZWxlY3RlZFByb2plY3RIYW5kbGVyKCl7XHJcbiAgICBhbGVydChcIk5vIHNlbGVjdGVkIHByb2plY3RcIik7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHRhc2tGb3JtU3RhcnR1cCB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==