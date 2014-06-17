/**
 * Created by USUARIO on 14/06/2014.
 */


var activity_js = function(x, y, w, h){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = "";
    this.parent;
    this.next;
    var context = document.getElementById('workAreaCanvas').getContext("2d");

    this.setName = function(name){
        this.name = name;

        console.log("setting name:" + this.name);
        paintName(this.name, this.x, this.y);
    }

    this.getName = function(){
        return this.name;
    }

    this.paint = function(){

        context.strokeStyle = "rgb(255, 0, 0)";
        context.fillStyle = "rgba(255, 255, 0, .5)";
        roundRect(context, this.x, this.y, w, h, 10, true, true);
    }

    this.move = function(x, y){

        console.log("moving activity from " + this.x + ","+ this.y + " to " + x + ","+ y);
        context.clearRect(this.x-7, this.y-7, w+14, h+14);

        this.x = x;
        this.y = y;

        this.paint();
        paintName(this.name, this.x, this.y);
        this.select();
    }

    this.moveUp = function(){

        context.clearRect(this.x-7, this.y-7, w+14, h+14);

        if(this.y>0){
            this.y = this.y-1;
        }

        this.paint();
        paintName(this.name, this.x, this.y);
        this.select();
    }

    this.moveDown = function(){

        context.clearRect(this.x-7, this.y-7, w+14, h+14);

        this.y = this.y+1;

        this.paint();
        paintName(this.name, this.x, this.y);
        this.select();
    }

    this.moveLeft = function(){

        context.clearRect(this.x-7, this.y-7, w+14, h+14);

        this.x = this.x-1;

        this.paint();
        paintName(this.name, this.x, this.y);
        this.select();
    }

    this.moveRight = function(){

        context.clearRect(this.x-7, this.y-7, w+14, h+14);

        this.x = this.x+1;

        this.paint();
        paintName(this.name, this.x, this.y);
        this.select();
    }

    this.linkTo = function(activity){

        this.next = activity;
        activity.parent = this;

        context.strokeStyle = "#768A8A";
        //Main Line
        context.moveTo(this.x+this.w, this.y+this.h/2);
        context.lineTo(activity.x, activity.y + activity.h/2);

        context.moveTo(activity.x-10, activity.y + activity.h/2-10);
        context.lineTo(activity.x, activity.y + activity.h/2);

        context.moveTo(activity.x-10, activity.y + activity.h/2+10);
        context.lineTo(activity.x, activity.y + activity.h/2);


        context.stroke();
    }

    function paintName(name, x, y){

        context.clearRect(x+7, y+7, w-14, h-14);
        context.fillStyle = "rgba(255, 255, 0, .5)";
        context.fillRect(x+7, y+7, w-14, h-14);

        context.fillStyle = "#768A8A";
        context.font = 'italic 13px Helvetica';
        context.fillText(name, x + w/3, y + h/3);

        console.log("painting name:" + name);
    }

    this.select = function() {

        context.strokeStyle = "#768A8A";
        dashedRoundRect(context, this.x-5, this.y-5, w+10, h+10, 10, false, true);
    }

    this.unselect = function() {
        context.clearRect(this.x-7, this.y-7, w+14, h+14);
        this.paint();
        paintName(this.name, this.x, this.y);
    }

    this.insideMe = function(x, y) {

        if (x >= this.x && x <= this.x + this.w &&
            y >= this.y && y <= this.y + this.h) {
            return true;
        }
        return false;
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
    function dashedRoundRect(ctx, x, y, width, height, radius, fill, stroke) {

        linedash = ctx.getLineDash();

        if (typeof stroke == "undefined" ) {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        ctx.beginPath();
        ctx.setLineDash([5,2]);
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

        ctx.setLineDash(linedash);
    }
}
