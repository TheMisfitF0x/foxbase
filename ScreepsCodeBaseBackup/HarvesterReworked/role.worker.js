var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, priority)
    {
        if (!creep.memory.task)
        {
            creep.memory.task = priority;
        }

        if (creep.memory.task == "build")
        {
            if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) 
            {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            
            if (!creep.memory.building && creep.store.getFreeCapacity() == 0) 
            {
                creep.memory.building = true;
                creep.say('🚧 build');
            }

            if (creep.memory.building)
            {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER);
                    }});
                
                var backupTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length)
                {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } 
                else if(backupTargets.length)
                {
                    if (creep.build(backupTargets[0]) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(backupTargets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                else
                {
                    creep.memory.task = 'upgrade';
                }
            }
            else 
            {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }});
                if(container)
                {
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
                else
                {
                    var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (creep.harvest(sources) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    
        if (creep.memory.task == "upgrade")
        {
            if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0)
            {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            
            if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0)
            {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if (creep.memory.upgrading)
            {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else
            {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }});
                if(container)
                {
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
                else
                {
                    var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (creep.harvest(sources) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
                
            }
        }

    }
};

module.exports = roleHarvester;