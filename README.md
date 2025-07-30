# 🛠️ ForgeTrack

**ForgeTrack** is a minimalist yet powerful Command Line Interface (CLI) tool built with **Node.js** to help users **track their tasks**, stay organized, and maintain momentum — all from the terminal.

> ✨ _"Forge your path, one task at a time."_  

---

## 📖 Project Overview

**ForgeTrack** is a personal task tracker that runs entirely in your terminal. It allows you to add, update, delete, and manage tasks in a lightweight, local-first environment using a simple JSON file as storage. This project is built from scratch — no frameworks, no external libraries — to strengthen raw JavaScript skills and system-level understanding.

The goal is to help users:
- Build intentional habits
- Stay focused without distractions
- Track productivity directly from the terminal

ForgeTrack is also a learning journey in **Node.js**, **file system manipulation**, **command-line design**, and **DevOps practices** like containerization, version control, and testing.

---

## 🎯 What I Am Building

A full-featured CLI tool that lets you:

- ✅ Add a new task  
- ✏️ Update an existing task's description  
- ❌ Delete a task  
- 🔁 Mark a task as `in-progress` or `done`  
- 📃 List tasks by status (`todo`, `in-progress`, `done`)  
- 🕒 Track when each task was created and last updated  
- 💾 Store tasks in a persistent `tasks.json` file

The user interacts with the tool like this:

```bash
# Add a task
task-cli add "Write project documentation"

# Update a task
task-cli update 1 "Write README and setup docs"

# Mark task as done
task-cli task-done 1

# Mark task as in progress
task-cli task-in-progress 1

# List all tasks
task-cli list

# List only done tasks
task-cli list done

# Delete  tasks
task-cli delete 1

# Help Guide
task-cli  help
