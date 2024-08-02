if(!Creep.prototype.ExecuteConstructCommand)
    {
        Creep.prototype.ExecuteConstructCommand = function()
        {
            if(this.memory.command.useDynamicSourcing == true)
                constructBehavior.dynamicSourcing(this);
            else
                constructBehavior.strictSourcing(this)
        }
    }

    //TODO: Refactor code to use commands
var constructBehavior = 
{
    dynamicSourcing: function(creep)
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
                    delete creep.memory.command
                }
            }
    },
    strictSourcing: function(creep)
    {
        console.log("Static sourcing not implemented");
        this.dynamicSourcing(creep);
    }
}