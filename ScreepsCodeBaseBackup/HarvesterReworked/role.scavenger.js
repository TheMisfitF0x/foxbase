var roleScav = {
    run: function(creep)
    {
        
        if(creep.memory.collecting)
        {
            
            var droppedEnergyPools = creep.room.find(FIND_DROPPED_RESOURCES);
            
            var droppedEnergy = droppedEnergyPools[0];
            for(var i in droppedEnergyPools)
            {
                if(droppedEnergyPools[i].amount > droppedEnergy.amount)
                {
                    droppedEnergy = droppedEnergyPools[i];
                    
                }
            }
            
            var tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: (box) => { return box.store.getUsedCapacity(RESOURCE_ENERGY) != 0}});
            
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }});
                
                    
            var container = containers[0];
            
            for(var i in containers)
            {
                if(containers[i].store.getUsedCapacity(RESOURCE_ENERGY) > container.store.getUsedCapacity(RESOURCE_ENERGY))
                {
                    container = containers[i];
                    
                }
            }
            
            var ruin = creep.pos.findClosestByRange(FIND_RUINS, {filter: (box) => { return box.store.getUsedCapacity(RESOURCE_ENERGY) != 0}});
            
            if(droppedEnergy)
            {
                if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(droppedEnergy);
                }
            }
            else if(ruin)
            {
                if(creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(ruin);
                }
            }
            else if(container)
            {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(container);
                }
            }
            
            if(creep.store.getFreeCapacity() == 0)
            {
                creep.memory.collecting = false;
            }
        }
        else
        {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }});
                    
            var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }});
                    
            var container = containers[0];
            for(var i in containers)
            {
                if(containers[i].store.getUsedCapacity(RESOURCE_ENERGY) < container.store.getUsedCapacity(RESOURCE_ENERGY))
                {
                    container = containers[i];
                }
            }
                    
            if(target)
            {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target);
                }
            }
            else if(container)
            {
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(container);
                }
            }
            
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.collecting = true;
            }
        }
    }
};
module.exports = roleScav;