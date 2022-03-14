const emptyMessage = document.querySelector('.empty__message')
const taskPull = document.querySelector('.tasks__list')

const taskList = {
    pull: [],
    clear() {
        this.pull = [];
        taskPull.innerHTML = '';
        this.render()
    },
    deleteTask(taskNumber) {
        this.pull.splice(taskNumber, 1);
        this.render();
    },
    createTask() {
        let newTask = new Task();
        this.pull.push(newTask);
        this.render();
        taskPull.insertAdjacentHTML('beforeend', `
        <div class="task">
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
            </div>
        `)
        
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
    addListener() {
        document.querySelector('#delete').addEventListener('click', () => taskList.deleteTask(newTask.number))}

}

const addTask = document.querySelector('#add_task').addEventListener('click', () => taskList.createTask())
const clearTasks = document.querySelector('#clear_tasks').addEventListener('click', () => taskList.clear())
