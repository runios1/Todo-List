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
/* harmony export */   getProjectDialogForm: () => (/* binding */ getProjectDialogForm),
/* harmony export */   getTaskDialogForm: () => (/* binding */ getTaskDialogForm),
/* harmony export */   newProjectButton: () => (/* binding */ newProjectButton),
/* harmony export */   newTaskButton: () => (/* binding */ newTaskButton)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/index.js");




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
    addProjectButton.addEventListener('click',() => {
        projectDialog.showModal();
    });
}

function getProjectDialogForm() {
    const container = projectDialog.querySelector('.formContainer');
    const form = _project__WEBPACK_IMPORTED_MODULE_1__.Project.createForm();
    container.appendChild(form);
    const nameInput = form.querySelector('input[type="text"]');
    nameInput.addEventListener('focusout',() => {
        const project = new _project__WEBPACK_IMPORTED_MODULE_1__.Project(nameInput.value);
        (0,___WEBPACK_IMPORTED_MODULE_2__.addProject)(project);
        projectDialog.close();
    });
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProject: () => (/* binding */ addProject)
/* harmony export */ });
/* harmony import */ var _DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMManipulation.js */ "./src/DOMManipulation.js");


const projects = [];

(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.newTaskButton)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.getTaskDialogForm)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.newProjectButton)();
(0,_DOMManipulation_js__WEBPACK_IMPORTED_MODULE_0__.getProjectDialogForm)();

function addProject(project) {
    projects.push(project);
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


        
        const submit = document.createElement('button');
        submit.textContent = "Submit";
        submit.type = submit;
        form.appendChild(submit);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNNO0FBQ0w7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZDQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw2Q0FBTztBQUNuQyxRQUFRLDZDQUFVO0FBQ2xCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDK0c7QUFDL0c7QUFDQTtBQUNBO0FBQ0Esa0VBQWE7QUFDYixzRUFBaUI7QUFDakIscUVBQWdCO0FBQ2hCLHlFQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG9CQUFvQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ET01NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBhZGRQcm9qZWN0IH0gZnJvbSBcIi5cIjtcclxuXHJcbmNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cudGFzaycpO1xyXG5jb25zdCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nLnByb2plY3QnKTtcclxuXHJcbmZ1bmN0aW9uIG5ld1Rhc2tCdXR0b24oKSB7XHJcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRhc2tCdXR0b24nKTtcclxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHRhc2tEaWFsb2cuc2hvd01vZGFsKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrRGlhbG9nRm9ybSgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvcignLmZvcm1Db250YWluZXInKTtcclxuICAgIGNvbnN0IGNsb3NlID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB0YXNrRGlhbG9nLmNsb3NlKCkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFRhc2suY3JlYXRlRm9ybSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3UHJvamVjdEJ1dHRvbigpIHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ1dHRvbicpO1xyXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgIHByb2plY3REaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJvamVjdERpYWxvZ0Zvcm0oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBwcm9qZWN0RGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtQ29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBmb3JtID0gUHJvamVjdC5jcmVhdGVGb3JtKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICBjb25zdCBuYW1lSW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICBuYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZUlucHV0LnZhbHVlKTtcclxuICAgICAgICBhZGRQcm9qZWN0KHByb2plY3QpO1xyXG4gICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtuZXdUYXNrQnV0dG9uLGdldFRhc2tEaWFsb2dGb3JtLG5ld1Byb2plY3RCdXR0b24sZ2V0UHJvamVjdERpYWxvZ0Zvcm19OyIsImltcG9ydCB7IGdldFByb2plY3REaWFsb2dGb3JtLCBnZXRUYXNrRGlhbG9nRm9ybSwgbmV3UHJvamVjdEJ1dHRvbiwgbmV3VGFza0J1dHRvbiB9IGZyb20gXCIuL0RPTU1hbmlwdWxhdGlvbi5qc1wiXHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IFtdO1xyXG5cclxubmV3VGFza0J1dHRvbigpO1xyXG5nZXRUYXNrRGlhbG9nRm9ybSgpO1xyXG5uZXdQcm9qZWN0QnV0dG9uKCk7XHJcbmdldFByb2plY3REaWFsb2dGb3JtKCk7XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFkZFByb2plY3QgfSIsImNsYXNzIFByb2plY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLGNvbG9yPSdyZWQnKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZUZvcm0oKXtcclxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICAgIGZvcm0ubWV0aG9kID0gXCJkaWFsb2dcIjtcclxuXHJcbiAgICAgICAgY29uc3QgY29sb3JQaWNrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGNvbG9yUGlja2VyKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVkT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgcmVkT3B0aW9uLnZhbHVlID0gJ3JlZCc7XHJcbiAgICAgICAgcmVkT3B0aW9uLnRleHRDb250ZW50ID0gJ1JlZCc7XHJcbiAgICAgICAgcmVkT3B0aW9uLnNlbGVjdGVkID0gJ3NlbGVjdGVkJztcclxuICAgICAgICBjb2xvclBpY2tlci5hcHBlbmRDaGlsZChyZWRPcHRpb24pO1xyXG5cclxuICAgICAgICBjb25zdCBncmVlbk9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgIGdyZWVuT3B0aW9uLnZhbHVlID0gJ2dyZWVuJztcclxuICAgICAgICBncmVlbk9wdGlvbi50ZXh0Q29udGVudCA9ICdHcmVlbic7XHJcbiAgICAgICAgY29sb3JQaWNrZXIuYXBwZW5kQ2hpbGQoZ3JlZW5PcHRpb24pO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgbmFtZS50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIG5hbWUucGxhY2Vob2xkZXIgPSAnTmFtZSc7XHJcbiAgICAgICAgbmFtZS5hdXRvZm9jdXMgPSB0cnVlO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG5cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBzdWJtaXQudGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xyXG4gICAgICAgIHN1Ym1pdC50eXBlID0gc3VibWl0O1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtQcm9qZWN0fSIsImNsYXNzIFRhc2tQcm9wZXJ0eSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2YWx1ZSwgaW5wdXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybVF1ZXJ5KCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBpbnB1dC5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbnB1dC50eXBlID0gdGhpcy5pbnB1dFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuZXcgVGFza1Byb3BlcnR5KCduYW1lJywgJycsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IG5ldyBUYXNrUHJvcGVydHkoJ3RpbWUnLCAnJywgJ3RpbWUnKTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IG5ldyBUYXNrUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgJycsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBuZXcgVGFza1Byb3BlcnR5KCdwcmlvcml0eScsICcnLCAnbnVtYmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld05hbWVcclxuICAgICAqL1xyXG4gICAgc2V0IG5hbWUobmV3TmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZS52YWx1ZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRpbWU7IH19IG5ld1RpbWVcclxuICAgICAqL1xyXG4gICAgc2V0IHRpbWUobmV3VGltZSkge1xyXG4gICAgICAgIHRoaXMudGltZS52YWx1ZSA9IG5ld1RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3sgdmFsdWU6IHRleHQ7IH19IG5ld0Rlc2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24udmFsdWUgPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7eyB2YWx1ZTogbnVtYmVyOyB9fSBuZXdQcmlvcml0eVxyXG4gICAgICovXHJcbiAgICBzZXQgcHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5LnZhbHVlID0gbmV3UHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldCBuYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWUudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZS52YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcmlvcml0eSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICAgIGZvcm0ubWV0aG9kID0gXCJkaWFsb2dcIjtcclxuXHJcbiAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhc2spO1xyXG5cclxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgIGxhYmVsLmZvciA9IHRhc2tbcHJvcGVydHldLm5hbWU7XHJcbiAgICAgICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza1twcm9wZXJ0eV0ubmFtZX06IGA7XHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRhc2tbcHJvcGVydHldLmZvcm1RdWVyeSgpO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBzdWJtaXQudGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xyXG4gICAgICAgIHN1Ym1pdC50eXBlID0gc3VibWl0O1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtUYXNrfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9