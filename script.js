const taskList = {
    pull: [],
    clear() {
        this.pull = [];
    },
    createTask() {
        let newTask = new Task('new task');
        this.pull.push(newTask);
    }
};

class Task {
    marked = false // открытое поле класса
    constructor(text) {
        this.text = String(text);
        this.number = Number(taskList.pull.length + 1)
    }
    makeMark() {
        switch (this.marked) {
            case false:
                this.marked = true;
                break
            case true:
                this.marked = false;
                break;
        }
    }
    deleteTask() {
        return (taskList.pull).splice(this.number, 1);
    }

}

