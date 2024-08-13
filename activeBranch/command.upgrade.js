const Command = require('command.base');

class UpgradeCommand extends Command
{
    /**
     * @param {String} commanderName The name of the issuing commander.
     * @param {String} roomControlID The ID of the controller to upgrade.
     * @param {boolean} useDynamicSourcing If true, creep will source energy from anywhere in the same room as the controller, including actual sources.
     */
    constructor(commanderName, roomControlID, useDynamicSourcing)
    {
        super(commanderName, "upgrade");
        this.roomControlID = roomControlID;
        this.useDynamicSourcing = useDynamicSourcing;
    }
}
 
module.exports = UpgradeCommand;