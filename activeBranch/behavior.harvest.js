if(!Creep.prototype.ExecuteHarvestCommand)
{
    Creep.prototype.ExecuteHarvestCommand = function()
    {
        console.log(this.memory.command.sourceID);
    }
}