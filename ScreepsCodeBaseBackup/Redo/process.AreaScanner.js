var areaScanner = {
    findGatherSlot: function(spawn, source)
    {
        //Grab the room's terrain to perform a scan.
        const terrain = new Room.Terrain(source.room.name);
        
        //Prepare an array of all slots
        var gatherSlots = [];
        
        for(var yMod = -1; yMod < 2; yMod++)
        {
            for(var xMod = -1; xMod < 2; xMod++)
            {
                if(terrain.get(source.pos.x + xMod, source.pos.y + yMod) != 1)
                {
                    var newSlot = new RoomPosition(source.pos.x + xMod, source.pos.y + yMod, source.pos.roomName);
                    gatherSlots.push(newSlot);
                }
            }
        }
        
        var slot = spawn.pos.findClosestByPath(gatherSlots);
        
        return slot;
    }
}
   

module.exports = areaScanner;