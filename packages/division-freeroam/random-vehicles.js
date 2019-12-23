const data = require("./CarGens_ZoneVehicles.json");

let count = 0;
for (let i = 0; i < data.length; i++) {
    let skip = Math.random();
    if(skip >= 0.1) continue;
    
    if (data[i].models.length === 0) {
        continue;
    }

    let color = Math.floor(Math.random()*256);          // Random between 0-255

    // No checks for boats etc. - might cause weird spawns
    let veh = mp.vehicles.new(data[i].models[ Math.floor(Math.random() * data[i].models.length) ], new mp.Vector3(data[i].x, data[i].y, data[i].z), {
        heading: data[i].heading,
    });

    veh.setColor(color, color);

    count++;
}

console.log(`Created ${count} vehicles.`);