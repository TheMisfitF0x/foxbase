if(!Creep.prototype.ExecuteTransferCommand)
{
    Creep.prototype.ExecuteTransferCommand = function()
    {
        
        var collectFromContainer = Game.getObjectById(this.memory.command.collectFromID);
        var returnToContainer = Game.getObjectById(this.memory.command.returnToID);
        this.memory.retrievedResource = false;
        if(this.withdraw(collectFromContainer) == ERR_NOT_IN_RANGE)
        {
            this.moveTo(collectFromContainer, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}