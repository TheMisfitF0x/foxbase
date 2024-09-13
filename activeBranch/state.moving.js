const State = require("state.base");
const { StateTypes } = require("state.base");
require("protoMod.creep")
class MovingState extends State {
    
    constructor(creep, target, isMovingTowardTarget)
    {
        this.creep = creep;
        this.type = StateTypes.Moving;
        this.target = target;

        //This is ugly and temporary, will be fixed later.
        if(isMovingTowardTarget && (creep.memory.command.commandType == "upgrade" || creep.memory.command.commandType == "build" || creep.memory.command.commandType == "repair"))
        {
            this.actionRange = 3;
        }
        else{
            this.actionRange = 1;
        }
    }

    Action()
    {
        
        //TODO: Move movement code here
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