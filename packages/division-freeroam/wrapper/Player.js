const requiredExperiences = require("../data/xpdata"); // 8000 levels from GTA Online - credit: https://pastebin.com/fFkUygTy
const maxLevel = requiredExperiences.length - 1;
const maxExperience = requiredExperiences[maxLevel];
const isEqual = require("lodash.isequal");

const levelFromXP = (xp) => {
    return server.utility.clamp(requiredExperiences.findIndex(lvlXP => lvlXP >= xp), 1, maxLevel);
};

/**
 *  Returns the players money amount.
 *  @return {int} Money amount
 *  @example
 *      player.getMoney();
 */
mp.Player.prototype.getMoney = function(){
    return this.getVariable('money');
}

/**
 *  Sets the player's money.
 *  @param {int} amount - Amount of money to set
 *  @example
 *      player.setMoney(5000);
 */
mp.Player.prototype.setMoney = function(amount){
    if(isNaN(amount) || amount < 0) return this.outputChatBox(`${server.prefix.error} The amount you entered is not a number`);
    return this.setVariable('money', amount);
}

/**
 * Gets the player's level.
 * @return {int} Player level
 * @example
 *  player.getLevel();
 */
mp.Player.prototype.getLevel = function(){
    return this.getVariable('level');
}

mp.Player.prototype.getXP = function(){
    return this.getVariable('xp');
}

/**
 * Sets the player's level.
 * @param {int} newLevel - Level to be set to
 * @example
 *  player.setLevel(31);
 */
mp.Player.prototype.setLevel = function(lvl){
    if(isNaN(lvl)) return;
    let newLevel = parseInt(lvl);
    let prevLevel = this.getLevel();
    this.setVariable('level', server.utility.clamp(newLevel, 1, maxLevel));

    if (this.getLevel() != prevLevel) {
        let prevXP = this.getXP();
        this.setVariable('xp', requiredExperiences[this.getLevel() - 1] + ((this.getLevel() > 1) ? 1 : 0));

        if (this.getXP() != prevXP) mp.events.call("playerXPChange", this, prevXP, this.getXP(), this.getXP() - prevXP);
        mp.events.call("playerLevelChange", this, prevLevel, this.getLevel());
        this.call("updateRankBar", [requiredExperiences[this.getLevel() - 1], requiredExperiences[this.getLevel()], prevXP]);
    }
}

/**
 * Sets the amount of XP. Use changeXP if you want to add or subtract XP.
 * @param {int} xp - XP to be set.
 * @example
 *  player.setXP(3000); //  Will put them at level 3.
 */
mp.Player.prototype.setXP = function(xp){
    if(isNaN(xp)) return;
    let newXP = parseInt(xp);
    let prevXP = this.getXP();
    this.setVariable('xp', server.utility.clamp(newXP, 0, maxExperience));

    if (this.getXP() != prevXP) {
        mp.events.call("playerXPChange", this, prevXP, this.getXP(), this.getXP() - prevXP);

        let calculatedLevel = levelFromXP(this.getXP());
        if (this.getLevel() != calculatedLevel) {
            mp.events.call("playerLevelChange", this, this.getLevel(), calculatedLevel);
            this.setVariable('level', calculatedLevel);
        }

        this.call("updateRankBar", [requiredExperiences[this.getLevel() - 1], requiredExperiences[this.getLevel()], prevXP]);
    }
}

/**
 * Changes the amount of xp on top of the current XP.
 * @param {int} xp - XP to be added onto the current XP
 * @example
 *  player.changeXP(50); // Adds 50 XP on top of a players current XP amount
 */
mp.Player.prototype.changeXP = function(xp){
    if(isNaN(xp)) return;
    let xpAmount = parseInt(xp);
    let prevXP = this.getXP();
    this.setVariable('xp', server.utility.clamp(prevXP + xpAmount, 0, maxExperience));

    if (this.getXP() != prevXP) {
        mp.events.call("playerXPChange", this, prevXP, this.getXP(), this.getXP() - prevXP);

        let calculatedLevel = levelFromXP(this.getXP());
        if (this.getLevel() != calculatedLevel) {
            mp.events.call("playerLevelChange", this, this.getLevel(), calculatedLevel);
            this.setVariable('level', calculatedLevel);
        }

        this.call("updateRankBar", [requiredExperiences[this.getLevel() - 1], requiredExperiences[this.getLevel()], prevXP]);
    }
}

/**
 *  Checks if the player has reached the max level
 */
mp.Player.prototype.hasReachedMaxLevel = function(){
    return this.getLevel() >= maxLevel && this.getXP() >= maxExperience;
}

/**
 * Returns the players group level.
 * @return {int} Group level
 * @example
 *  player.outputChatBox(`Your group level is: ${player.getGroup()}`);
 */
mp.Player.prototype.getGroup = function(){
    return this.getVariable('group');
}

/**
 * Sets the players group level
 * @param {int} groupID - A group level ID
 * @example
 *  //  Set the group level to owner
 *  player.setGroup(255);
 */
mp.Player.prototype.setGroup = function(groupID){
    if(isNaN(groupID)) return;
    let targetGroup = server.groups.getGroup(groupID);
    if(targetGroup == undefined) return;
    this.setVariable('group', groupID);
    this.outputChatBox(`${server.prefix.info} Your group has been updated to ${targetGroup.Name}`);
}

/**
 * Returns the inventory array of the player.
 * @return {object[]} An array that holds all items of the player.
 */
mp.Player.prototype.getInventory = function() {
    return this._inventory;
};

/**
 * Replaces the inventory array of the player with the specified one.
 * @param {Array} newInventory An array that's going to be the new inventory of the player.
 * @return {Boolean} True if successful, false otherwise.
 * @fires inventoryReplaced
 */
mp.Player.prototype.setInventory = function(newInventory) {
    if (Array.isArray(newInventory)) {
        const oldInventory = this._inventory;
        this._inventory = newInventory;

        server.inv.emit("inventoryReplaced", this, oldInventory, newInventory);
        return true;
    } else {
        return false;
    }
};

/**
 * Returns whether the player has the specified item or not.
 * @param  {string}  itemKey Item identifier.
 * @return {Boolean}         True if player has the item, false otherwise.
 */
mp.Player.prototype.hasItem = function(itemKey) {
    return this._inventory.findIndex(i => i.key === itemKey) !== -1;
};

/**
 * Same as hasItem but for items with custom attributes.
 * @param  {string}  itemKey Item identifier.
 * @param  {object}  data    An object that has item attributes.
 * @return {Boolean}         True if player has the item, false otherwise.
 */
mp.Player.prototype.hasItemWithData = function(itemKey, data) {
    return this._inventory.findIndex(i => i.key === itemKey && isEqual(i.data, data)) !== -1;
};

/**
 * Gets the item's index in the player's inventory.
 * @param  {string} itemKey Item identifier.
 * @return {number}         Index of the item, -1 if not found.
 */
mp.Player.prototype.getItemIndex = function(itemKey) {
    return this._inventory.findIndex(i => i.key === itemKey);
};

/**
 * Same as getItemIndex but for items with custom attributes.
 * @param  {string} itemKey Item identifier.
 * @param  {object} data    An object that has item attributes.
 * @return {number}         Index of the item, -1 if not found.
 */
mp.Player.prototype.getItemIndexWithData = function(itemKey, data) {
    return this._inventory.findIndex(i => i.key === itemKey && isEqual(i.data, data));
};

/**
 * Gets how many of the specified item exists in the player's inventory.
 * @param  {string} itemKey Item identifier.
 * @return {number}         Item amount.
 */
mp.Player.prototype.getItemAmount = function(itemKey) {
    return this._inventory.reduce((total, item) => {
        return total + (item.key === itemKey ? item.amount : 0);
    }, 0);
};

/**
 * Same as getItemAmount but for items with custom attributes.
 * @param  {string} itemKey Item identifier.
 * @param  {object} data    An object that has item attributes.
 * @return {number}         Item amount.
 */
mp.Player.prototype.getItemAmountWithData = function(itemKey, data) {
    return this._inventory.reduce((total, item) => {
        return total + (item.key === itemKey && isEqual(item.data, data) ? item.amount : 0);
    }, 0);
};

/**
 * Gets total amount of items the player has in their inventory.
 * @return {number} Amount of all items.
 */
mp.Player.prototype.getTotalItemAmount = function() {
    return this._inventory.reduce((total, item) => {
        return total + item.amount;
    }, 0);
};

/**
 * Gives the specified item to the player.
 * @param  {string} itemKey Item identifier.
 * @param  {number} amount  Amount to give.
 * @param  {object} [data]    Optional - An object that has item attributes.
 * @return {Boolean}         True if successful, false otherwise.
 * @fires itemAdded
 */
mp.Player.prototype.giveItem = function(itemKey, amount, data) {
    if (server.inv.hasItem(itemKey) && Number.isInteger(amount) && amount > 0) {
        const itemIdx = this.getItemIndexWithData(itemKey, data);

        if (itemIdx !== -1) {
            this._inventory[itemIdx].amount += amount;
        } else {
            this._inventory.push({
                key: itemKey,
                amount: amount,
                data: data
            });
        }

        server.inv.emit("itemAdded", this, itemKey, amount, data);
        return true;
    } else {
        return false;
    }
};

/**
 * Uses the item at the specified index of the player's inventory array.
 * @param  {number} itemIdx Index of the item in player's inventory array.
 * @return {Boolean}         True if successful, false otherwise.
 * @fires itemUsed
 */
mp.Player.prototype.useItem = function(itemIdx) {
    if (Number.isInteger(itemIdx) && this._inventory[itemIdx]) {
        const item = this._inventory[itemIdx];
        const itemDef = server.inv.getItem(item.key);
        if (itemDef && typeof itemDef.onUse === "function") itemDef.onUse(this, itemIdx, item.key, item.data);

        server.inv.emit("itemUsed", this, itemIdx, item.key, item.data);
        return true;
    } else {
        return false;
    }
};

/**
 * Removes the item at the specified index of the player's inventory array.
 * @param  {number} itemIdx Index of the item in player's inventory array.
 * @param  {number} [amount]  Optional - Amount to remove.
 * @return {Boolean}         True if successful, false otherwise.
 * @fires itemRemoved
 * @fires itemRemovedCompletely
 */
mp.Player.prototype.removeItem = function(itemIdx, amount = 1) {
    if (Number.isInteger(itemIdx) && this._inventory[itemIdx] && Number.isInteger(amount) && amount > 0) {
        const item = this._inventory[itemIdx];
        this._inventory[itemIdx].amount -= amount;
        server.inv.emit("itemRemoved", this, itemIdx, item.key, amount, item.data);

        if (this._inventory[itemIdx].amount < 1) {
            this._inventory.splice(itemIdx, 1);
            server.inv.emit("itemRemovedCompletely", this, item.key, item.data);
        }

        return true;
    } else {
        return false;
    }
};