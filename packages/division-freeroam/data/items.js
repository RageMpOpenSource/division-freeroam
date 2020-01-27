server.inv.addItem('item_bodyarmour', 'Body Armor', 'Refills your body armour', (player, inventoryIndex, itemKey, data) => {
    player.armour = 100;
    player.outputChatBox("Armor refilled.");
    player.removeItem(inventoryIndex);
});

server.inv.addItem('item_apple', 'Apple', 'Adds 10 to your health when eaten', (player, inventoryIndex, itemKey, data) => {
    player.health += 10;
    player.outputChatBox("Apple eaten");
    player.removeItem(inventoryIndex);
});

server.inv.addItem('item_coin', 'Coin', 'A lucky coin.', (player, inventoryIndex, itemKey, data) => {
    player.outputChatBox('You look at the coin.');
});