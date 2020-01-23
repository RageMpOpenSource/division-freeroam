"use strict";
exports.__esModule = true;
var gamemodemanager_1 = require("./gamemodemanager");
var gamemodedeathmatch_1 = require("./modes/gamemodedeathmatch");
mp.events.addCommand("creategm", function (player, fullText, type, maxPlayers, isPrivate, mapId) {
    var gameModeData = null;
    var gameModeType = parseInt(type);
    if (gameModeType == gamemodemanager_1.GameModeType.LastCarStanding) {
        //TODO
    }
    if (gameModeType == gamemodemanager_1.GameModeType.Deathmatch) {
        gameModeData = new gamemodedeathmatch_1.GameModeDataDeathmatch();
        var deathmatchMapId = Object.values(gamemodedeathmatch_1.DeathmatchMapId)[parseInt(mapId)];
        console.log("MAP DATA " + deathmatchMapId + " - " + mapId);
        gameModeData.mapId = deathmatchMapId;
    }
    gameModeData.isPrivate = isPrivate == "1";
    gameModeData.maxPlayers = parseInt(maxPlayers);
    gameModeData.minPlayers = 1;
    gameModeData.type = gameModeType;
    gamemodemanager_1.GameModeManager.instance.createGameMode(gameModeData);
});
mp.events.addCommand("joingm", function (player, gameModeId) {
    if (gamemodemanager_1.GameModeManager.instance.addPlayerToGameMode(player, parseInt(gameModeId))) {
        player.outputChatBox("You have been added to the game mode!");
    }
    else {
        player.outputChatBox("You could not be added to the game mode!");
    }
});
mp.events.addCommand("startgm", function (player, gameModeId) {
    if (gamemodemanager_1.GameModeManager.instance.startGameMode(player, parseInt(gameModeId))) {
        player.outputChatBox("Game mode started");
    }
    else {
        player.outputChatBox("Game mode could not be started!");
    }
});
mp.events.addCommand("stopgm", function (player, gameModeId) {
    if (gamemodemanager_1.GameModeManager.instance.stopGameMode(player, parseInt(gameModeId))) {
        player.outputChatBox("Game mode started");
    }
    else {
        player.outputChatBox("Game mode could not be started!");
    }
});
