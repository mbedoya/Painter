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
            context.fillStyle = "rgba(255, 140, 0, .5)";
        }else{
            context.fillStyle = "rgba(255, 255, 0, .5)";
        }

        context.beginPath();
        context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "rgb(255, 0, 0)";
        context.stroke();
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