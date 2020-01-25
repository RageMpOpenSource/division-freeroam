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
        player.outputChatBox(`${index} | ${server.inv.getItemName(item.key)} (${item.key}) | ${item.amount}x`);
    });
});

mp.events.addCommand("giveitem", (player, _, itemKey, amount) => {
    amount = Number(amount);

    if (player.giveItem(itemKey, amount)) {
        player.outputChatBox(`Added ${amount}x ${server.inv.getItemName(itemKey)} (${itemKey}) to your inventory.`);
    } else {
        player.outputChatBox("Failed to give item.");
    }
});

mp.events.addCommand("useitem", (player, _, itemIndex) => {
    itemIndex = Number(itemIndex);

    if (player.useItem(itemIndex)) {
        player.outputChatBox(`Used item at index ${itemIndex}.`);
    } else {
        player.outputChatBox("Failed to use item.");
    }
});

server.inv.addItem("item_bodyarmor", "Body Armor", "Refills your armor when used.", (player, inventoryIndex, itemKey, data) => {
    player.armour = 100;
    player.outputChatBox("Armor refilled.");
    player.removeItem(inventoryIndex);
});