/**
 * Created by USUARIO on 16/06/2014.
 */

var process_modeler = function(){

    this.createObject = function(objectType){

        var processObject;

        if(objectType == "activity"){

            processObject = new process_activity();
        }

        return processObject;
    }

}