const Command = require('command.base');

class UpgradeCommand extends Command
{
    constructor(commanderName, roomControlID)
    {
        super(commanderName, "upgrade");
        this.roomControlID = roomControlID;
    }
}
 
module.exports = UpgradeCommand;