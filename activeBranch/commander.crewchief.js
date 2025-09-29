const Commander = require('commander.base');
const TransferCommand = require('command.transfer');
const HarvestCommand = require('command.harvest');
class CrewCommander extends Commander
{
    constructor()
    {
        super("crew")
    }

    /**
     * What to do on first spawn
     */
    OnInit()
    {
        
    }

    /**
     * 1. Check the plan to see if new creeps are needed.
     * 2. Try to spawn a new creep. Harvesters ALWAYS come first.
     * 3. Clear the memories of the dead.
     * 4. Attempt to issue commands from the resourcing queue.
     * 5. Attempt to issue commands from the construction queue.
     * 
     */
    Update()
    {
        console.log(Memory.plan.creeps2Maintain.harvesters);
        this.clearDeadMemories()
    }
    
    /**
     * 1. Check for the existence of memory belonging to dead creeps.
     * 2. If memory found, check to see if the creep was assigned to a command.
     * 3. If they were, access the command and remove the creep assigned.
     * 4. Then delete memory.
     */
    clearDeadMemories()
    {
        
    }

    /**
     * This sends a command to an available creep, 
     * looking for one in the same room who is capable and fanning out the search to 
     * adjacent rooms if need be. 
     * 
     * NOTE: This is not SubmitCommand(). This only sends commands to creeps, it does not make new commands.
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

module.exports = CrewCommander;