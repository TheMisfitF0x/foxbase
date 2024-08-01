var commandBase = require("command.base")
//TODO: Convert to subclass
function TransferCommand(commanderName, commandType, collectFromID, returnToID, isOneWay)
{
    commandBase.call(this, commanderName, commandType)
    this.collectFromID = collectFromID;
    this.returnToID = returnToID;
    this.isOneWay = isOneWay;
}

TransferCommand.prototype = Object.create(commandBase.prototype); 
TransferCommand.prototype.constructor = TransferCommand;
 
module.exports.commandTransfer = transferCommand;