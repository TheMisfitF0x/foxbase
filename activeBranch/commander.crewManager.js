class CrewManager
{
    constructor(primarySpawnID, roomControllerID)
    {
        this.primarySpawnID = primarySpawnID
        this.roomControllerID = roomControllerID
    }

    OnInit()
    {
        var primarySpawn = Game.getObjectById(this.primarySpawnID);
        primarySpawn.memory.constructionCommandQueue = []
        primarySpawn.memory.resourcingCommandQueue = []
        primarySpawn.memory.combatCommandQueue = []
    }

    ReceiveCommand(command)
    {
        switch(command.commanderName)
        {
            case "resourcing":
                this.constructionCommandQueue.push(command) 
                break;
            
            case "construction":

                break;

            case "combat":

                break;
        }
    }
}