var Commander = require('commander.base');

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
        var spawn = Game.getObjectById(this.primarySpawnID);
        var pools = spawn.room.find(FIND_DROPPED_RESOURCES);
        var graves = spawn.room.find(FIND_TOMBSTONES);
        var ruins = spawn.room.find(FIND_RUINS);
        
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

    /**
     * When a creep dies, check to see if the creep needs to be replaced according to the plan.
     */
    OnCreepDeath(deadCreep)
    {

    } 
}

module.exports = ResourcingCommander;