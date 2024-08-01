var HarvestCommand = require('command.harvest');

module.exports = {
    IntakeCommand: function (creep, command)
    {
        this.VerifyAbility(creep, command);
        switch(command.commandType)
        {
            case "construct":
                break;
            case "harvest":
                console.log("This is a harvest command");
                break;
            case "transfer":
                break;
            default:
                break;
        }
    },
    VerifyAbility: function(creep, command)
    {

    }
}