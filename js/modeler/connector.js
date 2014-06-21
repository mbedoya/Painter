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

        context.strokeStyle = painterSettings.colors.strokeStyle;
        context.beginPath();

        //Destination at top right
        if(sourceStartPoint.x < destinationEndPoint.x){

            middleX = (sourceStartPoint.x + destinationEndPoint.x)/2;

            context.moveTo(sourceStartPoint.x, sourceStartPoint.y);
            context.lineTo(middleX, sourceStartPoint.y);

            context.moveTo(middleX, destinationEndPoint.y);
            context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

            context.moveTo(middleX, sourceStartPoint.y);
            context.lineTo(middleX, destinationEndPoint.y);

            //Arrow
            context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y-10);
            context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

            context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y+10);
            context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

        }else{


            //Destination at top right
            if(sourceStartPoint.x > destinationEndPoint.x){

                middleY = (sourceStartPoint.y + destinationEndPoint.y)/2;

                context.moveTo(sourceStartPoint.x, sourceStartPoint.y);
                context.lineTo(sourceStartPoint.x+15, sourceStartPoint.y);
                context.lineTo(sourceStartPoint.x+15, middleY);
                context.lineTo(destinationEndPoint.x-15, middleY);
                context.lineTo(destinationEndPoint.x-15, destinationEndPoint.y);
                context.lineTo(destinationEndPoint.x, destinationEndPoint.y);


                //Arrow
                context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y-10);
                context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

                context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y+10);
                context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

            }else{

                //Main Line
                context.moveTo(sourceStartPoint.x, sourceStartPoint.y);
                context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

                context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y-10);
                context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

                context.moveTo(destinationEndPoint.x-10, destinationEndPoint.y+10);
                context.lineTo(destinationEndPoint.x, destinationEndPoint.y);

            }

        }



        context.stroke();
    }

}
