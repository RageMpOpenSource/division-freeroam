server.groupData = [];

module.exports = {
    start: function(){
        return new Promise(async (resolve, reject) => {
            await server.db.query('SELECT * FROM `groups`').then(([rows]) => {
                let l = rows.length;
                for(var i = 0; i < l; i++){
                    server.groupData.push(rows[i]);
                }
                resolve(`${server.groupData.length} groups loaded.`);
            }).catch(err => reject(err));
        });
    },
    add: async function(player, name, level){
        try {
            let group = server.groups.getGroup(name);
            let grouplevel = parseInt(level);

            if(isNaN(grouplevel)) return player.outputChatBox(`${server.prefix.error} You must use a number bertween 0 and 255 for the group level.`);
            if(group === undefined){ //  Check if a group with the same name exists
                let res = server.groupData.find(group => { return group.id === grouplevel; });
                if(res === undefined){ //  Check if a group with the same level exists
                    await server.db.query('INSERT INTO `groups` VALUES (?, ?, ?)', [level, name, 0]).then(() => {
                        server.groupData.push({'ID': level, 'Name': name, 'Protected': 0});
                        player.outputChatBox(`${server.prefix.server} The group ${name} has been created`);
                    }).catch(err => console.log(`${server.chalk.red(err)}`));
                } else {
                    player.outputChatBox(`${server.prefix.error} A group already exists with that level`);
                }
            } else {
                player.outputChatBox(`${server.prefix.error} A group already exists with that name.`);
            }
        } catch (e) { console.log(e) };
    },
    remove: async function(player, groupID){
        try {
            let group = server.groups.getGroup(groupID);
            if(group.Protected === 1) return player.outputChatBox(`${server.prefix.error} You cannot delete a protected group.`);
            if(group === undefined) return player.outputChatBox(`${server.prefix.error} No group found with that name.`);
            await server.db.query('DELETE FROM `groups` WHERE ID = ?', [groupID]).then(() => {
                server.groupData.splice((server.groupData.findIndex(e => e.ID == groupID)), 1);
                player.outputChatBox(`${server.prefix.info} ${group.Name} deleted`);
            }).catch(err => console.log(`${server.chalk.red(err)}`));
        } catch(e) { console.log(e) };
    },
    getGroup: function(data){
        if(data == parseInt(data)){
            let result = server.groupData.find(group => {
                return group.ID == data;
            });
            return result;
        } else {
            let result = server.groupData.find(group => {
                return group.Name.toLowerCase() == data.toLowerCase();
            });
            return result;
        }
    }
};