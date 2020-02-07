mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`Level: ${player.getLevel()}, Money: ${player.getMoney()}, Group: ${player.getGroup()}, Kills: ${player.getVariable('kills')}, Deaths: ${player.getVariable('deaths')}`);
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
    if(!password) return player.outputChatBox(`${server.prefix.syntax} /changepass [password]`)
    server.auth.changePassword(player, password);
});

mp.events.addCommand('time', (player) => {
    let time = server.time.getTime();
    player.outputChatBox(`The time is: ${time}`);
})