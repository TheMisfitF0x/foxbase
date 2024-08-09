var Commander = require('commander.base');
var TransferCommand = require('command.transfer');

class ResourcingCommander extends Commander
{
    constructor()
    {
        super("resourcing")
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
     * - TODO: Fix the spawn reference here...
     * @param {String[]} lootableTypes An array of FIND_* constants to locate.
     */
    ProcessLootables(lootableTypes, roomName = "all")
    {
        if(roomName == "all")
        {
            var targetRooms = Game.rooms;
        }
        else
        {
            var targetRooms = Game.rooms[roomName];
        }
        
        for(var x in targetRooms)
        {
            var targetRoom = targetRooms[x]
        
            for(var lootableTypeIndex in lootableTypes)
            {
                var lootableType = lootableTypes[lootableTypeIndex];
                var lootables = targetRoom.find(lootableType)

                for(var x in lootables) 
                {
                    var lootable = lootables[x];
                    var commandMatch = false;
                    var lootableID = lootable.id;

                    for(var y in Memory.resourcingCommandQueue)
                    {
                        var command = Memory.resourcingCommandQueue[y];
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
    }
    
    /**
     * This iterates through all commands in the respective command queue.
     * If any point to a container that does not exist, remove them.
     * - TODO: Fix spawn reference...
     */
    deleteInvalidCommands()
    {
        for(var x in Memory.resourcingCommandQueue)
        {
            var command = Memory.resourcingCommandQueue[x];
            var collectFromObject = Game.getObjectById(command.collectFromID);

            if(!collectFromObject)
            {
                Memory.resourcingCommandQueue.splice(x,1);
            }
        }
    }

    /**
     * Pushes command to respective commander queue.
     * @param {Command} command Command to be pushed to queue
     */
    SubmitCommand(command)
    {
        Memory.resourcingCommandQueue.push(command);
    }

    /** 
     * Ask the primary spawn of the room to make a creep.
     * If the primary spawn is busy, check for secondary spawns.
     * If secondary spawns exist, request they spawn the creep.
     * If no work, go back through, add the creep to the shortest queue.
     */
    RequestCreep(creep, roomName)
    {
        var targetRoom = Game.rooms[roomName];
    }

    
}

module.exports = ResourcingCommander;