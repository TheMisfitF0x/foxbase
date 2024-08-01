const Command = require('command.base');

class HarvestCommand extends Command
{
    constructor(commanderName, sourceID, isPostHarvest, homeSpawnID)
    {
        super(commanderName, "harvest");
        this.sourceID = sourceID;
        this.isPostHarvest = isPostHarvest;
        this.homeSpawnID = homeSpawnID;
    }
}
 
module.exports = HarvestCommand;