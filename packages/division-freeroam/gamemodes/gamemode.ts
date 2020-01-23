import { GameModeType } from "./gamemodemanager";
import { ServerEvent } from "../events/events";
import { start } from "repl";

export class GameModeData {
    id: number;
    type: GameModeType;
    isPrivate: boolean;
    minPlayers: number;
    maxPlayers: number;
}



export class GameMode {
    id: number = 0;
    isPrivate: boolean = false;
    currentPlayers: Array<PlayerMp> = null;
    minPlayers: number = 0;
    maxPlayers: number = 0;
    type: GameModeType;

    totalWaitTimeTillGameModeStarts: number;
    timeTillGameModeStarts: number;
    startInterval: any = null;

    //Overridden
    gameModeBeganMessage: string;
    gameModeEndedMessage: string;

    //Add default teleports w/ spawn points (can be overriden by children for things like spawning in vehicles on start)
    teleportPlayersIn() { }
    teleportPlayersOut() { }

    constructor(gameModeData: GameModeData) {
        this.id = gameModeData.id;
        this.isPrivate = gameModeData.isPrivate;
        this.minPlayers = gameModeData.minPlayers;
        this.maxPlayers = gameModeData.maxPlayers;
        this.type = gameModeData.type;
        this.currentPlayers = new Array<PlayerMp>();

        this.totalWaitTimeTillGameModeStarts = 8;
        this.timeTillGameModeStarts = this.totalWaitTimeTillGameModeStarts;

        this.startInterval = setInterval(() => {
            if (this.currentPlayers.length >= this.minPlayers) {
                --this.timeTillGameModeStarts;
                if (this.timeTillGameModeStarts == 5) {
                    // this.onGameModeAboutToBegin();
                }
                if (this.timeTillGameModeStarts <= 0) {
                    // this.notifyPlayers("Game mode started!");
                    // clearInterval(this.startInterval);
                    // this.onGameModeBegin();
                }
            } else if (this.timeTillGameModeStarts < this.totalWaitTimeTillGameModeStarts) {
                this.timeTillGameModeStarts = this.totalWaitTimeTillGameModeStarts;
            }
        }, 1000)
    }

    setupGameMode() {
        console.log("Game mode setup!");
    }

    stopGameMode() {
        this.notifyPlayers("Game mode stopped by admin!");
        this.onGameModeEnded();
    }

    startGameMode() {
        this.teleportPlayersIn();
        this.notifyPlayers("Game mode started by admin!");
        this.onGameModeBegin();
    }

    onGameModeAboutToBegin() {
        this.teleportPlayersIn();
        this.notifyPlayers("The game mode is about to start.");
        mp.events.call(ServerEvent.GameModeAboutToBegin, [this.id])
    }

    onGameModeBegin() {
        this.notifyPlayers(this.gameModeBeganMessage);
        mp.events.call(ServerEvent.GameModeBegin, [this.id])
    }
    onGameModeEnded() {
        this.notifyPlayers(this.gameModeEndedMessage);
        mp.events.call(ServerEvent.GameModeEnded, [this.id])
    }

    onGameModeStopped() {
        mp.events.call(ServerEvent.GameModeStopped, [this.id])
    }
    addPlayer(player: PlayerMp) {
        this.currentPlayers.push(player);
    }
    notifyPlayers(message: string) {
        this.currentPlayers.forEach(player => {
            player.outputChatBox("[GameMode] " + message);
        });
    }

}

