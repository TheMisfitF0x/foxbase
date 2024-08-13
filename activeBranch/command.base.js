class Command
{
    /**
     * 
     * @param {String} commanderName Name of issuing commander
     * @param {String} commandType Type of command, determined by subclass of command spawned.
     */
    constructor(commanderName, commandType)
    {
        if(!Memory.commandsCreated)
            Memory.commandsCreated = 1;
        else
            Memory.commandsCreated++;
        this.commandID = Memory.commandsCreated;
        this.commandStatus = "created";
        this.commanderName = commanderName;
        this.commandType = commandType;  
    }
}
 
module.exports  = Command;