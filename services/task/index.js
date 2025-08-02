// Task management utilities for the CLI tool
const fs = require('fs');
const path = require('path');

class TaskManager {
  constructor() {
    this.taskFile = path.join(__dirname, '../../taskStore/task.json');
    this.ensureTaskFile();
  }

  ensureTaskFile() {
    const taskDir = path.dirname(this.taskFile);
    if (!fs.existsSync(taskDir)) {
      fs.mkdirSync(taskDir, { recursive: true });
    }
    if (!fs.existsSync(this.taskFile)) {
      fs.writeFileSync(this.taskFile, JSON.stringify([], null, 2));
    }
  }

  getAllTasks() {
    try {
      const data = fs.readFileSync(this.taskFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveTasks(tasks) {
    fs.writeFileSync(this.taskFile, JSON.stringify(tasks, null, 2));
  }

  addTask(description) {
    const tasks = this.getAllTasks();
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  updateTask(id, updates) {
    const tasks = this.getAllTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return null;
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveTasks(tasks);
    return tasks[taskIndex];
  }

  deleteTask(id) {
    const tasks = this.getAllTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    this.saveTasks(filteredTasks);
    return tasks.length !== filteredTasks.length;
  }
}

// Export a singleton instance
module.exports = new TaskManager();
