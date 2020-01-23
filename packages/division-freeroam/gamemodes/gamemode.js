"use strict";
exports.__esModule = true;
var events_1 = require("../events/events");
var GameModeData = /** @class */ (function () {
    function GameModeData() {
    }
    return GameModeData;
}());
exports.GameModeData = GameModeData;
var GameMode = /** @class */ (function () {
    function GameMode(gameModeData) {
        var _this = this;
        this.id = 0;
        this.isPrivate = false;
        this.currentPlayers = null;
        this.minPlayers = 0;
        this.maxPlayers = 0;
        this.startInterval = null;
        this.id = gameModeData.id;
        this.isPrivate = gameModeData.isPrivate;
        this.minPlayers = gameModeData.minPlayers;
        this.maxPlayers = gameModeData.maxPlayers;
        this.type = gameModeData.type;
        this.currentPlayers = new Array();
        this.totalWaitTimeTillGameModeStarts = 8;
        this.timeTillGameModeStarts = this.totalWaitTimeTillGameModeStarts;
        this.startInterval = setInterval(function () {
            if (_this.currentPlayers.length >= _this.minPlayers) {
                --_this.timeTillGameModeStarts;
                if (_this.timeTillGameModeStarts == 5) {
                    // this.onGameModeAboutToBegin();
                }
                if (_this.timeTillGameModeStarts <= 0) {
                    // this.notifyPlayers("Game mode started!");
                    // clearInterval(this.startInterval);
                    // this.onGameModeBegin();
                }
            }
            else if (_this.timeTillGameModeStarts < _this.totalWaitTimeTillGameModeStarts) {
                _this.timeTillGameModeStarts = _this.totalWaitTimeTillGameModeStarts;
            }
        }, 1000);
    }
    //Add default teleports w/ spawn points (can be overriden by children for things like spawning in vehicles on start)
    GameMode.prototype.teleportPlayersIn = function () { };
    GameMode.prototype.teleportPlayersOut = function () { };
    GameMode.prototype.setupGameMode = function () {
        console.log("Game mode setup!");
    };
    GameMode.prototype.stopGameMode = function () {
        this.notifyPlayers("Game mode stopped by admin!");
        this.onGameModeEnded();
    };
    GameMode.prototype.startGameMode = function () {
        this.teleportPlayersIn();
        this.notifyPlayers("Game mode started by admin!");
        this.onGameModeBegin();
    };
    GameMode.prototype.onGameModeAboutToBegin = function () {
        this.teleportPlayersIn();
        this.notifyPlayers("The game mode is about to start.");
        mp.events.call(events_1.ServerEvent.GameModeAboutToBegin, [this.id]);
    };
    GameMode.prototype.onGameModeBegin = function () {
        this.notifyPlayers(this.gameModeBeganMessage);
        mp.events.call(events_1.ServerEvent.GameModeBegin, [this.id]);
    };
    GameMode.prototype.onGameModeEnded = function () {
        this.notifyPlayers(this.gameModeEndedMessage);
        mp.events.call(events_1.ServerEvent.GameModeEnded, [this.id]);
    };
    GameMode.prototype.onGameModeStopped = function () {
        mp.events.call(events_1.ServerEvent.GameModeStopped, [this.id]);
    };
    GameMode.prototype.addPlayer = function (player) {
        this.currentPlayers.push(player);
    };
    GameMode.prototype.notifyPlayers = function (message) {
        this.currentPlayers.forEach(function (player) {
            player.outputChatBox("[GameMode] " + message);
        });
    };
    return GameMode;
}());
exports.GameMode = GameMode;
