const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "..", "taskStore");
const filePath = path.join(dirPath, "task.json");

function removeTask(taskId) {
  const parsedId = parseInt(taskId);
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const taskIndex = tasks.findIndex((t) => t.id === parsedId);

  if (taskIndex === -1) {
    console.log(`No task with [${parsedId}] as ID exist in the taskStore`);
    return;
  }

  const removedTask = tasks.splice(taskIndex, 1)[0];
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");

  console.log(
    `Task [${removedTask.id}] removed successfully: "${removedTask.description}"`,
  );
}

module.exports = removeTask;
