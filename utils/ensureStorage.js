const fs = require("fs");
const { dirPath, filePath } = require("./taskPaths");

function ensureStorage() {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
}

module.exports = { ensureStorage };