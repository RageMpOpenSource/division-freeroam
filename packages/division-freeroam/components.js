const fs = require('fs')
const modules = fs.readdirSync(__dirname + '/components').map(moduleName => require(`./components/${moduleName}`))
server.groups = require('./components/groups.js');

server.loadCore = function(){
    server.auth = require('./auth.js');
    require('./events/playerChat.js');
    require('./events/playerQuit.js');
    require('./events/playerDeath.js');
    require('./charcreator.js');
    require('./commands.js');
    require('./admin.js');
}

server.loadModules = function(){
    Promise.all(modules.map(comp => comp.start())).then(console.log).catch(console.warn);
}