mp.events.add("playerDeath", (player, reason, killer) => {
    let money = player.getMoney() - 50;
    let deaths = player.getVariable('deaths');
    player.setVariable('isDead', true);
    player.setMoney(money);
    player.setVariable('deaths', deaths + 1);
    player.deathTimer = setTimeout(() => {
        server.auth.spawnPlayer(player);
    }, 5000);
})