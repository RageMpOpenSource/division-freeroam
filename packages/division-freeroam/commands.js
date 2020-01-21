mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`Level: ${player.getLevel()}, Money: ${player.getMoney()}, Group: ${player.getGroup()}`)
});

mp.events.addCommand('updatemoney', (player, amount) => {
    player.setMoney(amount);
});

mp.events.addCommand('groups', (player) => {
    server.groupData.forEach(function(group){
        player.outputChatBox(`Group: ${JSON.stringify(group)}`);
    });
});

mp.events.addCommand('changepass', (player, password) => {
    server.auth.changePassword(player, password);
});

//  Testing purposes
mp.events.addCommand('setlevel', (player, level) => {
    player.setLevel(level);
    player.outputChatBox('setlevel ran')
});


mp.events.addCommand('setxp', (player, xp) => {
    player.setXP(xp);
    player.outputChatBox('setxp ran')
});

mp.events.addCommand('changexp', (player, xp) => {
    player.changeXP(xp);
    player.outputChatBox('changexp ran')
});