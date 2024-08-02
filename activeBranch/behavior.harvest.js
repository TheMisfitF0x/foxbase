if(!Creep.prototype.ExecuteHarvestCommand)
{
    Creep.prototype.ExecuteHarvestCommand = function()
    {
        if(this.memory.command.isPostHarvest == true)
            harvestBehavior.runPosted(this);
        else
            harvestBehavior.runMobile(this);
        
    }
}

var harvestBehavior = {
    runPosted: function(creep) 
    {
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
    },
    runMobile: function(creep)
    {
        
        if(creep.memory.harvest == true)
        {
            var closeSource = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(closeSource) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(closeSource)
            }
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
            {
                creep.memory.harvest = false;
            }
        }
        else
        {
            if(creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns["Spawn1"])
            }
            
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
            {
                creep.memory.harvest = true;
            }
        }
    }
}