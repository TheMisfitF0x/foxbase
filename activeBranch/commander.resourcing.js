class ConstructionCommander
{
    constructor(primarySpawnID, roomControllerID)
    {
        this.roomControllerID = roomControllerID;
        this.primarySpawn = primarySpawn;
    }

    /**
     * What to do on first spawn
     */
    OnInit()
    {
        var controllerPath = Game.spawns['Spawn1'].pos.findPathTo(Game.spawns['Spawn1'].room.controller);
        for(var point in controllerPath)
        {
            var pointPos = new RoomPosition(controllerPath[point].x, controllerPath[point].y, Game.spawns["Spawn1"].room.name);
            pointPos.createConstructionSite(STRUCTURE_ROAD);
        }
    }

    PlotRoadToController()
    {
        var controllerPath = Game.spawns['Spawn1'].pos.findPathTo(Game.spawns['Spawn1'].room.controller);
        for(var point in controllerPath)
        {
            var pointPos = new RoomPosition(controllerPath[point].x, controllerPath[point].y, Game.spawns["Spawn1"].room.name);
            pointPos.createConstructionSite(STRUCTURE_ROAD);
        }
        return controllerPath
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

    /**
     * Send a command to the crew manager to distribute to an able-bodied creep.
     */
    IssueCommand()
    {

    }

    /**
     * I guess for starters, have it check every consite.
     * If it still exists, check for an order.
     * If there is no order, post one.
     */
    Update()
    {

    }
}

module.exports = ConstructionCommander;