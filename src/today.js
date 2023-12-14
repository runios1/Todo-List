import { isToday, isFuture } from "date-fns";
import { projects } from "./project";

function getTodaysTasks() {
  const taskList = [];
  projects.getProjects().forEach((project) => {
    project.getTasks("time").every((task) => {
      if (isToday(task.time.value)) {
        taskList.push(task);
      } else if (isFuture(task.time.value)) return false; // breaks
      return true;
    });
  });

  taskList.sort((a, b) => a.time.value - b.time.value);
  return taskList;
}

export default getTodaysTasks;
