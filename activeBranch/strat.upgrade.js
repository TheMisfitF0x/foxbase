const Strategy = require("./strat.base");

//Oh no not another class. This is set to replace behaviors.
class UpgradeStrategy extends Strategy
{
    constructor(creep, state, targetID)
    {
        super(creep, state, targetID);
    }

    Action()
    {
        return this.creep.upgradeController(Game.getObjectById(this.targetID));
    }
}

module.exports = UpgradeStrategy;