//Oh no not another class. This is set to replace behaviors.
class Strategy
{
    constructor(creep, state, targetID)
    {
        this.creep = creep;
        this.state = state;
        this.targetID = targetID;
    }

    Action()
    {
        console.log("No action associated with this state. Created base state object. Bad.");
        console.log("Target id: " + this.targetID);
    }
}

module.exports = Strategy;