var workForceMangaer = require('manager.RoomWorkForceManager');
var roleBuilder = {
    run: function(creep)
    {
        if(creep.memory.building)
        {
            this.doTheBuild(creep);
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
            {
                creep.memory.building = false;
            }
        }
        else
        {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
            {
                creep.memory.building = true;
            }
            this.retrieveEnergy(creep);
        }
    },
    doTheBuild: function(creep)
    {
        if(creep.memory.targetFlagId)
        {
            var target = Game.getObjectById(creep.memory.targetFlagId).pos.lookFor(LOOK_CONSTRUCTION_SITES)[0];
            if(creep.build(target) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target);
            }
        }
        else
        {
            workForceManager.assignPickUpFlag(creep);
        }
    },
    retreiveEnergy: function(creep)
    {
        
    }
}
module.exports = roleBuilder;