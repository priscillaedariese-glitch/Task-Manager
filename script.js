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
    let startTime = document.getElementById("startDate").value + "T" + document.getElementById("startTime").value;
    let endTime = document.getElementById("endDate").value + "T" + document.getElementById("endTime").value;
    let duration = document.getElementById("duration").value;
    let description = document.getElementById("description").value;
    let priority = document.querySelector('input[name="priority"]:checked');
      
    if(new Date(endTime) <= new Date(startTime)){
    alert("End time must be after start time");
    return;
}
    if(title === ""){
        alert("Enter task title");
        return;
    }

    priority = priority ? priority.value : "No priority";

    let task = {
    title,
    startTime,
    endTime,
    duration,
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

    let start = task.startTime 
        ? new Date(task.startTime).toLocaleString() 
        : "Not set";

    let end = task.endTime 
        ? new Date(task.endTime).toLocaleString() 
        : "Not set";
    

        let durationText = task.duration;

   // ✅ AUTO CALCULATE if empty
    if(!durationText && task.startTime && task.endTime){
        let start = new Date(task.startTime);
        let end = new Date(task.endTime);

        let diff = end - start;

    if(diff > 0){
        let hrs = Math.floor(diff / (1000 * 60 * 60));
        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((diff % (1000 * 60)) / 1000);

        durationText = `${hrs}h ${mins}m ${secs}s`;
    } else {
        durationText = "Invalid time";
    }
}

          let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        taskDiv.innerHTML = `
            <h3 style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                ${task.title}
            </h3>

             <p><strong>Start:</strong> ${start}</p>
             <p><strong>End:</strong> ${end}</p>
             <p><strong>Duration:</strong> ${durationText}</p>
            <p>Priority: ${task.priority} ⭐</p>
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
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("description").value = "";
}

function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}