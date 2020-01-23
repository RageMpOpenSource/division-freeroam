import { GameMode, GameModeData } from './gamemode';
import { GameModeDeathMatch, DeathmatchMapId, GameModeDataDeathmatch } from './modes/gamemodedeathmatch';

export enum GameModeType {
    Deathmatch = 0,
    LastCarStanding = 1
}

export class GameModeManager {

    static instance: GameModeManager = new GameModeManager();

    gameModeCounter: number = 0;
    currentGameModes: Array<GameMode>;

    constructor() {
        this.initialise();
    }

    initialise() {
        this.removeAllGameModes();
        this.gameModeCounter = 0;
        this.currentGameModes = new Array<GameMode>();
    }



    removeAllGameModes() {
        if (this.currentGameModes == null) return;
        this.currentGameModes.forEach(gameMode => {
            gameMode.stopGameMode();
        });
    }

    createGameMode(gameModeData: GameModeData) {
        gameModeData.id = this.gameModeCounter;
        let gm: GameMode = null;

        if ((gameModeData as GameModeDataDeathmatch) != undefined) {
            gm = new GameModeDeathMatch(gameModeData as GameModeDataDeathmatch);
        }


        this.currentGameModes[this.gameModeCounter] = gm;
        gm.setupGameMode();
        mp.players.local.outputChatBox("Game mode with id " + this.gameModeCounter + " was created!");
        ++this.gameModeCounter;
    }


    addPlayerToGameMode(player: PlayerMp, gameModeId: number): boolean {
        this.currentGameModes[gameModeId].addPlayer(player);
        return true;
    }
    
    startGameMode(player: PlayerMp, gameModeId: number): boolean {
        this.currentGameModes[gameModeId].startGameMode();
        return true;
    }
     
    stopGameMode(player: PlayerMp, gameModeId: number): boolean {
        this.currentGameModes[gameModeId].stopGameMode();
        return true;
    }
}

