/**
 * Created by USUARIO on 17/06/2014.
 */

var rectangle = function(){

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
        roundRect(context, this.location.x, this.location.y, this.width, this.height, 10, true, true);

        if(this.name && this.name.length > 0){

            context.fillStyle = painterSettings.colors.textFillStyle;
            context.font = 'italic 13px Helvetica';
            context.fillText(this.name, this.location.x + this.width/4, this.location.y + this.height/2.5);
        }

        if(this.desciption && this.desciption.length > 0){

            context.strokeStyle = "#000";
            context.beginPath();
            context.moveTo(this.location.x + this.width/2 - 3, this.location.y - 20);
            context.lineTo(this.location.x + this.width/2 - 8, this.location.y - 20);
            context.lineTo(this.location.x + this.width/2 - 8, this.location.y - 45);
            context.lineTo(this.location.x + this.width/2 - 3, this.location.y - 45);
            context.stroke();

            context.fillStyle = painterSettings.colors.textFillStyle;
            context.font = 'italic 13px Helvetica';
            context.fillText(this.desciption, this.location.x + this.width/2, this.location.y-30);

            context.strokeStyle = "#000";
            var lineDash = context.getLineDash();
            context.beginPath();
            context.setLineDash([1,2]);
            context.moveTo(this.location.x + this.width/2 + 10, this.location.y-1);
            context.lineTo(this.location.x + this.width/2 + 10, this.location.y-20);
            context.stroke();

            context.setLineDash(lineDash);

        }
    }

    this.getConnectionStartPoint = function(){
        return new point(this.location.x + this.width, this.location.y + this.height/2);
    }

    this.getConnectionEndPoint = function(){
        return new point(this.location.x, this.location.y + this.height/2);
    }

    this.pointInMyArea = function(location){

        if(location.x >= this.location.x && location.x <= this.location.x + this.width &&
            location.y >= this.location.y && location.y <= this.location.y + this.height){

            return true;
        }else{
            return false;
        }
    }

    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} radius The corner radius. Defaults to 5;
     * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
     * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
     */
    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == "undefined" ) {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        ctx.beginPath();
        //Top Line
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        //Right
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        //Bottom
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        //Left
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (stroke) {
            ctx.stroke();
        }
        if (fill) {
            ctx.fill();
        }
    }
}

rectangle.prototype = new shape();