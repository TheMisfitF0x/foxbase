var Command = require('command.base');

class ConstructCommand extends Command
{
    constructor(commanderName, conSiteID, useDynamicSourcing)
    {
        super(commanderName, "construct")
        this.conSiteID = conSiteID;
        this.useDynamicSourcing = useDynamicSourcing;
    }
}
 
module.exports = ConstructCommand;