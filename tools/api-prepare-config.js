"use strict";

const fs = require('fs');
const appRoot = require('app-root-path');

const apiPhysicalPath = appRoot.path + "\\.dist_api";
const tmpDir = appRoot.path + "\\.tmp";
const tmpLogsDir = tmpDir + "\\Logs";
const tmpTraceLogsDir = tmpDir + "\\TraceLogs";
const outputConfigFilePath = tmpDir + "\\apihost.config";

if (!fs.existsSync(tmpDir)) {
    fs.mkdir(tmpDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}
if (!fs.existsSync(tmpLogsDir)) {
    fs.mkdir(tmpLogsDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}
if (!fs.existsSync(tmpTraceLogsDir)) {
    fs.mkdir(tmpTraceLogsDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

fs.readFile("./tools/apihost.config.template", 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    const result = data
    .replace("[PUBLISHED_API_ABSOLUTE_PATH]", apiPhysicalPath)
    .replace("[LOG_FILES_PATH]", tmpLogsDir)
    .replace("[LOG_FILES_TRACE]", tmpTraceLogsDir);

    fs.writeFile(outputConfigFilePath, result, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
});

console.log("The location of IISExpress configuration file is [" + outputConfigFilePath + "]");
console.log("The WebAPI host path was set as [" + apiPhysicalPath + "]");