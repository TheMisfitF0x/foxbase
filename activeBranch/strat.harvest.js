const Strategy = require("./strat.base");

//Oh no not another class. This is set to replace behaviors.
class HarvestStrategy extends Strategy
{
    constructor(creep, state, targetID)
    {
        super(creep, state, targetID);
    }

    Action()
    {
        console.log("Harvest Action Taken");
        return this.creep.harvest(Game.getObjectById(this.targetID));
    }
}

module.exports = HarvestStrategy;