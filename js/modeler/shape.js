/**
 * Created by USUARIO on 17/06/2014.
 */

var shape = function(){

    this.width;
    this.height;
    this.location;
    this.selected = false;
    var selectable;

    this.init = function(location, width, height) {
        this.location = location;
        this.width = width;
        this.height = height;

        selectable = true;
    }

    this.isSelectable = function(){
        return selectable;
    }
}