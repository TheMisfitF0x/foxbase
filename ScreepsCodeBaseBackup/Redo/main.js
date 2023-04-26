var tickConverter = require('process.TickConverter');
var buildingSpawn = require('building.Spawn');

var roleBuild = require("role.Build");
var roleCaptain = require("role.Captain");
var roleGatherer = require("role.Gatherer");
var roleMarine = require("role.Marine");
var roleMedic = require("role.Medic");
var roleTruck = require("role.Truck");
var roleUpgrade = require("role.Upgrade");
var roleZergling = require("role.Zergling");

module.exports.loop = function () {
    tickConverter.run();
    for(var spawn in Game.spawns)
    {
        //console.log(spawn);
        buildingSpawn.run(Game.spawns[spawn]);
    }
    
    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        
        var role = creep.memory.role;
        
        switch(role)
        {
            case "gatherer":
                roleGatherer.run(creep);
                break;
                
            case "builder":
                
                break;
            case "upgrader":
                
                break;
                
            case "truck":
                
                break;
            case "captain":
                
                break;
            case "marine":
                
                break;
            case "medic":
                
                break;
            case "zergling":
                
                break;
        }
    }
}