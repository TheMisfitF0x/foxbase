/**
 * Base State Class for all states to interact with creep and store data to creep's memory.
 */
class MovingState {
    
    constructor(creep)
    {
        this.creep = creep;
        
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

    static StateTypes = {
        Moving: "moving",
        Idling: "idling",
        Working: "working",
        Sourcing: "sourcing"
    }
}