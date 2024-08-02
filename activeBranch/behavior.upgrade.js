if(!Creep.prototype.ExecuteUpgradeCommand)
{
    Creep.prototype.ExecuteUpgradeCommand = function()
    {
        if (this.memory.upgrading)
        {
            var targetController = Game.getObjectById(this.memory.command.roomControlID);
            if (this.upgradeController(targetController) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(targetController, { visualizePathStyle: { stroke: '#ffffff' } });
            }

            if(this.store.getUsedCapacity() == 0)
            {
                this.memory.upgrading = false;
            }
        }
        else if(this.memory.command.useDynamicSourcing)
            this.DynamicSourcing();
        else
            this.StrictSourcing();
        
    }
}

