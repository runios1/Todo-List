
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
    for(const task of project.tasks){
        const taskDiv = document.createElement('div');
        tasks.appendChild(taskDiv);

        const name = document.createElement('span');
        name.textContent = task.name;
        taskDiv.appendChild(name);

        const date = document.createElement('span');
        date.textContent = task.date;
        taskDiv.appendChild(date);
    }
}

export { displayProjectCard, displayTasks }