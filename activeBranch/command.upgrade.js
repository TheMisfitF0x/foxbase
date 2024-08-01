const Command = require('command.base');


class UpgradeCommand extends Command
{
    constructor(commanderName, commandType, sourceID, isPostUpgrade, homeSpawnID)
    {
        super(commanderName, commandType);
        //TODO: body script
    }
}
 
module.exports = UpgradeCommand;