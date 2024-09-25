const Strategy = require("./strat.base");

//Oh no not another class. This is set to replace behaviors.
class ConstructStrategy extends Strategy
{
    constructor(creep, state, targetID)
    {
        super(creep, state, targetID);
    }

    Action()
    {
        return this.creep.build(Game.getObjectById(this.targetID));
    }
}

module.exports = ConstructStrategy;