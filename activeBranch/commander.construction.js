let Commander = require('commander.base');
let ConstructCommand = require('command.construct');
let UpgradeCommand = require('command.upgrade');

class ConstructionCommander extends Commander
{
    constructor()
    {
        super("construction")
    }

    /**
     * On first spawn:
     * 1. Plot a road path from the first spawn to the controller.
     * 2. Plot a road path from the spawn to each energy source in the room.
     */
    OnInit()
    {
        
        this.PlotRoadToController("nah");
    }

    /**
     * 1. Check every construction site in the room that is not a road. Count road paths that are not complete as one construction site.
     * 2. If it still exists, check for an order. 
     * 3. If there is no order, post one.
     */
    Update()
    {

    }

    /**
     * Plots a road to the controller from the spawn. One command is issue per road path, not per road con site.
     * @param {String} spawnID The id of the spawn to plot from.
     * @returns The path to the controller, which can be followed straight from the spawn to the controller
     */
    PlotRoadToController(spawnID)
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
     * Pushes command to respective commander queue.
     * @param {Command} command Command to be pushed to queue
     */
    SubmitCommand(command)
    {
        Memory.constructionCommandQueue.push(command);
    }

    /** 
     * Ask the primary spawn in the specified room to make a worker creep for construction or upgrading purposes.
     * If the primary spawn is busy, check for secondary spawns.
     * If secondary spawns exist, request they spawn the creep.
     * If no work, go back through, add the creep to the shortest queue.
     * @param {String} roomName The desired room to spawn the creep in.
     */
    RequestCreep(roomName)
    {
        
    }

    /**
     * When a creep dies, check to see if the creep needs to be replaced according to the plan.
     * @param {Creep} deadCreep The deceased Creep.
     */
    OnCreepDeath(deadCreep)
    {

    } 
}

module.exports = ConstructionCommander;