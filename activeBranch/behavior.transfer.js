if(!Creep.prototype.ExecuteTransferCommand)
{
    Creep.prototype.ExecuteTransferCommand = function()
    {
        var targetObject = Game.getObjectById(this.memory.command.targetID);
        var targetRoom = Game.rooms[this.memory.command.roomName];

        if(this.memory.command.isDelivery)
        {
            
            if(!this.memory.command.delivering && this.store.getFreeCapacity() == 0)
            {
                this.memory.command.delivering = true;
            }
            
            if(this.memory.command.entireJob)// If instructed to fill the entire container (this is dangerous and really should only be run on turrets, extensions, spawns, etc.)...
            {
                if(this.memory.command.delivering) // ...and we've collected resources and are delivering...
                {
                    if(targetObject.store.getFreeCapacity() == 0 ) // ...and the object is full (for any reason)...
                    {
                        //TODO: need to find a way to report completion on these commands... perhaps a status field in the default command?
                        //May need to be an added function in proto.mod. Admittedly would be easier if I decoupled commands from spawns.
                        //It'd have to be reported by commander, and likely through main? Or again, via the creep proto. Meh, good enough.
                        delete this.memory.command;
                    } 
                    else if(this.store.getUsedCapacity() == 0) // ...and we're out of resources...
                    {
                        this.memory.command.delivering = false;
                    }
                }
            }
            else if(this.store.getUsedCapacity() == 0 && this.memory.command.delivering) //If instructed to only make one delivery run, and we're empty after having gathered resources...
            {
                delete this.memory.command;
            }
        }
        
        if(!this.memory.command.isDelivery)
        {
            if(this.memory.command.entireJob)
            {
                // If we're still looting and realize we are full, the object is gone, or the object is empty...
                if(!this.memory.command.returningResource && (this.store.getFreeCapacity() == 0 || !targetObject || targetObject.store.getUsedCapacity() == 0))
                {
                    this.memory.command.returningResource = true; //Return resources.
                }

                // If while returning resources we see we are empty, check to see if the object is gone or empty. If so, consider command complete.
                if((this.memory.command.returningResource && this.store.getUsedCapacity() == 0) && (!targetObject || targetObject.store.getUsedCapacity() == 0))
                {
                    delete this.memory.command;
                }
            }

            if(!this.memory.returningResource)
            {
                if(this.pickup(targetObject) != OK && this.withdraw(targetObject) != OK)
                {
                    this.moveTo(targetObject);
                }
            }
        }
    }
}

//Seeing all the diferent end-cases, might consider making a Terminate...Command() to clean up creep memory.