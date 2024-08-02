const Command = require("command.base")

class TransferCommand extends Command
{
    constructor(commanderName, collectFromID, returnToID)
    {
        super(commanderName, "transfer")
        this.collectFromID = collectFromID;
        this.returnToID = returnToID;
        this.isOneWay = isOneWay;
    }
}
 
module.exports = TransferCommand;