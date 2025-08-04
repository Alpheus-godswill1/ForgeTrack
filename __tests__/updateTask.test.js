const fs = require("fs");
const { filePath } = require("../utils/taskPaths");
const updateTask = require("../core/updateTask");
const logger = require("../services/log");

jest.mock("fs");
jest.mock("../services/log");

describe("updateTask", () => {
  const mockTasks = [
    { id: 1, description: "Task 1", status: "todo" },
    { id: 2, description: "Task 2", status: "in-progress" },
    { id: 3, description: "Task 3", status: "done" },
  ];

  // Utility: get parsed data written to file
  const getWrittenData = () => {
    const [writtenFilePath, writtenData, writtenEncoding] = fs.writeFileSync.mock.calls[0];
    return {
      writtenFilePath,
      parsedData: JSON.parse(writtenData),
      writtenEncoding,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));
  });

  it("should update task description", () => {
    process.argv = ["node", "task-cli", "update", "1", "Updated", "Task"];
    updateTask();

    const { writtenFilePath, parsedData, writtenEncoding } = getWrittenData();

    expect(writtenFilePath).toBe(filePath);
    expect(writtenEncoding).toBe("utf8");

    expect(parsedData[0]).toEqual(
      expect.objectContaining({
        id: 1,
        description: "Updated Task",
        status: "todo",
        updatedAt: expect.any(String),
      })
    );

    expect(parsedData[1]).toEqual(mockTasks[1]);
    expect(logger.info).toHaveBeenCalledWith("\nTask [1] successfully updated.");
  });

  it("should update task status to in-progress", () => {
    process.argv = ["node", "task-cli", "task-in-progress", "2"];
    updateTask();

    const { writtenFilePath, parsedData, writtenEncoding } = getWrittenData();
    const updatedTask = parsedData.find(task => task.id === 2);
    expect(updatedTask).toEqual(
      expect.objectContaining({
        id: 2,
        description: "Task 2",
        status: "in-progress",
        updatedAt: expect.any(String),
      })
    );

    expect(writtenFilePath).toBe(filePath);
    expect(writtenEncoding).toBe("utf8");
    expect(logger.info).toHaveBeenCalledWith("\nTask [2] marked as in-progress.");
  });

  it("should update task status to done", () => {
    process.argv = ["node", "task-cli", "task-done", "3"];
    updateTask();

    const { writtenFilePath, parsedData, writtenEncoding } = getWrittenData();

    const updatedTask = parsedData.find(task => task.id === 3);
    expect(updatedTask).toEqual(
      expect.objectContaining({
        id: 3,
        description: "Task 3",
        status: "done",
        updatedAt: expect.any(String),
      })
    );

    expect(writtenFilePath).toBe(filePath);
    expect(writtenEncoding).toBe("utf8");
    expect(logger.info).toHaveBeenCalledWith("\nTask [3] marked as done.");
  });

  it("should warn if task description is missing", () => {
    process.argv = ["node", "task-cli", "update", "1"];
    updateTask();

    expect(logger.warn).toHaveBeenCalledWith(
      "\nDescription cannot be empty. Use: task-cli update <id> <new description>"
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it("should warn if task ID is not found", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([]));
    process.argv = ["node", "task-cli", "update", "99", "New", "desc"];
    updateTask();

    expect(logger.warn).toHaveBeenCalledWith("\nNo tasks found.");
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
