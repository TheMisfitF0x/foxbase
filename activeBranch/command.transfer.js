const Command = require("command.base");

/** 
* Thinking about changing transfer commands to have a room, a target, and a retrieveFromTarget bool that is true for lootables
* or rooms that I'm evacuating (for whatever reason.)
* So basically, if retrieveFromTarget is true, 
* then the creep takes from the target GameObject and returns it to the room dynamically
* If it's false, 
* the creep takes from the specified room dynamically and takes it to the target. 
*/
class TransferCommand extends Command
{
    /**
     * 
     * @param {String} commanderName 
     * @param {int} roomID 
     * @param {String} targetID 
     * @param {boolean} takeAll 
     * @param {boolean} isDelivery 
     */
    constructor(commanderName, roomID, targetID, takeAll = true, isDelivery = false)
    {
        super(commanderName, "transfer")
        this.targetID = targetID;
        this.roomID = roomID;
        this.takeAll = takeAll;
        this.isDelivery = isDelivery;
    }
}
 
module.exports = TransferCommand;