import { projects } from "./project";

function colorButton(color, colorPicker, colorContainer, project) {
  const domElement = document.createElement("button");
  domElement.className = "colorPicker";
  domElement.style.backgroundColor = color;
  domElement.addEventListener("click", () => {
    colorContainer.parentElement.insertBefore(colorPicker, colorContainer);
    colorContainer.remove();
    colorPicker.style.backgroundColor = color;
    project.color = color;
    projects.updateProjectsStorage();
  });
  colorContainer.appendChild(domElement);
}

function colorPickerClickHandler(event, project) {
  const colorPicker = event.target;

  const colorContainer = document.createElement("div");
  colorContainer.className = "colorContainer";
  colorPicker.parentElement.insertBefore(colorContainer, colorPicker);
  colorPicker.remove();

  colorButton(
    "var(--colorPickerOption1)",
    colorPicker,
    colorContainer,
    project,
  );
  colorButton(
    "var(--colorPickerOption2)",
    colorPicker,
    colorContainer,
    project,
  );
  colorButton(
    "var(--colorPickerOption3)",
    colorPicker,
    colorContainer,
    project,
  );
  colorButton(
    "var(--colorPickerOption4)",
    colorPicker,
    colorContainer,
    project,
  );
}

export default colorPickerClickHandler;
