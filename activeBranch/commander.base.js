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

    /**
     * This method will likely be split into its constituient parts per commander type. 
     * The base implementation will be distribution to an available creep.
     * Alternatively, commanders will receive submitCommand(command), which pushes it to queue.
     * TODO: In either case, this function needs implementation to send to an available creep.
     * @param {Command} command The command to be pushed to queue
     */
    IssueCommand(command)
    {
        switch(this.commanderName)
        {
            case "resourcing":
                this.primarySpawn.memory.resourcingCommandQueue.push(command); 
                break;
            
            case "construction":
                this.primarySpawn.memory.constructionCommandQueue.push(command);
                break;

            case "combat":
                this.primarySpawn.memory.combatCommandQueue.push(command);
                break;
        }
    }

    /**
     * When a creep dies, remove it from the command it was on if it had one.
     * This too is a weird one, and the reason why I might still set a crew manager as opposed to letting the commanders handle everything.
     * Commands have been given an ID using Date.now(), this should help in the future.
     * @param {Creep} deadCreep The dumbass creep that bit the dust (what a loser.)
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