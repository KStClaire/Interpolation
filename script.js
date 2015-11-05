var canvas = document.getElementById('lerpy');
var ctx = canvas.getContext('2d');

var shapes = [];
var animateShape;
var interval;
var b = 0;

function Shape(points, color){
    this.points = points;
    this.color = color;

    this.drawShape = function(){
        console.log("Drawing now");
        ctx.beginPath();
        ctx.fillStyle = color.getColor();

        for(i = 0; i < points.length; i++){
            ctx.lineTo(points[i].x, points[i].y);
            console.log(points + " --> " + points[i]);
        }

        ctx.fill();
        ctx.closePath();
    };
}

function Point(x, y){
    this.x = x;
    this.y = y;
}

function Color(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;

    this.getColor = function(){
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

var pointy = [];

function shapeOne(){

    for(i = 0; i < 12; i++){
        var randX = Math.floor((Math.random()*600)+1);
        var randY = Math.floor((Math.random()*600)+1);

        pointy.push(new Point(randX, randY));
    }

    var shapeOne = new Shape(pointy, new Color(68, 150, 68));
    shapeOne.drawShape();
    pointy = [];
    shapes.push(shapeOne);
}

function shapeTwo(){

    for(i = 0; i < 12; i++){
        var randX = Math.floor((Math.random()*600)+900);
        var randY = Math.floor((Math.random()*600)+1);

        pointy.push(new Point(randX, randY));
    }

    var shapeTwo = new Shape(pointy, new Color(68, 48, 150));
    shapeTwo.drawShape();
    pointy = [];
    shapes.push(shapeTwo);
}

//(1 - B)x1 + x2B
//B cannot go over 1, as it is the amount you wish to move

function lerp(){

    var newX;
    var newY;
    var pointies = [];

    b += 0.01;

    for(i = 0; i < 12; i++){

        var x1 = shapes[0].points[i].x;
        var y1 = shapes[0].points[i].y;
        var x2 = shapes[1].points[i].x;
        var y2 = shapes[1].points[i].y;


        newX = (1 - b)*x1 + b*x2;
        newY = (1 - b)*y1 + b*y2;

        pointies.push(new Point(newX, newY));
    }

    var newR = (1 - b)*shapes[0].color.r + b*shapes[1].color.r;
    var newG = (1 - b)*shapes[0].color.g + b*shapes[1].color.g;
    var newB = (1 - b)*shapes[0].color.b + b*shapes[1].color.b;

    var newColor = new Color(Math.round(newR), Math.round(newG), Math.round(newB));

    animateShape = new Shape(pointies, newColor);
    clearCanvas();
};

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for(k = 0; k < shapes.length; k++){
        shapes[k].drawShape();
    }
    if(animateShape != null){
        animateShape.drawShape();
    }
    ctx.closePath();
}

function start(){

    function interpolate(){
        console.log(b);
        if(b >= 1){
            clearInterval(interval);
        }
        else{
            lerp();
        }
    }

    interval = setInterval(interpolate, 10);
    b = 0;
    clearCanvas();
};


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    document.getElementById("output").innerHTML = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
}, false);