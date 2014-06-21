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

        context.strokeStyle = painterSettings.colors.strokeStyle;
        if(this.selected){
            context.fillStyle = painterSettings.colors.selectedFillStyle;
        }else{
            context.fillStyle = painterSettings.colors.fillStyle;
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

        if(this.name && this.name.length > 0){

            context.fillStyle = painterSettings.colors.textFillStyle;
            context.font = 'italic 13px Helvetica';
            context.fillText(this.name, this.location.x - this.width/4, this.location.y - this.height/2 - 20);
        }

        if(this.desciption && this.desciption.length > 0){

            context.strokeStyle = "#000";
            context.beginPath();
            context.moveTo(this.location.x - this.width/2 - 3, this.location.y+this.height/2 + 20);
            context.lineTo(this.location.x - this.width/2 - 8, this.location.y+this.height/2 + 20);
            context.lineTo(this.location.x - this.width/2 - 8, this.location.y+this.height/2 + 45);
            context.lineTo(this.location.x - this.width/2 - 3, this.location.y+this.height/2 + 45);
            context.stroke();

            context.fillStyle = painterSettings.colors.textFillStyle;
            context.font = 'italic 13px Helvetica';
            context.fillText(this.desciption, this.location.x - this.width/2, this.location.y + this.height/2 +30);

            var lineDash = context.getLineDash();
            context.beginPath();
            context.setLineDash([1,2]);
            context.moveTo(this.location.x + 10, this.location.y+this.height/2+1);
            context.lineTo(this.location.x + 10, this.location.y+this.height/2+20);
            context.stroke();

            context.setLineDash(lineDash);
        }

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
