/**
 * Created by USUARIO on 17/06/2014.
 */

var painter = function(settings, context, canvas){

    this.context = context;
    this.canvas = canvas;
    this.settings = settings;
    this.graphics = [];
    var selectedGraphic = null;

    this.createGraphic = function(name, location){

        var graphic;

        if(name == "rectangle"){
            graphic = new rectangle();
            graphic.init(location, this.settings.rectangle.width, this.settings.rectangle.height);
            graphic.relocate();
        }else{

            if(name == "circle"){
                graphic = new circle();
                graphic.init(location, 0, 0);
                graphic.radius = this.settings.circle.radius;
                graphic.relocate();
            }else{

            }
        }

        this.graphics.push(graphic);

        //Repaint
        this.paint();

        return graphic;
    }

    this.paint = function(){

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var i;
        for(i=0;i<this.graphics.length;i++){
            console.log("painting in:" + this.graphics[i].location.x);
            this.graphics[i].paint();
        }
    }

    this.getGraphicAtLocation = function(location){

        var i;
        var graphic = null;
        for(i=0;i<this.graphics.length;i++){

            if(location.x >= this.graphics[i].location.x && location.x <= this.graphics[i].location.x + this.graphics[i].width &&
                location.y >= this.graphics[i].location.y && location.y <= this.graphics[i].location.y + this.graphics[i].height){

                graphic = this.graphics[i];
                console.log("Graphic found");

                break;
            }
        }

        return graphic;
    }

    this.selectGraphic = function(graphic){
        selectedGraphic = graphic;
    }

    this.getSelectedGraphic = function(){
        return selectedGraphic;
    }
}
