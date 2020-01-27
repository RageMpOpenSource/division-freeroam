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

mp.events.addCommand("inventory", (player) => {
    const inventory = player.getInventory();

    player.outputChatBox("Your inventory:");
    inventory.forEach((item, index) => {
        player.outputChatBox(`${index} | ${server.inv.getItemName(item.key)}[x${item.amount}]`);
    });
});

mp.events.addCommand("useitem", (player, _, itemIndex) => {
    itemIndex = Number(itemIndex);

    player.useItem(itemIndex)
});