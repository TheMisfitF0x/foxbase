/* Is putting these here the best idea? Maybe they should go to the room prototype?
Thinking about changing transfer commands to have a room, a target, and a retrieveFromTarget bool that is true for lootables
or rooms that I'm evacuating (for whatever reason.)
So basically, if retrieveFromTarget is true, 
then the creep takes from the target GameObject and returns it to the room dynamically
If it's false, 
the creep takes from the specified room dynamically and takes it to the target. 

This way, the below methods can be made as part of the room, and give the creep a target even when not in the same room.
*/


if(!Creep.prototype.findClosestEStorage) 
{
    Creep.prototype.findClosestEStorage = function()
    {

    }
}

if(!Creep.prototype.findlowestEStorage)
    {
        Creep.prototype.findLowestEStorage = function()
        {
            
        }
    }