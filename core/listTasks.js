const fs = require("fs");
const {filePath } = require("../utils/taskPaths");
const logger = require("../services/log");

function listTasks(taskArg = null) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const tasks = JSON.parse(data);

    if (!tasks || tasks.length === 0) {
      logger.info("List tasks requested - No tasks found");
      return;
    }

    if (!isNaN(parseInt(taskArg))) {
      const taskID = parseInt(taskArg);
      const index = tasks.findIndex((t) => t.id === taskID);
      if (index === -1) {
        logger.warn(`List task requested - Task ID ${taskID} not found`);
        return;
      }
      const task = tasks[index];
      logger.info(`\nList task requested: Found task ID [${taskID}]: ${task.description} - Status: ${task.status}`);
      return;
    }

    if (["todo", "done", "in-progress"].includes(taskArg)) {
      const filtered = tasks.filter((t) => t.status === taskArg);
      if (filtered.length === 0) {
        logger.info(`\nList tasks requested - No "${taskArg}" tasks found`);
        return;
      }
      logger.info(`\nList tasks requested - Found ${filtered.length} "${taskArg}" tasks`);
      filtered.forEach((task) => {
        logger.info(`\n[${task.id}] ${task.description} - Status: ${task.status}`);
      });
      return;
    }

    logger.info(`\nList tasks requested - Found ${tasks.length} total tasks`);
    tasks.forEach((task) => {
      console.log(`[${task.id}] ${task.description} - Status: ${task.status}`);
    });
  } catch (error) {
    logger.error(`\nFailed to list tasks: ${error.message}`);
  }
}

module.exports = listTasks;
