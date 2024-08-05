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
        this.ProcessLootables();
    }

    /**
     * Check for the existence of pools, graves, or ruins without commands. If one is found, add a command.
     */
    ProcessLootables()
    {
        var spawn = Game.getObjectById(this.primarySpawnID);
        var pools = spawn.room.find(FIND_DROPPED_RESOURCES);
        var graves = spawn.room.find(FIND_TOMBSTONES);
        var ruins = spawn.room.find(FIND_RUINS);

        for(var x in pools) //TODO: Find someway to condense these three for statements into one.
        {
            var pool = pools[x];
            var commandMatch = false;
            var poolID = pool.id;

            for(var y in this.primarySpawn.memory.resourcingCommandQueue)
            {
                var command = this.primarySpawn.memory.resourcingCommandQueue[y];
                if(poolID == command.collectFromID)
                {
                    commandMatch = true;
                    break; 
                }
            }

            if(!commandMatch)
            {
                this.IssueCommand(new TransferCommand(this.commanderName, poolID));
            }
        }

        for(var x in graves)
        {
            var grave = graves[x];
            var commandMatch = false;
            var graveID = grave.id;
            
            for(var y in this.primarySpawn.memory.resourcingCommandQueue)
            {
                var command = this.primarySpawn.memory.resourcingCommandQueue[y];
                if(graveID == command.collectFromID)
                {
                    commandMatch = true;
                    break; 
                }
            }

            if(!commandMatch)
            {
                this.IssueCommand(new TransferCommand(this.commanderName, graveID));
            }
        }

            for(var x in ruins)
            {
                var ruin = ruins[x];
                var commandMatch = false;
                var ruinID = ruin.id;
                for(var y in this.primarySpawn.memory.resourcingCommandQueue)
                {
                    var command = this.primarySpawn.memory.resourcingCommandQueue[y];
                    if(ruinID == command.collectFromID)
                    {
                        commandMatch = true;
                        break; 
                    }
                }

                if(!commandMatch)
                {
                    this.IssueCommand(new TransferCommand(this.commanderName, ruinID));
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