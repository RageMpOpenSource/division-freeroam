mp.events.add("playerDeath", (player, reason, killer) => {
    let deaths = player.getVariable('deaths');
    player.setVariable('deaths', deaths + 1);
    player.deathTimer = setTimeout(() => {
        server.auth.spawnPlayer(player);
    }, 5000);
})