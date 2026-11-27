const input = document.querySelector("#task-input");
const button = document.querySelector("button")
let string = localStorage.getItem("tasks");
let sessionString = localStorage.getItem("sessions");
const taskList = document.querySelector("#task-list");
let display = "all";
let seconds = 0;
let timerId = null;
const pauseBtn = document.querySelector("#pause-btn");
const timerDisplay = document.querySelector("#timer-display");
const resetBtn = document.querySelector("#reset-btn");
const finishBtn = document.querySelector("#finish-btn");
let sessions = [];
if (sessionString !== null) {
    sessions = JSON.parse(sessionString);
}

let tasks = [];
if (string !== null) {
    tasks = JSON.parse(string);
} else {
    tasks = [];
}
const completedBtn = document.querySelector("#completed-btn");

completedBtn.addEventListener("click", () => {
    display = "completed"
    taskList.textContent = ""
    const completedTasks = tasks.filter(t => t.completed === true);
    completedTasks.forEach((task) => { showTask(task); });
    renderTasks()
});

const activeBtn = document.querySelector("#active-btn");

activeBtn.addEventListener("click", () => {
    display = "active"
    taskList.textContent = ""
    const activeTasks = tasks.filter(t => t.completed === false);
    activeTasks.forEach((task) => { showTask(task); });
    renderTasks()
});


const allTasksBtn = document.querySelector("#all-tasks-btn");

allTasksBtn.addEventListener("click", () => {
    tasks.forEach((task) => { showTask(task); });
    display = "all"
    renderTasks();
});

function renderTasks() {
    taskList.textContent = ""
    let toShow = tasks;
    if (display === "active") {
        toShow = tasks.filter(t => t.completed === false);;
    } else if (display === "completed") {
        toShow = tasks.filter(t => t.completed === true);
    }
    toShow.forEach((task) => { showTask(task); });
}

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
    if (display === "active" || display === "all") {
        showTask(task);
    }
    input.value = "";
    input.focus();
};

function showTask(task) {
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
        renderTasks()
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

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
}

const startBtn = document.querySelector("#start-btn");

startBtn.addEventListener("click", () => {
    if (timerId !== null) {
        return;
    }
    timerId = setInterval(() => {
        seconds = seconds + 1;
        timerDisplay.textContent = formatTime(seconds);
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
});

function reset() {
        seconds = 0;
        clearInterval(timerId);
        timerId = null;
        timerDisplay.textContent = formatTime(seconds);
    };

    resetBtn.addEventListener("click", () => {
        reset();
    });

finishBtn.addEventListener("click", () => {
    if (seconds === 0) {
        return
    }
    const session = {
        duration: seconds,
        date: new Date().toLocaleString()
    };
    console.log(seconds);
    sessions.push(session);
    localStorage.setItem("sessions", JSON.stringify(sessions));
    console.log(sessions);
    reset();
});

button.addEventListener("click", addTask);