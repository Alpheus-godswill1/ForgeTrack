const fs = require("fs");
const {filePath } = require("../utils/taskPaths");
const logger = require("../services/log");

function listTasks(taskArg = null) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    if (!tasks || tasks.length === 0) {
      logger.info("List tasks requested - No tasks found");
      console.log("No tasks found.");
      return;
    }

    if (!isNaN(parseInt(taskArg))) {
      const taskID = parseInt(taskArg);
      const index = tasks.findIndex((t) => t.id === taskID);
      if (index === -1) {
        logger.warn(`List task requested - Task ID ${taskID} not found`);
        console.log(`Task with ID ${taskID} not found.`);
        return;
      }
      const task = tasks[index];
      logger.info(`List task requested - Found task ID ${taskID}: "${task.description}"`);
      console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
      return;
    }

    if (["todo", "done", "in-progress"].includes(taskArg)) {
      const filtered = tasks.filter((t) => t.status === taskArg);
      if (filtered.length === 0) {
        logger.info(`List tasks requested - No "${taskArg}" tasks found`);
        console.log(`No "${taskArg}" tasks found.`);
        return;
      }
      logger.info(`List tasks requested - Found ${filtered.length} "${taskArg}" tasks`);
      filtered.forEach((task) => {
        console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
      });
      return;
    }

    logger.info(`List tasks requested - Found ${tasks.length} total tasks`);
    tasks.forEach((task) => {
      console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
    });
  } catch (error) {
    logger.error(`Failed to list tasks: ${error.message}`);
    console.log("Error reading tasks. Please try again.");
  }
}

module.exports = listTasks;
