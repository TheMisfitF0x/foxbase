const Command = require('command.base');

//TODO Rewrite parameters
class AttackCommand extends Command
{
    constructor(commanderName, sourceID, isPostAttack, homeSpawnID)
    {
        super(commanderName, "attack");
        this.sourceID = sourceID;
        this.isPostAttack = isPostAttack;
        this.homeSpawnID = homeSpawnID;
    }
}