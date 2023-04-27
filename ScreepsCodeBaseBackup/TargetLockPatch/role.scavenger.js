var targeter = require('man.flagManager');
var roleScav = {
    
    run: function(creep)
    {
        if(creep.memory.collecting)//If they are going to get energy
        {
            if(creep.memory.targetLockFlag != null && Game.flags[creep.memory.targetLockFlag]) //Do they have a valid target flag in memory?
            {
                var targetFlag = Game.flags[creep.memory.targetLockFlag]; //If so, grab that flag object
            
                var targetResponse = "";//Prepare to receive a response to the withdraw/pickup
                
                switch(targetFlag.memory.type)//Either withdraw or pickup depending on resource type
                {
                    case "ruin":
                        //console.log("It's a ruin flag");
                        var target = targetFlag.pos.lookFor(LOOK_RUINS);//Find the object in question
                        console.log(target[0]);
                        targetResponse = creep.withdraw(target[0], RESOURCE_ENERGY);//Attempt to gather from it.
                        break;
                        
                    case "looseEnergy":
                        //console.log("It's a pool flag");
                        var target = targetFlag.pos.lookFor(LOOK_RESOURCES);
                        targetResponse = creep.pickup(target[0]);
                        break;
                        
                    case "container":
                        //console.log("It's a container flag");
                        var target = targetFlag.pos.lookFor(LOOK_STRUCTURES, {filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER
                        }});
                        targetResponse = creep.withdraw(target[0], RESOURCE_ENERGY);
                        break;
                        
                    case "storage":
                        //console.log("It's a storage flag");
                        var target = targetFlag.pos.lookFor(LOOK_STRUCTURES, {filter: (structure) => {
                            return structure.structureType == STRUCTURE_STORAGE
                        }});
                        targetResponse = creep.withdraw(target[0], RESOURCE_ENERGY);
                        break;
                        
                    default:
                        targetResponse = ERR_INVALID_ARGS;
                }
                
                console.log(targetResponse);
                
                switch(targetResponse)//Check the response
                {
                    case ERR_NOT_IN_RANGE://If too far away, move towards the flag
                        //console.log("Too far away");
                        creep.moveTo(targetFlag);
                        break;
                    case ERR_INVALID_TARGET://Case for debug only
                        console.log("The thing I was expecting isn't here:" + targetFlag.memory.type);
                        break;
                    case ERR_FULL://Case for debug only
                        //console.log("Full Up");
                    case OK:
                        //console.log("Harvest Successful");
                        creep.memory.targetLockFlag = null; //Since creeps naturally grab as much as they can carry, we don't need to repeat. Prepare to find a new target.
                        targetFlag.memory.assignedCreeps -= 1;
                        
                        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)//If they're full, switch off collection mode so they can move to getting delivery flags.
                        {
                            creep.memory.collecting = false;
                        }
                        break;
                }
            }
            else
            {
                //console.log("Getting new Flag");
                creep.memory.targetLockFlag = targeter.requestEnergyPickupFlag(creep);
                //Game.flags[creep.memory.targetLockFlag].memory.assignedCreepNames = [creep.name];
            }
            
        }
        else
        {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        //return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }});
                    
            var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER || (structure.structureType == STRUCTURE_STORAGE && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 500)) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
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