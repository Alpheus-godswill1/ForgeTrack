const fs = require("fs");
const {filePath } = require("../utils/taskPaths");
const logger = require("../services/log");

function updateTask() {
    const taskID = parseInt(process.argv[3]);
    const newDescription = process.argv.slice(4).join(" ");
    const command = process.argv[2];
  
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));
  
    const taskIndex = tasks.findIndex((t) => t.id === taskID);
  
    if (taskIndex === -1) {
      logger.warn("\nNo tasks found.");
      return;
    }
  
    const existingTask = tasks[taskIndex];
    const now = new Date().toISOString();
  
    const updatedTask = {
      ...existingTask,
      updatedAt: now,
    };
  
    if (command == "update") {
      if (!newDescription || newDescription.trim() === "") {
        logger.warn("\nDescription cannot be empty. Use: task-cli update <id> <new description>");
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
  
    if (command === "update") {
      logger.info(`\nTask [${taskID}] successfully updated.`);
    } else {
      logger.info(`\nTask [${taskID}] marked as ${updatedTask.status}.`);
    }
  }

module.exports = updateTask