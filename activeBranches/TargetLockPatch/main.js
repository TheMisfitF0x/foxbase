var roleHarvester = require('role.harvester');
var roleWorker = require('role.worker');
var roleScout = require('role.scout');
var roleScav = require('role.scavenger');

var targeter = require('man.flagManager');

var tickConverter = require('action.tickConverter');
var slotFinder = require('action.findHarvSlots');
var bodyComps = require('settings.bodyComps');
//This is the big test
module.exports.loop = function () {
    
    targeter.updateFlags();
    
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            var flagAssigned = Memory.creeps[name].targetLockFlag;
            console.log(flagAssigned);
            if(Game.flags[flagAssigned])
            {
                Game.flags[flagAssigned].memory.assignedCreeps -= 1;
            }
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
            filter: (structure) => {return ((structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax) || (structure.structureType == STRUCTURE_WALL && structure.hits < 6000))}
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

    tickConverter.run(Game.time);
    var freeSlot = slotFinder.findFreeSlot(Game.spawns['Spawn1'].room, true);
    
    if(freeSlot != 0)
    {
        var newName = 'HarvX' + freeSlot.x + "Y"+ freeSlot.y;
        Game.spawns['Spawn1'].spawnCreep(bodyComps.HARV, newName,
            { memory: { role: 'harvester', harvest: true, targetSlot: freeSlot} });
    }
    
    //Check the current number of scouts and spawn more if under determined number
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    if (scouts.length < 0) {
        var newName = 'Scout' + Game.time;
        console.log('Spawning new scout: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, ATTACK ,ATTACK], newName,
            { memory: { role: 'scout'} });
    }
    
    var harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    
    if(harvs.length)
    {
        //Check the current number of scouts and spawn more if under determined number
        var scavengers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scavenger');
        if (scavengers.length < 2) {
            var newName = 'Scav' + Game.time;
            console.log('Spawning new scav: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(bodyComps.SCAV, newName,
                { memory: { role: 'scavenger', collecting: true, targetLockFlag: null} });
        }
    }

    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    if (workers.length < 4) {
        var newName = 'Worker' + Game.time;
        console.log('Spawning new Worker: ' + newName);
        if(Memory.lastTaskSpawned == 'build')
        {
           if(Game.spawns['Spawn1'].spawnCreep(bodyComps.UPPER, newName, { memory: { role: 'worker', task: 'upgrade' } }) == OK)
            {
                Memory.lastTaskSpawned = 'upgrade';
            }
        }
        else
        {
            if(Game.spawns['Spawn1'].spawnCreep(bodyComps.BUILDER, newName, { memory: { role: 'worker', task: 'build' } }) == OK)
            {
                Memory.lastTaskSpawned = 'build';
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
        
        if(creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep)
        }
        
        if(creep.memory.role == 'scout')
        {
            //roleScout.run(creep, Memory.scoutPosts[0].id);
        }
        
        if(creep.memory.role == 'scavenger')
        {
            roleScav.run(creep);
        }
        
        if (creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
    }
}
