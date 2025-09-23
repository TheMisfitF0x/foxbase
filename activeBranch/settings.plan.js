/**
This is the master plan. How I want to see the colony grow as I work. The idea is
is that anything I put in here is striven for by the AI. There will be base assumptions made (always some growth, even if a thing is not specified)
but this is my goals. It also serves as my invisible hand for if I want to expand fast or slow, or make adjustments
on the fly.

It is based on the RCL of the primary spawn for now. I'm keeping it serializable, probably so I can load into memory as I go
so it's easier to access. Memory.plan.creeps2Maintain is easier than plan[Game.spawns[Memory.primarySpawn].room.controller.level].creeps2Maintain
*/
let plan = [
    {}, //Haha empty so that I can start on RCL 1
    {//Primary RCL 1
        creeps2Maintain:{
            workers: 4,
            harvesters: 2,
            trucks: 2
        }
    }
]

module.exports = plan;