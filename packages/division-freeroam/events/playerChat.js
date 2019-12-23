mp.events.add("playerChat", (player, text) => {
    if(player.getVariable('muted') == true) return player.outputChatBox(`${server.prefix.error} You cannot chat while you are muted.`)
    mp.players.broadcast(`${player.name}: ${text}`);
});