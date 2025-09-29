const Strategy = require("./strat.base");

//Oh no not another class. This is set to replace behaviors.
class AttackStrategy extends Strategy
{
    constructor(creep, state, targetID)
    {
        super(creep, state, targetID);
    }

    /**
     * Stabbity stab the bad guy.
     * @returns The resolution code after the attack.
     */
    Action()
    {
        return this.creep.attack(Game.getObjectById(this.targetID));
    }
}

module.exports = AttackStrategy;