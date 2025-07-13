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
   // Read the file and convert Json string to array of tasks
   const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
   const taskArg = process.argv[3];

   if(!tasks || tasks.length===0){
    console.log("No tasks found.");
    return;
   }

  // If taskArg is a number → Try to match ID
  if(!isNaN(parseInt(taskArg))) {
    const taskID = parseInt(taskArg);
    const index = tasks.findIndex(t => t.id === taskID);

    if (index === -1) {
      console.log(`Task with ID ${taskID} not found.`);
      return;
    }
    const task = tasks[index];
    console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
    return;
  } 

  // If taskArg is a valid status → Filter by status
  if(["todo","done", "in-progress"].includes(taskArg)){
    const filtered = tasks.filter(t => t.status === taskArg);

    if (filtered.length === 0) {
        console.log(`No "${taskArg}" tasks found.`);
        return;
      }
      filtered.forEach(task =>{
        console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
      });
      return;
    }
    // If no argument → List all tasks
    tasks.forEach(task => {
      console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
    });
  }


function removeTask() {
    const taskArg = parseInt(process.argv[3])
    const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    
    const taskIndex = tasks.findIndex(t => t.id === taskArg)
    console.log(taskIndex)

    if(taskIndex === -1){
        console.log(`No task with [${taskArg}] as ID exist in the taskStore`)
        return;
    }
   
    const removedTask = tasks.splice(taskIndex, 1)[0];
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf8');
  
    console.log(`Task [${removedTask.id}] removed successfully: "${removedTask.description}"`);
}

function updateTask() {
    // Parse content argument
    const taskID = parseInt(process.argv[3])
    const newDescription = process.argv.slice(4).join(" ");
    const command = process.argv[2];

     // Convert Json content to an Array by Parsing (Loads task from file)
     const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    //Find task by Index
    const taskIndex = tasks.findIndex(t => t.id === taskID)

    // check if the array is empty
    if(taskIndex === -1){
        console.log("No tasks found.")
        return;
    }
    
    // Get current task and timestamp
    const existingTask = tasks[taskIndex];
    const now = new Date().toISOString();

    // Initialize updatedTask with original values
    const updatedTask = {
        ...existingTask,
        updatedAt:now
    }

    if(command == "update"){    
    //Check if Description argument was assigned.
    if(!newDescription || newDescription.trim() === ""){
        console.log("Description cannot be empty. Use: task-cli update <id> <new description>");
        return;
    }
    updatedTask.description = newDescription;
    }
    
    if (command === "task-in-progress" || command === "task-done") {
        const statusValue = command === "task-in-progress" ? "in-progress" : "done";
        updatedTask.status = statusValue;
      }
    
    tasks[taskIndex] = updatedTask
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2),'utf8')

    // Display confirmation message
    if (command === "update") {
        console.log(`Task [${taskID}] successfully updated.`);
    } else {
        console.log(`Task [${taskID}] marked as ${updatedTask.status}.`);
    }
}

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf8')
}

function help() {
    console.log("\nTASK CLI - COMMAND LINE TASK MANAGER");
    console.log("##########################################:");
    console.log('\n')
    console.log("################--USAGE--#####################:");
    console.log("  task-cli <command> [arguments]\n");
    console.log("################--AVAILABLE COMMANDS--########:");
    console.log("  add <description>  :       Add a new task");
    console.log("  list               :       List all tasks");
    console.log("  list <id>          :      Show a specific task by ID");
    console.log("  update <id> <description>  :  Update the description of a task");
    console.log("  remove <id>        :       Remove a task by ID");
    console.log("  help               :       Display this help message\n");
    console.log("################--EXAMPLES--###################:");
    console.log("  task-cli add \"Buy groceries\"");
    console.log("  task-cli list");
    console.log("  task-cli list 2");
    console.log("  task-cli update 2 \"Buy fruits instead\"");
    console.log("  task-cli remove 3\n");
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
else if (command === "task-in-progress"){
    updateTask()
}
else if (command === "task-done"){
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