"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var gamemode_1 = require("../gamemode");
var deathmatchSpawnPositions = require('./DeathmatchSpawnPositions.json');
var fs = require('fs');
var DeathmatchMapId;
(function (DeathmatchMapId) {
    DeathmatchMapId["ConstructionSite"] = "ConstructionSite";
    DeathmatchMapId["Canyons"] = "Canyons";
    DeathmatchMapId["CannibalHill"] = "CannibalHill";
})(DeathmatchMapId = exports.DeathmatchMapId || (exports.DeathmatchMapId = {}));
var GameModeDataDeathmatch = /** @class */ (function (_super) {
    __extends(GameModeDataDeathmatch, _super);
    function GameModeDataDeathmatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GameModeDataDeathmatch;
}(gamemode_1.GameModeData));
exports.GameModeDataDeathmatch = GameModeDataDeathmatch;
var GameModeDeathMatch = /** @class */ (function (_super) {
    __extends(GameModeDeathMatch, _super);
    function GameModeDeathMatch(gameModeData) {
        var _this = _super.call(this, gameModeData) || this;
        _this.onGamemodeAboutToBegin = function () {
            _super.prototype.onGameModeAboutToBegin.call(_this);
        };
        _this.onGameModeBegin = function () {
            _super.prototype.onGameModeBegin.call(_this);
            _this.currentPlayers.forEach(function (player) {
                player.giveWeapon(mp.joaat("weapon_pistol"), 100);
            });
        };
        _this.onGameModeEnded = function () {
            _super.prototype.onGameModeEnded.call(_this);
        };
        _this.mapId = gameModeData.mapId;
        _this.gameModeBeganMessage = "START KILLIN'!";
        _this.gameModeEndedMessage = "STOP KILLIN'";
        return _this;
    }
    GameModeDeathMatch.prototype.teleportPlayersIn = function () {
        var _this = this;
        this.currentPlayers.forEach(function (player) {
            var pos = _this.spawnPositions[Math.floor(Math.random() * _this.spawnPositions.length)];
            player.spawn(pos);
            player.dimension = _this.id;
        });
    };
    ;
    GameModeDeathMatch.prototype.teleportPlayersOut = function () {
        this.currentPlayers.forEach(function (player) {
            player.position = new mp.Vector3(-58.61702, 1962.915, 190.1862);
            player.dimension = 0;
        });
    };
    ;
    GameModeDeathMatch.prototype.setupGameMode = function () {
        this.loadData();
        _super.prototype.setupGameMode.call(this);
    };
    GameModeDeathMatch.prototype.stopGameMode = function () {
        this.endGameMode();
    };
    GameModeDeathMatch.prototype.endGameMode = function () {
        this.teleportPlayersOut();
    };
    GameModeDeathMatch.prototype.loadData = function () {
        this.spawnPositions = deathmatchSpawnPositions[DeathmatchMapId[this.mapId]].Locations;
    };
    return GameModeDeathMatch;
}(gamemode_1.GameMode));
exports.GameModeDeathMatch = GameModeDeathMatch;
