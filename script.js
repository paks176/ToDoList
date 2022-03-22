const emptyMessageDIV = document.querySelector('.empty__message')
const taskDIV = document.querySelector('.tasks__list')

const taskList = {
    pull: [],
    clear() {
        this.pull = [];
        taskDIV.innerHTML = '';
        this.checkEmptiness();
    },
    deleteTask(newTaskObject) {
        this.pull.splice((newTaskObject.number - 1), 1);
        taskDIV.querySelector(`#task-${newTaskObject.number}`).remove();
        this.checkEmptiness();
    },
    enterText(newTaskDIV, newTaskObject) {
        let inputText = newTaskDIV.querySelector(`input[enter-text="${newTaskObject.number}"]`);
        let enteredText = inputText.value;
        inputText.remove();
        newTaskDIV.querySelector('.task__left').insertAdjacentHTML('beforeend', `
        <p class="task__text" id="task-${newTaskObject.number}">${enteredText}</p>`)
        newTaskObject.text = enteredText;
    },
    modifyText(newTaskObject, newTaskDIV) {
        let editedElem = taskDIV.querySelector(`p[id="task-${newTaskObject.number}"]`);
        let editedText = editedElem.innerText;
        editedElem.remove();
        let taskLeft = newTaskDIV.querySelector('.task__left');
        taskLeft.insertAdjacentHTML('beforeend', `<input type="text" class="task_text--edit" value="${editedText}" enter-text="${newTaskObject.number}">`)
        let modifyTextInput = newTaskDIV.querySelector(`input[enter-text="${newTaskObject.number}"]`)
        modifyTextInput.addEventListener('keydown', function(event) {
            if (event.code == 'Enter') {
                taskList.enterText(newTaskDIV, newTaskObject)
            }
        });
        modifyTextInput.focus();
        modifyTextInput.onfocus = modifyTextInput.setSelectionRange(modifyTextInput.value.length,modifyTextInput.value.length);
    },
    createTask() {
        let newTaskObject = new Task();
        this.pull.push(newTaskObject);
        taskDIV.insertAdjacentHTML('beforeend', `
        <div class="task" id="task-${newTaskObject.number}">
                    <div class="task__left">
                        <div class="task__number">${newTaskObject.number}</div>
                        <input type="checkbox" class="task__checkbox">
                        <input type="text" class="task_text--edit" enter-text="${newTaskObject.number}">
                    </div>
                    <div class="task__right">
                        <button edit-task="${newTaskObject.number}">
                            <img src="./icons/pencil-256x256.png" alt="Edit" class="task__button">
                        </button>
                        <button delete-task="${newTaskObject.number}">
                            <img src="./icons/trash-icon-256.png" alt="Delete" class="task__button">
                        </button>
                    </div>
                </div>`)
        const newTaskDIV = document.querySelector(`#task-${newTaskObject.number}`) // общий селектор данного конкретного Таска...
        // ... на который я ставлю слушатель события для удаления и редактирования
        newTaskDIV.querySelector(`button[delete-task="${newTaskObject.number}"]`).addEventListener('click', () => taskList.deleteTask(newTaskObject));
        newTaskDIV.querySelector(`input[enter-text="${newTaskObject.number}"]`).focus();
        newTaskDIV.querySelector(`input[enter-text="${newTaskObject.number}"]`).addEventListener('keydown', function(event) {
            if (event.code == 'Enter') {
                taskList.enterText(newTaskDIV, newTaskObject)
            }
        })
        newTaskDIV.querySelector(`button[edit-task="${newTaskObject.number}"]`).addEventListener('click', () => taskList.modifyText(newTaskObject, newTaskDIV));
        this.checkEmptiness();
    },  
    checkEmptiness() {
        if (this.pull.length === 0) {
            emptyMessageDIV.innerHTML = '<p>Its empty here</p>';
        }
        else {
            emptyMessageDIV.innerHTML = '';
        }
    }
};

taskList.checkEmptiness();

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
