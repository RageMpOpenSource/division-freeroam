mp.events.add("playerQuit", async (player) => {
    if(player.deathTimer) clearTimeout(player.deathTimer);
    if(player.jailTimer) clearInterval(player.jailTimer);
    if(player.getVariable('loggedIn') === false) return;
    let name = player.name;
    await server.db.query('UPDATE `accounts` SET `Level` = ?, `Experience` = ?, `money` = ?, `group` = ?, `jailTime` = ?, `kills` = ?, `deaths` = ? WHERE `Identity` = ?', [player.getLevel(), player.getXP(), player.getMoney(), player.getGroup(), player.getVariable('jailTime'), player.getVariable('kills'), player.getVariable('deaths'), player.identity]).then(() => {
        console.log(`${server.chalk.red(name)} has quit the server.`);
    }).catch(err => server.logger.error(`Error on Quit: ${err}`));
});