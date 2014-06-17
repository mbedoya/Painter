/**
 * Created by USUARIO on 14/06/2014.
 */

var lineStarted = false;
var mouseX;
var mouseY;

var processModel;
var canvas;

var selectedActivity = null;
var buttonPressed = false;

var ctrlPressed = false;

var context;

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
    graphic = processPainter.createGraphic(graphicType, new point(canvasx, canvasy));
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


    var s = new shape();
    s.init(new point(10, 10), 50, 20);
    console.log(s.height);

    var r = new rectangle();
    r.init(new point(10, 20), 60, 30);
    console.log(r.height);

    $(function() {
        $( document ).tooltip();
    });

    $(document).on("keyup", function(e){

        var keyprocessed = false;

        if(selectedActivity != null){

            //Ctrl
            if(e.keyCode == 17){

                ctrlPressed = false;
                e.preventDefault();

            }else {

                if(e.keyCode == 38){
                    e.preventDefault();
                    selectedActivity.moveUp();
                    keyprocessed = true;
                }else{

                    if(e.keyCode == 40){
                        e.preventDefault();
                        selectedActivity.moveDown();
                        keyprocessed = true;
                    }else{

                        if(e.keyCode == 37){
                            e.preventDefault();
                            selectedActivity.moveLeft();
                            keyprocessed = true;
                        }else{
                            if(e.keyCode == 39){
                                e.preventDefault();
                                selectedActivity.moveRight();
                                keyprocessed = true;
                            }
                        }
                    }
                }

            }



        }

        if(keyprocessed){
            //e.preventDefault();
            console.log("default prevented");
        }
    });

    $(document).on("keydown", function(e){

        if(selectedActivity != null){

            //Ctrl
            if(e.keyCode == 17){

                ctrlPressed = true;
                e.preventDefault();

            }else{

                if(e.keyCode == 38){
                    e.preventDefault();
                    //selectedActivity.moveUp();
                    keyprocessed = true;
                }else{

                    if(e.keyCode == 40){
                        e.preventDefault();
                        //selectedActivity.moveDown();
                        keyprocessed = true;
                    }else{

                        if(e.keyCode == 37){
                            e.preventDefault();
                            //selectedActivity.moveLeft();
                            keyprocessed = true;
                        }else{
                            if(e.keyCode == 39){
                                e.preventDefault();
                                //selectedActivity.moveRight();
                                keyprocessed = true;
                            }
                        }
                    }
                }
            }


        }
    });

    $("#saveProperties").on("click", function(){
       selectedActivity.setName($("#objectName").val());
    });

    $('#workAreaCanvas').mousemove(function(e) {

        if(selectedActivity != null){

            if(selectedActivity.insideMe(e.pageX - this.offsetLeft, e.pageY - this.offsetTop) || buttonPressed){
                $('#workAreaCanvas').css('cursor', 'move');
            }else{
                $('#workAreaCanvas').css('cursor', 'default');
            }
        }

    });

    $('#workAreaCanvas').mouseup(function(e) {

        buttonPressed = false;

        if( Math.abs(mouseX- (e.pageX - this.offsetLeft)) >= 3 ||
            Math.abs(mouseY- (e.pageY - this.offsetTop)) >= 3){

            if(selectedActivity != null){
                selectedActivity.move(e.pageX - this.offsetLeft - 70, e.pageY - this.offsetTop - 30);
            }
        }
    });

    $('#workAreaCanvas').mousedown(function(e) {

        buttonPressed = true;
        var linked = false;

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        var activity = processModel.getSelectedActivity(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        if(activity != null){

            $('#workAreaCanvas').css('cursor', 'move');

            if (selectedActivity == null){

                selectedActivity  = activity;
                selectedActivity.select();

            }else{

                if(selectedActivity != activity){

                    //Link Activities
                    if(ctrlPressed){

                        selectedActivity.linkTo(activity);
                        linked = true;

                    }else{

                        selectedActivity.unselect();
                        selectedActivity  = activity;
                        selectedActivity.select();
                    }

                }
            }

            if(!linked){

                $("#propiedades").css("visibility", "visible");
                $("#objectName").val(selectedActivity.getName());
            }


        }else{

            $('#workAreaCanvas').css('cursor', 'default');

            if(selectedActivity != null){
                selectedActivity.unselect();
                selectedActivity = null;
            }

            $("#propiedades").css("visibility", "hidden");
        }

    });



});