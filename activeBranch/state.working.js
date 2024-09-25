const { StateTypes } = require("state.base");
const HarvestStrategy = require("./strat.harvest");
const TransferCommand = require("./command.transfer");
const TransferStrategy = require("./strat.transfer");
const UpgradeStrategy = require("./strat.upgrade");
const ConstructStrategy = require("./strat.construct");
const AttackStrategy = require("./strat.attack");
require("strat.attack");
require("strat.construct");
require("strat.harvest");
require("strat.transfer");
require("strat.upgrade");
/**
 * Base State Class for all states to interact with creep and store data to creep's memory.
 */
class WorkingState {
    
    constructor(creep)
    {
        this.creep = creep;
        this.command = creep.memory.command;
        this.type = StateTypes.Working;
        this.strategy = this.GetStrategy();
    }

    Action()
    {
        //TODO: Build Strategy pattern for working behaviors.
    }

    /**
     * Writes necessary variables pertaining to current state to creep's memory under "state" object.
     */
    LogState()
    {
        //creep.memory.varName = this.varName;
        //If I remember correctly I can also do something like:
        //creep.memory.[varName] = this.var;
        //Might be neat.
    }

    GetStrategy()
    {
        switch(this.command.commandType)
        {
            case "harvest":
                return new HarvestStrategy(this.creep, this, this.command.sourceID);
                break;
            case "transfer":
                return new TransferStrategy(this.creep, this, this.command.targetID);
                break;
            case "upgrade":
                return new UpgradeStrategy(this.creep, this, this.command.roomControlID);
                break;
            case "construct":
                return new ConstructStrategy(this.creep, this, this.command.conSiteID);
                break;
            case "attack":
                return new AttackStrategy(this.creep, this, this.command.targetID);
                break;
            default:
                console.log("Cannot create Strategy. Invalid Command Type. How the hell did you get here?");
                break;
        }
    }
}