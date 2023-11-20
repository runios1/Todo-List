
function colorButton(color,colorPicker,colorContainer,project){
    const domElement = document.createElement('button');
    domElement.className = "colorPicker";
    domElement.style.backgroundColor = color;
    domElement.addEventListener('click',() => {
        colorContainer.parentElement.insertBefore(colorPicker,colorContainer);
        colorContainer.remove();
        colorPicker.style.backgroundColor = color;
        project.color = color;
    })
    colorContainer.appendChild(domElement);
}

function colorPickerClickHandler(event,project) {
    const colorPicker = event.target;

    const colorContainer = document.createElement('div');
    colorContainer.className = "colorContainer";
    colorPicker.parentElement.insertBefore(colorContainer,colorPicker);
    colorPicker.remove();

    colorButton('red',colorPicker,colorContainer,project);
    colorButton('green',colorPicker,colorContainer,project);
    colorButton('blue',colorPicker,colorContainer,project);
    colorButton('yellow',colorPicker,colorContainer,project);
}

export {colorPickerClickHandler}
