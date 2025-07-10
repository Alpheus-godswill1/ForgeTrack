#!/usr/bin/env node
// 1. What command did the user give me?
// 2. What arguments (parameters) go with that command?
// 3. Based on the command, what function should I run?

const isUtf8  = require('buffer')
const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'taskStore')
const filePath = path.join(dirPath, 'task.json')

function addTask(task) {
   if(!task || task.trim().length===0){
    console.log("❌ Task description is missing. Use: task-cli add <task>");
    return;
   }

    // Load existing Tasks    
    const data = fs.readFileSync(filePath, isUtf8)
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
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), isUtf8)
    
    console.log(`✅ Task added successfully (ID: ${id})`)
}

function listTasks() {
    // Read the file
   const data = fs.readFileSync(filePath, isUtf8)

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

function updateTask(task) {
    console.log(`Updating task: ${task}`);
}

function help() {
    console.log("Usage: ./app.js <command> <task>");
    console.log("Commands:");
    console.log("add <task> - Add a new task");
    console.log("list - List all tasks");
    console.log("update - update a task");
    console.log("remove <task> - Remove a task");
}

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([]), isUtf8)
}

const command = process.argv[2];
console.log(command)
const task = process.argv[3];

if (command === "add") {
    addTask(task);
} else if (command === "list") {
    listTasks();
} else if (command === "update"){
    updateTask(task)
}
else if (command === "help"){
    help()
}
else if (command === "remove") {
    removeTask(task);
} else {
    console.log("Command not found");
}