const fs = require("fs")
const {filePath} = require("../utils/taskPaths")
const removeTask = require("../core/removeTask")

jest.mock("fs")

describe("removeTask", () => {
  it("should remove a task from the file", () => {
    const task = "Test task"
    process.argv[3] = task

    removeTask(task)

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)

    const [writtenFilePath, writtenData] = fs.writeFileSync.mock.calls[0];
    expect(writtenFilePath).toBe(filePath);
    expect(writtenData).toBe(JSON.stringify(existingTasks));
  })
})