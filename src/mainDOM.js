import { format, isPast, isToday, isTomorrow, isThisWeek } from "date-fns";
import { changeFormToEditTask } from "./taskFormDOM";
import { sortIcon } from "./icons";
import getTodaysTasks from "./today";
import { selectedProject } from "./selectedProject";

function calculateTime(time) {
  if (isPast(time)) return "Overdue";
  if (isToday(time)) return format(time, "k:mm");
  if (isTomorrow(time)) return `${format(time, "k:mm")}, Tommorow`;
  if (isThisWeek(time)) return format(time, "EEEE");
  return format(time, "MMM do, yyyy");
}

function taskClickHandler(task) {
  changeFormToEditTask(task);
  document.querySelector("dialog.task").showModal();
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

  // const dialog = document.querySelector("dialog.task");
  // dialog.addEventListener("close", () => {
  //   // BUG: Every time I select a project I add another event listener such that when I close a dialog it refreshes the correct tasks. I never remove the event listeners
  //   // Solution: New event handler that uses the selected project object instead.
  //   displayTasks(project.getSortedTasks());
  // });

  displayCard(project.color, project.name, project.getTasks("default"));

  makeSortSelect(main, project);
}

function displayTodayCard() {
  const main = document.querySelector("main > div.card");
  main.innerHTML = "";

  const taskList = getTodaysTasks();

  displayCard("var(--teal)", "Today", taskList);
}

document.querySelector("dialog.task").addEventListener("close", () => {
  if (selectedProject) {
    displayTasks(selectedProject.getSortedTasks());
  } else {
    displayTasks(getTodaysTasks());
  }
});

export { displayProjectCard, displayTodayCard };
