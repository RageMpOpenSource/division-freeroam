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

/**
 * Sets the player's level.
 * @param {int} level - Player level
 * @example
 *  player.setLevel(31);
 */
mp.Player.prototype.setLevel = function(level){
    if(isNaN(level) || level < 0) return this.outputChatBox(`${server.prefix.error} The level you entered is not a number`);
    return this.setVariable('level', level);
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
    let targetGroup = server.groups.getGroup(groupID);
    if(targetGroup == undefined) return;
    this.setVariable('group', groupID);
    this.outputChatBox(`${server.prefix.info} Your group has been updated to ${targetGroup.Name}`);
}