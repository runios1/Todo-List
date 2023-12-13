import { format, isPast, isToday, isTomorrow, isThisWeek } from "date-fns";
import newTaskSubmitHandler from "./taskFormDOM";
import { sortIcon } from "./icons";
import { projects } from "./project";
import { selectedProject } from "./selectedProject";

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
    selectedProject.updateTaskStorage();
  }

  function deleteTaskHandler() {
    task.project.value.deleteTask(task);
    taskDialog.close();
  }

  properties.forEach((property) => {
    const input = document.getElementById(task[property].name);
    input.value = task[property].value;
  });
  if (!Number.isNaN(task.time.value.valueOf())) {
    document.getElementById("time").value = format(
      task.time.value,
      "yyyy-MM-dd HH:mm",
    );
  }
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
      // If there is a date
      const date = document.createElement("span");
      date.textContent = calculateTime(task.time.value);
      taskDiv.appendChild(date);
    }
  });
}

function makeSortSelect(main, project) {
  let reversed = false;

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
    if (reversed) {
      displayTasks(project.getSortedTasks());
    } else {
      displayTasks(project.getSortedTasks().reverse());
    }
    reversed = !reversed;
  });

  sortBy.append(defaultOption, timeOption, priorityOption);

  sortDiv.appendChild(sortBy);
  main.insertBefore(sortDiv, document.getElementById("task-list"));
}

function displayCard(color, title, taskList) {
  const main = document.querySelector("main > div.card");
  const header = document.createElement("div");
  header.id = "card-header";
  header.style.backgroundColor = color;
  main.appendChild(header);

  const headerText = document.createElement("h3");
  headerText.textContent = title;
  header.appendChild(headerText);

  const tasks = document.createElement("div");
  tasks.id = "task-list";
  main.appendChild(tasks);

  displayTasks(taskList);
}

function displayProjectCard(project) {
  const main = document.querySelector("main > div.card");
  main.innerHTML = "";
  document.getElementById("addTaskButton").style.display = "block";

  if (project === null) return;

  const dialog = document.querySelector("dialog.task");
  dialog.addEventListener("close", () => {
    displayTasks(project.getSortedTasks());
  });

  displayCard(project.color, project.name, project.getTasks("default"));

  makeSortSelect(main, project);
}

function displayTodayCard() {
  // BUG: Edit task in today results in error
  const main = document.querySelector("main > div.card");
  main.innerHTML = "";

  const taskList = [];
  projects.getProjects().forEach((project) => {
    project.getTasks("time").every((task) => {
      if (isToday(task.time.value)) {
        taskList.push(task);
      } else return false; // breaks
      return true;
    });
  });

  taskList.sort((a, b) => a.time.value - b.time.value);

  displayCard("var(--teal)", "Today", taskList);
}

export { displayProjectCard, displayTodayCard };
