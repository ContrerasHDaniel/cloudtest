module.exports = {
    getLastPosition: function(positions){
        var mostRecentDate = new Date(Math.max.apply(null, positions.map( e => {
            return new Date(e._id);
        })));
    
        var mostRecentObject = positions.filter( e => { 
            var d = new Date( e._id ); 
            return d.getTime() == mostRecentDate.getTime();
        })[0];

        return mostRecentObject;
    }
}