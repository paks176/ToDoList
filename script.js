const emptyMessage = document.querySelector('.empty__message')
const taskPull = document.querySelector('.tasks__list')

const taskList = {
    pull: [],
    clear() {
        this.pull = [];
        taskPull.innerHTML = '';
        this.render()
    },
    deleteTask(arrayNumber) {
        this.pull.splice(arrayNumber, 1);
        let deletedItem = taskPull.querySelector(`div[task_id="${newTask}"]`);
        deletedItem.remove();
        this.render();
    },
    createTask() {
        let newTask = new Task();
        this.pull.push(newTask);
        taskPull.insertAdjacentHTML('beforeend', `
        <div class="task" task_id="${newTask.number}">
                <div class="task__left">
                    <div class="task__number">${newTask.number}</div>
                    <input type="checkbox" class="task__checkbox">
                    <p class="task__text">Lorem ipsum dolor sit <i class="fa-solid fa-pencil"></i>amet consectetur?</p>
                </div>
                <div class="task__right">
                    <button id="edit">
                        <img src="./icons/pencil-256x256.png" alt="Edit" class="task__button">
                    </button>
                    <button id="delete">
                        <img src="./icons/trash-icon-256.png" alt="Delete" class="task__button">
                    </button>
                </div>
            </div>`)
        taskPull.querySelector(`div[task_id="${newTask.number}"`).addEventListener('click', () => taskList.deleteTask(this.pull[newTask.number - 1]));
        this.render();
    },  
    render() {
        if (this.pull.length === 0) {
            emptyMessage.innerHTML = '<p>Its empty here</p>';
        }
        else {
            emptyMessage.innerHTML = '';
        }
    }
};

taskList.render();

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
}

const addTask = document.querySelector('#add_task').addEventListener('click', () => taskList.createTask())
const clearTasks = document.querySelector('#clear_tasks').addEventListener('click', () => taskList.clear())
