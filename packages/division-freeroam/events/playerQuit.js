mp.events.add("playerQuit", async (player) => {
    if(player.deathTimer) clearTimeout(player.deathTimer);
    let name = player.name;
    await server.db.query('UPDATE `accounts` SET `Level` = ?, `Experience` = ?, `money` = ?, `group` = ?, `prisoned` = ? WHERE `Identity` = ?', [player.getLevel(), player.data.currentXP, player.getMoney(), player.getGroup(), player.getVariable('prisoned'), player.identity]).then(() => {
        console.log(`${server.chalk.red(name)} has quit the server.`);
    }).catch(err => console.log(`Error on Quit: ${server.chalk.red(err)}`));
});