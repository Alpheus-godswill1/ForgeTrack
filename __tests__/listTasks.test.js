const fs = require("fs");
const listTasks = require("../core/listTasks");
const logger = require("../services/log");

jest.mock("fs");
jest.mock("../services/log");

describe("listTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const tasks = [
    { id: 1, description: "Test Task 1", status: "todo" },
    { id: 2, description: "Review code", status: "done" },
    { id: 3, description: "Test C", status: "todo" },
  ];

  it("should log a message when no tasks exist", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([]));

    listTasks();

    expect(logger.info).toHaveBeenCalledWith("List tasks requested - No tasks found");
  });

  it("should log all tasks when taskArg is not passed", () => {
   
    fs.readFileSync.mockReturnValue(JSON.stringify(tasks));
    console.log = jest.fn();

    listTasks();

    expect(logger.info).toHaveBeenCalledWith("\nList tasks requested - Found 3 total tasks");
    expect(console.log).toHaveBeenCalledWith("[1] Test Task 1 - Status: todo");
    expect(console.log).toHaveBeenCalledWith("[2] Review code - Status: done");
    expect(console.log).toHaveBeenCalledWith("[3] Test C - Status: todo");
  });

  it("should show a single task when taskArg is a valid ID", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(tasks));

    listTasks("2");

    expect(logger.info).toHaveBeenCalledWith(
      "\nList task requested: Found task ID [2]: Review code - Status: done"
    );
  });

  it("should show a warning when task ID is not found", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(tasks));

    listTasks("5");

    expect(logger.warn).toHaveBeenCalledWith("List task requested - Task ID 5 not found");
  });

  it("should filter and list tasks by status", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(tasks));

    listTasks("todo");

    expect(logger.info).toHaveBeenCalledWith('\nList tasks requested - Found 2 "todo" tasks');
    expect(logger.info).toHaveBeenCalledWith("\n[1] Test Task 1 - Status: todo");
    expect(logger.info).toHaveBeenCalledWith("\n[3] Test C - Status: todo");
  });

  it("should log an error if readFileSync throws", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("Disk failure");
    });

    listTasks();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Failed to list tasks: Disk failure")
    );
  });
});
