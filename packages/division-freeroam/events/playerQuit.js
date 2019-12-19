mp.events.add("playerQuit", async (player) => {
    let name = player.name;
    await server.db.query('UPDATE `accounts` SET `level` = ?, `money` = ? WHERE `Identity` = ?', [player.getLevel(), player.getMoney(), player.identity]).then(() => {
        console.log(`${server.chalk.red(name)} has quit the server.`);
    }).catch(err => console.log(`Error on Quit: ${server.chalk.red(err)}`));
});