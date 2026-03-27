// Load tasks when page opens
window.onload = function(){
    loadTasks();

    this.document.getElementById("addbtns").addEventListener("click", addTask);
};

function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

// Add Task
function addTask(){
    let title = document.getElementById("title").value;
    let duration = document.getElementById("duration").value;
    let deadline = document.getElementById("deadline").value;
    let description = document.getElementById("description").value;
    let priority = document.querySelector('input[name="priority"]:checked');

    if(title === ""){
        alert("Enter task title");
        return;
    }

    priority = priority ? priority.value : "No priority";

    let task = {
        title,
        duration,
        deadline,
        description,
        priority,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    clearInputs();
}

// Display Tasks
function displayTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        taskDiv.innerHTML = `
            <h3 style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                ${task.title}
            </h3>
            <p>Duration: ${task.duration}</p>
            <p>Priority: ${task.priority} ⭐</p>
            <p>Deadline: ${task.deadline}</p>
            <p>${task.description}</p>

            <button onclick="toggleComplete(${index})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button onclick="editTask(${index})">Edit</button>

            <button onclick="deleteTask(${index})" class="delete-btn">
                Delete
            </button>
        `;

        taskList.appendChild(taskDiv);
    });
}

// Delete Task
function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Mark Complete
function toggleComplete(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Edit Task
function editTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    let newTitle = prompt("Edit title", tasks[index].title);
    if(newTitle !== null){
        tasks[index].title = newTitle;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Load Tasks
function loadTasks(){
    displayTasks();
}

// Clear Inputs
function clearInputs(){
    document.getElementById("title").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("description").value = "";
}