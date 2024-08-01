const Command = require('command.base');

//TODO Rewrite parameters
class UpgradeCommand extends Command
{
    constructor(commanderName, sourceID, isPostUpgrade, homeSpawnID)
    {
        super(commanderName, "upgrade");
        //TODO: body script
    }
}
 
module.exports = UpgradeCommand;