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
}

export {Project}