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

    /**
     * Commanders will receive submitCommand(command), which pushes it to queue.
     * TODO: In either case, this function needs implementation to send to an available creep.
     * @param {Command} command The command to be pushed to creep
     */
    IssueCommand(command)
    {
        
    }

    /**
     * When a creep dies, remove it from the command it was on if it had one.
     * This too is a weird one, and the reason why I might still set a crew manager as opposed to letting the commanders handle everything.
     * Commands have been given an incrementally increasing ID.
     * @param {Creep} deadCreep The creep that has expired.
     */
    OnCreepDeath(deadCreep)
    {
        if(Memory.creeps[deadCreep.name])
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