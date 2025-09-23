class Commander
{
    constructor(commanderName)
    {
        this.commanderName = commanderName;
        if(!Memory.constructionCommandQueue)
        {
            console.log("Command Queues Created");
            Memory.constructionCommandQueue = [];
            Memory.resourcingCommandQueue = [];
            Memory.combatCommandQueue = [];
        }
    }

    
}

module.exports = Commander;