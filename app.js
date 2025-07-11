#!/usr/bin/env node
// 1. What command did the user give me?
// 2. What arguments (parameters) go with that command?
// 3. Based on the command, what function should I run?

const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'taskStore')
const filePath = path.join(dirPath, 'task.json')

function addTask(task) {
   if(!task || task.trim().length===0){
    console.log("Task description is missing. Use: task-cli add <task>");
    return;
   }

    // Load existing Tasks    
    const data = fs.readFileSync(filePath, 'utf8')
    console.log(data)
    const tasks = JSON.parse(data)

    // Generate new ID
    const id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1

    // Get timestamp
    const now = new Date().toISOString();

    // Build the task object
    const newTask = {
        id,
        description: task,
        status: "todo",
        createdAt: now,
        updatedAt: now
      };
    
    // Append NewTask
    tasks.push(newTask)
    
    // Save Updated task list
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf8')
    
    console.log(`Task added successfully (ID: ${id})`)
}

function listTasks() {
    // Read the file
   const data = fs.readFileSync(filePath, 'utf8')

   // convert Json string to array of tasks
   const tasks = JSON.parse(data)

   // check if the array is empty
   if(tasks.length === 0){
     console.log("No tasks found.")
     return;
   }

    tasks.forEach(task => {
        console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
   });

}

function removeTask(task) {
    console.log(`Removing task: ${task}`);

}

function updateTask() {
    // Parse content argument
    const taskID = parseInt(process.argv[3])
    const newDescription = process.argv.slice(4).join(" ");
    
    // Convert Json content to an Array by Parsing
    const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    //Find task by ID
    const taskIndex = tasks.findIndex(t => t.id === taskID)
    console.log(task)
    
    // Get timestamp
    const now = new Date().toISOString();

    // check if the array is empty
    if(taskIndex === -1){
        console.log("No tasks found.")
        return;
    }

    //Check if Description argument was assigned.
    if(!newDescription || newDescription.trim() === ""){
        console.log("Description cannot be empty. Use: task-cli update <id> <new description>");
        return;
    }

    const existingTask = tasks[taskIndex]
    const updatedTask = {
        id: existingTask.id,
        description:  newDescription,
        status: existingTask.status,
        createdAt: existingTask.createdAt,
        updatedAt: now,
      };
    tasks[taskIndex] = updatedTask
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2),'utf8')
    console.log(`Task [${taskID}] successfull updated without any hitch!!!`)
}

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf8')
}

const command = process.argv[2];
const task = process.argv[3];

if (command === "add") {
    addTask(task);
} else if (command === "list") {
    listTasks();
} else if (command === "update"){
    updateTask()
}
else if (command === "help"){
    help()
}
else if (command === "remove") {
    removeTask(task);
} else {
    console.log("Command not found");
}