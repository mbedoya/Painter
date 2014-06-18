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

        var sourceStartPoint = this.source.getConnectionStartPoint();
        var destinationEndPoint = this.destination.getConnectionEndPoint();

        context.strokeStyle = "rgb(255, 0, 0)";

        //Main Line
        context.moveTo(sourceStartPoint.x, sourceStartPoint.y);
        context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

        context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y-10);
        context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

        context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y+10);
        context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

        context.stroke();
    }

}
