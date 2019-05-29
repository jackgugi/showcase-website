/*
var canvas = document.getElementById('homeCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas = document.getElementById("homeCanvas");
*/



canvas = document.getElementById("homeCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/*
//rectangles
c.fillStyle = '#94C5CC';
c.fillRect(600, 100, 100, 100);
c.fillRect(900, 100, 100, 100);
c.fillRect(700, 200, 200, 100);
console.log(canvas);

//lines
c.beginPath();
c.moveTo(600, 85);
c.lineTo(650, 75);
c.lineTo(700, 85);
c.strokeStyle = '#B4D2E7';
c.stroke();

c.beginPath();
c.moveTo(900, 85);
c.lineTo(950, 75);
c.lineTo(1000, 85);
c.strokeStyle = '#B4D2E7';
c.stroke();

//circles / arches

c.beginPath();
c.arc(650,150,30, 0, Math.PI * 2, false);
c.strokeStyle = '#F8F8F8';
c.stroke();

c.beginPath();
c.arc(950,150,30, 0, Math.PI * 2, false);
c.strokeStyle = '#F8F8F8';
c.stroke();

function getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

for(var i = 0; i < 60; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 10, 0, Math.PI * 2, false);
    c.strokeStyle = getRandomColor();
    c.stroke();
}


//gittering colours
function getRandomColor() {
    var randomColor = ["A1A6B4","94C5CC","B4D2E7","F8F8F8"],
        colorToUse = randomColor[Math.floor(Math.random() * randomColor.length)];
    var result = '#' + colorToUse;

    return result;
}
*/
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 7;
var minRadius = 3;

var colorArray = [
    '#a1a6b4',
    '#94C5CC',
    '#B4D2E7',
    '#F8F8F8'
];

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //ineractivity
        if (mouse.x - this.x < 45 && mouse.x - this.x > - 45
            && mouse.y - this.y < 45 && mouse.y - this.y > - 45) {
            if (this.radius < maxRadius) {
                this.radius += 3;
            }
        }
        else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}



var circleArray = [];

for(var i = 0; i < 500; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * .5;
    var dy = (Math.random() - 0.5) * .5; 
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function init() {
    circleArray = [];
    for(var i = 0; i < 500; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * .5;
        var dy = (Math.random() - 0.5) * .5; 
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }    
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    c.fillStyle = '#000100';
    c.fillRect(0, 0, 2000, 5000);

    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}


animate();