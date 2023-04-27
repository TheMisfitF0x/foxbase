/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('action.tickConverter');
 * mod.thing == 'a thing'; // true
 */
var tickConverter = {
    
    run: function(tick)
    {
        var seconds = tick;
        
        var mins = seconds/60;
        seconds = seconds % 60;
        
        var hours = mins / 60;
        mins = mins % 60;
        
        var days = hours/24;
        hours = hours%24;
        
        if(seconds == 0)
        {
            console.log("It is day " + Math.trunc(days));
            console.log("The time is " + Math.trunc(hours) + ":"+ Math.trunc(mins));
        }
    }

    
};

module.exports = tickConverter;