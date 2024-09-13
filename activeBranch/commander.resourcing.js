const Commander = require('commander.base');
const TransferCommand = require('command.transfer');
const HarvestCommand = require('command.harvest');

class ResourcingCommander extends Commander
{
    constructor()
    {
        super("resourcing")
    }

    /**
     * What to do on first spawn
     */
    OnInit()
    {
        
    }

    /**
     * 1. Check for the existence of dropped resources, ruins, or graves. 
     * 2. Send a transfer from those items to the nearest container/storage.
     * 3. Then, check for low towers, extensions, spawns.
     * 4. Send a transfer to those items from the nearest container/storage
     * 5. Repeat per room visible.
     */
    Update()
    {
        this.ProcessLootables([FIND_DROPPED_RESOURCES, FIND_TOMBSTONES, FIND_RUINS]);
        this.deleteInvalidCommands();
    }

    /**
     * Check for the existence of pools, graves, or ruins without commands. If one is found, add a command.
     * @param {String[]} lootableTypes An array of FIND_* constants to locate.
     */
    ProcessLootables(lootableTypes, roomName = "all")
    {
        if(roomName == "all")
        {
            let targetRooms = Game.rooms;
        }
        else
        {
            let targetRooms = Game.rooms[roomName];
        }
        
        for(let x in targetRooms)
        {
            let targetRoom = targetRooms[x]
        
            for(let lootableTypeIndex in lootableTypes)
            {
                let lootableType = lootableTypes[lootableTypeIndex];
                let lootables = targetRoom.find(lootableType)

                for(let x in lootables) 
                {
                    let lootable = lootables[x];
                    let commandMatch = false;
                    let lootableID = lootable.id;

                    for(let y in Memory.resourcingCommandQueue)
                    {
                        let command = Memory.resourcingCommandQueue[y];
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
     * 
     * TODO: Cases for harvest commands break this method. Fix.
     */
    deleteInvalidCommands()
    {
        for(let x in Memory.resourcingCommandQueue)
        {
            let command = Memory.resourcingCommandQueue[x];
            let collectFromObject = Game.getObjectById(command.collectFromID);

            if(!collectFromObject)
            {
                Memory.resourcingCommandQueue.splice(x,1);
            }
        }
    }

    /**
     * Pushes command to commander queue.
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
     * @param {String} roomName The desired room to spawn the creep in.
     * @param {boolean} [isHarv=false] If true, spawna harvester creep, else spawn a truck creep. 
     */
    RequestCreep(roomName, isHarv = false)
    {
        let targetRoom = Game.rooms[roomName];
    }

    
}

module.exports = ResourcingCommander;