var bodyComps = {
    HARV: [WORK, WORK, CARRY, MOVE],
    //HARV:[WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE],
    BUILDER: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 
    UPPER: [WORK, WORK, CARRY, MOVE],
    SCAV: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    //SCAV: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
}

var typeComps=
{
    runningHarvester: [WORK, CARRY, CARRY, MOVE, MOVE],
    postedHarvester: [WORK, WORK, MOVE, MOVE],
    worker: [WORK,CARRY,MOVE]
}
module.exports = bodyComps;