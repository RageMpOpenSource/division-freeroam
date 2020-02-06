const gDate = new Date();
var hour = gDate.getHours();
var minute = gDate.getMinutes();
var second = gDate.getSeconds();

const heartbeats = require('heartbeats');
const serverTime = heartbeats.createHeart(1000);  //  Every second

serverTime.createEvent(1, function(){
    second += 6
    if(second > 59){
        second = 0
        minute += 1
        mp.world.time.set(hour, minute, 0);
        if(minute > 59){
            minute = 0;
            hour += 1;
            if(hour > 23){
                hour = 0;
            }
        }
    }
});

module.exports = {
    getHour: () => {
        return hour;
    },
    getMinute: () => {
        return minute;
    },
    getSecond: () => {
        return second;
    },
    getTime: () => {
        return `${hour}:${minute}:${second}`
    }
}

mp.events.add("playerJoin", () => {
    mp.world.time.set(hour, minute, second);
});