/**
 * Created by USUARIO on 14/06/2014.
 */

var mouseX;
var mouseY;

var buttonPressed = false;
var ctrlPressed = false;

var context;
var canvas;

var processPainter;

var painterSettings = {
    rectangle: {
        width: 145,
        height: 65
    },
    diamond: {
        width: 62,
        height: 66
    },
    circle: {
        radius: 30
    },
    colors: {
        fillStyle: "rgba(255, 255, 0, .5)",
        strokeStyle: "rgb(255, 0, 0)",
        selectedFillStyle: "rgba(255, 140, 0, .5)",
        textFillStyle: "#768A8A"
    }
}

$(document).ready(function(){

    //SETTING VARIABLES

    canvas = document.getElementById('workAreaCanvas');
    context = canvas.getContext("2d");

    processPainter = new painter(painterSettings, context, canvas);

    $("#propiedades").css("visibility", "hidden");

    var x=100;
    var y=100;
    var w=62;
    var h=66;

    /*context.fillStyle = "rgba(255, 255, 0, .5)";
     context.strokeStyle = "rgb(255, 0, 0)";
     context.lineWidth = 1;
     context.beginPath();
     context.moveTo(x-w/2, y);
     context.lineTo(x, y-h/2);
     context.lineTo(x+w/2,y);
     context.lineTo(x,y+h/2);
     context.lineTo(x-w/2, y);
     context.fill();
     context.stroke();*/

    //INITIALIZATION

    $( "#dialogObjectsAlreadyConnected" ).dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $(function() {
        $( document ).tooltip();
    });

    // BUTTON CLICKS

    $("#getImage").on("click", function(){
        var img = canvas.toDataURL("image/png");
        $("#canvasImage").html('<img src="'+img+'"/>');
    });

    $("#saveProperties").on("click", function(){

        graphic = processPainter.getSelectedGraphic();

        console.log(graphic);

        for(var property in graphic){

            if (typeof graphic[property] !== "function"){

                if (typeof graphic[property] === "object"){

                    obj = graphic[property];

                    for(var objProperty in obj){

                        if (typeof obj[objProperty] !== "function"){

                            if (typeof obj[objProperty] === "object"){

                            }
                            else{

                                if (typeof obj[objProperty] === "number"){

                                    console.log("getting number " + objProperty);

                                    console.log(obj[objProperty]);
                                    obj[objProperty] = Number( $("#object_" + property + "_" + objProperty).val());
                                    console.log(obj[objProperty]);
                                }
                                else{
                                    obj[objProperty] = $("#object_" + property + "_" + objProperty).val();
                                }

                            }
                        }else{

                        }
                    }

                }
                else{

                    if (typeof graphic[property] === "number"){
                        graphic[property] = Number( $("#object_" + property).val());
                    }
                    else{
                        graphic[property] = $("#object_" + property).val();
                    }

                }
            }else{

            }
        }

        console.log(graphic);

        processPainter.paint();
    });


    //KEY PRESSED UP

    $(document).on("keyup", function(e){

        var keyprocessed = false;
        var graphic = processPainter.getSelectedGraphic();

        if(graphic != null){

            if(e.keyCode == 17 || (e.keyCode >= 37 && e.keyCode <=40) ){
                e.preventDefault();
            }

            //Ctrl
            if(e.keyCode == 17){

                ctrlPressed = false;

            }else {

                if(e.keyCode == 38){

                    processPainter.moveSelectedGraphicUp();
                    keyprocessed = true;
                }else{

                    if(e.keyCode == 40){
                        processPainter.moveSelectedGraphicDown();
                        keyprocessed = true;
                    }else{

                        if(e.keyCode == 37){
                            processPainter.moveSelectedGraphicLeft();
                            keyprocessed = true;
                        }else{
                            if(e.keyCode == 39){
                                processPainter.moveSelectedGraphicRight();
                                keyprocessed = true;
                            }
                        }
                    }
                }

            }
        }

        if(keyprocessed){
            showProperties(graphic);
        }
    });


    //KEY PRESSED DOWN

    $(document).on("keydown", function(e){

        var graphic = processPainter.getSelectedGraphic();
        if(graphic != null) {

            if (e.keyCode == 17 || (e.keyCode >= 37 && e.keyCode <= 40)) {
                e.preventDefault();
            }

            if(e.keyCode == 17){
                ctrlPressed = true;
            }
        }

    });


    //MOUSE MOVING

    $('#workAreaCanvas').mousemove(function(e) {

        var graphic = processPainter.getSelectedGraphic();

        if(graphic != null){

            x = e.pageX - this.offsetLeft;
            y = e.pageY - this.offsetTop;

            if(graphic.pointInMyArea(new point(x, y)) || buttonPressed){
                $('#workAreaCanvas').css('cursor', 'move');
            }else{
                $('#workAreaCanvas').css('cursor', 'default');
            }
        }

    });


    //MOUSE BUTTON PRESSED UP

    $('#workAreaCanvas').mouseup(function(e) {

        buttonPressed = false;

        if( Math.abs(mouseX - (e.pageX - this.offsetLeft)) >= 3 ||
            Math.abs(mouseY - (e.pageY - this.offsetTop)) >= 3){

            if(processPainter.getSelectedGraphic() != null){
                processPainter.moveSelectedGraphicTo(new point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
                showProperties(processPainter.getSelectedGraphic());
            }
        }
    });


    //MOUSE BUTTON PRESSED DOWN

    $('#workAreaCanvas').mousedown(function(e) {

        e.preventDefault();

        buttonPressed = true;
        var linked = false;

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        var graphic = processPainter.getGraphicAtLocation(new point(mouseX, mouseY));
        var selGraphic = processPainter.getSelectedGraphic();

        //Graphic selected?
        if(graphic != null){

            //Making a connection?
            if(ctrlPressed && selGraphic != null){

                //Connection done already?
                if(processPainter.getDirectConnector(selGraphic, graphic)){

                    processPainter.dropConnection(selGraphic, graphic);

                }else{

                    if(processPainter.getConnector(selGraphic, graphic)){
                        $( "#dialogObjectsAlreadyConnected" ).dialog( "open" );
                    }else{
                        processPainter.createGraphic("connector", { source: selGraphic, destination: graphic });
                    }
                }

            }else{

                $('#workAreaCanvas').css('cursor', 'move');

                if(selGraphic != graphic){

                    if(selGraphic != null) {
                        processPainter.unselectGraphic();
                    }

                    processPainter.selectGraphic(graphic);
                    showProperties(graphic);
                }
            }

        }else{

            if(selGraphic != null){

                console.log("eliminar seleccion")

                processPainter.unselectGraphic();
                $("#propiedades").css("visibility", "hidden");
            }
        }

    });

});


//GENERAL METHODS

function dropCanvas(ev) {

    ev.preventDefault();

    var data = ev.dataTransfer.getData("Text");

    var objectType = $("#"+data).attr("objectType");
    var graphicType = $("#"+data).attr("graphicType");

    var canvasx = ev.x - canvas.offsetLeft;
    var canvasy = ev.y- canvas.offsetTop;

    var graphic = processPainter.createGraphic(graphicType, {location: new point(canvasx, canvasy), business_object: objectType} );
    showProperties(graphic);

    /*

     context.fillStyle = "rgba(255, 255, 0, .5)";
     context.strokeStyle = "rgb(255, 0, 0)";
     context.lineWidth = 2;
     context.beginPath();
     context.arc(ev.x - canvas.offsetLeft-15, ev.y- canvas.offsetTop-15, 30, 0, 2 * Math.PI, false);
     context.fill();
     context.stroke();
     context.arc(ev.x - canvas.offsetLeft-15, ev.y- canvas.offsetTop-15, 25, 0, 2 * Math.PI, false);
     context.fill();
     context.stroke();

     }*/

}


function generatePropertiesTable(graphic){

    var html = "";

    for(var property in graphic){

        if (typeof graphic[property] !== "function"){

            if (typeof graphic[property] === "object"){

                html = html + "<tr><td colspan='2'>" + property + "</td></tr>";

                obj = graphic[property];

                for(var objProperty in obj){

                    if(typeof obj[objProperty] !== "function" && typeof obj[objProperty] !== "object"){

                        html = html + "<tr><td>" + objProperty + "</td><td><input id='object_" + property + "_" + objProperty + "' type='text' value='"  + obj[objProperty] + "'></td></tr>";
                    }
                }

                html = html + "<tr><td colspan='2'>&nbsp;</td></tr>";

            }
            else{
                html = html + "<tr><td>" + property + "</td><td><input id='object_" + property + "' type='text' value='"  + graphic[property] + "'></td></tr>";
            }
        }else{

        }
    }

    $("#propertiesTable").html(html);
}

function showProperties(graphic){

    generatePropertiesTable(graphic);
    $("#propiedades").css("visibility", "visible");
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('Mi drop: ' + data);
}


function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
    console.log('Mi drag');
}

function allowDrop(ev) {
    ev.preventDefault();
}