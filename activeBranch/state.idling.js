class IdlingState {
    
    constructor(creep)
    {
        this.creep = creep;
        this.type = type;
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

    static StateTypes = {
        Moving: "moving",
        Idling: "idling",
        Working: "working",
        Sourcing: "sourcing"
    }
}