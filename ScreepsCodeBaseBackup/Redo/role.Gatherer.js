var roleGatherer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //If not at assigned slot, go to slot.
        var slot = new RoomPosition(creep.memory.slotPos.x, creep.memory.slotPos.y, creep.memory.slotPos.roomName);
        var source = Game.getObjectById(creep.memory.sourceId);
        
        if(creep.memory.arrived)
        {
            if(creep.memory.containerPresent)
            {
                creep.harvest(source);
            }
            else
            {
                if(!creep.memory.harvesting)
                {
                    creep.build(creep.pos.lookFor(LOOK_CONSTRUCTION_SITES)[0]);
                    if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
                    {
                        creep.memory.harvesting = true;
                    }
                }
                else
                {
                    creep.harvest(source);
                    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
                    {
                        creep.memory.harvesting = false;
                    }
                }
            }
        }
        else
        {
            if(!creep.pos.isEqualTo(slot))
            {
                creep.moveTo(slot);
            }
            else
            {
                creep.memory.arrived = true;
            }
        }
        
	}
};

module.exports = roleGatherer;