/**
 *  Division Freeroam
 *  Github: https://github.com/MrPancakers/division-freeroam
 *  Author: MrPancakers
 *  Credits:
 *      +> root [v-cargens](https://github.com/root-cause/v-cargens)
 */

setInterval(()=>{}, 0); //  Used to fix async stuff

global.server = {};

const fs = require('fs');
server.chalk = require('chalk');
require('./components.js');

if(!fs.existsSync(`${__dirname}/config.json`)){
    console.log(`${chalk.red('You do not have a \'config.json\' file setup.')}`);
    process.exit(0);
} else {
    server.config = require('./config.json');
}

server.prefix = {};
server.prefix.error = '!{eb4d4b}[ERROR] !{fff}';
server.prefix.info = '!{686de0}[INFO] !{fff}';
server.prefix.permission = '!{eb4d4b}You do not have permission to use that command.';
server.prefix.syntax = '!{6ab04c}[USAGE] !{fff}';
server.prefix.server = '!{42f49b}[SERVER] !{fff}';

(async () => {
    server.db = await require('./database.js');
})();

require('./wrapper/Player.js');