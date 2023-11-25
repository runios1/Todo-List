function createTaskInfoDialog(task) {
    const dialog = task.dialog.value;
    const main = document.querySelector('main');
    main.appendChild(dialog);

    const properties = Object.keys(task);

    properties.forEach(property => {
        const span = document.createElement('span');
        span.id = task[property].name;
        span.textContent = task[property].value;
        dialog.appendChild(span);
    });
}

export {createTaskInfoDialog}