const bodyComps = require('settings.bodyComps');

// TODO: These command requirements need to be removed when commanders are able to issue orders properly.
const HarvestCommand = require('command.harvest');
const UpgradeCommand = require('command.upgrade');
const ConstructCommand = require('command.construct');
const plan = require('settings.plan');
// TODO: Add the combat Commander.
const ConstructionCommander = require('commander.construction');
const ResourcingCommander = require('commander.resourcing');
const CrewCommander = require('commander.crewchief');


require('protoMod.creep');
require('protoMod.spawn');

module.exports.loop = function () {
    let resourcingCommander = new ResourcingCommander();
    let constructCommander = new ConstructionCommander();
    let crewChief = new CrewCommander()

    
    if(!Memory.initComplete)
    {
        for(const i in Game.spawns) {Memory.primarySpawn = Game.spawns[i].name;}

        Memory.plan = plan[1];
        resourcingCommander.OnInit();
        constructCommander.OnInit();
        crewChief.OnInit();

        
        Memory.initComplete = true;
        
        console.log(Memory.primarySpawn);
    }
    
    // Game.spawns["Spawn1"].room.find(FIND_SOURCES)[0].memory.associatedCommand = Game.spawns["Spawn1"].memory.resourcingCommandQueue[0];
    // console.log(Game.spawns["Spawn1"].room.find(FIND_SOURCES)[0].memory.associatedCommand);

    resourcingCommander.Update();
    crewChief.Update();
    
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    let harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvs.length < Game.spawns[Memory.primarySpawn].room.find(FIND_SOURCES).length) {
        let newName = 'Harv' + Game.time;
        if(Game.spawns[Memory.primarySpawn].spawnCreep(bodyComps.HARV, newName, { memory: { role: 'harvester'} }) == OK)
            {
                console.log('Spawning new harv: ' + newName);
            }
    }

    let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    if (workers.length < 4 && harvs.length > 1) {
        let newName = 'Worker' + Game.time;
        if(Game.spawns[Memory.primarySpawn].spawnCreep(bodyComps.UPPER, newName, { memory: { role: 'worker', task: 'upgrade' } }) == OK)
        {
            console.log('Spawning new Worker: ' + newName);
            Memory.lastTaskSpawned = 'upgrade';
        }
    }

    let trucks = _.filter(Game.creeps, (creep) => creep.memory.type == 'truck');
    if(trucks.length < 2 && harvs.length > 1)
    {
        let newName = 'Truck' + Game.time;
        if(Game.spawns[Memory.primarySpawn].spawnCreep(bodyComps.SCAV, newName, {memory: {type: "truck"}}) == OK)
        {
            console.log('Spawning new Worker: ' + newName);
            Memory.lastTaskSpawned = 'upgrade';
        }
    }
    
    if (Game.spawns[Memory.primarySpawn].spawning) {
        let spawningCreep = Game.creeps[Game.spawns[Memory.primarySpawn].spawning.name];
        Game.spawns[Memory.primarySpawn].room.visual.text(
            '🛠️' + spawningCreep.name,
            Game.spawns[Memory.primarySpawn].pos.x + 1,
            Game.spawns[Memory.primarySpawn].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    
    // TODO: This for loop needs to be simplified into calling creep. Execute() for every creep.
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        switch(creep.memory.role){
            case 'harvester':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Harvest command");
                    creep.ReceiveCommand(new HarvestCommand("Resourcing", creep.room.find(FIND_SOURCES)[0].id, false, Game.spawns[Memory.primarySpawn].id));
                }
                creep.Execute()
                break;
            case 'scout':
                break;
            case 'scavenger':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Transfer command");
                    creep.ReceiveCommand(new TransferCommand("Resourcing", creep.room.find(FIND_SOURCES)[0].id, false, Game.spawns[Memory.primarySpawn].id));
                }
                break;
            case 'worker':
                if(creep.memory.command == null)
                {
                    console.log("Issuing Upgrade command");
                    creep.ReceiveCommand(new UpgradeCommand("Construction", Game.spawns[Memory.primarySpawn].room.controller.id, true));
                    
                }
                creep.Execute()
                break;
            default:
                creep.Execute()
                break;
        } 
    }
}