const State = require("state.base");
const { StateTypes } = require("state.base");

class SourcingState extends State{
    
    constructor(creep)
    {
        this.creep = creep;
        this.command = this.creep.memory.command;
        this.initState = this.creep.memory.state;
        if(this.command.commandType == "harvest")//If this is a post harvest and the source is predetermined...
        {
            this.targetSource = Game.getObjectById(this.command.sourceID); //Set the predetermined source as the target.
        }
        else if(this.state.sourceID){//If this is not a postharvest and I have a target source in memory
            this.targetSource = this.initState.sourceID;
        }
        else //If this is the first time the sourcing state is being run, there's no target source in mind
        {
            this.targetSource = this.setTargetSource()
        }
        this.type = StateTypes.Sourcing;
    }

    Action()
    {
        let container = this.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }});
        if(container)
        {
            if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else
        {
            let sources = this.pos.findClosestByPath(FIND_SOURCES);
            if (this.harvest(sources) == ERR_NOT_IN_RANGE)
            {
                this.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    FindAndSetTargetSource()
    {
        this.creep.memory.state.sourceID = newTargetSourceID;
        this.targetSource = newTargetSource;
        return newTargetSource;
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