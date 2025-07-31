
function help() {
    console.log("\nTASK CLI - COMMAND LINE TASK MANAGER");
    console.log("##########################################:");
    console.log("\n");
    console.log("################--USAGE--#####################:");
    console.log("  task-cli <command> [arguments]\n");
    console.log("################--AVAILABLE COMMANDS--########:");
    console.log("  add <description>  :       Add a new task");
    console.log("  list               :       List all tasks");
    console.log("  list <id>          :      Show a specific task by ID");
    console.log(
      "  update <id> <description>  :  Update the description of a task",
    );
    console.log("  remove <id>        :       Remove a task by ID");
    console.log("  help               :       Display this help message\n");
    console.log("################--EXAMPLES--###################:");
    console.log('  task-cli add "Buy groceries"');
    console.log("  task-cli list");
    console.log("  task-cli list 2");
    console.log('  task-cli update 2 "Buy fruits instead"');
    console.log("  task-cli remove 3\n");
  }

  module.exports = help