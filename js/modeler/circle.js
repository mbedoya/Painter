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

        if(this.name && this.name.length > 0){

            context.fillStyle = painterSettings.colors.textFillStyle;
            context.font = 'italic 13px Helvetica';
            context.fillText(this.name, this.location.x - this.radius/2, this.location.y - this.radius - 20);
        }

        if(this.desciption && this.desciption.length > 0){

            context.strokeStyle = "#000";
            context.beginPath();
            context.moveTo(this.location.x - this.radius - 3, this.location.y+this.radius + 20);
            context.lineTo(this.location.x - this.radius - 8, this.location.y+this.radius + 20);
            context.lineTo(this.location.x - this.radius - 8, this.location.y+this.radius + 45);
            context.lineTo(this.location.x - this.radius - 3, this.location.y+this.radius + 45);
            context.stroke();

            context.fillStyle = painterSettings.colors.textFillStyle;
            context.font = 'italic 13px Helvetica';
            context.fillText(this.desciption, this.location.x - this.radius, this.location.y + this.radius +30);

            var lineDash = context.getLineDash();
            context.beginPath();
            context.setLineDash([1,2]);
            context.moveTo(this.location.x + 10, this.location.y+this.radius+1);
            context.lineTo(this.location.x + 10, this.location.y+this.radius+20);
            context.stroke();

            context.setLineDash(lineDash);
        }
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