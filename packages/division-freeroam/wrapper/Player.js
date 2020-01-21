const requiredExperiences = require("../data/xpdata"); // 8000 levels from GTA Online - credit: https://pastebin.com/fFkUygTy
const maxLevel = requiredExperiences.length - 1;
const maxExperience = requiredExperiences[maxLevel];

const clamp = (value, min, max) => {
    return value <= min ? min : value >= max ? max : value;
};

const levelFromXP = (xp) => {
    return clamp(requiredExperiences.findIndex(lvlXP => lvlXP >= xp), 1, maxLevel);
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
    return this.data.currentLevel;
}

/**
 * Sets the player's level.
 * @param {int} newLevel - Level to be set to
 * @example
 *  player.setLevel(31);
 */
mp.Player.prototype.setLevel = function(newLevel){
    if(isNaN(newLevel)) return this.outputChatBox(`${server.prefix.error} You did not enter a valid number`)
    let lvl = parseInt(newLevel);
    let prevLevel = this.getLevel();
    this.data.currentLevel = clamp(lvl, 1, maxLevel);

    if (this.data.currentLevel != prevLevel) {
        let prevXP = this.data.currentXP;
        this.data.currentXP = requiredExperiences[this.data.currentLevel - 1] + ((this.data.currentLevel > 1) ? 1 : 0);

        if (this.data.currentXP != prevXP) mp.events.call("playerXPChange", this, prevXP, this.data.currentXP, this.data.currentXP - prevXP);
        mp.events.call("playerLevelChange", this, prevLevel, this.data.currentLevel);
        this.call("updateRankBar", [requiredExperiences[this.data.currentLevel - 1], requiredExperiences[this.data.currentLevel], prevXP]);
    }
}

/**
 * Sets the amount of XP. Use changeXP if you want to add or subtract XP.
 * @param {int} xp - XP to be set.
 * @example
 *  player.setXP(3000); //  Will put them at level 3.
 */
mp.Player.prototype.setXP = function(xp){
    console.log(`set xp ran`)
    let newXP = parseInt(xp);
    let prevXP = this.data.currentXP;
    this.data.currentXP = clamp(newXP, 0, maxExperience);

    if (this.data.currentXP != prevXP) {
        mp.events.call("playerXPChange", this, prevXP, this.data.currentXP, this.data.currentXP - prevXP);

        let calculatedLevel = levelFromXP(this.data.currentXP);
        if (this.data.currentLevel != calculatedLevel) {
            mp.events.call("playerLevelChange", this, this.data.currentLevel, calculatedLevel);
            this.data.currentLevel = calculatedLevel;
        }

        this.call("updateRankBar", [requiredExperiences[this.data.currentLevel - 1], requiredExperiences[this.data.currentLevel], prevXP]);
    }
}

/**
 * Changes the amount of xp on top of the current XP.
 * @param {int} xp - XP to be added onto the current XP
 * @example
 *  player.changeXP(50); // Adds 50 XP on top of a players current XP amount
 */
mp.Player.prototype.changeXP = function(xp){
    let xpAmount = parseInt(xp);
    let prevXP = this.data.currentXP;
    this.data.currentXP = clamp(prevXP + xpAmount, 0, maxExperience);

    if (this.data.currentXP != prevXP) {
        mp.events.call("playerXPChange", this, prevXP, this.data.currentXP, this.data.currentXP - prevXP);

        let calculatedLevel = levelFromXP(this.data.currentXP);
        if (this.data.currentLevel != calculatedLevel) {
            mp.events.call("playerLevelChange", this, this.data.currentLevel, calculatedLevel);
            this.data.currentLevel = calculatedLevel;
        }

        this.call("updateRankBar", [requiredExperiences[this.data.currentLevel - 1], requiredExperiences[this.data.currentLevel], prevXP]);
    }
    console.log(`set changexp ran`)
}

/**
 *  Checks if the player has reached the max level
 */
mp.Player.prototype.hasReachedMaxLevel = function(){
    return this.data.currentLevel >= maxLevel && this.data.currentXP >= maxExperience;
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