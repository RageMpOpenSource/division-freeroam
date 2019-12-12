mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`Level: ${player.getLevel()}, Money: ${player.getMoney()}, Group: ${player.getVariable('group')}`)
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