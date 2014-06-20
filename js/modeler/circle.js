/**
 * Created by USUARIO on 17/06/2014.
 */

var circle = function(){

    this.radius;

    //Adjust position based on size, this due to drag and drop issue
    this.relocate = function(){
        this.location.x = this.location.x - this.radius/2;
        this.location.y = this.location.y - this.radius/2;
    }

    this.paint = function(){

        if(this.selected){
            context.fillStyle = painterSettings.colors.selectedFillStyle;
        }else{
            context.fillStyle = painterSettings.colors.fillStyle;
        }

        context.beginPath();
        context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = painterSettings.colors.strokeStyle;
        context.stroke();

        context.fillStyle = painterSettings.colors.textFillStyle;
        context.font = 'italic 13px Helvetica';
        context.fillText("Inicio", this.location.x-15, this.location.y - this.radius - 10);
    }

    this.getConnectionStartPoint = function(){
        return new point(this.location.x + this.radius, this.location.y);
    }

    this.getConnectionEndPoint = function(){
        return new point(this.location.x - this.radius, this.location.y);
    }

    this.pointInMyArea = function(location){

        if(location.x >= this.location.x-this.radius && location.x <= this.location.x + this.radius &&
            location.y >= this.location.y-this.radius && location.y <= this.location.y + this.radius){

            return true;
        }else{
            return false;
        }
    }
}

circle.prototype = new shape();