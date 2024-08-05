var Commander = require('commander.base');
var TransferCommand = require('command.transfer');

class ResourcingCommander extends Commander
{
    constructor(primarySpawnID, roomControllerID)
    {
        super("resourcing", primarySpawnID, roomControllerID)
    }

    /**
     * What to do on first spawn
     */
    // OnInit()
    // {
    //     super.OnInit()
    // }

    /**
     * Check for the existence of dropped resources, ruins, or graves. 
     * Send a transfer from those items to the nearest container/storage.
     * Then, check for low towers, extensions, spawns.
     * Send a transfer to those items from the nearest container/storage
     */
    Update()
    {
        this.ProcessLootables([FIND_DROPPED_RESOURCES, FIND_TOMBSTONES, FIND_RUINS]);
        this.deleteInvalidCommands();
    }

    /**
     * Check for the existence of pools, graves, or ruins without commands. If one is found, add a command.
     */
    ProcessLootables(lootableTypes)
    {
        var primarySpawn = Game.getObjectById(this.primarySpawnID);
        
        for(var lootableTypeIndex in lootableTypes)
        {
            var lootableType = lootableTypes[lootableTypeIndex];
            var lootables = primarySpawn.room.find(lootableType)

            for(var x in lootables) //TODO: Find someway to condense these three for statements into one.
            {
                var lootable = lootables[x];
                var commandMatch = false;
                var lootableID = lootable.id;

                for(var y in primarySpawn.memory.resourcingCommandQueue)
                {
                    var command = primarySpawn.memory.resourcingCommandQueue[y];
                    if(lootableID == command.collectFromID)
                    {
                        commandMatch = true;
                        break; 
                    }
                }

                if(!commandMatch)
                {
                    this.IssueCommand(new TransferCommand(this.commanderName, lootableID));
                }
            }
        }
    }

    deleteInvalidCommands()
    {
        var primarySpawn = Game.getObjectById(this.primarySpawnID);
        for(var x in primarySpawn.memory.resourcingCommandQueue)
        {
            var command = primarySpawn.memory.resourcingCommandQueue[x];
            var collectFromObject = Game.getObjectById(command.collectFromID);

            if(!collectFromObject)
            {
                primarySpawn.memory.resourcingCommandQueue.splice(x,1);
            }
        }
    }

    /** 
     * Ask the primary spawn to make a creep.
     * If the primary spawn is busy, check for secondary spawns.
     * If secondary spawns exist, request they spawn the creep.
     * If no work, go back through, add the creep to the shortest queue.
     */
    RequestCreep(creep)
    {
        
    }

    
}

module.exports = ResourcingCommander;