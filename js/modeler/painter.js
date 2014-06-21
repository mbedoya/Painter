/**
 * Created by USUARIO on 17/06/2014.
 */

var painter = function(settings, context, canvas){

    this.context = context;
    this.canvas = canvas;
    this.settings = settings;
    this.graphics = [];
    this.connections = [];
    var selectedGraphic = null;

    this.createGraphic = function(name, opts){

        var graphic;

        if(name == "rectangle"){
            graphic = new rectangle();
            graphic.init(opts.location, this.settings.rectangle.width, this.settings.rectangle.height);
            graphic.objectType = opts.business_object;
            graphic.relocate();
        }else{

            if(name == "circle"){
                graphic = new circle();
                graphic.init(opts.location, 0, 0);
                graphic.objectType = opts.business_object;
                graphic.radius = this.settings.circle.radius;
                graphic.relocate();
            }else{

                if(name == "connector"){
                    graphic = new connnector();
                    graphic.init(opts.source, opts.destination);
                    this.connections.push(graphic);
                }else{

                    if(name == "diamond"){

                        graphic = new diamond();
                        graphic.init(opts.location, this.settings.diamond.width, this.settings.diamond.height);
                        graphic.objectType = opts.business_object;

                    }else{

                    }

                }
            }
        }

        this.graphics.push(graphic);
        if(graphic.isSelectable()){
            if(selectedGraphic != null){
                this.unselectGraphic();
            }
            this.selectGraphic(graphic);
        }

        //Repaint
        this.paint();

        return graphic;
    }

    this.paint = function(){

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var i;

        for(i=0;i<this.graphics.length;i++){
            this.graphics[i].paint();
        }
    }

    this.moveSelectedGraphicUp = function(){

        if(selectedGraphic != null){
            if(selectedGraphic.location.y > 0){
                selectedGraphic.location.y = selectedGraphic.location.y - 1;
                this.paint();
            }
        }
    }

    this.moveSelectedGraphicDown = function(){

        if(selectedGraphic != null){
            selectedGraphic.location.y = selectedGraphic.location.y + 1;
            this.paint();
        }
    }

    this.moveSelectedGraphicRight = function(){

        if(selectedGraphic != null){
            selectedGraphic.location.x = selectedGraphic.location.x + 1;
            this.paint();
        }
    }

    this.moveSelectedGraphicLeft = function(){

        if(selectedGraphic != null){
            if(selectedGraphic.location.x > 0){
                selectedGraphic.location.x = selectedGraphic.location.x - 1;
                this.paint();
            }
        }
    }

    this.moveSelectedGraphicTo = function(location){

        if(selectedGraphic != null){

            selectedGraphic.location.x = location.x;
            selectedGraphic.location.y = location.y;
            selectedGraphic.relocate();

            this.paint();
        }
    }

    this.getGraphicAtLocation = function(location){

        var i;
        var graphic = null;
        for(i=0;i<this.graphics.length;i++){

            if(this.graphics[i].isSelectable() && this.graphics[i].pointInMyArea(location)){
                graphic = this.graphics[i];
                break;
            }
        }

        return graphic;
    }

    this.getConnector = function(object1, object2){

        for (var i = 0; i < this.connections.length; i++) {
            var obj = this.connections[i];
            if( (obj.source == object1 && obj.destination == object2 ) ||
                (obj.source == object2 && obj.destination == object1 )){
                return obj;
            }
        }

        return null;
    }

    this.getDirectConnector = function(object1, object2){

        for (var i = 0; i < this.connections.length; i++) {
            var obj = this.connections[i];
            if( obj.source == object1 && obj.destination == object2 ){
                return obj;
            }
        }

        return null;
    }

    this.dropConnection = function(object1, object2){

        var connectorToDrop = this.getDirectConnector(object1, object2);

        if(connectorToDrop != null){

            //Drop from graphics
            var index = this.graphics.indexOf(connectorToDrop);
            if (index > -1) {
                this.graphics.splice(index, 1);
            }

            index = this.connections.indexOf(connectorToDrop);
            if (index > -1) {
                this.connections.splice(index, 1);
            }

            this.paint();
        }

    }

    this.selectGraphic = function(graphic){

        selectedGraphic = graphic;
        graphic.selected = true;

        this.paint();
    }

    this.unselectGraphic = function(){

        console.log("removing selection");

        selectedGraphic.selected = false;
        selectedGraphic = null;

        this.paint();
    }

    this.getSelectedGraphic = function(){
        return selectedGraphic;
    }
}
