mp.events.add("playerDeath", (player, reason, killer) => {
    player.deathTimer = setTimeout(() => {
        server.auth.spawnPlayer(player);
    }, 5000);
})