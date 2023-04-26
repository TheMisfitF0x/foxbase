/*
  This file contains an array of objects and 
  a function that returns an element of that array based on the available energy of the provided spawn's room 
*/
var bodyComps = {
    comps:
    [ 
        {
            GATHER: [WORK, CARRY, MOVE],
            BUILD: [WORK, CARRY, MOVE], 
            UPGRADE: [WORK, CARRY, MOVE],
            TRUCK: [CARRY,  MOVE]
        },
        {
            GATHER: [WORK, CARRY, MOVE],
            BUILD: [WORK, CARRY, MOVE], 
            UPGRADE: [WORK, CARRY, MOVE],
            TRUCK: [CARRY,  MOVE]
        },
        {
            GATHER: [WORK, CARRY, MOVE],
            BUILD: [WORK, CARRY, MOVE], 
            UPGRADE: [WORK, CARRY, MOVE],
            TRUCK: [CARRY,  MOVE]
        },
        {
            GATHER: [WORK, CARRY, MOVE],
            BUILD: [WORK, CARRY, MOVE], 
            UPGRADE: [WORK, CARRY, MOVE],
            TRUCK: [CARRY,  MOVE]
        },
        {
            GATHER: [WORK, CARRY, MOVE],
            BUILD: [WORK, CARRY, MOVE], 
            UPGRADE: [WORK, CARRY, MOVE],
            TRUCK: [CARRY,  MOVE]
        }
    ],
    getBodyComps: function(spawn)
    {
        var energyToUse = spawn.room.energyAvailable
    }
}

module.exports = bodyComps;