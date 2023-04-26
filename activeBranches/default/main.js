var roleHarvester = require('role.harvester');
var roleWorker = require('role.worker');
var roleScout = require('role.scout');
var tickConverter = require('action.tickConverter');

module.exports.loop = function () {

    tickConverter.run(Game.time);

    var tower = Game.getObjectById('640ca6a0df83b00c68858341');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if (harvesters.length < 10) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'harvester', harvState: 'harvest' } });
    }
    
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    console.log('Scouts: ' + scouts.length);
    if (scouts.length < 0) {
        var newName = 'Scout' + Game.time;
        console.log('Spawning new scout: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, ATTACK ,ATTACK], newName,
            { memory: { role: 'scout'} });
    }

    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    console.log('Workers: ' + workers.length);
    if (workers.length < 4) {
        var newName = 'Worker' + Game.time;
        console.log('Spawning new Worker: ' + newName);
        if(Memory.lastTaskSpawned == 'build')
        {
           if(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], newName, { memory: { role: 'worker', task: 'upgrade' } }) == OK)
            {
                Memory.lastTaskSpawned = 'upgrade';
            }
        }
        else
        {
            if(Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'worker', task: 'build' } }) == OK)
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
    
    var source2Saturate = 0;
    var sources = Memory.surveyedSources;
    var harvsOnCurSource = 0;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.role == 'harvester') {
            if(harvsOnCurSource == sources[source2Saturate].maxHarvCount)
            {
                source2Saturate++;
                harvsOnCurSource = 0;
            }
            
            roleHarvester.run(creep, Game.getObjectById(sources[source2Saturate].id));
           
            harvsOnCurSource++;
        }
        
        if(creep.memory.role == 'scout')
        {
            roleScout.run(creep, Memory.scoutPosts[0].id);
        }
        
        if (creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
    }
}