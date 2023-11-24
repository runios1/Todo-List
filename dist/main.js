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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhDQUFlLEdBQUcsOENBQWU7QUFDekMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ25HQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb2xvclBpY2tlckRPTS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tGb3JtRE9NLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZnVuY3Rpb24gY29sb3JCdXR0b24oY29sb3IsY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIscHJvamVjdCl7XHJcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBkb21FbGVtZW50LmNsYXNzTmFtZSA9IFwiY29sb3JQaWNrZXJcIjtcclxuICAgIGRvbUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgICBkb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XHJcbiAgICAgICAgY29sb3JDb250YWluZXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY29sb3JQaWNrZXIsY29sb3JDb250YWluZXIpO1xyXG4gICAgICAgIGNvbG9yQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbG9yUGlja2VyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHByb2plY3QuY29sb3IgPSBjb2xvcjtcclxuICAgIH0pXHJcbiAgICBjb2xvckNvbnRhaW5lci5hcHBlbmRDaGlsZChkb21FbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29sb3JQaWNrZXJDbGlja0hhbmRsZXIoZXZlbnQscHJvamVjdCkge1xyXG4gICAgY29uc3QgY29sb3JQaWNrZXIgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgY29uc3QgY29sb3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbG9yQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY29sb3JDb250YWluZXJcIjtcclxuICAgIGNvbG9yUGlja2VyLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNvbG9yQ29udGFpbmVyLGNvbG9yUGlja2VyKTtcclxuICAgIGNvbG9yUGlja2VyLnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbG9yQnV0dG9uKCdyZWQnLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG4gICAgY29sb3JCdXR0b24oJ2dyZWVuJyxjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KTtcclxuICAgIGNvbG9yQnV0dG9uKCdibHVlJyxjb2xvclBpY2tlcixjb2xvckNvbnRhaW5lcixwcm9qZWN0KTtcclxuICAgIGNvbG9yQnV0dG9uKCd5ZWxsb3cnLGNvbG9yUGlja2VyLGNvbG9yQ29udGFpbmVyLHByb2plY3QpO1xyXG59XHJcblxyXG5leHBvcnQge2NvbG9yUGlja2VyQ2xpY2tIYW5kbGVyfVxyXG4iLCJpbXBvcnQgeyBwcm9qZWN0U3RhcnR1cCwgZGlzcGxheVByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdERPTS5qc1wiXHJcbmltcG9ydCB7IHRhc2tGb3JtU3RhcnR1cCB9IGZyb20gXCIuL3Rhc2tGb3JtRE9NLmpzXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIHByb2plY3RzQXJyYXkucHVzaChwcm9qZWN0KTtcclxuICAgICAgICBkaXNwbGF5UHJvamVjdHMoKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IHByb2plY3RzQXJyYXk7XHJcblxyXG4gICAgcmV0dXJuIHthZGRQcm9qZWN0LGdldFByb2plY3RzfTtcclxufSkoKTtcclxuXHJcbmxldCBzZWxlY3RlZFByb2plY3QgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gc2VsZWN0UHJvamVjdChwcm9qZWN0KSB7XHJcbiAgICBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgY29uc29sZS5sb2coYFByb2plY3QgJHtwcm9qZWN0Lm5hbWV9IGlzIHNlbGVjdGVkIWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXNlbGVjdFByb2plY3QoKXtcclxuICAgIHNlbGVjdGVkUHJvamVjdCA9IG51bGw7XHJcbiAgICBjb25zb2xlLmxvZyhgc2VsZWN0ZWRQcm9qZWN0IG5vdyBudWxsIWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZyl7XHJcbiAgICByZXR1cm4gc3RyaW5nWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbn1cclxuXHJcbnRhc2tGb3JtU3RhcnR1cCgpO1xyXG5wcm9qZWN0U3RhcnR1cCgpO1xyXG5cclxuZXhwb3J0IHsgcHJvamVjdHMsIHNlbGVjdFByb2plY3QsIGRlc2VsZWN0UHJvamVjdCwgY2FwaXRhbGl6ZSwgc2VsZWN0ZWRQcm9qZWN0IH0iLCJjbGFzcyBQcm9qZWN0e1xyXG4gICAgY29uc3RydWN0b3IobmFtZSxjb2xvcj0ncmVkJyl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1Byb2plY3R9IiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgZGVzZWxlY3RQcm9qZWN0LCBwcm9qZWN0cywgc2VsZWN0UHJvamVjdCwgc2VsZWN0ZWRQcm9qZWN0IH0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHsgY29sb3JQaWNrZXJDbGlja0hhbmRsZXIgfSBmcm9tIFwiLi9jb2xvclBpY2tlckRPTVwiO1xyXG5cclxuY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZy5wcm9qZWN0Jyk7XHJcbmxldCBzZWxlY3RlZFByb2plY3RET01FbGVtZW50ID0gbnVsbDtcclxuXHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0U3RhcnR1cCgpe1xyXG4gICAgZ2V0UHJvamVjdERpYWxvZ0Zvcm0oKTtcclxuICAgIG5ld1Byb2plY3RCdXR0b24oKTtcclxuICAgIGRpc3BsYXlQcm9qZWN0cygpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpe1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIGZvcm0ubWV0aG9kID0gXCJkaWFsb2dcIjtcclxuICAgIGZvcm0uY2xhc3NOYW1lID0gXCJwcm9qZWN0XCJcclxuXHJcbiAgICBjb25zdCBjb2xvclBpY2tlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29sb3JQaWNrZXIuY2xhc3NOYW1lID0gXCJjb2xvclBpY2tlclwiO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChjb2xvclBpY2tlcik7XHJcblxyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBuYW1lLnR5cGUgPSAndGV4dCc7XHJcbiAgICBuYW1lLnBsYWNlaG9sZGVyID0gJ05hbWUnO1xyXG4gICAgbmFtZS5hdXRvZm9jdXMgPSB0cnVlO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lKTtcclxuXHJcbiAgICBcclxuICAgIHJldHVybiBmb3JtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXdQcm9qZWN0QnV0dG9uKCkge1xyXG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRQcm9qZWN0QnV0dG9uJyk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBwcm9qZWN0RGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XHJcbiAgICAgICAgcHJvamVjdERpYWxvZy5zaG93KCk7XHJcbiAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJvamVjdERpYWxvZ0Zvcm0oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBwcm9qZWN0RGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybSgpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xyXG4gICAgY29uc3QgbmFtZUlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgbmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywoKSA9PiB7XHJcbiAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlICE9PSAnJyl7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVByb2plY3RzKCkge1xyXG4gICAgc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCA9IG51bGw7XHJcbiAgICBkZXNlbGVjdFByb2plY3QoKTtcclxuICAgIFxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzJyk7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBmb3IobGV0IHByb2plY3Qgb2YgcHJvamVjdHMuZ2V0UHJvamVjdHMoKSl7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRQcm9qZWN0RE9NRWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb2plY3RET01FbGVtZW50LmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHNlbGVjdFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdERPTUVsZW1lbnQgPSBwcm9qZWN0RWxlbWVudDtcclxuICAgICAgICAgICAgcHJvamVjdEVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29sb3IuY2xhc3NOYW1lID0gXCJjb2xvclBpY2tlclwiO1xyXG4gICAgICAgIGNvbG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpID0+IGNvbG9yUGlja2VyQ2xpY2tIYW5kbGVyKGV2ZW50LHByb2plY3QpKTtcclxuICAgICAgICBjb2xvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwcm9qZWN0LmNvbG9yO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKGNvbG9yKTtcclxuXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKG5hbWUpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgcHJvamVjdFN0YXJ0dXAsIGRpc3BsYXlQcm9qZWN0cyB9OyIsImNsYXNzIFRhc2tQcm9wZXJ0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2YWx1ZSwgaW5wdXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybVF1ZXJ5KCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBpbnB1dC5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LmlkID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbnB1dC50eXBlID0gdGhpcy5pbnB1dFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuZXcgVGFza1Byb3BlcnR5KCduYW1lJywgJycsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IG5ldyBUYXNrUHJvcGVydHkoJ3RpbWUnLCAnJywgJ2RhdGV0aW1lLWxvY2FsJyk7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXcgVGFza1Byb3BlcnR5KCdkZXNjcmlwdGlvbicsICcnLCAnTi9BJyk7XHJcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBuZXcgVGFza1Byb3BlcnR5KCdwcmlvcml0eScsICcnLCAnbnVtYmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld05hbWVcclxuICAgICAqL1xyXG4gICAgc2V0IG5hbWUobmV3TmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZS52YWx1ZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRpbWU7IH19IG5ld1RpbWVcclxuICAgICAqL1xyXG4gICAgc2V0IHRpbWUobmV3VGltZSkge1xyXG4gICAgICAgIHRoaXMudGltZS52YWx1ZSA9IG5ld1RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld0Rlc2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24udmFsdWUgPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogbnVtYmVyOyB9fSBuZXdQcmlvcml0eVxyXG4gICAgICovXHJcbiAgICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5LnZhbHVlID0gbmV3UHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBuYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWUudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZS52YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcmlvcml0eSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eS52YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtUYXNrfTsiLCJpbXBvcnQgeyBjYXBpdGFsaXplLCBzZWxlY3RlZFByb2plY3QgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5cclxuY29uc3QgdGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZy50YXNrJyk7XHJcblxyXG5mdW5jdGlvbiB0YXNrRm9ybVN0YXJ0dXAoKXtcclxuICAgIG5ld1Rhc2tCdXR0b24oKTtcclxuICAgIGdldFRhc2tEaWFsb2dGb3JtKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Rhc2tCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tCdXR0b24nKTtcclxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tEaWFsb2dGb3JtKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZm9ybUNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2xvc2UgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHRhc2tEaWFsb2cuY2xvc2UoKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRm9ybSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcbiAgICBmb3JtLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhc2spO1xyXG5cclxuICAgIGNvbnN0IGZvcm1ET01FbGVtZW50cyA9IFtdO1xyXG5cclxuICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgaWYodGFza1twcm9wZXJ0eV0uaW5wdXRUeXBlID09PSBcIk4vQVwiKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsLmZvciA9IHRhc2tbcHJvcGVydHldLm5hbWU7XHJcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgJHtjYXBpdGFsaXplKHRhc2tbcHJvcGVydHldLm5hbWUpfTogYDtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRhc2tbcHJvcGVydHldLmZvcm1RdWVyeSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgICAgIGZvcm1ET01FbGVtZW50cy5wdXNoKGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgZGVzY3JpcHRpb25MYWJlbC5mb3IgPSAnZGVzY3JpcHRpb24nO1xyXG4gICAgZGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9ICdEZXNjcmlwdGlvbic7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uTGFiZWwpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgZGVzY3JpcHRpb24ubmFtZSA9ICdkZXNjcmlwdGlvbic7XHJcbiAgICBkZXNjcmlwdGlvbi5yb3dzID0gODtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgZm9ybURPTUVsZW1lbnRzLnB1c2goZGVzY3JpcHRpb24pXHJcblxyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG4gICAgcHJpb3JpdHkubWF4ID0gNTtcclxuICAgIHByaW9yaXR5Lm1pbiA9IDE7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHN1Ym1pdC50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XHJcbiAgICBzdWJtaXQudHlwZSA9IFwic3VibWl0XCI7XHJcbiAgICBzdWJtaXQuY2xhc3NOYW1lID0gXCJjb2xvcmVkQnV0dG9uXCI7XHJcbiAgICBzdWJtaXQuYXV0b2ZvY3VzID0gdHJ1ZTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgIGZvcm1ET01FbGVtZW50cy5wdXNoKHN1Ym1pdCk7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCgpID0+IFxyXG4gICAge1xyXG4gICAgICAgIHNlbGVjdGVkUHJvamVjdCA/IHNlbGVjdGVkUHJvamVjdC5hZGRUYXNrKHRhc2spIDogbm9TZWxlY3RlZFByb2plY3RIYW5kbGVyKClcclxuICAgIH0pO1xyXG5cclxuICAgIHRhc2tEaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBkaWFsb2dCYWNrZHJvcENsaWNrSGFuZGxlcihldmVudCxmb3JtRE9NRWxlbWVudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpYWxvZ0JhY2tkcm9wQ2xpY2tIYW5kbGVyKGV2ZW50LCBmb3JtRE9NRWxlbWVudHMpeyAvL0Nsb3NlIGRpYWxvZyB3aGVuIGNsaWNrIGlzIG91dHNpZGUgZGlhbG9nIGJveFxyXG4gICAgY29uc3QgcmVjdCA9IHRhc2tEaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBpc0luRGlhbG9nID0gKHJlY3QudG9wIDw9IGV2ZW50LmNsaWVudFkgJiYgZXZlbnQuY2xpZW50WSA8PSByZWN0LnRvcCArIHJlY3QuaGVpZ2h0ICYmXHJcbiAgICAgICAgcmVjdC5sZWZ0IDw9IGV2ZW50LmNsaWVudFggJiYgZXZlbnQuY2xpZW50WCA8PSByZWN0LmxlZnQgKyByZWN0LndpZHRoKTtcclxuICAgIFxyXG4gICAgbGV0IGlzSW50ZXJhY3RpbmdXaXRoRm9ybSA9IGZhbHNlO1xyXG4gICAgZm9yKGNvbnN0IGVsZW1lbnQgb2YgZm9ybURPTUVsZW1lbnRzKXtcclxuICAgICAgICBpZihpc0ludGVyYWN0aW5nV2l0aEZvcm0pIGJyZWFrO1xyXG4gICAgICAgIGlzSW50ZXJhY3RpbmdXaXRoRm9ybSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0luRGlhbG9nICYmICFpc0ludGVyYWN0aW5nV2l0aEZvcm0pIHtcclxuICAgICAgICB0YXNrRGlhbG9nLmNsb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vU2VsZWN0ZWRQcm9qZWN0SGFuZGxlcigpe1xyXG4gICAgYWxlcnQoXCJObyBzZWxlY3RlZCBwcm9qZWN0XCIpO1xyXG59XHJcblxyXG5leHBvcnQgeyB0YXNrRm9ybVN0YXJ0dXAgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=