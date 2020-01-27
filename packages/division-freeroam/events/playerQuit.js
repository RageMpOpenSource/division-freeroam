mp.events.add("playerQuit", async (player) => {
    if(player.deathTimer) clearTimeout(player.deathTimer);
    let name = player.name;
    await server.db.query('UPDATE `accounts` SET `Level` = ?, `Experience` = ?, `money` = ?, `group` = ?, `prisoned` = ?, `kills` = ?, `deaths` = ? WHERE `Identity` = ?', [player.getLevel(), player.getXP(), player.getMoney(), player.getGroup(), player.getVariable('prisoned'), player.getVariable('kills'), player.getVariable('deaths'), player.identity]).then(() => {
        console.log(`${server.chalk.red(name)} has quit the server.`);
    }).catch(err => server.logger.error(`Error on Quit: ${err}`));
});