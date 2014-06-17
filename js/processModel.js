/**
 * Created by USUARIO on 16/06/2014.
 */

var processModel_js = function(){

    var activities = [];

    this.addActivity = function(activity){
        activities.push(activity);
    }

    this.getSelectedActivity = function(x, y){

        var i;
        for (i=0; i < activities.length; i++) {
            if (activities[i].insideMe(x,y)) {
                return activities[i];
            }
        }

        return null;
    }

}