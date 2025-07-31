const fs = require("fs");
const {filePath } = require("../utils/taskPaths");

function listTasks(taskArg = null) {
  const data = fs.readFileSync(filePath, "utf8");
  const tasks = JSON.parse(data);

  if (!tasks || tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  if (!isNaN(parseInt(taskArg))) {
    const taskID = parseInt(taskArg);
    const index = tasks.findIndex((t) => t.id === taskID);
    if (index === -1) {
      console.log(`Task with ID ${taskID} not found.`);
      return;
    }
    const task = tasks[index];
    console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
    return;
  }

  if (["todo", "done", "in-progress"].includes(taskArg)) {
    const filtered = tasks.filter((t) => t.status === taskArg);
    if (filtered.length === 0) {
      console.log(`No "${taskArg}" tasks found.`);
      return;
    }
    filtered.forEach((task) => {
      console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
    });
    return;
  }

  tasks.forEach((task) => {
    console.log(`📝 [${task.id}] ${task.description} - Status: ${task.status}`);
  });
}

module.exports = listTasks;
