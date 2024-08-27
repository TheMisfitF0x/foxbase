/**
 * Base State Class for all states to interact with creep and store data to creep's memory.
 */
class WorkingState {
    
    constructor(creep, type)
    {
        this.creep = creep;
        
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
}