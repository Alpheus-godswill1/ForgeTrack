[![forgetrack ci](https://github.com/Alpheus-godswill1/ForgeTrack/actions/workflows/forgetrack.yml/badge.svg)](https://github.com/Alpheus-godswill1/ForgeTrack/actions/workflows/forgetrack.yml)

# 🛠️ ForgeTrack

**ForgeTrack** is a minimalist yet powerful Command Line Interface (CLI) tool built with **Node.js** to help users **track their tasks**, stay organized, and maintain momentum — all from the terminal.

> ✨ *"Forge your path, one task at a time."*

---

## 📖 Project Overview

**ForgeTrack** is a personal task tracker that runs entirely in your terminal. It allows you to add, update, delete, and manage tasks in a lightweight, local-first environment using a simple JSON file as storage. This project is built from scratch — no frameworks, no external libraries — to strengthen raw JavaScript skills and system-level understanding.

The goal is to help users:

* Build intentional habits
* Stay focused without distractions
* Track productivity directly from the terminal

ForgeTrack is also a learning journey in **Node.js**, **file system manipulation**, **command-line design**, and **DevOps practices** like containerization, version control, and testing.

---

##  What I Am Building

A full-featured CLI tool that lets you:

* ↳ Add a new task
* ↳ Update an existing task's description
* ↳ Delete a task
* ↳ Mark a task as `in-progress` or `done`
* ↳ List tasks by status (`todo`, `in-progress`, `done`)
* ↳ Track when each task was created and last updated
* ↳ Store tasks in a persistent `tasks.json` file

---

##  Usage

### From Docker Hub

You can pull the prebuilt Docker image and run the CLI using:

```bash
docker pull alpheusgodswill1/forgetrack-cli:latest
docker run --rm -v $(pwd)/data:/app/data alpheusgodswill1/forgetrack-cli:latest [command]
```

Example:

```bash
docker run --rm -v $(pwd)/data:/app/data alpheusgodswill1/forgetrack-cli:latest add "Write documentation"
```

### Local Commands

```bash
# Add a task
task-cli add "Write project documentation"

# Update a task
task-cli update 1 "Write README and setup Docs"

# Mark task as done
task-cli task-done 1

# Mark task as in progress
task-cli task-in-progress 1

# List all tasks
task-cli list

# List only done tasks
task-cli list done

# Delete tasks
task-cli delete 1

# Help Guide
task-cli help
```

---

##  Running Tests Locally

You can test individual features with:

```bash
npm run test:add
npm run test:list
npm run test:remove
npm run test:update
```

These test suites validate functionality for adding, listing, updating, and deleting tasks using Jest.

---

##  Code Quality

Lint and format your code before committing:

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

These are defined in `package.json`:

```json
"scripts": {
  "lint": "eslint app.js",
  "format": "prettier --write app.js"
}
```
