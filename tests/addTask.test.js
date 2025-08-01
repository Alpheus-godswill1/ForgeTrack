const fs = require("fs");
const addTask = require("../core/addTask");
const { filePath } = require("../utils/taskPaths");

jest.mock("fs");

describe("addTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a task to the file", () => {
    const task = "Test task";
    process.argv[3] = task;

    const existingTasks = [];
    fs.readFileSync.mockReturnValue(JSON.stringify(existingTasks));

    fs.writeFileSync = jest.fn();

    addTask(task);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

    const [writtenFilePath, writtenData] = fs.writeFileSync.mock.calls[0];
    expect(writtenFilePath).toBe(filePath);

    const writtenTasks = JSON.parse(writtenData);
    expect(writtenTasks).toHaveLength(1);
    expect(writtenTasks[0].description).toBe(task);
    expect(["todo", "in-progress", "done"]).toContain(writtenTasks[0].status);
    expect(writtenTasks[0].createdAt).toBeDefined();
    expect(writtenTasks[0].updatedAt).toBeDefined();
  });
});
