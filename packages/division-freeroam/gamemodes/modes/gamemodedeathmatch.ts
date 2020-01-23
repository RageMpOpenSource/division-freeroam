import { GameMode, GameModeData } from "../gamemode";
import { ServerEvent } from "../../events/events";
import { GameModeType } from "../gamemodemanager";
let deathmatchSpawnPositions = require('./DeathmatchSpawnPositions.json');

var fs = require('fs');

export enum DeathmatchMapId {
    ConstructionSite = "ConstructionSite",
    Canyons = "Canyons",
    CannibalHill = "CannibalHill",
}

export class GameModeDataDeathmatch extends GameModeData {
    mapId: DeathmatchMapId;
}

export class GameModeDeathMatch extends GameMode {

    spawnPositions: Array<Vector3Mp>;
    mapId: DeathmatchMapId;

    constructor(gameModeData: GameModeDataDeathmatch) {
        super(gameModeData);
        this.mapId = gameModeData.mapId;

        this.gameModeBeganMessage = "START KILLIN'!";
        this.gameModeEndedMessage = "STOP KILLIN'";
    }

    teleportPlayersIn() {
        this.currentPlayers.forEach(player => {
            var pos = this.spawnPositions[Math.floor(Math.random() * this.spawnPositions.length)];
            player.spawn(pos);
            player.dimension = this.id;
        });
    };

    teleportPlayersOut() {
        this.currentPlayers.forEach(player => {
            player.position = new mp.Vector3(-58.61702, 1962.915, 190.1862);
            player.dimension = 0;
        });
    };


    setupGameMode() {
        this.loadData();
        super.setupGameMode();
    }

    stopGameMode() {
        this.endGameMode();
    }

    endGameMode() {
        this.teleportPlayersOut();
    }

    loadData() {
        this.spawnPositions = deathmatchSpawnPositions[DeathmatchMapId[this.mapId]].Locations;
    }

    onGamemodeAboutToBegin = () => {
        super.onGameModeAboutToBegin();
    }


    onGameModeBegin = () => {
        super.onGameModeBegin();
        this.currentPlayers.forEach(player => {
            player.giveWeapon(mp.joaat("weapon_pistol"), 100);
        });
    }

    onGameModeEnded = () => {
        super.onGameModeEnded();
    }
}