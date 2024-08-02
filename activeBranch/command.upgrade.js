const Command = require('command.base');

class UpgradeCommand extends Command
{
    constructor(commanderName, roomControlID)
    {
        super(commanderName, "upgrade");
        //TODO: body script
    }
}
 
module.exports = UpgradeCommand;