/**
 * Created by USUARIO on 18/06/2014.
 */

var connnector = function(){

    this.source;
    this.destination;
    var selectable;

    this.isSelectable = function(){
        return selectable;
    }

    this.init = function(source, desination){

        this.source = source;
        this.destination = desination;

        selectable = false;
    }

    this.paint = function(){

        stroke = context.strokeStyle = "#768A8A";

        context.strokeStyle = "#768A8A";
        //Main Line
        context.moveTo(this.source.location.x+this.source.width , this.source.location.y+this.source.height/2);
        context.lineTo(this.destination.location.x, this.destination.location.y + this.destination.height/2);

        context.lineTo(this.destination.location.x-10, this.destination.location.y + this.destination.height/2-10);
        context.lineTo(this.destination.location.x, this.destination.location.y + this.destination.height/2);

        context.lineTo(this.destination.location.x-10, this.destination.location.y + this.destination.height/2+10);
        context.lineTo(this.destination.location.x, this.destination.location.y + this.destination.height/2);

        context.stroke();

        context.strokeStyle = stroke;
    }

}
