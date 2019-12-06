const crypto = require('crypto');

mp.events.add("playerJoin", async (player) => {
    let user = `${player.socialClub}#${player.serial}`; //  Change to rsscid 1.0
    let hash = crypto.createHash('md5').update(user).digest('hex');

    await server.db.query('SELECT `Identity` FROM `accounts` WHERE `Identity` = ?', [hash]).then(([res]) => {
        if(res.length === 0){   //  New User - Must create a username
            server.db.query('INSERT INTO `accounts` (`Identity`) VALUES (?)', [hash]).then(() => {
                console.log(`${server.chalk.green(player.name)} has just joined for the first time!`);
                player.identity = hash;
                loadAccountData(player, hash);
            }).catch(err => console.log(`${server.chalk.red(err)}`));
        } else {    //  Returning User
            console.log(`${server.chalk.green(player.name)} has joined the server. [${player.ip}]`);
            player.identity = hash;
            loadAccountData(player, hash);
        }
    }).catch(err => console.log(`${server.chalk.red(err)}`));
});

async function loadAccountData(user, identity){
    await server.db.query('SELECT * FROM `accounts` WHERE `Identity` = ?; UPDATE `accounts` SET `LastActive` = CURRENT_TIMESTAMP WHERE `Identity` = ?', [identity, identity]).then(([res]) => {
        res[0][0].Username != null ? user.name = res[0][0].Username : console.log('Force username');
        console.log(`${JSON.stringify(res[0][0].Outfit)}`);
        if(res[0][0].Outfit != null){
            user.loadCharacter();
        } else {
            user.defaultCharacter();    //  Stops error
            user.sendToCreator();
        }
        user.data.level = res[0][0].Level;
        user.data.money = res[0][0].Money;
    }).catch(err => console.log(`${server.chalk.red(err)}`));
}