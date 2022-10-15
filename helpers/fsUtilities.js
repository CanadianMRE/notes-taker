const fs = require('fs');

function fileCb(error) {
    console.log(error);
}

function readFromFile(path) {
    let data = fs.readFileSync(path, 'utf8', fileCb);
    if (data == null || data == "undefined" || data == "") {
        data = JSON.stringify([]);
    }

    return JSON.parse(data);
}

function writeToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data), fileCb)
}

function readAndAppend(filePath, data) {
    let newData = readFromFile(filePath);
    newData.push(data);

    writeToFile(filePath, newData);
}

function readAndRemove(filePath, id) {
    let newData = readFromFile(filePath);
    
    for (const index in newData) {
        if (newData[index].id == id) {
            newData.splice(index, 1);
        }
    }

    writeToFile(filePath, newData);
}

module.exports = {
    readAndAppend,
    readFromFile,
    writeToFile,
    readAndRemove
}