const requiredExperiences = require("../data/xpdata"); // 8000 levels from GTA Online - credit: https://pastebin.com/fFkUygTy
const maxLevel = requiredExperiences.length - 1;
const maxExperience = requiredExperiences[maxLevel];

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