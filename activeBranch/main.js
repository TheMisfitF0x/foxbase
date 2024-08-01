var roleHarvester = require('role.harvester');
var roleWorker = require('role.worker');
var roleScout = require('role.scout');
var roleScav = require('role.scavenger');
var bodyComps = require('settings.bodyComps');
var commandParser = require('creepBehavior.CommandParser');
var HarvestCommand = require('command.harvest');

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
        console.log('Spawning new harv: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(bodyComps.HARV, newName,
            { memory: { role: 'harvester'} });
    }
    
    //Check the current number of scouts and spawn more if under determined number
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    if (scouts.length < 0) {
        var newName = 'Scout' + Game.time;
        console.log('Spawning new scout: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, ATTACK ,ATTACK], newName,
            { memory: { role: 'scout'} });
    }
    
    //Check the current number of scouts and spawn more if under determined number
    var scavengers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scavenger');
    if (scavengers.length < 0) {
        var newName = 'Scav' + Game.time;
        console.log('Spawning new scav: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(bodyComps.SCAV, newName,
            { memory: { role: 'scavenger', collecting: true} });
    }

    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    if (workers.length < 4) {
        var newName = 'Worker' + Game.time;
        
        if(Memory.lastTaskSpawned == 'build')
        {
            if(Game.spawns['Spawn1'].spawnCreep(bodyComps.UPPER, newName, { memory: { role: 'worker', task: 'upgrade' } }) == OK)
            {
                Memory.lastTaskSpawned = 'upgrade';
                console.log('Spawning new Worker: ' + newName);
            }
        }
        else
        {
            if(Game.spawns['Spawn1'].spawnCreep(bodyComps.BUILDER, newName, { memory: { role: 'worker', task: 'build' } }) == OK)
            {
                Memory.lastTaskSpawned = 'build';
                console.log('Spawning new Worker: ' + newName);
            }
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
                roleHarvester.runMobile(creep);
                break;
            case 'scout':
                roleScout.run(creep);
                break;
            case 'scavenger':
                roleScav.run(creep);
                break;
            case 'worker':
                roleWorker.run(creep);
                break;
            default:
                commandParser.intakeCommand(creep);
        }
        
    }
}