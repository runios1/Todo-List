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

export {Project}