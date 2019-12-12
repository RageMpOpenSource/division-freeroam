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