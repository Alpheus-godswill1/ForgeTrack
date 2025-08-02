const fs = require("fs");
const {filePath } = require("../utils/taskPaths");
const logger = require("../services/log");

function removeTask(taskId) {
  try {
    const parsedId = parseInt(taskId);
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const taskIndex = tasks.findIndex((t) => t.id === parsedId);

    if (taskIndex === -1) {
      logger.warn(`Delete task requested - Task ID ${parsedId} not found`);
      console.log(`No task with [${parsedId}] as ID exist in the taskStore`);
      return;
    }

    const removedTask = tasks.splice(taskIndex, 1)[0];
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");

    logger.info(`Task deleted successfully - ID: ${removedTask.id}, Description: "${removedTask.description}"`);
    console.log(
      `Task [${removedTask.id}] removed successfully: "${removedTask.description}"`,
    );
  } catch (error) {
    logger.error(`Failed to delete task: ${error.message}`);
    console.log("Error deleting task. Please try again.");
  }
}

module.exports = removeTask;
