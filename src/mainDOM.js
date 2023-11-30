import {
  format,
  isPast,
  isToday,
  isTomorrow,
  isThisWeek,
  parseISO,
  getDay,
} from "date-fns";
import newTaskSubmitHandler from "./taskFormDOM";

function calculateTime(time) {
  const parsedTime = parseISO(time);
  if (isPast(parsedTime)) return "Overdue";
  if (isToday(parsedTime)) return format(parsedTime, "k:mm");
  if (isTomorrow(parsedTime)) return `${format(parsedTime, "k:mm")}, Tommorow`;
  if (isThisWeek(parsedTime)) return getDay(parsedTime);
  return format(parsedTime, "MMM do, yyyy");
}

function taskClickHandler(task) {
  let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(task));
  properties = properties.slice(1, properties.length);

  function changeTaskSubmitHandler() {
    properties.forEach((property) => {
      const input = document.getElementById(task[property].name);
      task[property] = input.value;
    });
  }

  const taskDialog = document.querySelector("dialog.task");
  properties.forEach((property) => {
    const input = document.getElementById(task[property].name);
    input.value = task[property].value;
  });
  const form = taskDialog.querySelector("form");
  const submit = taskDialog.querySelector('button[type="submit"]');
  submit.textContent = "Apply";
  form.removeEventListener("submit", newTaskSubmitHandler);
  form.addEventListener("submit", changeTaskSubmitHandler);
  taskDialog.addEventListener("close", () =>
    form.removeEventListener("submit", changeTaskSubmitHandler),
  );
  taskDialog.showModal();
}

function displayTasks(project) {
  const tasks = document.getElementById("task-list");
  tasks.innerHTML = "";
  project.tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.addEventListener("click", () => taskClickHandler(task));
    tasks.appendChild(taskDiv);

    const name = document.createElement("span");
    name.textContent = task.name.value;
    taskDiv.appendChild(name);

    if (task.time.value !== "") {
      const date = document.createElement("span");
      date.textContent = calculateTime(task.time.value);
      taskDiv.appendChild(date);
    }
  });
}

function displayProjectCard(project) {
  const dialog = document.querySelector("dialog.task");
  dialog.addEventListener("close", () => displayTasks(project));

  document.getElementById("addTaskButton").style.display = "block";
  const main = document.querySelector("main > div.card");

  main.innerHTML = "";

  const header = document.createElement("div");
  header.id = "card-header";
  header.style.backgroundColor = project.color;
  main.appendChild(header);

  const headerText = document.createElement("h3");
  headerText.textContent = project.name;
  header.appendChild(headerText);

  const tasks = document.createElement("div");
  tasks.id = "task-list";
  main.appendChild(tasks);

  displayTasks(project);
}

export { displayProjectCard, displayTasks, taskClickHandler };
