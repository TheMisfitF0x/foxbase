var plan = [
    {},
    {
        creeps2Maintain:{
            workers: 4,
            harvestersPerSource: 2,
            trucks: 2
        },
        methods2Run:
        {
            harvesterMode: "running",
            constructorMode: "dynamic",
            upgraderMode: "dynamic"
        },
        directives:
        [
            {
                commander: "construction",
                structure: STRUCTURE_CONTAINER,
                number: 2
            }
        ]
    }
]