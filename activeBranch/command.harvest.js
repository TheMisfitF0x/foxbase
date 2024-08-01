const Command = require('command.base');

class HarvestCommand extends Command
{
    constructor(commanderName, commandType, sourceID, isPostHarvest, homeSpawnID)
    {
        super(commanderName, commandType);
        this.sourceID = sourceID;
        this.isPostHarvest = isPostHarvest;
        this.homeSpawnID = homeSpawnID;
    }
}
 
module.exports = HarvestCommand;