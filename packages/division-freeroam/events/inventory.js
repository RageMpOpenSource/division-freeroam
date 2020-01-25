/**
 * itemAdded
 * This event is called when a player receives an item.
 * @param {player} player The player who received the item.
 * @param {string} key Item identifier.
 * @param {number} amount Amount the player received.
 * @param {object} data Item attributes.
 */
server.inv.on("itemAdded", (player, key, amount, data) => {
    console.log(`DEBUG: ${player.name} received ${amount}x ${key}.`);
});
/**
 * itemUsed
 * This event is called when a player uses an item.
 * @param {player} player The player who used the item.
 * @param {number} invIdx Index of the item in player's inventory.
 * @param {string} key Item identifier.
 * @param {object} data Item attributes.
 */
server.inv.on("itemUsed", (player, invIdx, key, data) => {
    console.log(`DEBUG: ${player.name} used ${key}.`);
});
/**
 * itemRemoved
 * This event is called when an item is removed from a player's inventory.
 * @param {player} player The player who lost an item.
 * @param {number} invIdx Index of the item that got removed in player's inventory.
 * @param {string} key Item identifier.
 * @param {number} amount Removed item amount.
 * @param {object} data Item attributes.
 */
server.inv.on("itemRemoved", (player, invIdx, key, amount, data) => {
    console.log(`DEBUG: ${player.name} lost ${amount}x ${key}.`);
});
/**
 * itemRemovedCompletely
 * This event is called when an item is no longer in a player's inventory.
 * @param {player} player The player who lost an item.
 * @param {string} key Item identifier.
 * @param {object} data Item attributes.
 */
server.inv.on("itemRemovedCompletely", (player, key, data) => {
    console.log(`DEBUG: ${player.name} no longer has ${key} (${data ? "with data" : "without data"}) in their inventory.`);
});

/**
 * inventoryReplaced
 * This event is called when a player's inventory array gets changed by player.setInventory()
 * @param {player} player The player who had an inventory change.
 * @param {object[]} oldInventory The player's old inventory array.
 * @param {object[]} newInventory The player's new inventory array.
 */
server.inv.on("inventoryReplaced", (player, oldInventory, newInventory) => {
    console.log(`DEBUG: ${player.name} had their inventory replaced. (Old item count: ${oldInventory.length}, new: ${newInventory.length})`);
});