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
/* harmony export */   deselectProject: () => (/* binding */ deselectProject),
/* harmony export */   projects: () => (/* binding */ projects),
/* harmony export */   selectProject: () => (/* binding */ selectProject)
/* harmony export */ });
/* harmony import */ var _projectDOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectDOM.js */ "./src/projectDOM.js");
/* harmony import */ var _taskDOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskDOM.js */ "./src/taskDOM.js");



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

(0,_taskDOM_js__WEBPACK_IMPORTED_MODULE_1__.newTaskButton)();
(0,_taskDOM_js__WEBPACK_IMPORTED_MODULE_1__.getTaskDialogForm)();
(0,_projectDOM_js__WEBPACK_IMPORTED_MODULE_0__.getProjectDialogForm)();
(0,_projectDOM_js__WEBPACK_IMPORTED_MODULE_0__.newProjectButton)();
(0,_projectDOM_js__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();



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
/* harmony export */   getProjectDialogForm: () => (/* binding */ getProjectDialogForm),
/* harmony export */   newProjectButton: () => (/* binding */ newProjectButton)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _colorPickerDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colorPickerDOM */ "./src/colorPickerDOM.js");




const projectDialog = document.querySelector('dialog.project');
let selectedProjectDOMElement = null;

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
        this._description = new TaskProperty('description', '', 'text');
        this._priority = new TaskProperty('priority', '', 'number');
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

/***/ "./src/taskDOM.js":
/*!************************!*\
  !*** ./src/taskDOM.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTaskDialogForm: () => (/* binding */ getTaskDialogForm),
/* harmony export */   newTaskButton: () => (/* binding */ newTaskButton)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");


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

    const task = new _task__WEBPACK_IMPORTED_MODULE_0__.Task();
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
    submit.type = submit;
    form.appendChild(submit);
    return form;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb2xvclBpY2tlckRPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tET00uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBjb2xvckJ1dHRvbihjb2xvcixjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KXtcclxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRvbUVsZW1lbnQuY2xhc3NOYW1lID0gXCJjb2xvclBpY2tlclwiO1xyXG4gICAgZG9tRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICAgIGRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBjb2xvckNvbnRhaW5lci5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcik7XHJcbiAgICAgICAgY29sb3JDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgY29sb3JQaWNrZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgcHJvamVjdC5jb2xvciA9IGNvbG9yO1xyXG4gICAgfSlcclxuICAgIGNvbG9yQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbUVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb2xvclBpY2tlckNsaWNrSGFuZGxlcihldmVudCxwcm9qZWN0KSB7XHJcbiAgICBjb25zdCBjb2xvclBpY2tlciA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICBjb25zdCBjb2xvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29sb3JDb250YWluZXIuY2xhc3NOYW1lID0gXCJjb2xvckNvbnRhaW5lclwiO1xyXG4gICAgY29sb3JQaWNrZXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY29sb3JDb250YWluZXIsY29sb3JQaWNrZXIpO1xyXG4gICAgY29sb3JQaWNrZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29sb3JCdXR0b24oJ3JlZCcsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbignZ3JlZW4nLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ2JsdWUnLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ3llbGxvdycsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y29sb3JQaWNrZXJDbGlja0hhbmRsZXJ9XHJcbiIsImltcG9ydCB7IGdldFByb2plY3REaWFsb2dGb3JtLCBuZXdQcm9qZWN0QnV0dG9uLCBkaXNwbGF5UHJvamVjdHN9IGZyb20gXCIuL3Byb2plY3RET00uanNcIlxyXG5pbXBvcnQgeyBuZXdUYXNrQnV0dG9uLGdldFRhc2tEaWFsb2dGb3JtIH0gZnJvbSBcIi4vdGFza0RPTS5qc1wiO1xyXG5cclxuY29uc3QgcHJvamVjdHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gW107XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcclxuICAgICAgICBwcm9qZWN0c0FycmF5LnB1c2gocHJvamVjdCk7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0c0FycmF5O1xyXG5cclxuICAgIHJldHVybiB7YWRkUHJvamVjdCxnZXRQcm9qZWN0c307XHJcbn0pKCk7XHJcblxyXG5sZXQgc2VsZWN0ZWRQcm9qZWN0ID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QocHJvamVjdCkge1xyXG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcclxuICAgIGNvbnNvbGUubG9nKGBQcm9qZWN0ICR7cHJvamVjdC5uYW1lfSBpcyBzZWxlY3RlZCFgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVzZWxlY3RQcm9qZWN0KCl7XHJcbiAgICBzZWxlY3RlZFByb2plY3QgPSBudWxsO1xyXG4gICAgY29uc29sZS5sb2coYHNlbGVjdGVkUHJvamVjdCBub3cgbnVsbCFgKTtcclxufVxyXG5cclxubmV3VGFza0J1dHRvbigpO1xyXG5nZXRUYXNrRGlhbG9nRm9ybSgpO1xyXG5nZXRQcm9qZWN0RGlhbG9nRm9ybSgpO1xyXG5uZXdQcm9qZWN0QnV0dG9uKCk7XHJcbmRpc3BsYXlQcm9qZWN0cygpO1xyXG5cclxuZXhwb3J0IHsgcHJvamVjdHMsIHNlbGVjdFByb2plY3QsIGRlc2VsZWN0UHJvamVjdCB9IiwiY2xhc3MgUHJvamVjdHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsY29sb3I9J3JlZCcpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYXNrKHRhc2spe1xyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtQcm9qZWN0fSIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCB7IGRlc2VsZWN0UHJvamVjdCwgcHJvamVjdHMsIHNlbGVjdFByb2plY3QsIHNlbGVjdGVkUHJvamVjdCB9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7IGNvbG9yUGlja2VyQ2xpY2tIYW5kbGVyIH0gZnJvbSBcIi4vY29sb3JQaWNrZXJET01cIjtcclxuXHJcbmNvbnN0IHByb2plY3REaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cucHJvamVjdCcpO1xyXG5sZXQgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCl7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5tZXRob2QgPSBcImRpYWxvZ1wiO1xyXG4gICAgZm9ybS5jbGFzc05hbWUgPSBcInByb2plY3RcIlxyXG5cclxuICAgIGNvbnN0IGNvbG9yUGlja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb2xvclBpY2tlci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGNvbG9yUGlja2VyKTtcclxuXHJcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIG5hbWUudHlwZSA9ICd0ZXh0JztcclxuICAgIG5hbWUucGxhY2Vob2xkZXIgPSAnTmFtZSc7XHJcbiAgICBuYW1lLmF1dG9mb2N1cyA9IHRydWU7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Byb2plY3RCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3RCdXR0b24nKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBwcm9qZWN0RGlhbG9nLnNob3coKTtcclxuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGlhbG9nRm9ybSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1Db250YWluZXInKTtcclxuICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICBuYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCgpID0+IHtcclxuICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUgIT09ICcnKXtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdHMoKSB7XHJcbiAgICBzZWxlY3RlZFByb2plY3RET01FbGVtZW50ID0gbnVsbDtcclxuICAgIGRlc2VsZWN0UHJvamVjdCgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvcihsZXQgcHJvamVjdCBvZiBwcm9qZWN0cy5nZXRQcm9qZWN0cygpKXtcclxuICAgICAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihzZWxlY3RlZFByb2plY3RET01FbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgc2VsZWN0UHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCA9IHByb2plY3RFbGVtZW50O1xyXG4gICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb2xvci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICAgICAgY29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChldmVudCkgPT4gY29sb3JQaWNrZXJDbGlja0hhbmRsZXIoZXZlbnQscHJvamVjdCkpO1xyXG4gICAgICAgIGNvbG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHByb2plY3QuY29sb3I7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29sb3IpO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge25ld1Byb2plY3RCdXR0b24sZ2V0UHJvamVjdERpYWxvZ0Zvcm0sZGlzcGxheVByb2plY3RzfTsiLCJjbGFzcyBUYXNrUHJvcGVydHkge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgdmFsdWUsIGlucHV0VHlwZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRUeXBlID0gaW5wdXRUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1RdWVyeSgpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaW5wdXQubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICBpbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9IHRoaXMuaW5wdXRUeXBlO1xyXG4gICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmV3IFRhc2tQcm9wZXJ0eSgnbmFtZScsICcnLCAndGV4dCcpO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSBuZXcgVGFza1Byb3BlcnR5KCd0aW1lJywgJycsICdkYXRldGltZS1sb2NhbCcpO1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gbmV3IFRhc2tQcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCAnJywgJ3RleHQnKTtcclxuICAgICAgICB0aGlzLl9wcmlvcml0eSA9IG5ldyBUYXNrUHJvcGVydHkoJ3ByaW9yaXR5JywgJycsICdudW1iZXInKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGV4dDsgfX0gbmV3TmFtZVxyXG4gICAgICovXHJcbiAgICBzZXQgbmFtZShuZXdOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lLnZhbHVlID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGltZTsgfX0gbmV3VGltZVxyXG4gICAgICovXHJcbiAgICBzZXQgdGltZShuZXdUaW1lKSB7XHJcbiAgICAgICAgdGhpcy50aW1lLnZhbHVlID0gbmV3VGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogdGV4dDsgfX0gbmV3RGVzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc2V0IGRlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi52YWx1ZSA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiBudW1iZXI7IH19IG5ld1ByaW9yaXR5XHJcbiAgICAgKi9cclxuICAgIHNldCBwcmlvcml0eShuZXdQcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkudmFsdWUgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0IG5hbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGltZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb24udmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHByaW9yaXR5KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByaW9yaXR5LnZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Rhc2t9OyIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XHJcblxyXG5jb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nLnRhc2snKTtcclxuXHJcbmZ1bmN0aW9uIG5ld1Rhc2tCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tCdXR0b24nKTtcclxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHRhc2tEaWFsb2cuc2hvd01vZGFsKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrRGlhbG9nRm9ybSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1Db250YWluZXInKTtcclxuICAgIGNvbnN0IGNsb3NlID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB0YXNrRGlhbG9nLmNsb3NlKCkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUZvcm0oKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5tZXRob2QgPSBcImRpYWxvZ1wiO1xyXG4gICAgZm9ybS5jbGFzc05hbWUgPSBcInRhc2tcIjtcclxuXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2soKTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0YXNrKTtcclxuXHJcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICBsYWJlbC5mb3IgPSB0YXNrW3Byb3BlcnR5XS5uYW1lO1xyXG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza1twcm9wZXJ0eV0ubmFtZX06IGA7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0YXNrW3Byb3BlcnR5XS5mb3JtUXVlcnkoKTtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBzdWJtaXQudGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xyXG4gICAgc3VibWl0LnR5cGUgPSBzdWJtaXQ7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZXhwb3J0IHtuZXdUYXNrQnV0dG9uLGdldFRhc2tEaWFsb2dGb3JtfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=