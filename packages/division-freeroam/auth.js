const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const spawnPoints = require('./data/SpawnLocations.json');

const requiredExperiences = require("./data/xpdata");
const maxLevel = requiredExperiences.length - 1;
const maxExperience = requiredExperiences[maxLevel];


mp.events.add("playerReady", async (player) => {
    let user = `${player.socialClub}#${player.serial}`; //  Change to rsscid 1.0
    let hash = crypto.createHash('md5').update(user).digest('hex');
    player.setVariable('loggedIn', false);

    await server.db.query('SELECT `ID`, `Identity`, `Password` FROM `accounts` WHERE `Identity` = ?', [hash]).then(([res]) => {
        player.identity = hash;
        server.db.query('SELECT `sqlID`, `unbanDate`, `reason` FROM `bans` WHERE `sqlID` = ?', [res[0].ID]).then(([rows]) => {
            if(rows.length != 0){   //  Results found = player banned
                let d = new Date(rows[0].unbanDate);
                player.outputChatBox(`${server.prefix.server} You are currently banned from the server. Unban date: ${d.toGMTString()}`)
                player.outputChatBox(`${server.prefix.server} Reason: ${rows[0].reason}`);
                player.kick();
            } else {
                if(res.length === 0){   //  New User
                    server.db.query('INSERT INTO `accounts` (`Identity`) VALUES (?)', [hash]).then(() => {
                        console.log(`${server.chalk.green(player.name)} has just joined for the first time!`);
                        server.auth.loadAccount(player, hash);
                    }).catch(err => server.logger.error(err));
                } else {    //  Returning User
                    if(res[0].Password != null){
                        player.call('showLogin');
                    } else {
                        console.log(`${server.chalk.green(player.name)} has joined the server. [${player.ip}]`);
                        server.auth.loadAccount(player, hash);
                    }
                }
            }
        }).catch(err => server.logger.error(err));
    }).catch(err => server.logger.error(err));
});

mp.events.add('verifyPassword', async (player, password) => {
    await server.db.query('SELECT `Password` FROM `accounts` WHERE `Identity` = ?', [player.identity]).then(([res]) => {
        bcrypt.compare(password, res[0].Password).then((res) => {
            if(res){
                console.log(`${server.chalk.green(player.name)} has joined the server. [${player.ip}]`);
                server.auth.loadAccount(player, player.identity);
                player.call('hideLogin');
            } else {
                player.call('loginError', ['Incorrect password']);
            }
        }).catch(err => server.logger.error(err)); 
    }).catch(err => server.logger.error(err));
});

module.exports = {
    loadAccount: async function(user, identity){
        await server.db.query('SELECT * FROM `accounts` WHERE `Identity` = ?; UPDATE `accounts` SET `LastActive` = CURRENT_TIMESTAMP WHERE `Identity` = ?', [identity, identity]).then(([res]) => {
            if(res[0][0].Username != null) user.name = res[0][0].Username;
            user.setMoney(res[0][0].Money);
            user.setGroup(res[0][0].Group)
            user.sqlID = res[0][0].ID;
            user.setVariable('muted', false);
            user.setVariable('prisoned', res[0][0].Prisoned);
            user.setVariable('level', server.utility.clamp(res[0][0].Level, 1, maxLevel)); //  Cannot use setLevel() here
            user.setVariable('xp', server.utility.clamp(res[0][0].Experience, 0, maxExperience));
            user.setVariable('kills', res[0][0].Kills);
            user.setVariable('deaths', res[0][0].Deaths);

            user.setVariable('loggedIn', true);
            if(res[0][0].Outfit != null){
                user.loadCharacter();
                user.call('toggleUI', [true]);
                server.auth.spawnPlayer(user);
            } else {
                user.defaultCharacter();    //  Stops error
                user.sendToCreator();
            }
        }).catch(err => server.logger.error(err));
    },
    changePassword: function(user, password){
        if(password.length <= 5) return user.outputChatBox(`${server.prefix.error} Passwords must be at least 6 characters long`);
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return server.logger.error('Issue generating salt.');
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return server.logger.error('Issue hashing password.');
                await server.db.query('UPDATE `accounts` SET `Password` = ? WHERE `Identity` = ?', [hash, user.identity]).then(() => {
                    console.log(`${user.name} has changed their password.`);
                    user.outputChatBox(`${server.prefix.info} You have successfully changed your password`)
                }).catch(err => server.logger.error(err));
            });
        });
    },
    spawnPlayer: function(user){
        if(user.getVariable('prisoned') == 1){
            user.spawn(new mp.Vector3(459.89, -1001.46, 24.91));
            user.dimension = 0;
            user.outputChatBox(`${server.prefix.server} You have spawned in admin jail as you were prisoned during your last session`);
        } else if(user.getVariable('isDead') == true){
            user.setVariable('isDead', false);
            user.spawn(spawnPoints.Hospital[Math.floor(Math.random() * spawnPoints.Hospital.length)]);
        } else {
            user.spawn(spawnPoints.Locations[Math.floor(Math.random() * spawnPoints.Locations.length)]);
        }
    }
}