const Command = require("command.base");

class TransferCommand extends Command
{
    constructor(commanderName, collectFromID, returnToID, takeAll)
    {
        super(commanderName, "transfer")
        this.collectFromID = collectFromID;
        this.returnToID = returnToID;
        this.takeAll = takeAll;
    }
}
 
module.exports = TransferCommand;