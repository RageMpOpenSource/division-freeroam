/*
    Admin Levels
    100 - Moderator
    102 - Admin
    255 - Owner

*/
mp.events.addCommand({
    'ahelp': (player) => {
        if(player.getGroup() <= 99) {
            player.outputChatBox(`${server.prefix.permission}`);
        }
        if(player.getGroup() > 101){
            player.outputChatBox('[Moderator] /a, /mute, /unmute, /kick');
        }
        if(player.getGroup() > 102){
            player.outputChatBox('[Admin] /(un)freeze, /goto, /dimension, /tpto, /tphere, /invisible, /visible, /pos, /veh, /lookup, /weapon, /gotocoord, /sethealth, /setarmour, /ajail');
        }
        if(player.getGroup() == 255){
            player.outputChatBox('[Owner] /setgroup, /creategroup, /deletegroup');
        }
    },
    //  Moderator Commands (Level 100)
    'a': (player, message) => {
        if(player.getGroup() < 100) return player.outputChatBox(`${server.prefix.permission}`);
        if(!message) return player.outputChatBox(`${server.prefix.syntax} /a [message]`);
        mp.players.forEach(user => {
            if(user.getGroup() > 100){
                user.outputChatBox(`!{FFF000}${player.name} [${player.getGroup()}]: !{FFF}${message}`);
            }
        });
    },
    'mute': (player, targetID) => {
        if(player.getGroup() < 100) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /mute [player_id]`);
        let user = mp.players.at(parseInt(targetID));
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        user.setVariable('muted', true);
        user.outputChatBox(`${server.prefix.server} You have been muted by an administrator.`);
    },
    'unmute': (player, targetID) => {
        if(player.getGroup() < 100) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /unmute [player_id]`);
        let user = mp.players.at(parseInt(targetID))
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        user.setVariable('muted', false)
        user.outputChatBox(`${server.prefix.server} You have been unmuted by an administrator.`);
    },
    'kick': (player, _, targetID, ...reason) => {
        if(player.getGroup() < 100) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID || !reason) return player.outputChatBox(`${server.prefix.syntax} /kick [player_id] [reason]`);
        let user = mp.players.at(parseInt(targetID))
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        if(user.getGroup() > 0) return player.outputChatBox(`${server.prefix.error} You cannot kick another administrator.`);
        let reasonMessage = reason.join(' ');
        user.outputChatBox(`${server.prefix.server} You have been kicked from the server. Reason: ${reasonMessage}`);
        user.kick('Kicked.');
    },
    //  Admin Commands (Level 102)
    'freeze': (player, targetID) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /freeze [player_id]`);
        let user = mp.players.at(targetID);
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        user.call('freezePlayer', [user]);
        user.outputChatBox(`${server.prefix.server} You have been frozen by an administrator.`);
    },
    'unfreeze': (player, targetID) => {
        if(player.getGroup() <= 101) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /unfreeze [player_id]`);
        let user = mp.players.at(targetID);
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        player.call('unfreezePlayer', [user]);
        user.outputChatBox(`${server.prefix.server} You have been unfrozen by an administrator.`);
    },
    'goto': (player, location) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!location) return player.outputChatBox(`${server.prefix.syntax} /goto [location] - Use '/goto help' for locations`);
        switch(location.toLowerCase()){
        case 'help':
            player.outputChatBox(`${server.prefix.info} Goto Locations: LSPD, FIB, Army, PaletoBay, GrapeSeed, SandyShores, Ajail`);
            break;
        case 'lspd':
            teleportToLocation(player, 426.10, -977.90, 31);
            break;
        case 'fib':
            teleportToLocation(player, 95.89, -743.12, 46);
            break;
        case 'army':
            teleportToLocation(player, -2230.69, 3316.90, 33.5);
            break;
        case 'paletobay':
            teleportToLocation(player, -405.08, 5988.11, 32);
            break;
        case 'grapeseed':
            teleportToLocation(player, 1683.45, 4777.93, 41.9);
            break;
        case 'sandyshores':
            teleportToLocation(player, 2050.84, 3722.94, 33);
            break;
        case 'ajail':
            teleportToLocation(player, 464.16, -998.80, 24.91);
            break;
        default:
            player.outputChatBox(`${server.prefix.syntax} /goto [location] - Use '/goto help' for locations`);
            break;
        }
    },
    'dimension': (player, _, targetID, dimension) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID || !dimension) return player.outputChatBox(`${server.prefix.syntax} /dimension [player_id] [dimension]`);
        let user = mp.players.at(parseInt(targetID));
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        user.dimension = parseInt(dimension);
        user.outputChatBox(`${server.prefix.server} Your dimension has been changed to: ${dimension}`);
    },
    'tpto': (player, targetID) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /tpto [player_id]`);
        let user = mp.players.at(parseInt(targetID))
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        player.position = new mp.Vector3(user.position.x + 2, user.position.y + 2, user.position.z);
        player.outputChatBox(`${server.prefix.server} You have teleported to ${user.name}.`);
    },
    'tphere': (player, targetID) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /tphere [player_id]`);
        let user = mp.players.at(parseInt(targetID));
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        user.position = new mp.Vector3(player.position.x + 2, player.position.y + 2, player.position.z);
        user.outputChatBox(`${server.prefix.server} You have been teleported to ${player.name}.`);
        player.outputChatBox(`${server.prefix.server} ${user.name} has been teleported to you.`);
    },
    'invisible': (player) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        player.alpha = 0;
        player.outputChatBox(`${server.prefix.server} You are now invisible`);
    },
    'visible': (player) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        player.alpha = 255;
        player.outputChatBox(`${server.prefix.server} You are now visible`);
    },
    'pos': (player) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        console.log(`Position: ${player.position.x.toFixed(2)} ${player.position.y.toFixed(2)} ${player.position.z.toFixed(2)}, ${player.heading.toFixed(2)}`);
        player.outputChatBox(`${server.prefix.server} Position: ${player.position.x.toFixed(2)} ${player.position.y.toFixed(2)} ${player.position.z.toFixed(2)}, ${player.heading.toFixed(2)}`);
    },
    'veh': (player, veh_model) => {
        if(player.getGroup() <= 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!veh_model) return player.outputChatBox(`${server.prefix.syntax} /veh [vehicle_model]`);
        if(player.data.adminVeh) player.data.adminVeh.destroy();
        player.data.adminVeh = mp.vehicles.new(mp.joaat(veh_model), player.position,
            {
                heading: player.heading,
                numberPlate: 'ADMIN',
                engine: true,
                dimension: player.dimension
            });
        player.putIntoVehicle(player.data.adminVeh, -1);
        player.outputChatBox(`${server.prefix.server} You have created an admin vehicle.`);
    },
    'lookup': (player, targetID) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID) return player.outputChatBox(`${server.prefix.syntax} /lookup [player_id]`);
        let user = mp.players.at(targetID);
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        player.outputChatBox('===========[ Lookup Info ]===========');
        player.outputChatBox(`Username: [${user.name}], IP: [${user.ip}] Group: [${user.getGroup()}], Money: [${player.getMoney()}]`);
        player.outputChatBox(`Health: [${user.health}], Armour: [${user.armour}] Social Club: [${user.socialClub}]`);
        player.outputChatBox('===========[ Lookup Info ]===========');
    },
    'weapon': (player, weapon_model) => {
        if(player.getGroup() < 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!weapon_model) return player.outputChatBox(`${server.prefix.syntax} /weapon [weapon_model]`);
        player.giveWeapon(mp.joaat(weapon_model), 1000);
        player.outputChatBox(`${server.prefix.server} You have received your weapon.`);
    },
    'gotocoord': (player, _, x, y, z) => {
        if(player.getGroup() <= 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!x || !y || !z) return player.outputChatBox(`${server.prefix.syntax} /gotocoord [x] [y] [z]`);
        player.position = new mp.Vector3(parseInt(x), parseInt(y), parseInt(z));
        player.outputChatBox(`${server.prefix.server} You've been teleported to ${x}, ${y}, ${z}`);
    },
    'sethealth': (player, _, targetID, health) => {
        if(player.getGroup() <= 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID || !health) return player.outputChatBox(`${server.prefix.syntax} /sethealth [player_id] [amount]`);
        let user = mp.players.at(targetID);
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        if(health > 100) return player.outputChatBox(`${server.prefix.error} Health can only be set up to 100.`);
        user.health = parseInt(health);
        player.outputChatBox(`${server.prefix.server} You've set ${user.name}'s health to ${health}`);
    },
    'setarmour': (player, _, targetID, armour) => {
        if(player.getGroup() <= 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID || !armour) return player.outputChatBox(`${server.prefix.syntax} /setarmour [player_id] [amount]`);
        let user = mp.players.at(targetID);
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        if(armour > 100) return player.outputChatBox(`${server.prefix.error} Armour can only be set up to 100.`);
        user.armour = parseInt(armour);
        player.outputChatBox(`${server.prefix.server} You've set ${user.name}'s armour to ${armour}`);
    },
    'ajail': (player, _, targetID, ...reason) => {
        if(player.getGroup() <= 102) return player.outputChatBox(`${server.prefix.permission}`);
        if(!targetID || !reason) return player.outputChatBox(`${server.prefix.syntax} /ajail [player_id] [reason]`);
        let user = mp.players.at(targetID);
        if(user == null) return player.outputChatBox(`${server.prefix.error} Player not found.`);
        if(user.getGroup() > 0) return player.outputChatBox(`${server.prefix.error} You cannot jail another administrator.`);

        let reasonMsg = reason.join(' ');
        user.dimension = 123456;
        user.position = new mp.Vector3(459.89, -1001.46, 24.91);
        user.outputChatBox(`${server.prefix.server} You have been jailed by an administrator. Reason: ${reasonMsg}`);
    },
    //  Owner Commands (Level 255)
    'setgroup': (player, _, targetID, groupID) => {
        if(player.getGroup() != 255) return player.outputChatBox(server.prefix.permission);
        if(!targetID || !groupID) return player.outputChatBox(`${server.prefix.syntax} /setgroup [player_id] [group_id]`); 
        if(mp.players.exists(parseInt(targetID))){
            let target = mp.players.at(parseInt(targetID));
            target.setGroup(groupID);
        } else {
            player.outputChatBox(`${server.prefix.error} There is no player with that ID.`);
        }
    },
    'creategroup': (player, _, name, level) => {
        if(player.getGroup() != 255) return player.outputChatBox(server.prefix.permission);
        if(!name || !level) return player.outputChatBox(`${server.prefix.syntax} /creategroup [name] [level]`); 
        server.groups.add(player, name, level);
    },
    'deletegroup': (player, groupID) => {
        if(player.getGroup() != 255) return player.outputChatBox(server.prefix.permission);
        if(!groupID) return player.outputChatBox(`${server.prefix.syntax} /deletegroup [group_id]`);
        server.groups.remove(player, groupID);
    }
});

function teleportToLocation(player, x, y, z){
    let pos = new mp.Vector3(x, y, z);
    if(player.vehicle) return player.vehicle.position = pos;
    player.position = pos;
}