if(!Creep.prototype.ExecuteTransferCommand)
{
    Creep.prototype.ExecuteTransferCommand = function()
    {
        
        var collectFromContainer = Game.getObjectById(this.memory.command.collectFromID);
        var returnToContainer = Game.getObjectById(this.memory.command.returnToID);
        
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
    }
}