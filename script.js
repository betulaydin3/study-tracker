const input = document.querySelector("#task-input");
const button = document.querySelector("button")
let string = localStorage.getItem("tasks");
console.log(string);
let tasks = [];
if (string !== null) {
    tasks = JSON.parse(string);
} else {
    tasks = [];
}
const completedBtn = document.querySelector("#completed-btn");

completedBtn.addEventListener("click", () => {
    const completedTasks = tasks.filter(t => t.completed === true);
    console.log(completedTasks);
});

const activeBtn = document.querySelector("#active-btn");

activeBtn.addEventListener("click", () => {
    const activeTasks = tasks.filter(t => t.completed === false);
    console.log(activeTasks);
});

function addTask() {
    const taskName = input.value.trim();
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }
    const task = {
        title: taskName,
        completed: false
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTask(task);
    input.value = "";
    input.focus();
};

function showTask(task) {
    const taskList = document.querySelector("#task-list");
    const list = document.createElement("li");
    list.textContent = task.title;
    taskList.appendChild(list);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        if (task.completed) {
            list.style.textDecoration = "line-through";
        } else {
            list.style.textDecoration = "";
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log(task)
    });
    if (task.completed) {
        list.style.textDecoration = "line-through";
    } else {
        list.style.textDecoration = "";
    };
    list.appendChild(checkbox);
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        list.remove();
        const rest = tasks.filter(t => t !== task);
        tasks = rest;
        console.log(rest);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    list.appendChild(deleteButton);
    console.log(taskList);
}

tasks.forEach((task) => {
    showTask(task);
});



button.addEventListener("click", addTask);