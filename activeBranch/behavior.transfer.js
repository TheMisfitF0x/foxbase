if(!Creep.prototype.ExecuteTransferCommand)
{
    Creep.prototype.ExecuteTransferCommand = function()
    {
        
        var targetObject = Game.getObjectById(this.memory.command.targetID);
        var targetRoom = Game.rooms[this.memory.command.roomName];

        if(this.memory.command.isDelivery)
        {
            
            if(this.store.getFreeCapacity() == 0 && !this.memory.command.delivering)
            {
                this.memory.command.delivering = true;
            }
            
            if(this.memory.entireJob)
            {
                if(this.memory.command.delivering)
                {
                    if(targetObject.store.getFreeCapacity() == 0 )
                    {
                        //TODO: need to find a way to report completion on these commands... perhaps a status field in the default command?
                        //May need to be an added function in proto.mod. Admittedly would be easier if I decoupled commands from spawns.
                        //Hey! If commands are decoupled, creeps wouldn't need their own memory copy! All they'd need is the ID of their active command.
                        //It'd have to be reported by commander, and likely through main? Or again, via the creep proto. Meh, good enough.
                        delete this.memory.command;
                    } 
                    else if(this.store.getUsedCapacity() == 0)
                    {
                        this.memory.delivering = false;
                    }
                }
            }
            else if(this.store.getUsedCapacity() == 0 && this.memory.command.delivering)
            {
                delete this.memory.command;
            }
        }
        
        if(!this.memory.command.isDelivery)
        {
            if(!this.memory.haveLooted)
            {
                if(this.pickup(targetObject) != OK && this.withdraw(targetObject) != OK)
                {
                    this.moveTo(targetObject);
                }
            }
        }
    }
}