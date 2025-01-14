const button = document.getElementById("btn");
const td = document.getElementById("textdata");
const list = document.getElementById("taskList");
const container = document.getElementById("taskContainer"); 

load();

function addtask() {
    const data = td.value.trim();
    if (data) {
        createli({ text: data, checked: false });
        td.value = '';
        save();
        showContainer(); 
    } else {
        alert("Fill the text field");
    }
}

button.addEventListener('click', addtask);

function createli(task) {
    const listitems = document.createElement('li');
    listitems.textContent = task.text;

    const dele = document.createElement('button');
    dele.textContent = '-';
    dele.className = 'deleteTask';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.checked;

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            listitems.style.backgroundColor = 'lightgreen';
        } else {
            listitems.style.backgroundColor = '';
        }
        save();
    });

    if (task.checked) {
        listitems.style.backgroundColor = 'lightgreen';
    }

    listitems.prepend(checkbox);
    listitems.appendChild(dele);
    list.appendChild(listitems);

    dele.addEventListener('click', function () {
        list.removeChild(listitems);
        save();
        hideContainerIfEmpty(); 
    });
}

function save() {
    let tasks = [];
    list.querySelectorAll('li').forEach(function (item) {
        const checkbox = item.querySelector('.task-checkbox');
        tasks.push({
            text: item.textContent.replace('-', '').trim(),
            checked: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function load() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length > 0) {
        showContainer();
    }
    tasks.forEach(createli);
}

function showContainer() {
    container.style.display = 'block'; 
}

function hideContainerIfEmpty() {
    if (list.children.length === 0) {
        container.style.display = 'none'; 
    }
}
