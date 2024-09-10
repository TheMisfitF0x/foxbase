const State = require("state.base");
const { StateTypes } = require("./state.base");

class IdlingState extends State{
    
    constructor(creep)
    {
        this.creep = creep;
        this.type = StateTypes.Idling;
    }

    Action()
    {
        //TODO: Figure out if the creep needs to be doing anything here.
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