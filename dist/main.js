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
    submit.type = "submit";
    submit.className = "coloredButton";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbG9yUGlja2VyRE9NLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIGNvbG9yQnV0dG9uKGNvbG9yLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3Qpe1xyXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZG9tRWxlbWVudC5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICBkb21FbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xyXG4gICAgZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgIGNvbG9yQ29udGFpbmVyLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyKTtcclxuICAgICAgICBjb2xvckNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICBjb2xvclBpY2tlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICBwcm9qZWN0LmNvbG9yID0gY29sb3I7XHJcbiAgICB9KVxyXG4gICAgY29sb3JDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbG9yUGlja2VyQ2xpY2tIYW5kbGVyKGV2ZW50LHByb2plY3QpIHtcclxuICAgIGNvbnN0IGNvbG9yUGlja2VyID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgIGNvbnN0IGNvbG9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb2xvckNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbG9yQ29udGFpbmVyXCI7XHJcbiAgICBjb2xvclBpY2tlci5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjb2xvckNvbnRhaW5lcixjb2xvclBpY2tlcik7XHJcbiAgICBjb2xvclBpY2tlci5yZW1vdmUoKTtcclxuXHJcbiAgICBjb2xvckJ1dHRvbigncmVkJyxjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KTtcclxuICAgIGNvbG9yQnV0dG9uKCdncmVlbicsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbignYmx1ZScsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCk7XHJcbiAgICBjb2xvckJ1dHRvbigneWVsbG93Jyxjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KTtcclxufVxyXG5cclxuZXhwb3J0IHtjb2xvclBpY2tlckNsaWNrSGFuZGxlcn1cclxuIiwiaW1wb3J0IHsgZ2V0UHJvamVjdERpYWxvZ0Zvcm0sIG5ld1Byb2plY3RCdXR0b24sIGRpc3BsYXlQcm9qZWN0c30gZnJvbSBcIi4vcHJvamVjdERPTS5qc1wiXHJcbmltcG9ydCB7IG5ld1Rhc2tCdXR0b24sZ2V0VGFza0RpYWxvZ0Zvcm0gfSBmcm9tIFwiLi90YXNrRE9NLmpzXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIHByb2plY3RzQXJyYXkucHVzaChwcm9qZWN0KTtcclxuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzQXJyYXk7XHJcblxyXG4gICAgcmV0dXJuIHthZGRQcm9qZWN0LGdldFByb2plY3RzfTtcclxufSkoKTtcclxuXHJcbmxldCBzZWxlY3RlZFByb2plY3QgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gc2VsZWN0UHJvamVjdChwcm9qZWN0KSB7XHJcbiAgICBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgY29uc29sZS5sb2coYFByb2plY3QgJHtwcm9qZWN0Lm5hbWV9IGlzIHNlbGVjdGVkIWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXNlbGVjdFByb2plY3QoKXtcclxuICAgIHNlbGVjdGVkUHJvamVjdCA9IG51bGw7XHJcbiAgICBjb25zb2xlLmxvZyhgc2VsZWN0ZWRQcm9qZWN0IG5vdyBudWxsIWApO1xyXG59XHJcblxyXG5uZXdUYXNrQnV0dG9uKCk7XHJcbmdldFRhc2tEaWFsb2dGb3JtKCk7XHJcbmdldFByb2plY3REaWFsb2dGb3JtKCk7XHJcbm5ld1Byb2plY3RCdXR0b24oKTtcclxuZGlzcGxheVByb2plY3RzKCk7XHJcblxyXG5leHBvcnQgeyBwcm9qZWN0cywgc2VsZWN0UHJvamVjdCwgZGVzZWxlY3RQcm9qZWN0IH0iLCJjbGFzcyBQcm9qZWN0e1xyXG4gICAgY29uc3RydWN0b3IobmFtZSxjb2xvcj0ncmVkJyl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Byb2plY3R9IiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgZGVzZWxlY3RQcm9qZWN0LCBwcm9qZWN0cywgc2VsZWN0UHJvamVjdCwgc2VsZWN0ZWRQcm9qZWN0IH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHsgY29sb3JQaWNrZXJDbGlja0hhbmRsZXIgfSBmcm9tIFwiLi9jb2xvclBpY2tlckRPTVwiO1xyXG5cclxuY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZy5wcm9qZWN0Jyk7XHJcbmxldCBzZWxlY3RlZFByb2plY3RET01FbGVtZW50ID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZvcm0oKXtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcbiAgICBmb3JtLmNsYXNzTmFtZSA9IFwicHJvamVjdFwiXHJcblxyXG4gICAgY29uc3QgY29sb3JQaWNrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbG9yUGlja2VyLmNsYXNzTmFtZSA9IFwiY29sb3JQaWNrZXJcIjtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY29sb3JQaWNrZXIpO1xyXG5cclxuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgbmFtZS50eXBlID0gJ3RleHQnO1xyXG4gICAgbmFtZS5wbGFjZWhvbGRlciA9ICdOYW1lJztcclxuICAgIG5hbWUuYXV0b2ZvY3VzID0gdHJ1ZTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3UHJvamVjdEJ1dHRvbigpIHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ1dHRvbicpO1xyXG4gICAgY29uc3QgbmFtZUlucHV0ID0gcHJvamVjdERpYWxvZy5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgIHByb2plY3REaWFsb2cuc2hvdygpO1xyXG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByb2plY3REaWFsb2dGb3JtKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gcHJvamVjdERpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybUNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0oKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsKCkgPT4ge1xyXG4gICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZSAhPT0gJycpe1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvamVjdERpYWxvZy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0cygpIHtcclxuICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQgPSBudWxsO1xyXG4gICAgZGVzZWxlY3RQcm9qZWN0KCk7XHJcbiAgICBcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZm9yKGxldCBwcm9qZWN0IG9mIHByb2plY3RzLmdldFByb2plY3RzKCkpe1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBzZWxlY3RQcm9qZWN0KHByb2plY3QpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RET01FbGVtZW50ID0gcHJvamVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHByb2plY3RFbGVtZW50LmNsYXNzTmFtZSA9IFwic2VsZWN0ZWRcIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbG9yLmNsYXNzTmFtZSA9IFwiY29sb3JQaWNrZXJcIjtcclxuICAgICAgICBjb2xvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGV2ZW50KSA9PiBjb2xvclBpY2tlckNsaWNrSGFuZGxlcihldmVudCxwcm9qZWN0KSk7XHJcbiAgICAgICAgY29sb3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcHJvamVjdC5jb2xvcjtcclxuICAgICAgICBwcm9qZWN0RWxlbWVudC5hcHBlbmRDaGlsZChjb2xvcik7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgICBwcm9qZWN0RWxlbWVudC5hcHBlbmRDaGlsZChuYW1lKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7bmV3UHJvamVjdEJ1dHRvbixnZXRQcm9qZWN0RGlhbG9nRm9ybSxkaXNwbGF5UHJvamVjdHN9OyIsImNsYXNzIFRhc2tQcm9wZXJ0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2YWx1ZSwgaW5wdXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybVF1ZXJ5KCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBpbnB1dC5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbnB1dC50eXBlID0gdGhpcy5pbnB1dFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuZXcgVGFza1Byb3BlcnR5KCduYW1lJywgJycsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IG5ldyBUYXNrUHJvcGVydHkoJ3RpbWUnLCAnJywgJ2RhdGV0aW1lLWxvY2FsJyk7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXcgVGFza1Byb3BlcnR5KCdkZXNjcmlwdGlvbicsICcnLCAndGV4dCcpO1xyXG4gICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gbmV3IFRhc2tQcm9wZXJ0eSgncHJpb3JpdHknLCAnJywgJ251bWJlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0ZXh0OyB9fSBuZXdOYW1lXHJcbiAgICAgKi9cclxuICAgIHNldCBuYW1lKG5ld05hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUudmFsdWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0aW1lOyB9fSBuZXdUaW1lXHJcbiAgICAgKi9cclxuICAgIHNldCB0aW1lKG5ld1RpbWUpIHtcclxuICAgICAgICB0aGlzLnRpbWUudmFsdWUgPSBuZXdUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0ZXh0OyB9fSBuZXdEZXNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBzZXQgZGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uLnZhbHVlID0gbmV3RGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IG51bWJlcjsgfX0gbmV3UHJpb3JpdHlcclxuICAgICAqL1xyXG4gICAgc2V0IHByaW9yaXR5KG5ld1ByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eS52YWx1ZSA9IG5ld1ByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWUudmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbi52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJpb3JpdHkoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHkudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7VGFza307IiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcclxuXHJcbmNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cudGFzaycpO1xyXG5cclxuZnVuY3Rpb24gbmV3VGFza0J1dHRvbigpIHtcclxuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza0J1dHRvbicpO1xyXG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gdGFza0RpYWxvZy5zaG93TW9kYWwoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEaWFsb2dGb3JtKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybUNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2xvc2UgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHRhc2tEaWFsb2cuY2xvc2UoKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRm9ybSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcbiAgICBmb3JtLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhc2spO1xyXG5cclxuICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsLmZvciA9IHRhc2tbcHJvcGVydHldLm5hbWU7XHJcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgJHt0YXNrW3Byb3BlcnR5XS5uYW1lfTogYDtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRhc2tbcHJvcGVydHldLmZvcm1RdWVyeSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHN1Ym1pdC50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XHJcbiAgICBzdWJtaXQudHlwZSA9IFwic3VibWl0XCI7XHJcbiAgICBzdWJtaXQuY2xhc3NOYW1lID0gXCJjb2xvcmVkQnV0dG9uXCI7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZXhwb3J0IHtuZXdUYXNrQnV0dG9uLGdldFRhc2tEaWFsb2dGb3JtfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=