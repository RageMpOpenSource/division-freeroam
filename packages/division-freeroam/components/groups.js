server.groupData = [];

(async () => {
    await server.db.query('SELECT * FROM `groups`').then(([rows]) => {
        let l = rows.length;
        for(var i = 0; i < l; i++){
            server.groupData.push(rows[i]);
        }
        console.log(`${server.groupData.length} groups loaded.`);
    }).catch(err => console.log(`${server.chalk.red(err)}`));
})();

module.exports = {
    add: async function(player, name, level){
        let group = server.group.getGroup(name);
        let grouplevel = parseInt(level);
    
        if(group === undefined){ //  Check if a group with the same name exists
            let res = server.groupData.find(group => { return group.id === grouplevel; });
            if(res === undefined){ //  Check if a group with the same level exists
                await server.db.query('INSERT INTO `groups` VALUES (?, ?, ?)', [level, name, 0]).then(() => {
                    server.groupData.push({'id': level, 'name': name, 'protected': 0});
                    player.outputChatBox(`${server.prefix.server} The group ${name} has been created`);
                }).catch(err => console.log(`${server.chalk.red(err)}`));
            } else {
                player.outputChatBox(`${server.prefix.error} A group already exists with that level`);
            }
        } else {
            player.outputChatBox(`${server.prefix.error} A group already exists with that name.`);
        }
    },
    remove: async function(player, name){
        let group = server.group.getGroup(name);
        if(group.protected === 1) return player.outputChatBox(`${server.prefix.error} You cannot delete a protected group.`);
        if(group === undefined) return player.outputChatBox(`${server.prefix.error} No group found with that name.`);
        await server.db.query('DELETE FROM `groups` WHERE name = ?', [name]).then(() => {
            server.groupData.splice((server.groupData.findIndex(e => e.name == name)), 1);
            player.outputChatBox(`${server.prefix.info} Group deleted`);
        }).catch(err => console.log(`${server.chalk.red(err)}`));
    },
    getGroup: function(data){
        if(data == parseInt(data)){
            let result = server.groupData.find(group => {
                return group.id == data;
            });
            return result;
        } else {
            let result = server.groupData.find(group => {
                return group.name.toLowerCase() == data.toLowerCase();
            });
            return result;
        }
    }
};