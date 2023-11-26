import { format, isPast, isToday, isTomorrow, isThisWeek, parseISO } from "date-fns";
import { newTaskSubmitHandler } from "./taskFormDOM";

function displayProjectCard(project) {
    const main = document.querySelector('main > div.card');

    main.innerHTML = '';

    const header = document.createElement('div');
    header.id = "card-header";
    header.style.backgroundColor = project.color;
    main.appendChild(header);

    const headerText = document.createElement('h3');
    headerText.textContent = project.name;
    header.appendChild(headerText);

    const tasks = document.createElement('div');
    tasks.id = "task-list";
    main.appendChild(tasks);

    displayTasks(project);
}

function displayTasks(project) {
    const tasks = document.getElementById("task-list");
    tasks.innerHTML = '';
    for(let task of project.tasks){
        const taskDiv = document.createElement('div');
        taskDiv.addEventListener('click',() => taskClickHandler(task));
        tasks.appendChild(taskDiv);

        const name = document.createElement('span');
        name.textContent = task.name;
        taskDiv.appendChild(name);

        if(task.time !== ''){
            const date = document.createElement('span');
            date.textContent = calculateTime(task.time);
            taskDiv.appendChild(date);
        }
    }
}

function calculateTime(time) {
    const parsedTime = parseISO(time);
    return isPast(parsedTime) ? "Overdue" :
        isToday(parsedTime) ? format(parsedTime,"k:mm") :
        isTomorrow(parsedTime) ? format(parsedTime,"k:mm")+", Tommorow" :
        isThisWeek(parsedTime) ? getDay(parsedTime) :
        format(parsedTime,"MMM do, yyyy");
}

function taskClickHandler(task) {
    const taskDialog = document.querySelector('dialog.task');
    const properties = Object.keys(task);
    properties.forEach(property => {
        const input = document.getElementById(task[property].name);
        input.value = task[property].value;
    });
    const form = taskDialog.querySelector('form');
    const submit = taskDialog.querySelector('button[type="submit"]');
    submit.textContent = "Apply";
    form.removeEventListener('submit',newTaskSubmitHandler);
    form.addEventListener('submit',() => changeTaskSubmitHandler(task,properties));
    taskDialog.showModal();
}

function changeTaskSubmitHandler(task,properties){
    properties.forEach(property => {
        const input = document.getElementById(task[property].name);
        task[property].value = input.value;
    });
}

export { displayProjectCard, displayTasks,changeTaskSubmitHandler }