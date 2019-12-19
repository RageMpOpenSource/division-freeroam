mp.events.addCommand('setgroup', (player, _, targetID, groupID) => {
    if(player.getGroup() < 100) return player.outputChatBox(server.prefix.permission);
    if(!targetID || !groupID) return player.outputChatBox(`${server.prefix.syntax} /setgroup [target_id] [group_id]`); 
    if(mp.players.exists(parseInt(targetID))){
        let target = mp.players.at(parseInt(targetID));
        target.setGroup(groupID);
    } else {
        player.outputChatBox(`${server.prefix.error} There is no player with that ID.`);
    }
});

mp.events.addCommand('creategroup', (player, _, name, level) => {
    if(player.getGroup() < 255) return player.outputChatBox(server.prefix.permission);
    if(!name || !level) return player.outputChatBox(`${server.prefix.syntax} /creategroup [name] [level]`); 
    server.groups.add(player, name, level);
});

mp.events.addCommand('deletegroup', (player, groupid) => {
    if(player.getGroup() < 255) return player.outputChatBox(server.prefix.permission);
    if(!groupid) return player.outputChatBox(`${server.prefix.syntax} /deletegroup [group_id]`);
    server.groups.remove(player, groupid);
});