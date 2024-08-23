class State {
    constructor()
    {
        throw new Error("Cannot instantiate base State")
    }

    Action()
    {
        //Empty lol
    }

    static States = {
        Moving: "moving",
        Idling: "idling",
        Working: "working",
        Sourcing: "sourcing"
    }
}