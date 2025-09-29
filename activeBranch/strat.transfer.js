const Strategy = require("./strat.base");

//Oh no not another class. This is set to replace behaviors.
class TransferStrategy extends Strategy
{
    constructor(creep, state, targetID)
    {
        super(creep, state, targetID);
    }

    Action()
    {
        return this.creep.transfer(Game.getObjectById(this.targetID), state.command.resourceType);
    }
}

module.exports = TransferStrategy;