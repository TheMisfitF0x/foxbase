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
     * @param {String} commanderName The name of the commander who issued the order (usually "resourcing" or "combat")
     * @param {int} roomName The name of the room to be sourced from/delivered to
     * @param {String} targetID The name of the object to be delivered to/looted from
     * @param {boolean} entireJob If isDelivery, should it keep delivering until the object is full? Else, should the creep keep looting until the item is empty? True by default.
     * @param {boolean} isDelivery If true, the target item should be restocked with energy, else energy should be removed. False by default.
     */
    constructor(commanderName, roomName, targetID, entireJob = true, isDelivery = false)
    {
        super(commanderName, "transfer")
        this.targetID = targetID;
        this.roomID = roomName;
        this.entireJob = entireJob;
        this.isDelivery = isDelivery;
    }
}
 
module.exports = TransferCommand;