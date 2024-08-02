const Command = require('command.base');

class HarvestCommand extends Command
{
    constructor(commanderName, sourceID, isPostHarvest)
    {
        super(commanderName, "harvest");
        this.sourceID = sourceID;
        this.isPostHarvest = isPostHarvest;
    }
}
 
module.exports = HarvestCommand;