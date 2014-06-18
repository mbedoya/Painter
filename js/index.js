/**
 * Created by USUARIO on 14/06/2014.
 */

var lineStarted = false;
var mouseX;
var mouseY;

var buttonPressed = false;
var ctrlPressed = false;

var context;
var canvas;

var processModel;

var processPainter;
var painterSettings = {
    rectangle: {
        width: 145,
        height: 65
    },
    circle: {
        radius: 30
    }
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('Mi drop: ' + data);
}

function createActivity(x, y, width, height){

    var a = new activity_js(x, y, width, height);
    a.paint();
    processModel.addActivity(a);

    return a;
}

function generatePropertiesTable(graphic){

    var html = "";
    console.log(graphic);

    for(var property in graphic){

        if (typeof graphic[property] !== "function"){

            if (typeof graphic[property] === "object"){

                html = html + "<tr><td colspan='2'>" + property + "</td></tr>";

                obj = graphic[property];
                console.log(obj);

                for(var objProperty in obj){

                    if(typeof obj[objProperty] !== "function" && typeof obj[objProperty] !== "object"){

                        html = html + "<tr><td>" + objProperty + "</td><td><input id='object_" + property + "_" + objProperty + "' type='text' value='"  + obj[objProperty] + "'></td></tr>";
                    }
                }

                html = html + "<tr><td colspan='2'>&nbsp;</td></tr>";

            }
            else{
                html = html + "<tr><td>" + property + "</td><td><input id='object" + property + "' type='text' value='"  + graphic[property] + "'></td></tr>";
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

function dropCanvas(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
   console.log(data);

    var objectType = $("#"+data).attr("objectType");
    var graphicType = $("#"+data).attr("graphicType");

    console.log('dropCanvas: ' + data + ' ' + graphicType);

    var canvasx = ev.x - canvas.offsetLeft;
    var canvasy = ev.y- canvas.offsetTop;

    var graphic;
    graphic = processPainter.createGraphic(graphicType, {location: new point(canvasx, canvasy)} );
    showProperties(graphic);

    if(objectType == "activity")
    {

    }
/*
    if(data == "imgActivity"){
        act = createActivity(ev.x - canvas.offsetLeft-70, ev.y- canvas.offsetTop-30, 145, 65);
        if(selectedActivity != null){
            selectedActivity.unselect();
        }
        selectedActivity = act;
        selectedActivity.select();

        $("#propiedades").css("visibility", "visible");
        $("#objectName").val("");
        $("#objectName").focus();
    }else{

        if(data == "imgStartEvent"){

            context.beginPath();
            context.arc(ev.x - canvas.offsetLeft-15, ev.y- canvas.offsetTop-15, 30, 0, 2 * Math.PI, false);
            context.fillStyle = "rgba(255, 255, 0, .5)";
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = "rgb(255, 0, 0)";
            context.stroke();

        }else{

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
        }

    }*/


}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
    console.log('Mi drag');
}

function allowDrop(ev) {
    ev.preventDefault();
    console.log('Mi allowdrop');
}

$(document).ready(function(){

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

    canvas = document.getElementById('workAreaCanvas');
    context = canvas.getContext("2d");

    processPainter = new painter(painterSettings, context, canvas);
    processModel = new processModel_js();

    $("#propiedades").css("visibility", "hidden");

    /*context.fillStyle = "rgba(255, 255, 0, .5)";
    context.strokeStyle = "rgb(255, 0, 0)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(100, 100, 30, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    context.arc(100, 100, 25, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();*/

    $("#getImage").on("click", function(){
        var img = canvas.toDataURL("image/png");
        $("#canvasImage").html('<img src="'+img+'"/>');
    });

    $(function() {
        $( document ).tooltip();
    });

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

    $("#saveProperties").on("click", function(){

        graphic = processPainter.getSelectedGraphic();

        for(var property in graphic){

            if (typeof graphic[property] !== "function"){

                if (typeof graphic[property] === "object"){

                }
                else{

                    if (typeof graphic[property] === "number"){
                        graphic[property] = Number( $("#object" + property).val());
                    }
                    else{
                        graphic[property] = $("#object" + property).val();
                    }

                }
            }else{

            }
        }

        processPainter.paint();
    });

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


    $('#workAreaCanvas').mousedown(function(e) {

        buttonPressed = true;
        var linked = false;

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        var graphic = processPainter.getGraphicAtLocation(new point(mouseX, mouseY));
        var selGraphic = processPainter.getSelectedGraphic();

        if(graphic != null){

            if(ctrlPressed && selGraphic != null){

                //Connection done already?
                if(processPainter.checkExistingConnection(graphic, selGraphic)){
                    $( "#dialogObjectsAlreadyConnected" ).dialog( "open" );
                }else{
                    processPainter.createGraphic("connector", { source: selGraphic, destination: graphic });
                }

            }else{

                $('#workAreaCanvas').css('cursor', 'move');

                if(selGraphic != null) {
                    processPainter.unselectGraphic();
                }

                processPainter.selectGraphic(graphic);
                showProperties(graphic);
            }

        }else{

            if(selGraphic != null){

                processPainter.unselectGraphic();
                $("#propiedades").css("visibility", "hidden");
            }
        }

    });



});