import { GameModeType, GameModeManager } from "./gamemodemanager";
import { GameModeDataDeathmatch, DeathmatchMapId } from "./modes/gamemodedeathmatch";
import { GameModeData } from "./gamemode";

mp.events.addCommand("creategm", (player, fullText, type, maxPlayers, isPrivate, mapId) => {

    var gameModeData: GameModeData = null;
    var gameModeType: GameModeType = parseInt(type);

    if (gameModeType == GameModeType.LastCarStanding) {
        //TODO
    }

    if (gameModeType == GameModeType.Deathmatch) {
        gameModeData = new GameModeDataDeathmatch();
        let deathmatchMapId: DeathmatchMapId = Object.values(DeathmatchMapId)[parseInt(mapId)] as DeathmatchMapId;
        console.log("MAP DATA " + deathmatchMapId + " - " + mapId);
        (gameModeData as GameModeDataDeathmatch).mapId = deathmatchMapId;
    }

    gameModeData.isPrivate = isPrivate == "1";
    gameModeData.maxPlayers = parseInt(maxPlayers);
    gameModeData.minPlayers = 1;
    gameModeData.type = gameModeType;

    GameModeManager.instance.createGameMode(gameModeData);
})

mp.events.addCommand("joingm", (player, gameModeId) => {
    if (GameModeManager.instance.addPlayerToGameMode(player, parseInt(gameModeId))) {
        player.outputChatBox("You have been added to the game mode!");
    } else {
        player.outputChatBox("You could not be added to the game mode!");
    }
});

mp.events.addCommand("startgm", (player, gameModeId) => {
    if (GameModeManager.instance.startGameMode(player, parseInt(gameModeId))) {
        player.outputChatBox("Game mode started");
    } else {
        player.outputChatBox("Game mode could not be started!");
    }
});

mp.events.addCommand("stopgm", (player, gameModeId) => {
    if (GameModeManager.instance.stopGameMode(player, parseInt(gameModeId))) {
        player.outputChatBox("Game mode started");
    } else {
        player.outputChatBox("Game mode could not be started!");
    }
});

