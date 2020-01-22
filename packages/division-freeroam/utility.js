module.exports = {
    clamp: function(value, min, max) {
        return value <= min ? min : value >= max ? max : value;
    }
}

server.rpc.register('retrievePlayerList', () => {
    let list = [];
    
    mp.players.forEach(function(user){
        list.push({'id': user.id, 'name': user.name, "level": user.getLevel(), "ping": user.ping});
    });
    
    return list;
});