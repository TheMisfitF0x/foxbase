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
    },
    returnTime: function(tick)
    {
        var seconds = tick;
        
        var mins = seconds/60;
        seconds = seconds % 60;
        
        var hours = mins / 60;
        mins = mins % 60;
        
        var days = hours/24;
        hours = hours%24;
        
        return(Math.trunc(days) + ":" + Math.trunc(hours) + ":"+ Math.trunc(mins));
    }

    
};

module.exports = tickConverter;