var findHarvSlots = {
    findHarvSlots: function(room)
    {
        //Grab the room's terrain to perform a scan.
        const terrain = new Room.Terrain(room.name);
        
        //Prepare an array of all slots
        var harvSlots = [];
        
        const sourcesInRoom = room.find(FIND_SOURCES);
        for(var source in sourcesInRoom)
        {
            var sourceFound = false;
            var sourcePos = sourcesInRoom[source].pos;
            for(var yMod = -1; yMod < 2; yMod++)
            {
                for(var xMod = -1; xMod < 2; xMod++)
                {
                    if(terrain.get(sourcePos.x + xMod, sourcePos.y + yMod) != 1)
                    {
                        var newSlot = new RoomPosition(sourcePos.x + xMod, sourcePos.y + yMod, room.name)
                        harvSlots.push(newSlot);
                        newSlot.createConstructionSite(STRUCTURE_CONTAINER);
                        sourceFound = true;
                        break;
                    }
                }
                if(sourceFound)
                {
                    break;
                }
            }
            
        }
        
        return harvSlots;
    },
    findAllSlots: function(room)
    {
        //Grab the room's terrain to perform a scan.
        const terrain = new Room.Terrain(room.name);
        
        //Prepare an array of all slots
        var harvSlots = [];
        
        const sourcesInRoom = room.find(FIND_SOURCES);
        for(var source in sourcesInRoom)
        {
            var sourceFound = false;
            var sourcePos = sourcesInRoom[source].pos;
            for(var yMod = -1; yMod < 2; yMod++)
            {
                for(var xMod = -1; xMod < 2; xMod++)
                {
                    if(terrain.get(sourcePos.x + xMod, sourcePos.y + yMod) != 1)
                    {
                        var newSlot = new RoomPosition(sourcePos.x + xMod, sourcePos.y + yMod, room.name)
                        harvSlots.push(newSlot);
                        newSlot.createConstructionSite(STRUCTURE_CONTAINER);
                        sourceFound = true;
                        break;
                    }
                }
                if(sourceFound)
                {
                    break;
                }
            }
            
        }
        
        return harvSlots;
    },
    findFreeSlot: function(room, harvSearch)
    {
        if(harvSearch == true)
        {
            var slots = this.findHarvSlots(room);
        }
        else
        {
            var slots = this.findAllSlots(room);
        }
        
        
        var freeSlot = 0;
        
        var harvesters = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return (creep.memory.role == 'harvester');
            }});
                        
        for(var slot in slots)
        {
            var slotFree = true;
            for(var harv in harvesters)
            {
                var memSlot = new RoomPosition(harvesters[harv].memory.targetSlot.x, harvesters[harv].memory.targetSlot.y, harvesters[harv].memory.targetSlot.roomName);
                if(memSlot.isEqualTo(slots[slot]))
                {
                    slotFree = false;
                }
            }
            
            if(slotFree == true)
            {
                freeSlot = slots[slot];
                
                break;
            }
            
        }
        
        return freeSlot;
    }
}

module.exports = findHarvSlots;