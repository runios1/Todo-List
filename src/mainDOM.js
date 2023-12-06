import { format, isPast, isToday, isTomorrow, isThisWeek } from "date-fns";
import newTaskSubmitHandler from "./taskFormDOM";
import { deleteTaskFromSelectedProject } from "./selectedProject";
import { sortIcon } from "./icons";

function calculateTime(time) {
  if (isPast(time)) return "Overdue";
  if (isToday(time)) return format(time, "k:mm");
  if (isTomorrow(time)) return `${format(time, "k:mm")}, Tommorow`;
  if (isThisWeek(time)) return format(time, "EEEE");
  return format(time, "MMM do, yyyy");
}

function taskClickHandler(task) {
  let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(task));
  properties = properties.slice(1, properties.length);
  const taskDialog = document.querySelector("dialog.task");

  function changeTaskSubmitHandler() {
    properties.forEach((property) => {
      const input = document.getElementById(task[property].name);
      task[property] = input.value;
    });
  }

  function deleteTaskHandler() {
    deleteTaskFromSelectedProject(task);
    taskDialog.close();
  }

  properties.forEach((property) => {
    const input = document.getElementById(task[property].name);
    input.value = task[property].value;
  });
  document.getElementById("time").value = format(
    task.time.value,
    "yyyy-MM-dd HH:mm",
  );
  console.log(format(task.time.value, "yyyy-MM-dd HH:mm"));
  const form = taskDialog.querySelector("form");
  const submit = taskDialog.querySelector('button[type="submit"]');
  submit.textContent = "Apply";
  const deleteButton = taskDialog.querySelector("#deleteTaskButton");
  deleteButton.style.display = "block";
  form.removeEventListener("submit", newTaskSubmitHandler);
  form.addEventListener("submit", changeTaskSubmitHandler);
  taskDialog.addEventListener("close", () => {
    form.removeEventListener("submit", changeTaskSubmitHandler);
    deleteButton.removeEventListener("click", deleteTaskHandler);
  });
  deleteButton.addEventListener("click", deleteTaskHandler);
  taskDialog.showModal();
}

function displayTasks(taskList) {
  const tasks = document.getElementById("task-list");
  tasks.innerHTML = "";
  taskList.forEach((task) => {
    const taskDiv = document.createElement("button");
    taskDiv.addEventListener("click", () => taskClickHandler(task));
    tasks.appendChild(taskDiv);

    const name = document.createElement("span");
    name.textContent = task.name.value;
    taskDiv.appendChild(name);

    if (!Number.isNaN(task.time.value.valueOf())) {
      const date = document.createElement("span");
      date.textContent = calculateTime(task.time.value);
      taskDiv.appendChild(date);
    }
  });
}

function makeSortSelect(main, project) {
  const sortDiv = document.createElement("div");
  sortDiv.id = "sortDiv";

  const sortButton = document.createElement("button");
  sortButton.innerHTML = sortIcon;
  sortDiv.appendChild(sortButton);

  const sortText = document.createElement("span");
  sortText.textContent = "Sort by:";
  sortDiv.appendChild(sortText);

  const sortBy = document.createElement("select");

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Default";
  defaultOption.value = "default";
  defaultOption.defaultSelected = true;

  const timeOption = document.createElement("option");
  timeOption.textContent = "Time";
  timeOption.value = "time";

  const priorityOption = document.createElement("option");
  priorityOption.textContent = "Priority";
  priorityOption.value = "priority";

  sortBy.addEventListener("change", (event) => {
    displayTasks(project.getTasks(event.target.value));
  });

  sortButton.addEventListener("click", () => {
    // FIXME: make it reversable so 2 clicks gets to the original sort again.
    displayTasks(project.getTasks(sortBy.value).reverse());
  });

  sortBy.append(defaultOption, timeOption, priorityOption);

  sortDiv.appendChild(sortBy);
  main.appendChild(sortDiv);
}

function displayProjectCard(project) {
  const main = document.querySelector("main > div.card");
  main.innerHTML = "";
  document.getElementById("addTaskButton").style.display = "block";

  if (project === null) return;

  const dialog = document.querySelector("dialog.task");
  dialog.addEventListener("close", () => {
    displayTasks(project.getTasks("default"));
    document.querySelector("#sortDiv > select").value = "default";
  });

  const header = document.createElement("div");
  header.id = "card-header";
  header.style.backgroundColor = project.color;
  main.appendChild(header);

  const headerText = document.createElement("h3");
  headerText.textContent = project.name;
  header.appendChild(headerText);

  makeSortSelect(main, project);

  const tasks = document.createElement("div");
  tasks.id = "task-list";
  main.appendChild(tasks);

  displayTasks(project.getTasks("default"));
  document.querySelector("#sortDiv > select").value = "default";
}

export { displayProjectCard, taskClickHandler };
