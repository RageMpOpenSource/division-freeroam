//  Credits: https://tutorialedge.net/nodejs/writing-your-own-logging-system-nodejs/
const fs = require("fs");

let Logger = {};

let infoStream = fs.createWriteStream("logs/info.txt", { flags: 'a'});
let errorStream = fs.createWriteStream("logs/error.txt", { flags: 'a'});
let debugStream = fs.createWriteStream("logs/debug.txt", { flags: 'a'});
let adminStream = fs.createWriteStream("logs/admin.txt", { flags: 'a'});

Logger.info = function(msg) {
  writeToStream(infoStream, msg);
  console.log(`${server.chalk.yellow('[INFO]')} ${msg}`)
};

Logger.debug = function(msg) {
  writeToStream(debugStream, msg);
  console.log(`${server.chalk.green('[DEBUG]')} ${msg}`);
};

Logger.error = function(msg) {
  writeToStream(errorStream, msg);
  console.log(`${server.chalk.red('[ERROR]')} ${msg}`);
};

Logger.admin = function(msg){
    writeToStream(adminStream, msg);
}

function writeToStream(stream, msg){
    let message = new Date().toLocaleString() + " : " + msg + "\n";
    stream.write(message);
}

module.exports = Logger;