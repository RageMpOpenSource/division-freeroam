mp.events.addCommand("money", (player) => {
    player.outputChatBox(`$${player.data.money}`)
});

mp.events.addCommand('updatemoney', (player, mon) => {
    player.data.money = parseInt(mon);
})

mp.events.addCommand('setemail', async (player, email) => {
    if(validEmail(email)){
        await server.db.query('UPDATE `accounts` SET `Email` = ? WHERE `Identity` = ?', [email, player.identity]).then(() => {
            player.outputChatBox(`${server.prefix.info} Email successfully set.`);
        });
    } else {
        player.outputChatBox(`${server.prefix.error} The email you have entered is not valid.`);
    }
});

function validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}