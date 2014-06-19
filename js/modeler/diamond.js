/**
 * Created by USUARIO on 19/06/2014.
 */

var diamond = function(){

    //Adjust position based on size, this due to drag and drop issue
    this.relocate = function(){

        this.location.x = this.location.x - this.width/2;
        this.location.y = this.location.y - this.height/2;
    }

    this.paint = function(){

        context.strokeStyle = "rgb(255, 0, 0)";
        if(this.selected){
            context.fillStyle = "rgba(255, 140, 0, .5)";
        }else{
            context.fillStyle = "rgba(255, 255, 0, .5)";
        }

        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(this.location.x-this.width/2, this.location.y);
        context.lineTo(this.location.x, this.location.y-this.height/2);
        context.lineTo(this.location.x+this.width/2,this.location.y);
        context.lineTo(this.location.x,this.location.y+this.height/2);
        context.lineTo(this.location.x-this.width/2, this.location.y);
        context.fill();
        context.stroke();

        context.fillStyle = "#768A8A";
        context.font = 'italic 13px Helvetica';
        context.fillText("gateway", this.location.x-20, this.location.y - this.height/2 - 10);

    }

    this.getConnectionStartPoint = function(){
        return new point(this.location.x + this.width/2, this.location.y);
    }

    this.getConnectionEndPoint = function(){
        return new point(this.location.x - this.width/2, this.location.y);
    }

    this.pointInMyArea = function(location){

        if(location.x >= this.location.x - this.width/2 && location.x <= this.location.x + this.width/2 &&
            location.y >= this.location.y - this.height/2 && location.y <= this.location.y + this.height/2){

            return true;
        }else{
            return false;
        }
    }
}

diamond.prototype = new shape();
