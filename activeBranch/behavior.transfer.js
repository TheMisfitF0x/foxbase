if(!Creep.prototype.ExecuteTransferCommand)
{
    Creep.prototype.ExecuteTransferCommand = function()
    {
        
        var collectFromContainer = Game.getObjectById(this.memory.command.collectFromID);
        
        
        if((this.memory.command.takeAll && (collectFromContainer.store.getUsedCapacity == 0 || !collectFromContainer)) || (this.store.getFreeCapacity() == 0 || !collectFromContainer))
        {
            this.memory.returning = true;
        }
        else
        {
            this.memory.returning = false;
        }


        if(!this.memory.returning)
        {
            if(this.withdraw(collectFromContainer) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(collectFromContainer, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }   
        else if(this.memory.command.returnToID)
        {
            var returnToContainer = Game.getObjectById(this.memory.command.returnToID);
            if(this.transfer(returnToContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(returnToContainer, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else
        {
            //Create functions for lowest store and closest container, pick one fucko.
        }
    }
}