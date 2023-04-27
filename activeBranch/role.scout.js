var roleScout = {
    run: function(creep, postRoom)
    {
        if(creep.room.name != postRoom)
        {
            var target = new RoomPosition(30,18, postRoom);
            creep.moveTo(target);
        }
        else
        {
            creep.moveTo(30,18);
        }
    }
};
module.exports = roleScout;