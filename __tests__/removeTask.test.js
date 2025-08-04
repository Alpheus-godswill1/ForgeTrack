const fs = require("fs");
const { filePath } = require("../utils/taskPaths");
const removeTask = require("../core/removeTask");
const logger = require("../services/log");


jest.mock("fs");
jest.mock("../services/log");

describe("removeTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove a task by ID and write updated tasks to file", () => {
    const mockTasks = [
      { id: 1, description: "A", status: "todo" },
      { id: 2, description: "B", status: "done" },
      { id: 3, description: "C", status: "todo" },
    ];

    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

    removeTask("3");

    const updatedTasks = [
      { id: 1, description: "A", status: "todo" },
      { id: 2, description: "B", status: "done" },
    ];

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(updatedTasks, null, 2),
      "utf8"
    );

    expect(logger.info).toHaveBeenCalledWith(
      '\nTask deleted successfully - ID: 3, Description: "C"'
    );
  });

  it("should log a warning if task ID is not found", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([]));

    removeTask("10");

    expect(logger.warn).toHaveBeenCalledWith(
      "\nDelete task requested - Task ID 10 not found"
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it("should log an error if an exception occurs", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File read error");
    });

    removeTask("1");

    expect(logger.error).toHaveBeenCalledWith(
      "\nFailed to delete task: File read error"
    );
  });
});

