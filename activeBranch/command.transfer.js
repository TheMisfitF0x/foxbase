const Command = require("command.base")

//TODO Rewrite parameters
class TransferCommand extends Command
{
    constructor(commanderName, collectFromID, returnToID, isOneWay)
    {
        super(commanderName, "transfer")
        this.collectFromID = collectFromID;
        this.returnToID = returnToID;
        this.isOneWay = isOneWay;
    }
}
 
module.exports = TransferCommand;