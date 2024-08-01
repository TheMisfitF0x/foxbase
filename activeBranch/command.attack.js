const Command = require('command.base');

class AttackCommand extends Command
{
    constructor(commanderName, commandType, sourceID, isPostAttack, homeSpawnID)
    {
        super(commanderName, commandType);
        this.sourceID = sourceID;
        this.isPostAttack = isPostAttack;
        this.homeSpawnID = homeSpawnID;
    }
}