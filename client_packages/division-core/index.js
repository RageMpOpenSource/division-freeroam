require('division-core/keybinds.js');
require('division-core/ui/rage-ui.js');

//  Set all stats to max for all players to be equal
mp.game.stats.statSetInt(mp.game.joaat('SP0_STAMINA'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_STRENGTH'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_LUNG_CAPACITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_WHEELIE_ABILITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_FLYING_ABILITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_SHOOTING_ABILITY'), 100, false);
mp.game.stats.statSetInt(mp.game.joaat('SP0_STEALTH_ABILITY'), 100, false);
