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

    OnInit()
    {
        
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
                Memory.resourcingCommandQueue.push(command); 
                break;
            
            case "construction":
                Memory.constructionCommandQueue.push(command);
                break;

            case "combat":
                Memory.combatCommandQueue.push(command);
                break;
        }
    }

    /**
     * When a creep dies, remove it from the command it was on if it had one.
     * This too is a weird one, and the reason why I might still set a crew manager as opposed to letting the commanders handle everything.
     * Commands have been given an ID using Date.now(), this should help in the future.
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