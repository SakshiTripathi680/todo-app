const todoInput = document.getElementById('todo');
const addTodoButton = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = '';
    
    if (tasks.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = "🎉 No tasks yet! Add one above.";
        emptyMsg.style.textAlign = "center";
        emptyMsg.style.marginTop = "20px";
        todoList.appendChild(emptyMsg);
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.style = 'display: flex; justify-content: space-between; align-items: center; background: #A55B4B; width: 70%; padding: 10px; margin: 10px 0 0 30px; border-radius: 5px;';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        if (task.completed) {
            li.style.textDecoration = 'line-through';
        }

        const textNode = document.createTextNode(task.text);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '80px';
        deleteButton.style.background = "#4F1C51";

        deleteButton.addEventListener('click', () => {
            if (checkbox.checked) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            } else {
                alert('You must complete the task before deleting it!');
            }
        });

        li.appendChild(checkbox);
        li.appendChild(textNode);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        tasks.push({ text: todoText, completed: false });
        saveTasks();
        renderTasks();
        todoInput.value = '';
        todoInput.focus(); // quality-of-life
    }
}

addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTasks(); // load tasks on startup
