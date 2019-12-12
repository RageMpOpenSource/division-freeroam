let money, level;
let uiEnabled = false;

mp.events.add('toggleUI', (status) => {
    status ? uiEnabled = true : uiEnabled = false;
});

mp.events.addDataHandler('money', (entity, value) => {
    money = value;
});

mp.events.addDataHandler('level', (entity, value) => {
    level = value;
});

mp.events.add('render', () => {
    if(uiEnabled){
        mp.game.graphics.drawText(`$~w~${money}`, [0.2, 0.85], { 
            font: 4, 
            color: [106, 176, 76, 255], 
            scale: [0.8, 0.8], 
            outline: true
        });
        mp.game.graphics.drawText(`Level: ~w~${level}`, [0.2, 0.80], { 
            font: 4, 
            color: [104, 109, 224, 255], 
            scale: [0.8, 0.8], 
            outline: true
        });
    }
});