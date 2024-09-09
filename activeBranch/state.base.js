/**
 * Base State Class for all states to interact with creep and store data to creep's memory.
 */
class State {
    /**
     * Base state class
     * @param {Creep} creep 
     * @param {StateTypes} type 
     */
    constructor(creep, type)
    {
        this.creep = creep;
        this.type = type;
        this.command = creep.memory.command;
    }

    Action()
    {
        console.log("Undefined state. Please use children state classes for instantiation.")
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

module.exports = State;