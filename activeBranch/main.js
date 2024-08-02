var bodyComps = require('settings.bodyComps');
var HarvestCommand = require('command.harvest');
var UpgradeCommand = require('command.upgrade');
require('protoMod.creep');

module.exports.loop = function () {
    
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_TOWER}});
    for(var i in towers)
    {
        var tower = towers[i];
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax) || (structure.structureType == STRUCTURE_WALL && structure.hits < 6000) || (structure.structureType == STRUCTURE_RAMPART && structure.hits < 150000))}
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }
    
    if(Memory.pathPlotted != true)
    {
        var controllerPath = Game.spawns['Spawn1'].pos.findPathTo(Game.spawns['Spawn1'].room.controller);
        for(var point in controllerPath)
        {
            var pointPos = new RoomPosition(controllerPath[point].x, controllerPath[point].y, Game.spawns["Spawn1"].room.name);
            pointPos.createConstructionSite(STRUCTURE_ROAD);
        }
        Memory.pathPlotted = true;   
    }
    
    var harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvs.length < Game.spawns["Spawn1"].room.find(FIND_SOURCES).length) {
        var newName = 'Harv' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(bodyComps.HARV, newName,
            { memory: { role: 'harvester'} }) == OK)
            {
                console.log('Spawning new harv: ' + newName);
            }
    }

    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    if (workers.length < 2) {
        var newName = 'Worker' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(bodyComps.UPPER, newName, { memory: { role: 'worker', task: 'upgrade' } }) == OK)
        {
            console.log('Spawning new Worker: ' + newName);
            Memory.lastTaskSpawned = 'upgrade';
        }
        
    }
    
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role){
            case 'harvester':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Harvest command");
                    creep.ReceiveCommand(new HarvestCommand("Resourcing", creep.room.find(FIND_SOURCES)[0].id, false, Game.spawns["Spawn1"].id));
                }
                creep.Execute()
                break;
            case 'scout':
                roleScout.run(creep);
                break;
            case 'scavenger':
                roleScav.run(creep);
                break;
            case 'worker':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Upgrade command");
                    creep.ReceiveCommand(new UpgradeCommand("Construction", creep.room.controller.id, true));
                }
                creep.Execute()
                break;
            default:
                if(creep.memory.command == null)
                {
                    console.log("Issuing Harvest command");
                    creep.ReceiveCommand(new HarvestCommand("Resourcing", creep.room.find(FIND_SOURCES)[0].id, false, Game.spawns["Spawn1"].id));
                }
                creep.Execute()
                break;
        } 
    }
}