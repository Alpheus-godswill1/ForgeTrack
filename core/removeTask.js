const fs = require("fs");
const {filePath } = require("../utils/taskPaths");
const logger = require("../services/log");

function removeTask(taskId) {
  try {
    const parsedId = parseInt(taskId);
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const taskIndex = tasks.findIndex((t) => t.id === parsedId);

    if (taskIndex === -1) {
      logger.warn(`\nDelete task requested - Task ID ${parsedId} not found`);
      return;
    }

    const removedTask = tasks.splice(taskIndex, 1)[0];
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");

    logger.info(`\nTask deleted successfully - ID: ${removedTask.id}, Description: "${removedTask.description}"`);
  } catch (error) {
    logger.error(`\nFailed to delete task: ${error.message}`);
  }
}

module.exports = removeTask;
