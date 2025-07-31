// utils/taskPath.js
const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "..", "taskStore");
const filePath = path.join(dirPath, "task.json");

// Ensure taskStore directory exists
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Ensure task.json file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

module.exports = { dirPath, filePath };
