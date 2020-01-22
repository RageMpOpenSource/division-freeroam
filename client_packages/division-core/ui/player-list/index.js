let origin = 0;
let playerlist = mp.browsers.new('package://division-core/ui/player-list/playerlist.html');
const rpc = require('division-core/rage-rpc.min.js');
playerlist.active = false;

mp.keys.bind(0x73, true, function() {
    playerlist.active = !playerlist.active;
    if((Date.now() - origin) > 5000){   //  5 second check
        origin = Date.now();
        rpc.callServer('retrievePlayerList').then(users => {
            playerlist.execute(`document.getElementById('player-table').innerHTML = ''`);
            users.forEach(info => {
                playerlist.execute(`document.getElementById('player-table').innerHTML += '<tr><th scope="row">${info.id}</th><td>${info.name}</td><td>${info.level}</td><td>${info.ping}</td></tr>'`)
            });
        }).catch(err => mp.gui.chat.push(err));
    }
});