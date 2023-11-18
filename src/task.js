class Task{
    constructor(name,time,discription,priority){
        this.name = name.value;
        this.time = time.value;
        this.discription = discription.value;
        this.priority = priority.value;
    }
}

class TaskProperty{
    #inputType;
    constructor(name,value,inputType){
        this.name = name;
        this.value = value;
        this.#inputType = inputType;
    }

    formQuery(){
        const input = document.createElement('input');
        input.type = this.#inputType;
        return input;
    }
}