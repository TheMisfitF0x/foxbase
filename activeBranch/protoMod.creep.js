require('behavior.harvest');
require('behavior.transfer');
require('behavior.upgrade');
require('behavior.construct');

if(!Creep.prototype.VerifyCommand)
{
    Creep.prototype.VerifyCommand = function(command)
    {
        return "Checking Capability to execute Command";
    }
}

if(!Creep.prototype.ReceiveCommand)
{
    Creep.prototype.ReceiveCommand = function(command)
    {
        this.memory.command = command
    }
}

if(!Creep.prototype.Execute)
{
    Creep.prototype.Execute = function()
    {
        switch(this.memory.command.commandType)
        {
            case "attack":
                //TODO: Figure out wtf the attack command entails lol
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
        }
    }
}