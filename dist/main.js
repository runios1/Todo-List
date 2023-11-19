/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMManipulation.js":
/*!********************************!*\
  !*** ./src/DOMManipulation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayProjects: () => (/* binding */ displayProjects),
/* harmony export */   getProjectDialogForm: () => (/* binding */ getProjectDialogForm),
/* harmony export */   getTaskDialogForm: () => (/* binding */ getTaskDialogForm),
/* harmony export */   newProjectButton: () => (/* binding */ newProjectButton),
/* harmony export */   newTaskButton: () => (/* binding */ newTaskButton)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");




const taskDialog = document.querySelector('dialog.task');
const projectDialog = document.querySelector('dialog.project');

function newTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click',() => taskDialog.showModal());
}

function getTaskDialogForm() {
    const container = taskDialog.querySelector('.formContainer');
    const close = taskDialog.querySelector('button');
    close.addEventListener('click',() => taskDialog.close());
    container.appendChild(_task__WEBPACK_IMPORTED_MODULE_0__.Task.createForm());
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
    const form = _project__WEBPACK_IMPORTED_MODULE_1__.Project.createForm();
    container.appendChild(form);
    const nameInput = form.querySelector('input[type="text"]');
    nameInput.addEventListener('focusout',() => {
        if(nameInput.value !== ''){
            const project = new _project__WEBPACK_IMPORTED_MODULE_1__.Project(nameInput.value);
            _index__WEBPACK_IMPORTED_MODULE_2__.projects.addProject(project);
        }
        // projectDialog.close();
    });
}

function displayProjects() {
    const container = document.getElementById('projects');
    container.innerHTML = '';
    for(let project of _index__WEBPACK_IMPORTED_MODULE_2__.projects.getProjects()){
        const projectElement = document.createElement('div');
        
        const color = document.createElement('div');
        color.className = "colorPicker";
        projectElement.appendChild(color);

        const name = document.createElement('span');
        name.textContent = project.name;
        projectElement.appendChild(name);

        container.appendChild(projectElement);
    }
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projects: () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMManipulation.js */ "./src/DOMManipulation.js");


const projects = (function() {
    const projectsArray = [];
    const addProject = (project) => {
        projectsArray.push(project);
        (0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();
    };
    const getProjects = () => projectsArray;

    return {addProject,getProjects};
})();

(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.newTaskButton)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.getTaskDialogForm)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.getProjectDialogForm)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.newProjectButton)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();



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

    static createForm(){
        const form = document.createElement('form');
        form.method = "dialog";

        const colorPicker = document.createElement('select');
        form.appendChild(colorPicker);

        const redOption = document.createElement('option');
        redOption.value = 'red';
        redOption.textContent = 'Red';
        redOption.selected = 'selected';
        colorPicker.appendChild(redOption);

        const greenOption = document.createElement('option');
        greenOption.value = 'green';
        greenOption.textContent = 'Green';
        colorPicker.appendChild(greenOption);


        const name = document.createElement('input');
        name.type = 'text';
        name.placeholder = 'Name';
        name.autofocus = true;
        form.appendChild(name);

        
        return form;
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
        this._time = new TaskProperty('time', '', 'time');
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

    static createForm() {
        const form = document.createElement('form');
        form.method = "dialog";

        const task = new Task();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDTTtBQUNEO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVDQUFJO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNkNBQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNkNBQU87QUFDdkMsWUFBWSw0Q0FBUTtBQUNwQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNENBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUQrSDtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBZTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0Esa0VBQWE7QUFDYixzRUFBaUI7QUFDakIseUVBQW9CO0FBQ3BCLHFFQUFnQjtBQUNoQixvRUFBZTtBQUNmOzs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG9CQUFvQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ET01NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5jb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nLnRhc2snKTtcclxuY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZy5wcm9qZWN0Jyk7XHJcblxyXG5mdW5jdGlvbiBuZXdUYXNrQnV0dG9uKCkge1xyXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrQnV0dG9uJyk7XHJcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB0YXNrRGlhbG9nLnNob3dNb2RhbCgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGFza0RpYWxvZ0Zvcm0oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjbG9zZSA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gdGFza0RpYWxvZy5jbG9zZSgpKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChUYXNrLmNyZWF0ZUZvcm0oKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld1Byb2plY3RCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFByb2plY3RCdXR0b24nKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICBwcm9qZWN0RGlhbG9nLnNob3coKTtcclxuICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGlhbG9nRm9ybSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHByb2plY3REaWFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1Db250YWluZXInKTtcclxuICAgIGNvbnN0IGZvcm0gPSBQcm9qZWN0LmNyZWF0ZUZvcm0oKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsKCkgPT4ge1xyXG4gICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZSAhPT0gJycpe1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvamVjdERpYWxvZy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cycpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZm9yKGxldCBwcm9qZWN0IG9mIHByb2plY3RzLmdldFByb2plY3RzKCkpe1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb2xvci5jbGFzc05hbWUgPSBcImNvbG9yUGlja2VyXCI7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29sb3IpO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge25ld1Rhc2tCdXR0b24sZ2V0VGFza0RpYWxvZ0Zvcm0sbmV3UHJvamVjdEJ1dHRvbixnZXRQcm9qZWN0RGlhbG9nRm9ybSxkaXNwbGF5UHJvamVjdHN9OyIsImltcG9ydCB7IGdldFByb2plY3REaWFsb2dGb3JtLCBnZXRUYXNrRGlhbG9nRm9ybSwgbmV3UHJvamVjdEJ1dHRvbiwgbmV3VGFza0J1dHRvbiwgZGlzcGxheVByb2plY3RzfSBmcm9tIFwiLi9ET01NYW5pcHVsYXRpb24uanNcIlxyXG5cclxuY29uc3QgcHJvamVjdHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gW107XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcclxuICAgICAgICBwcm9qZWN0c0FycmF5LnB1c2gocHJvamVjdCk7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3RzKCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0c0FycmF5O1xyXG5cclxuICAgIHJldHVybiB7YWRkUHJvamVjdCxnZXRQcm9qZWN0c307XHJcbn0pKCk7XHJcblxyXG5uZXdUYXNrQnV0dG9uKCk7XHJcbmdldFRhc2tEaWFsb2dGb3JtKCk7XHJcbmdldFByb2plY3REaWFsb2dGb3JtKCk7XHJcbm5ld1Byb2plY3RCdXR0b24oKTtcclxuZGlzcGxheVByb2plY3RzKCk7XHJcblxyXG5leHBvcnQgeyBwcm9qZWN0cyB9IiwiY2xhc3MgUHJvamVjdHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsY29sb3I9J3JlZCcpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUYXNrKHRhc2spe1xyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlRm9ybSgpe1xyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgZm9ybS5tZXRob2QgPSBcImRpYWxvZ1wiO1xyXG5cclxuICAgICAgICBjb25zdCBjb2xvclBpY2tlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoY29sb3JQaWNrZXIpO1xyXG5cclxuICAgICAgICBjb25zdCByZWRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICByZWRPcHRpb24udmFsdWUgPSAncmVkJztcclxuICAgICAgICByZWRPcHRpb24udGV4dENvbnRlbnQgPSAnUmVkJztcclxuICAgICAgICByZWRPcHRpb24uc2VsZWN0ZWQgPSAnc2VsZWN0ZWQnO1xyXG4gICAgICAgIGNvbG9yUGlja2VyLmFwcGVuZENoaWxkKHJlZE9wdGlvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGdyZWVuT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgZ3JlZW5PcHRpb24udmFsdWUgPSAnZ3JlZW4nO1xyXG4gICAgICAgIGdyZWVuT3B0aW9uLnRleHRDb250ZW50ID0gJ0dyZWVuJztcclxuICAgICAgICBjb2xvclBpY2tlci5hcHBlbmRDaGlsZChncmVlbk9wdGlvbik7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBuYW1lLnR5cGUgPSAndGV4dCc7XHJcbiAgICAgICAgbmFtZS5wbGFjZWhvbGRlciA9ICdOYW1lJztcclxuICAgICAgICBuYW1lLmF1dG9mb2N1cyA9IHRydWU7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7UHJvamVjdH0iLCJjbGFzcyBUYXNrUHJvcGVydHkge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgdmFsdWUsIGlucHV0VHlwZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRUeXBlID0gaW5wdXRUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1RdWVyeSgpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaW5wdXQubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICBpbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9IHRoaXMuaW5wdXRUeXBlO1xyXG4gICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmV3IFRhc2tQcm9wZXJ0eSgnbmFtZScsICcnLCAndGV4dCcpO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSBuZXcgVGFza1Byb3BlcnR5KCd0aW1lJywgJycsICd0aW1lJyk7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBuZXcgVGFza1Byb3BlcnR5KCdkZXNjcmlwdGlvbicsICcnLCAndGV4dCcpO1xyXG4gICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gbmV3IFRhc2tQcm9wZXJ0eSgncHJpb3JpdHknLCAnJywgJ251bWJlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0ZXh0OyB9fSBuZXdOYW1lXHJcbiAgICAgKi9cclxuICAgIHNldCBuYW1lKG5ld05hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUudmFsdWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0aW1lOyB9fSBuZXdUaW1lXHJcbiAgICAgKi9cclxuICAgIHNldCB0aW1lKG5ld1RpbWUpIHtcclxuICAgICAgICB0aGlzLnRpbWUudmFsdWUgPSBuZXdUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHt7IHZhbHVlOiB0ZXh0OyB9fSBuZXdEZXNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBzZXQgZGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uLnZhbHVlID0gbmV3RGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IG51bWJlcjsgfX0gbmV3UHJpb3JpdHlcclxuICAgICAqL1xyXG4gICAgc2V0IHByaW9yaXR5KG5ld1ByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eS52YWx1ZSA9IG5ld1ByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWUudmFsdWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbi52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJpb3JpdHkoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHkudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgICAgICBmb3JtLm1ldGhvZCA9IFwiZGlhbG9nXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0YXNrKTtcclxuXHJcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgICAgICBsYWJlbC5mb3IgPSB0YXNrW3Byb3BlcnR5XS5uYW1lO1xyXG4gICAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGAke3Rhc2tbcHJvcGVydHldLm5hbWV9OiBgO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0YXNrW3Byb3BlcnR5XS5mb3JtUXVlcnkoKTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgc3VibWl0LnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcclxuICAgICAgICBzdWJtaXQudHlwZSA9IHN1Ym1pdDtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7VGFza307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==