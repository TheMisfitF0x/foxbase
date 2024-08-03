var bodyComps = require('settings.bodyComps');
var HarvestCommand = require('command.harvest');
var UpgradeCommand = require('command.upgrade');
var ConstructCommand = require('command.construct');
var ConstructionCommander = require('commander.construction');
var ResourcingCommander = require('commander.resourcing');
require('protoMod.creep');
require('protoMod.spawn');

module.exports.loop = function () {
    var newSpawnID = _.find(Game.structures, (o) => {return o.structureType == STRUCTURE_SPAWN}).id
    var newRoomControllerID = Game.getObjectById(newSpawnID).room.controller.id;
    var resourcingCommander = new ResourcingCommander(newSpawnID, newRoomControllerID);
    var constructCommander = new ConstructionCommander(newSpawnID, newRoomControllerID);

    if(!Memory.initComplete)
    {
        resourcingCommander.OnInit()
        constructCommander.OnInit()
        Memory.initComplete = true;
    }
    
    // resourcingCommander.IssueCommand("FUCK YOU");
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvs.length < Game.spawns["Spawn1"].room.find(FIND_SOURCES).length) {
        var newName = 'Harv' + Game.time;
        if(Game.spawns['Spawn1'].spawnCreep(bodyComps.HARV, newName, { memory: { role: 'harvester'} }) == OK)
            {
                console.log('Spawning new harv: ' + newName);
            }
    }

    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    if (workers.length < 4) {
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
                
                break;
            case 'scavenger':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Transfer command");
                    creep.ReceiveCommand(new TransferCommand("Resourcing", creep.room.find(FIND_SOURCES)[0].id, false, Game.spawns["Spawn1"].id));
                }
                break;
            case 'worker':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Upgrade command");
                    creep.ReceiveCommand(new UpgradeCommand("Construction", Game.spawns["Spawn1"].room.controller.id, true));
                    
                }
                creep.Execute()
                break;
            default:
                if(creep.memory.command == null)
                {
                    console.log("Issuing Harvest command");
                    creep.ReceiveCommand(new HarvestCommand("Resourcing", creep.room.find(FIND_SOURCES)[0].id, false));
                }
                creep.Execute()
                break;
        } 
    }
}