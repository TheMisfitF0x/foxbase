const State = require("state.base");
const { StateTypes } = require("./state.base");

class SourcingState extends State{
    
    constructor(creep, targetSourceID)
    {
        this.creep = creep;
        this.type = StateTypes.Sourcing;
    }

    Action()
    {
        //TODO: Move sourcing code here.
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