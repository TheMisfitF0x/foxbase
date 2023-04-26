var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //If not at assigned slot, go to slot.
        var slot = new RoomPosition(creep.memory.targetSlot.x, creep.memory.targetSlot.y, creep.memory.targetSlot.roomName);
        
        
        if(creep.pos.isEqualTo(slot) == false)
        {
            creep.moveTo(slot);
        } 
        else if(creep.memory.harvest == true)
        {
            creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
            if(creep.store.getFreeCapacity() == 0)
            {
                creep.memory.harvest = false;
            }
        } 
        else if(creep.memory.harvest == false)
        {
            creep.drop(RESOURCE_ENERGY);
            
            
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.harvest = true;
            }
        }
	}
};

module.exports = roleHarvester;