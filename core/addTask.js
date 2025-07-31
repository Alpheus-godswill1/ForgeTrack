const fs = require("fs");
const {filePath} = require("../utils/taskPaths")
function addTask(task) {
  if (!task || task.trim().length === 0) {
    console.log("Task description is missing. Use: task-cli add <task>");
    return;
  }

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

  console.log(`Task added successfully (ID: ${id})`);
}

module.exports = addTask;
