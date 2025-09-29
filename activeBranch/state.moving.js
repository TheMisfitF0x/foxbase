const State = require("state.base");
const { StateTypes } = require("state.base");
require("protoMod.creep")
class MovingState extends State {
    
    constructor(creep, targetID, isSourcingRun)
    {
        this.creep = creep;
        this.command = this.creep.memory.command;
        this.type = StateTypes.Moving;
        this.target = Game.getObjectById(targetID);
        this.isSourcingRun = isSourcingRun; 
        //This is ugly and temporary, will be fixed later.
        if(!this.isSourcingRun && (this.command.commandType == "upgrade" || this.command.commandType == "build" || this.command.commandType == "repair"))
        {
            this.actionRange = 3;
        }
        else{
            this.actionRange = 1;
        }
    }

    Action()
    {
        this.creep.moveTo(target);
        if(this.creep.pos.getRangeTo(target) <= this.actionRange)
        {
            //Transition state? I really need to re-figure this one out.
            this.ArrivedAtTarget()
            console.log("I'm in range! Moving to new state.");
        }
    }

    ArrivedAtTarget()
    {
        this.creep.memory.state = "working";
        console.log("State set to 'working'");
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
}

module.exports = MovingState;