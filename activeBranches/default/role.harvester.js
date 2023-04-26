var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, targetSource) {
        creep.memory.targetSource = targetSource;
        if(creep.memory.harvState == 'harvest')
        {
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE ) {
                if(creep.harvest(targetSource) == ERR_INVALID_TARGET)
                {
                    console.log(creep.name + " Encountering Invalid Target Error on harvest");
                    if(targetSource.roomName == creep.room.name)
                    {
                        console.log("In the same room");
                        var sources = creep.room.find(FIND_SOURCES);
                        for(var x in sources)
                        {
                            if (sources[x].pos == targetSource)
                            {
                                console.log("Found a match");
                                creep.harvest(sources[x]);
                                break;
                            }
                        }
                        
                    }
                }
                else
                {
                    creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                
            }
            
            if(creep.store.getFreeCapacity() == 0)
            {
                creep.memory.harvState = 'deliver';
            }
        }
        else if(creep.memory.harvState == 'deliver')
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }});
            var backupTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }});
            if(targets.length > 0)
            {
                var lowestStoreTarget = targets[0];
                var lowestPercent = targets[0].store.getUsedCapacity(RESOURCE_ENERGY)/targets[0].store.getCapacity(RESOURCE_ENERGY)
                var fillPercent = lowestPercent;
                for(var x in targets)
                {
                    fillPercent = targets[x].store.getUsedCapacity(RESOURCE_ENERGY)/targets[x].store.getCapacity(RESOURCE_ENERGY)
                    if(fillPercent < lowestPercent)
                    {
                        lowestStoreTarget = targets[x];
                        lowestPercent = fillPercent;
                    }
                }
                if(creep.transfer(lowestStoreTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(lowestStoreTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(backupTargets.length)
            {
                var lowestStoreTargets = [];
                var lowestPercent = backupTargets[0].store.getUsedCapacity(RESOURCE_ENERGY)/backupTargets[0].store.getCapacity(RESOURCE_ENERGY)
                var fillPercent = lowestPercent;
                for(var x in backupTargets)
                {
                    fillPercent = backupTargets[x].store.getUsedCapacity(RESOURCE_ENERGY)/backupTargets[x].store.getCapacity(RESOURCE_ENERGY)
                    if(fillPercent < lowestPercent)
                    {
                        lowestPercent = fillPercent;
                    }
                }
                
                for(var x in backupTargets)
                {
                    fillPercent = backupTargets[x].store.getUsedCapacity(RESOURCE_ENERGY)/backupTargets[x].store.getCapacity(RESOURCE_ENERGY)
                    if(fillPercent == lowestPercent)
                    {
                        lowestStoreTargets.push(backupTargets[x]);
                    }
                }
                
                closestTarget = creep.pos.findClosestByRange(lowestStoreTargets);
                
                
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                if(creep.room != Game.spawns['Spawn1'].room)
                {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
                else
                {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER);
                        }});
                    if(targets.length > 0)
                    {
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
            
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.harvState = 'harvest';
            }
        }
	}
};

module.exports = roleHarvester;