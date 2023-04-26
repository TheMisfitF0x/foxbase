var workForceManager = require('manager.RoomWorkForceManager');

var areaScanner = require('process.AreaScanner');
var tickConverter = require('process.TickConverter');

var workForceComp = require('settings.WorkForceComp');
var bodyComps = require('settings.BodyComps');
/*
 Every Spawn will have its own memory, set by the WorkForceComposition settings module.
 This determines how many of each creep the spawn will maintain, not including 
*/
var buildingSpawn = 
{
    run: function(spawn)
    {
        workForceManager.scanForJobs(spawn);
        
        //Main loop for spawn behavior
        
        //If not initilized, run initSetup()
        if(spawn.memory.initComplete != true)
        {
            this.initSetup(spawn);
        }
        
        //Verify that all roads are still complete, using roadPath() and the paths stored in memory
        for(var i in spawn.memory.localSources)
        {
            var path = spawn.memory.localSources[i].path;
            this.roadPath(path, spawn.room, true);
        }
        
        //Check the total number of living creeps against the number of creeps expected in the workforce composition
        var myWorkingCreeps = Array.of();
        
        myWorkingCreeps = _.filter(Game.creeps, (creep) =>
        {
           return creep.memory.spawnName == spawn.name;
        });
        
        myWorkingCreeps = myWorkingCreeps.concat(_.filter(spawn.memory.spawnQueue, (creep) =>
        {
            return creep.memory.spawnName == spawn.name
        }));
        
        //Gonna try to keep this contained because it's a girthy bit of code (40+ lines of pain...). Considering shunting it to it's own function
        if(myWorkingCreeps.length < workForceComp.TOTAL)
        {
            //If under, get each set of creeps by role until one set is below the expected amount,
            var myTrucks = _.filter(myWorkingCreeps, (creep) =>
            {
               return creep.memory.role == "truck" 
            });
            if(myTrucks.length < workForceComp.TRUCK)
            {
                var newName = "Truck " + tickConverter.returnTime(Game.time) + " of " + spawn.name;
                var newMem = {
                    "role": "truck",
                    "spawnName": spawn.name
                }
                this.addCreepToQueue(spawn, newName, newMem, false);
            }
            
            var myUpgraders = _.filter(myWorkingCreeps, (creep) =>
            {
               return creep.memory.role == "upgrader" 
            });
            if(myUpgraders.length < workForceComp.UPGRADE)
            {
                var newName = "Upgrader " + tickConverter.returnTime(Game.time) + " of " + spawn.name;
                var newMem = {
                    "role": "upgrader",
                    "spawnName": spawn.name,
                }
                this.addCreepToQueue(spawn, newName, newMem, false);
            }
            
            var myBuilders = _.filter(myWorkingCreeps, (creep) =>
            {
               return creep.memory.role == "builder" 
            });
            if(myBuilders.length < workForceComp.BUILD)
            {
                var newName = "Builder " + tickConverter.returnTime(Game.time) + " of " + spawn.name;
                var newMem = {
                    "role": "builder",
                    "spawnName": spawn.name,
                }
                //add that creep to the respawn queue unless it's a gatherer, where it should be added to the front of the queue to maintain income.
                this.addCreepToQueue(spawn, newName, newMem, false);
            }
            
        }
        
        //Now we're gonna add any missing gatherers to the priority queue.
        //Find all the living 
        var myGatherers = _.filter(Game.creeps, (creep) =>
        {
            return creep.memory.role == "gatherer"
        });
        //and queued gatherers
        myGatherers = myGatherers.concat(_.filter(spawn.memory.spawnQueue, (creep) =>
        {
            return creep.memory.role == "gatherer"
        }))
        
        //If we're short, we'll check all our sources
        var allSources = spawn.memory.localSources.concat(spawn.memory.extraSources);
        if(myGatherers.length < allSources.length)
        {
            for(var i in allSources)
            {
                //For each source run a check over all the gatherers.
                var source = allSources[i];
                var hasAttachedGatherer = false;
                for(var o in myGatherers)
                {
                    var gatherer = myGatherers[o]; //If the gatherer has this source's ID in memory, move on.
                    if(gatherer.memory.sourceId == source.id)
                    {
                        hasAttachedGatherer = true;
                    }
                }
                if(!hasAttachedGatherer) //If no gatherer has that source in memory, assign the ID and slot position to a new gatherer and send him to queue.
                {
                    var newName = "Gatherer (X" + source.slotPos.x + "Y" + source.slotPos.y + "," + source.slotPos.roomName + ") of " + spawn.name;
                    var newMem = {
                        "role":"gatherer",
                        "sourceId": source.id,
                        "slotPos": source.slotPos
                    }
                    this.addCreepToQueue(spawn, newName, newMem, true);
                }
            }
        }
        
        
        if(!spawn.spawning && spawn.memory.spawnQueue.length)
        {
            var creep2Spawn = spawn.memory.spawnQueue[0];
            var response = 0;
            //A temporary switch until I properly add the function in bodyComps
            switch(creep2Spawn.memory.role)
            {
                case "gatherer":
                    response = spawn.spawnCreep(bodyComps.comps[0].GATHER, creep2Spawn.name, {memory: creep2Spawn.memory});
                    break;
                
                case "builder":
                    response = spawn.spawnCreep(bodyComps.comps[0].BUILD, creep2Spawn.name, {memory: creep2Spawn.memory});
                    break;
                case "upgrader":
                    response = spawn.spawnCreep(bodyComps.comps[0].UPGRADE, creep2Spawn.name, {memory: creep2Spawn.memory});
                    break;
                    
                case "truck":
                    response = spawn.spawnCreep(bodyComps.comps[0].TRUCK, creep2Spawn.name, creep2Spawn.memory);
                    break;
                    
                case "captain":
                    response = spawn.spawnCreep(bodyComps.comps[0].GATHER, creep2Spawn.name, creep2Spawn.memory);
                    break;
                    
                case "marine":
                    response = spawn.spawnCreep(bodyComps.comps[0].GATHER, creep2Spawn.name, creep2Spawn.memory);
                    break;
                    
                case "medic":
                    response = spawn.spawnCreep(bodyComps.comps[0].GATHER, creep2Spawn.name, creep2Spawn.memory);
                    break;
                    
                case "zergling":
                    response = spawn.spawnCreep(bodyComps.comps[0].GATHER, creep2Spawn.name, creep2Spawn.memory);
                    break;
                    
                default:
                    console.log("Creep in queue has invalid role");
                    break;
            }
            
            if(response == OK)
            {
                spawn.memory.spawnQueue.shift(); //Remove the first creep if the spawn was successful.
                spawn.memory.ticksOfBadSpawnAttepmt = 0;
            }
            else if(response == ERR_NAME_EXISTS) 
            {
                spawn.memory.spawnQueue.shift(); //Remove the first creep if it's a copy of a living creep.
                spawn.memory.ticksOfBadSpawnAttempt++;
            }
            else
            {
                spawn.memory.ticksOfBadSpawnAttempt++;
            }
        }
    },
    initSetup: function(spawn)
    {
        //Set up upon spawn placement, 
        console.log("Setup running:");
        
        //Route a path from the spawn to the controller, NOT INCLUDING THE CONTROLLER
        var controllerPath = spawn.pos.findPathTo(spawn.room.controller);
        spawn.memory.controllerPath = controllerPath;
        
        //Place a road con site on all points on path
        this.roadPath(controllerPath, spawn.room, true)
        
        //Scan room for sources, write them to spawn memory by ID;
        var sources = spawn.room.find(FIND_SOURCES);
        spawn.memory.localSources = [];
        spawn.memory.extraSources = [];
        for(var i in sources)
        {
            var source = sources[i];
            
            //Designate one open space near each source as a localGatherer slot
            var slot = areaScanner.findGatherSlot(spawn, sources[i])
            
            //Place a container con site on slot point
            slot.createConstructionSite(STRUCTURE_CONTAINER);
            
            //Route a path from the spawn to the slot 
            var path = spawn.pos.findPathTo(slot);
            
            //Road the path
            this.roadPath(path, spawn.room, true)
            
            //Commit path to memory as sourcePaths[] (Array of objects)
            spawn.memory.localSources.push({
                "id": sources[i].id,
                "slotPos": slot,
                "path": path
            });
        }
        
        spawn.memory.ticksOfBadSpawnAttempt = 0;
        
        //Sets spawn's 'initComplete' to true upon completion
        spawn.memory.initComplete = true;
    },
    roadPath: function(path, room, excludeLastPoint) //Expects return value from findPathTo()
    {
        var pathLength = path.length;
        if(excludeLastPoint)
        {
            pathLength--;
        }
        //Place a road con site on all points on path, minus the last point if excludeLastPoint == true
        for(var point = 0; point < pathLength; point++)
        {
            var pointPos = new RoomPosition(path[point].x, path[point].y, room.name);
            pointPos.createConstructionSite(STRUCTURE_ROAD);
        }
    },
    addCreepToQueue: function(spawn, creepName, memory, isPriority)
    {
        console.log("Adding a creep to queue");
        console.log(creepName);
        //formats the provided creep info into a JSON object in the spawn's memory, pushes it to the front position if push2Front == true. The body will be determined on spawn with the body comps module 
        if(isPriority)
        {
            if(spawn.memory.spawnQueue != undefined)
            {
                spawn.memory.spawnQueue.reverse();//Flip the array around...
                spawn.memory.spawnQueue.push({//Tack the creep onto the end...
                    "name": creepName,
                    "memory": memory
                });
                spawn.memory.spawnQueue.reverse();//And spin it around so that new creep's at the front again.
            }
            else
            {
                spawn.memory.spawnQueue = Array.of({
                    "name": creepName,
                    "memory": memory
                });
            }
        }
        else
        {
            if(spawn.memory.spawnQueue != undefined)
            {
                spawn.memory.spawnQueue.push({
                    "name": creepName,
                    "memory": memory
                });
            }
            else
            {
                spawn.memory.spawnQueue = Array.of({
                    "name": creepName,
                    "memory": memory
                });
            }
        }
    }
}
module.exports = buildingSpawn;