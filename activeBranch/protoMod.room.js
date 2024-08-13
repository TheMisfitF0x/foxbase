// Handy methods for sourcing. Built into room for ease of use.
if(!Room.prototype.findClosestEStorage) 
{
    /**
     * Finds the closest storage with open energy capacity to the given position.
     * ### TODO: 
     * - Yet to be implemented.
     * @param {RoomPosition} pos The location to find storage near (usually a creep's position).
     * @returns The object of the closest Energy storage to the given position.
     */
    Room.prototype.findClosestEStorage = function(pos)
    {
        return closestStorage;
    }
}

if(!Room.prototype.findlowestEStorage)
{
    /**
     * Finds the structure with the lowest current energy store in the room.
     * ### TODO: 
     * - Yet to be implemented.
     * @returns The object of the structure with the lowest current energy store in the room.
     */
    Room.prototype.findLowestEStorage = function()
    {
        return lowestStorage;
    }
}