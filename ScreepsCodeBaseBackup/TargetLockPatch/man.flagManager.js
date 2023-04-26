var tickConverter = require('action.tickConverter');
/*
    This is the fun part where I get to write a list of colors to flag types.
    NOTE: Type is denoted by primary color. Secondary color used in specific cases only, noted. 
    Red: Fighters to location, secondary color: max creeps to assign, placed manually
    Purple: Defenders to location, secondary color: max creeps to assign, placed manually
    Blue: Upgrade (auto placed by spawn on placement).
    Yellow: Picking up energy from here
    White: Dropping off energy here
    Brown: Contributing to construction here.
    Grey: Scout Post, placed manually
*/

var flagManager = {
    requestEnergyPickupFlag: function(creep)//Yellow
    {
        //Find a target to pick up energy from. Only assign 1-2 scavs to a pickup location at a time. 
        
        //When assigning, prioritize the closest ruin to the creep,
        var ruins = creep.room.find(FIND_RUINS, {filter: (ruin) => ruin.store.getUsedCapacity(RESOURCE_ENERGY > 0)});
        
        var droppedEnergyPools = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => {
            return resource.resourceType == RESOURCE_ENERGY
        }});
        
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }});
            
        var storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }});
        
        if(ruins.length)//If there are ruins at all
        {
            if(ruins.length > 1)
            {
                ruins.sort((a, b) => {
                    return (creep.pos.findPathTo(a).length - creep.pos.findPathTo(b).length) //Sort by distance to this creep if there's more than one.
                }) 
            }
            
            for(var i in ruins)
            {
                var ruin = ruins[i]; 
                var existingFlag = ruin.pos.lookFor(LOOK_FLAGS, {filter: (flag) => {
                    return (flag.color == COLOR_YELLOW && flag.memory.type == "ruin")
                    
                }});
                
                if(!existingFlag.length)
                {
                    var flagName = "Gather(RUIN)X"+ruin.pos.x+"Y"+ruin.pos.y+":"+ruin.pos.roomName;
                    var newFlag = ruin.pos.createFlag(flagName, COLOR_YELLOW);
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "ruin",
                        objectID: ruin.id
                    }
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
            }
        }
        else if(droppedEnergyPools.length)//then the biggest pile of loose energy,
        {
            if(droppedEnergyPools.length > 1)
            { 
                droppedEnergyPools.sort((a, b) =>
                {
                    return (b.amount - a.amount)//Sort by size of pool if more than one
                }) 
            } 
            
            for(var i in droppedEnergyPools)
            {
                var pool = droppedEnergyPools[i];
                var existingFlag = pool.pos.lookFor(LOOK_FLAGS, {filter: (flag) => {
                    return (flag.color == COLOR_YELLOW && flag.memory.type == "looseEnergy")
                    
                }});
                
                if(!existingFlag.length)
                {
                    var flagName = "Gather(Pool)X"+ pool.pos.x + "Y" + pool.pos.y + ":" + pool.pos.roomName;
                    var newFlag = pool.pos.createFlag(flagName, COLOR_YELLOW);
                    
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "looseEnergy",
                        objectID: pool.id
                    }
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
            }
        }
        else if(containers.length)//then furthest location from the closest spawn. Use findPathTo().length.
        {
            var closestSpawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN
            }});
            
            if(containers.length > 1) 
            { 
                containers.sort((a, b) => {
                    return (closestSpawn.pos.findPathTo(b) - closestSpawn.pos.findPathTo(a))
                });
                
            } //Sort by distance from the closest spawn if more than one
            
            for(var i in containers)
            {
                var container = containers[i];
                var existingFlag = container.pos.lookFor(LOOK_FLAGS, {filter: (flag) => 
                {
                    return (flag.color == COLOR_YELLOW && flag.memory.type == "container")
                }});
                
                if(!existingFlag.length)
                {
                    var flagName = "Gather(Container)X" +container.pos.x + "Y" + container.pos.y + ":" + container.pos.roomName;
                    var newFlag = container.pos.createFlag(flagName, COLOR_YELLOW);
                    
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "container",
                        objectID: container.id
                    }
                    
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
            }
        }
    },
    requestEnergyDropOffFlag: function(creep)//White
    {
        //Find a target to drop off energy at.
        var activeCapacityStores = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }});
            
        var towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }});
            
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }});
            
        var storages = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }});
        
        if(activeCapacityStores.length)//When assigning, prioritize spawns and extensions,
        {
            for(var i in activeCapacityStores)
            {
                var capStore = activeCapacityStores[i];
                var existingFlag = capStore.pos.lookFor(LOOK_FLAGS, {filter: (flag) => 
                    {
                        return (flag.color == COLOR_WHITE && flag.memory.type == "activeCap")
                    }});
                    
                if(!existingFlag.length)
                {
                    var flagName = "DropOff(Spawn/Extension)X" + capStore.pos.x + "Y" + capStore.pos.y + ":" + capStore.pos.roomName;
                    var newFlag = capStore.pos.createFlag(flagName, COLOR_WHITE);
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "capStore",
                        objectID: capStore.id
                    }
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
            }
        } 
        else if(tower.length) //then towers, 
        {
            for(var i in towers)
            {
                var tower = towers[i];
                var existingFlag = tower.pos.lookFor(LOOK_FLAGS, {filter: (flag) => 
                    {
                        return (flag.color == COLOR_WHITE && flag.memory.type == "tower")
                    }});
                    
                if(!existingFlag.length)
                {
                    var flagName = "DropOff(tower)X" + tower.pos.x + "Y" + tower.pos.y + ":" + tower.pos.roomName;
                    var newFlag = tower.pos.createFlag(flagName, COLOR_WHITE);
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "tower",
                        objectID: tower.id
                    }
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
            }
        } 
        else if(containers.length)//then closest containers to closest spawn, 
        {
            if(containers.length > 1) 
            { 
                var closestSpawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN
                    }});
            
                containers.sort((a, b) => {
                    return (closestSpawn.pos.findPathTo(a) - closestSpawn.pos.findPathTo(b)) //Sort by distance from the closest spawn if more than one
                });
            }
            
            for(var i in containers)
            {
                var container = containers[i];
                var existingFlag = container.pos.lookFor(LOOK_FLAGS, {filter: (flag) => 
                    {
                        return (flag.color == COLOR_WHITE && flag.memory.type == "container")
                    }});
                    
                if(!existingFlag.length)
                {
                    var flagName = "DropOff(container)X" + container.pos.x + "Y" + container.pos.y + ":" + container.pos.roomName;
                    var newFlag = container.pos.createFlag(flagName, COLOR_WHITE);
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "container",
                        objectID: container.id
                    }
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
            }
             
        }
        else if(storages.length)//then closest storage. Use findPathTo().length.
        {
            var existingFlag = storages[0].pos.lookFor(LOOK_FLAGS, {filter: (flag) => 
                    {
                        return (flag.color == COLOR_WHITE && flag.memory.type == "storage")
                    }});
                    
                if(!existingFlag.length)
                {
                    var flagName = "DropOff(storage)X" + storages[0].pos.x + "Y" + storages[0].pos.y + ":" + storages[0].pos.roomName;
                    var newFlag = storages[0].pos.createFlag(flagName, COLOR_WHITE);
                    Game.flags[newFlag].memory = {
                        assignedCreeps: 1,
                        type: "storage",
                        objectID: storages[0].id
                    }
                    return newFlag;
                }
                else
                {
                    if(existingFlag[0].memory.assignedCreeps < 2)
                    {
                       existingFlag[0].memory.assignedCreeps += 1;
                       return existingFlag[0].name;
                    }
                }
        }
    },
    requestConstuctionFlag: function(creep)//Brown
    {
        //Find a construction site to work on:
        //Prioritize building extensions,
        //then towers,
        //then storages, containers and links,
        //then everything else. Use findClosestByRange()
    },
    updateFlags: function()
    {
        //Check all flags of the above types, if they don't have any creeps assigned, delete flag and remove memory.
        var pickupFlags = _.filter(Game.flags, (flag) => {
            return (flag.color == COLOR_YELLOW)
        });
        
        //If a creep assigned to a flag is dead, remove it from the flag's memory.
        for(var i in pickupFlags)
        {
            var flag = pickupFlags[i];
            
            for (var name in flag.memory.assignedCreepNames) 
            {
                if (!Game.creeps[flag.memory.assignedCreepNames[name]]) 
                {
                    flag.memory.assignedCreepNames.splice(name,1);
                    console.log('Clearing non-existing creep from flag:', flag.name);
                }
            }
            
            
            if(flag.memory.assignedCreeps == 0|| !Game.getObjectById(flag.memory.objectID) || (Game.getObjectById(flag.memory.objectID) instanceof Structure && Game.getObjectById(flag.memory.objectID).store.getUsedCapacity(RESOURCE_ENERGY) == 0))
            {
                flag.remove();
            }
        }
        
        //Check all flags of the above types, if they don't have any creeps assigned, delete flag and remove memory.
        var dropOffFlags = _.filter(Game.flags, (flag) => {
            return (flag.color == COLOR_WHITE)
        });
        
        //If a creep assigned to a flag is dead, remove it from the flag's memory.
        for(var i in dropOffFlags)
        {
            var flag = dropOffFlags[i];
            
            if(flag.memory.assignedCreeps == 0 || !Game.getObjectById(flag.memory.objectID) || (Game.getObjectById(flag.memory.objectID) instanceof Structure && Game.getObjectById(flag.memory.objectID).store.getFreeCapacity(RESOURCE_ENERGY) == 0))
            {
                flag.remove();
            }
        }
        
        //More flag types here
        
        for (var name in Memory.flags) {
        if (!Game.flags[name]) {
            delete Memory.flags[name];
            console.log('Clearing non-existing flag memory:', name);
        }
    }
    }
};

module.exports = flagManager;