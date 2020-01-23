"use strict";
exports.__esModule = true;
var gamemodedeathmatch_1 = require("./modes/gamemodedeathmatch");
var GameModeType;
(function (GameModeType) {
    GameModeType[GameModeType["Deathmatch"] = 0] = "Deathmatch";
    GameModeType[GameModeType["LastCarStanding"] = 1] = "LastCarStanding";
})(GameModeType = exports.GameModeType || (exports.GameModeType = {}));
var GameModeManager = /** @class */ (function () {
    function GameModeManager() {
        this.gameModeCounter = 0;
        this.initialise();
    }
    GameModeManager.prototype.initialise = function () {
        this.removeAllGameModes();
        this.gameModeCounter = 0;
        this.currentGameModes = new Array();
    };
    GameModeManager.prototype.removeAllGameModes = function () {
        if (this.currentGameModes == null)
            return;
        this.currentGameModes.forEach(function (gameMode) {
            gameMode.stopGameMode();
        });
    };
    GameModeManager.prototype.createGameMode = function (gameModeData) {
        gameModeData.id = this.gameModeCounter;
        var gm = null;
        if (gameModeData != undefined) {
            gm = new gamemodedeathmatch_1.GameModeDeathMatch(gameModeData);
        }
        this.currentGameModes[this.gameModeCounter] = gm;
        gm.setupGameMode();
        mp.players.local.outputChatBox("Game mode with id " + this.gameModeCounter + " was created!");
        ++this.gameModeCounter;
    };
    GameModeManager.prototype.addPlayerToGameMode = function (player, gameModeId) {
        this.currentGameModes[gameModeId].addPlayer(player);
        return true;
    };
    GameModeManager.prototype.startGameMode = function (player, gameModeId) {
        this.currentGameModes[gameModeId].startGameMode();
        return true;
    };
    GameModeManager.prototype.stopGameMode = function (player, gameModeId) {
        this.currentGameModes[gameModeId].stopGameMode();
        return true;
    };
    GameModeManager.instance = new GameModeManager();
    return GameModeManager;
}());
exports.GameModeManager = GameModeManager;
