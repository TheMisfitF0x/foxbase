require('behavior.harvest');
require('behavior.transfer');
require('behavior.upgrade');
require('behavior.construct');
require('behavior.sourcing');

if(!Creep.prototype.CanDoCommand)
{
    /**
     * This function checks the creep's body against the task it is assigned
     * Returns true if able to execute command
     * False otherwise.
     * @param {Command} command The command to verify against.
     * @returns True if the creep has the necessary body parts to carry out the command. False otherwise.
     */
    Creep.prototype.CanDoCommand = function(command)
    {
        let baseBodiesNeeded = [];
        switch(command.commandType)
        {
            case "attack":
                baseBodiesNeeded = [ATTACK, MOVE];
                break;
            case "transfer":
                baseBodiesNeeded = [CARRY, MOVE];
                break;
            case "upgrade":
                baseBodiesNeeded = [WORK, CARRY, MOVE];
                break;
            case "harvest":
                baseBodiesNeeded = [WORK, CARRY, MOVE];
                break;
            case "construct":
                baseBodiesNeeded = [WORK, CARRY, MOVE];
                break;
            case "capture":
                baseBodiesNeeded = [CLAIM, MOVE];
            default:
                console.log("Cannot Verify, unknown or invalid command");
                break;
        }

        
        for(let x in baseBodiesNeeded)
        {
            let bodyType = baseBodiesNeeded[x];
            if(!this.body.includes(bodyType))
            {
                return false;
            }
        }

        return true;
            
    }
}


if(!Creep.prototype.ReceiveCommand)
{
    /**
     * This function takes in a command and writes the contents of the command to the creep's memory.
     * For this reason, commands must always be serializable (no complex objects or game objects)
     * Use IDs to get references to game objects.
     * @param {Command} command The command to write to memory.
     */
    Creep.prototype.ReceiveCommand = function(command)
    {
        this.memory.command = command
    }
}


if(!Creep.prototype.Execute)
{
    /**
     * This function checks the command type of the command in the creep's memory, 
     * then executes the proper method to handle that command.
     * 
     * NOTE: This function will soon be replaced with a call to the creep's state-based action function.
     * When in working state, action will be determined based on command, executing the proper behavior.
     */
    Creep.prototype.Execute = function() 
    {
        if(this.memory.command)
        {
            switch(this.memory.command.commandType)
            {
                case "attack":
                    //TODO: Figure out what the attack command entails lol
                    break;
                case "transfer":
                    this.ExecuteTransferCommand();
                    break;
                case "upgrade":
                    this.ExecuteUpgradeCommand();
                    break;
                case "harvest":
                    this.ExecuteHarvestCommand();
                    break;
                case "construct":
                    this.ExecuteConstructCommand();
                    break;
                default:
                    console.log("No valid command loaded, command type is " + this.memory.command.commandType);
                    break;
            }
        }
    }
}

if(!Creep.prototype.DynamicMoveAndAction)
{
    /**
     * This is a simple helper function that I'd like to attempt to use to simplify the state/strategy plans in the future, and cut down on code repeats. 
     * I have no idea whether or not this will help or even work.
     * 
     * This function attempts the provided action, and will move the creep if not in range to perform the function.
     * @param {Function} actionFunction The action the creep is to attempt to perform.
     * @param {RoomObject} target The game object the creep is to perform the action on.
     * @returns The error code provided by the action function.
     */
    Creep.prototype.DynamicMoveAndAction = function(actionFunction, target)
    {
        let returnCode = this.actionFunction(target)
        if(returnCode == ERR_NOT_IN_RANGE)
        {
            this.moveTo(target);
        }
        return returnCode;
    }
}