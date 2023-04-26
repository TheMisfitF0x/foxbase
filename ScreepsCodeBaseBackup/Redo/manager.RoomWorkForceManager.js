/*
    This is the fun part where I get to write a list of colors to flag types.
    NOTE: Type is denoted by primary color. Secondary color used in specific cases only, noted. 
    Red: Fighters to location, secondary color: max creeps to assign, placed manually
    Purple: Defenders to location, secondary color: max creeps to assign, placed manually
    Blue: Upgrade (auto placed by spawn on placement).
    Yellow: Picking up energy from here
    White: Dropping off energy here
    Brown: Contributing to construction here
    Cyan: Structure requires repairs
    Orange: Placed where a structure is desired in case of tech limits or maxed out con sites. Secondary Color is the desired structure
    Grey: Scout Post, placed manually
*/
var RoomWorkForceManager = {
    assignPickUpFlag: function (creep) {
        var pickUpFlags = _.filter(Game.flags, (flag) => {
            return (flag.pos.roomName == creep.pos.roomName && flag.color == COLOR_YELLOW)
        })
        
        console.log(pickUpFlags.length);
        var spawn = Game.spawns[creep.name.split(" ")[3]];
        
        if(creep.memory.role == "truck")
        {
            pickUpFlags.sort((a,b) => {
                return spawn.pos.findPathTo(b).length - spawn.pos.findPathTo(a).length
            })
        }
        else
        {
            console.log(pickUpFlags[0].name);
            pickUpFlags.sort((a,b) => {
                return spawn.pos.findPathTo(a).length - spawn.pos.findPathTo(b).length
            })
            console.log("sorting");
            console.log(pickUpFlags[0].name);
        }
    },
    assignDropOffFlag: function (creep) {

    },
    assignConstructFlag: function (creep) {

    },
    scanForJobs: function (spawn) {
        console.log("Cleared " + this.clearInvalidJobs() + " invalid jobs.");
        //Search for objectives that do not have flags, add flag to it.
        var scanRoom = spawn.room;

        //Search for:
        //Pickup points
        var storageStructures = scanRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });

        var looseEnergy = scanRoom.find(FIND_DROPPED_RESOURCES, {
            filter: (pool) => {
                return pool.resourceType == RESOURCE_ENERGY
            }
        })

        var tombstones = scanRoom.find(FIND_TOMBSTONES, {
            filter: (stone) => {
                return stone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            }
        })

        var pickUpList = looseEnergy.concat(tombstones);
        pickUpList = pickUpList.concat(storageStructures);

        for (var i in pickUpList) {
            var pickUpObj = pickUpList[i];
            var newName = "";

            if (this.findFlagAt(pickUpObj.pos, COLOR_YELLOW) == 0) {
                if (pickUpObj.structureType != undefined) {
                    console.log("structure identified");
                    newName = "PickUp:" + pickUpObj.structureType + ":(X" + pickUpObj.pos.x + ",Y" + pickUpObj.pos.y + "," + pickUpObj.pos.roomName + ")";
                }
                else if (pickUpObj instanceof Tombstone) {
                    newName = "PickUp:tombstone:(X" + pickUpObj.pos.x + ",Y" + pickUpObj.pos.y + "," + pickUpObj.pos.roomName + ")";
                }
                else {
                    newName = "PickUp:scrap:(X" + pickUpObj.pos.x + ",Y" + pickUpObj.pos.y + "," + pickUpObj.pos.roomName + ")";
                }
                pickUpObj.pos.createFlag(newName, COLOR_YELLOW);
            }
        }

        //Dropoff points
        var activeStructures = scanRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });

        storageStructures = scanRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });

        var dropOffList = activeStructures.concat(storageStructures);
        for (var i in dropOffList) {
            var dropOffObj = dropOffList[i];
            var newName = "";
            if (this.findFlagAt(dropOffObj.pos, COLOR_WHITE) == 0) {
                newName = "DropOff:" + dropOffObj.structureType + ":(X" + dropOffObj.pos.x + ",Y" + dropOffObj.pos.y + "," + dropOffObj.pos.roomName + ")";

                dropOffObj.pos.createFlag(newName, COLOR_WHITE);
            }
        }

        //Construction
        var essentialConSites = scanRoom.find(FIND_CONSTRUCTION_SITES, {
            filter: (site) => {
                return (site.structureType == STRUCTURE_SPAWN || site.structureType == STRUCTURE_EXTENSION);
            }
        });

        var combatConSites = scanRoom.find(FIND_CONSTRUCTION_SITES, {
            filter: (site) => {
                return (site.structureType == STRUCTURE_TOWER || site.structureType == STRUCTURE_RAMPART || site.structureType == STRUCTURE_WALL);
            }
        });

        var ecoConSites = scanRoom.find(FIND_CONSTRUCTION_SITES, {
            filter: (site) => {
                return (site.structureType == STRUCTURE_CONTAINER || site.structureType == STRUCTURE_STORAGE || site.structureType == STRUCTURE_LINK);
            }
        });

        var roadSites = scanRoom.find(FIND_CONSTRUCTION_SITES, {
            filter: (site) => {
                return (site.structureType == STRUCTURE_ROAD);
            }
        });

        var conSites = essentialConSites.concat(combatConSites);
        conSites = conSites.concat(ecoConSites);
        conSites = conSites.concat(roadSites);

        for (var i in conSites) {
            var conSite = conSites[i];
            var newName = "";
            if (this.findFlagAt(conSite.pos, COLOR_BROWN) == 0) {
                newName = "Construct:" + conSite.structureType + ":(X" + conSite.pos.x + ",Y" + conSite.pos.y + "," + conSite.pos.roomName + ")";

                conSite.pos.createFlag(newName, COLOR_BROWN);
            }
        }
        //Repair

    },
    findFlagAt: function (pos, color) {
        var existingFlag = pos.lookFor(LOOK_FLAGS, { filter: (flag) => { return flag.color == color } });
        if (existingFlag.length) {
            return existingFlag[0];
        }
        else {
            return 0;
        }
    },
    clearInvalidJobs: function () {
        var jobsCleared = 0;
        //Search for objectives that have flags, but do not fit objective criteria (structure complete, full or empty store, etc)
        var pickUpFlags = _.filter(Game.flags, (flag) => {
            return flag.color == COLOR_YELLOW
        });

        for (var i in pickUpFlags) {
            var flag = pickUpFlags[i];
            var flagType = flag.name.split(":")[1];

            switch (flagType) {
                case "container":

                case "storage":
                    var building = flag.pos.lookFor(LOOK_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE
                        }
                    })[0];
                    if (!building || building.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                        flag.remove();
                        jobsCleared++;
                    }
                    break;

                case "tombstone":
                    var stone = flag.pos.lookFor(LOOK_TOMBSTONES)[0];
                    if (!stone || stone.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                        flag.remove();
                        jobsCleared++;
                    }

                    break;

                case "scrap":
                    var pool = flag.pos.lookFor(LOOK_RESOURCES, { filter: (drop) => { drop.resourceType == RESOURCE_ENERGY } })

                    if (!pool.length) {
                        flag.remove();
                        jobsCleared++;
                    }
                    break;
            }
        }


        var dropOffFlags = _.filter(Game.flags, (flag) => {
            return flag.color == COLOR_WHITE
        });

        for (var i in dropOffFlags) {
            var flag = dropOffFlags[i];
            var building = flag.pos.lookFor(LOOK_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION);
                }
            });

            if (!building.length || building[0].store.getFreeCapacity == 0) {
                flag.remove();
                jobsCleared++;
            }
        }

        var conFlags = _.filter(Game.flags, (flag) => {
            return flag.color == COLOR_BROWN
        });

        for (var i in conFlags) {
            var flag = conFlags[i];
            var site = flag.pos.lookFor(LOOK_CONSTRUCTION_SITES);

            if (!site.length) {
                flag.remove();
                jobsCleared++;
            }
        }


        return jobsCleared;

    }

}


module.exports = RoomWorkForceManager;