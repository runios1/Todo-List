class Project{
    constructor(name,color){
        this.name = name;
        this.color = color;
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
    }
}