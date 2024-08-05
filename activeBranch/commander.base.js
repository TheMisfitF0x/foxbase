class Commander
{
    constructor(commanderName, primarySpawnID, roomControllerID)
    {
        this.commanderName = commanderName;
        this.primarySpawnID = primarySpawnID;
        this.roomControllerID = roomControllerID
        this.primarySpawn = Game.getObjectById(this.primarySpawnID);
        
        if(!this.primarySpawn.memory.constructionCommandQueue)
        {
            console.log("Command Queues Created");
            this.primarySpawn.memory.constructionCommandQueue = [];
            this.primarySpawn.memory.resourcingCommandQueue = [];
            this.primarySpawn.memory.combatCommandQueue = [];
        }
    }

    OnInit()
    {
        console.log("Init says this is " + this.primarySpawn.name);
    }

    IssueCommand(command)
    {
        switch(this.commanderName)
        {
            case "resourcing":
                this.primarySpawn.memory.resourcingCommandQueue.push(command) 
                break;
            
            case "construction":
                this.primarySpawn.memory.constructionCommandQueue.push(command)
                break;

            case "combat":
                this.primarySpawn.memory.combatCommandQueue.push(command)
                break;
        }
    }

    /**
     * When a creep dies, remove it from the command it was on if it had one,
     */
    OnCreepDeath(deadCreep)
    {
        if(deadCreep.memory.command)
        {
            switch(deadCreep.memory.command.commanderName)
            {
                case "resourcing":
                    break;
                
                case "construction":
                    break;

                case "combat":
                    break;
                default:
                    break;
            }
        }
        
    } 
}

module.exports = Commander;