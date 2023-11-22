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

export {Task};