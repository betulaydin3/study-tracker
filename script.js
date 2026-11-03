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
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        if (task.completed){
            console.log("tak 1: doorstrepen")
            list.style.textDecoration = "line-through";
        } else {
            console.log("tak 2: streep weg");
            list.style.textDecoration = "";
        }
        console.log(task)
    });
    list.textContent = task.title;
    list.appendChild(checkbox);
    taskList.appendChild(list);
    console.log(taskList);
    input.value = "";
    input.focus();
};
button.addEventListener("click", addTask);