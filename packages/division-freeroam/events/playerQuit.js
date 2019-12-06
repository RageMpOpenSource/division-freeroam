mp.events.add("playerQuit", async (player) => {
    let name = player.name;
    await server.db.query('UPDATE `accounts` SET `level` = ?, `money` = ? WHERE `Identity` = ?', [player.data.level, player.data.money, player.identity]).then(() => {
        console.log(`${server.chalk.red(name)} has quit the server.`);
    })
});

mp.events.addCommand('updatemoney', (player, mon) => {
    player.data.money = parseInt(mon);
})