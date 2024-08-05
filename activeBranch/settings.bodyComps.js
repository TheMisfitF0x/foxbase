var bodyComps = {
    HARV: [WORK, WORK, CARRY, MOVE],
    BUILDER: [WORK, CARRY,  MOVE], 
    UPPER: [WORK, WORK, CARRY, MOVE],
    SCAV: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
}

var typeComps=
{
    runningHarvester: [WORK, CARRY, CARRY, MOVE, MOVE],
    postedHarvester: [WORK, WORK, MOVE, MOVE],
    worker: [WORK,CARRY,MOVE]
}
module.exports = bodyComps;