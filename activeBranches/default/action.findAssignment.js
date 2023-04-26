/*
 * Current jobs by color:
 * Red: ATTACK (unimplemented)(place flag on enemy spawn, send "attack")
 * Blue (Dark Blue/NotCyan): Upgrade (place flag on controller)
 * Yellow: Harvest (place flag on sources)
 * Orange: Build (place flag on construction site)
 * Brown: Guard (unimplemented) (place flag on spawn)
 */
var findAssignment = {
    run: function(job)
    {
        //Define color constant and rewrite to job
        switch(job)
        {
            case "attack":
                job = COLOR_RED;
                break;
                
            case "upgrade":
                job = COLOR_RED;
                break;
                
            case "harvest":
                job = COLOR_RED;
                break;
                
            case "build":
                job = COLOR_RED;
                break;
        }
        //First, find all flags for a specific job (represented by primary color).
        var availableAssignments = [];
            for(var flagFound in Game.flags)
            {
                if(flagFound.color == job)
                {
                    availableAssignments.push(flagFound);
                }
            }
        //Go through priority levels, from high to low (represented by secondary color, see Constants in Docs). Check to see how many creeps that assignment can support vs how many are already assigned.
        var assignment2Send = 0;
        for(var x = 0; x < availableAssignments.length, x++)
        {
            if(availableAssignments[x].assignedIds.length < availableAssignments[x].maxCreeps && availableAssignments[x].secondaryColor > assignment2Send.secondaryColor)
            {
                assignment2Send = availableAssignments[x];
            }
        }
        
        return assignment2Send;
        
        //FOR NOW return the flag to the creep that asked. That creep will accept the flag, write the assignment into it's memory, and sign his ID to the assignment. The flag will remove his signature on death.
    }
};


module.exports = findAssignment;