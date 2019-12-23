require('division-core/keybinds.js');
require('division-core/ui/rage-ui.js');
require('division-core/auth.js');

let isFrozen = false;

mp.events.add({
    'render': () => {
        if(isFrozen) mp.game.controls.disableAllControlActions(0);
        mp.game.player.setHealthRechargeMultiplier(0.2);
    },
    'freezePlayer': (user) => {
        user.freezePosition(true);
        isFrozen = true;
    },
    'unfreezePlayer': (user) => {
        user.freezePosition(false);
        isFrozen = false;
    }
});

//  Set all stats to max for all players to be equal
mp.game.stats.statSetInt(mp.game.joaat('SP0_STAMINA'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_STRENGTH'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_LUNG_CAPACITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_WHEELIE_ABILITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_FLYING_ABILITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_SHOOTING_ABILITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_STEALTH_ABILITY'), 100, false);

//  Jail Doors
mp.game.object.doorControl(631614199, 461.8065, -994.4086, 25.06443, true, 0.0, 50.0, 0.0);
mp.game.object.doorControl(631614199, 461.8065, -997.6583, 25.06443, true, 0.0, 50.0, 0.0);
mp.game.object.doorControl(631614199, 461.8065, -1001.302, 25.06443, true, 0.0, 50.0, 0.0);
