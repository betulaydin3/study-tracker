const input = document.querySelector("#task-input");
const button = document.querySelector("button")
const tasks = [];

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
    console.log(tasks);
    const taskList = document.querySelector("#task-list")
    const list = document.createElement("li");
    list.textContent = task.title;
    taskList.appendChild(list);
    input.value = "";
    input.focus();
};
button.addEventListener("click", addTask);