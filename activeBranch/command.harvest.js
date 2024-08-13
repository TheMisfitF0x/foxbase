const Command = require('command.base');

class HarvestCommand extends Command
{
    /**
     * 
     * @param {String} commanderName Name of issuing Commander.
     * @param {String} sourceID ID of source to harvest from.
     * @param {boolean} isPostHarvest If true, creep is to remain at the source and harvest only, 
     * dropping the harvested energy into a container. Otherwise, it is to make back and forth trips.
     */
    constructor(commanderName, sourceID, isPostHarvest)
    {
        super(commanderName, "harvest");
        this.sourceID = sourceID;
        this.isPostHarvest = isPostHarvest;
    }
}
 
module.exports = HarvestCommand;