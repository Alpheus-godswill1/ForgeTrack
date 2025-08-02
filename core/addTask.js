const fs = require("fs");
const {filePath} = require("../utils/taskPaths");
const logger = require("../services/log");

function addTask(task) {
  if (!task || task.trim().length === 0) {
    logger.warn("Task description is missing. Use: task-cli add <task>");
    console.log("Task description is missing. Use: task-cli add <task>");
    return;
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    const id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
    const now = new Date().toISOString();

    const newTask = {
      id,
      description: task,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");

    logger.info(`Task added successfully - ID: ${id}, Description: "${task}"`);
    console.log(`Task added successfully (ID: ${id})`);
  } catch (error) {
    logger.error(`Failed to add task: ${error.message}`);
    console.log("Error adding task. Please try again.");
  }
}

module.exports = addTask;
