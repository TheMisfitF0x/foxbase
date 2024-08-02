if(!Creep.prototype.DynamicSourcing)
{
    Creep.prototype.DynamicSourcing = function()
    {
        var container = this.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }});
        if(container)
        {
            if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else
        {
            var sources = this.pos.findClosestByPath(FIND_SOURCES);
            if (this.harvest(sources) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        
        if(this.store.getFreeCapacity() == 0)
        {
            this.memory.upgrading = true;
        }
    }
}

if(!Creep.prototype.StrictSourcing)
{
    Creep.prototype.StrictSourcing = function()
    {
        //TODO: Fill this out one day.
        console.log("Static sourcing not implemented, executing Dynamic sourcing");
        this.DynamicSourcing();
    }
}