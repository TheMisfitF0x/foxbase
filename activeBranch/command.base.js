class Command
{
    constructor(commanderName, commandType)
    {
        this.commandID = Date.now();
        this.commanderName = commanderName;
        this.commandType = commandType;  
    }
}
 
module.exports  = Command;