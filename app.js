#!/usr/bin/env node
// 1. What command did the user give me?
// 2. What arguments (parameters) go with that command?
// 3. Based on the command, what function should I run?

const addTask = require("./core/addTask");
const listTasks = require("./core/listTasks");
const updateTask = require("./core/updateTask");
const removeTask = require("./core/removeTask");
const help = require("./core/help");

// Ensure storage directory and file exist
const { ensureStorage } = require("./utils/ensureStorage");
ensureStorage();

const command = process.argv[2];
const task = process.argv[3];

if (command === "Add") {
  addTask(task);
} else if (command === "list") {
  listTasks(task);
} else if (command === "update") {
  updateTask();
} else if (command === "task-in-progress") {
  updateTask();
} else if (command === "task-done") {
  updateTask();
} else if (command === "help") {
  help();
} else if (command === "delete") {
  removeTask(task);
} else {
  console.log("Command not found");
}
