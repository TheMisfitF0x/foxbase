const Command = require('command.base');

class UpgradeCommand extends Command
{
    constructor(commanderName, roomControlID, useDynamicSourcing)
    {
        super(commanderName, "upgrade");
        this.roomControlID = roomControlID;
        this.useDynamicSourcing = useDynamicSourcing;
    }
}
 
module.exports = UpgradeCommand;