const fs = require("fs");
const {filePath } = require("../utils/taskPaths");

function updateTask() {
    // Parse content argument
    const taskID = parseInt(process.argv[3]);
    const newDescription = process.argv.slice(4).join(" ");
    const command = process.argv[2];
  
    // Convert Json content to an Array by Parsing (Loads task from file)
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));
  
    //Find task by Index
    const taskIndex = tasks.findIndex((t) => t.id === taskID);
  
    // check if the array is empty
    if (taskIndex === -1) {
      console.log("No tasks found.");
      return;
    }
  
    // Get current task and timestamp
    const existingTask = tasks[taskIndex];
    const now = new Date().toISOString();
  
    // Initialize updatedTask with original values
    const updatedTask = {
      ...existingTask,
      updatedAt: now,
    };
  
    if (command == "update") {
      //Check if Description argument was assigned.
      if (!newDescription || newDescription.trim() === "") {
        console.log(
          "Description cannot be empty. Use: task-cli update <id> <new description>",
        );
        return;
      }
      updatedTask.description = newDescription;
    }
  
    if (command === "task-in-progress" || command === "task-done") {
      const statusValue = command === "task-in-progress" ? "in-progress" : "done";
      updatedTask.status = statusValue;
    }
  
    tasks[taskIndex] = updatedTask;
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
  
    // Display confirmation message
    if (command === "update") {
      console.log(`Task [${taskID}] successfully updated.`);
    } else {
      console.log(`Task [${taskID}] marked as ${updatedTask.status}.`);
    }
  }

module.exports = updateTask