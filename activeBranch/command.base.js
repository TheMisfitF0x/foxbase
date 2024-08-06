class Command
{
    constructor(commanderName, commandType)
    {
        if(!Memory.commandsCreated)
            Memory.commandsCreated = 1;
        else
            Memory.commandsCreated++;
        this.commandID = Memory.commandsCreated;
        this.commanderName = commanderName;
        this.commandType = commandType;  
    }
}
 
module.exports  = Command;