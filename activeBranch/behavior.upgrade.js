if(!Creep.prototype.ExecuteUpgradeCommand)
    {
        Creep.prototype.ExecuteUpgradeCommand = function()
        {
            upgradeBehavior.primary(this)
        }
    }

    //TODO: Refactor code to use commands
var upgradeBehavior = 
{
    primary: function(creep)
    {
        if (creep.memory.upgrading)
            {
                var targetController = Game.getObjectById(creep.command.roomControlID);
                if (creep.upgradeController(targetController) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targetController, { visualizePathStyle: { stroke: '#ffffff' } });
                }
    
                if(creep.store.getUsedCapacity() == 0)
                {
                    creep.memory.upgrading = false;
                }
            }
            else
            {
                if(this.memory.command.useDynamicSourcing)
                    upgradeBehavior.dynamicSourcing(this);
                else
                    upgradeBehavior.strictSourcing(this);
            }
    },
    dynamicSourcing: function(creep)
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
            
            if(creep.store.getFreeCapacity() == 0)
            {
                creep.memory.upgrading = true;
            }
        }
    },
    strictSourcing: function(creep)
    {
        console.log("Static sourcing not implemented");
        this.dynamicSourcing(creep);
    }
}