var Commander = require('commander.base');

class ConstructionCommander extends Commander
{
    constructor(primarySpawnID, roomControllerID)
    {
        super("construction", primarySpawnID, roomControllerID)
    }

    /**
     * What to do on first spawn
     */
    OnInit()
    {
        super.OnInit()
        var controllerPath = Game.spawns['Spawn1'].pos.findPathTo(Game.spawns['Spawn1'].room.controller);
        for(var point in controllerPath)
        {
            var pointPos = new RoomPosition(controllerPath[point].x, controllerPath[point].y, Game.spawns["Spawn1"].room.name);
            pointPos.createConstructionSite(STRUCTURE_ROAD);
        }
    }

    /**
     * I guess for starters, have it check every consite (that isn't a road).
     * If it still exists, check for an order.
     * If there is no order, post one.
     */
    Update()
    {

    }

    /**
     * Plots a road to the controller from the spawn. Trying to decide if road commands should be plotted per consite or per path.
     * Leaning more towards per path.
     * @returns The path to the controller, which can be followed straight from the spawn to the controller
     */
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
     * Pushes command to respective commander queue. Considering decoupling these queues from spawn memory and storing in root.
     * @param {Command} command Command to be pushed to queue
     */
    SubmitCommand(command)
    {
        this.primarySpawn.memory.constructionCommandQueue.push(command);
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

module.exports = ConstructionCommander;