mp.events.add("playerChat", (player, text) => {
    mp.players.broadcast(`${player.name}: ${text}`);
});