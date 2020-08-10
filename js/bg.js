var mycanvas = document.getElementById("mycanvas");

var parentDiv = document.getElementById("home");

let style = getComputedStyle(parentDiv);

let margintop = parseInt(style.marginTop);
let marginbottom = parseInt(style.marginBottom);
let paddingtop = parseInt(style.paddingTop);
let paddingbottom = parseInt(style.paddingBottom);
let content = parseInt(style.height);

var w, h;
h = mycanvas.height = parentDiv.offsetHeight;
w = mycanvas.width = parentDiv.offsetWidth;

var ctx = mycanvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
};

var colors = ["#59981A", "#ECF87F", "#81B622", "#3D550C", "#cff6cf",
    "#cfe5cf", "#e5cfe5", "#f6def6", "#fe91ca", "#ff9a76",
    "##DBA40E", "##7E6E13", "#ff847c", "#e84a5f", "#ffc1f3"
];

window.addEventListener('resize', adjustWindow);

function adjustWindow() {
    h = mycanvas.height = parentDiv.offsetHeight;
    w = mycanvas.width = parentDiv.offsetWidth;
    init();
    console.log("changed");
}


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'green';
        // ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function() {
        if (this.x + radius > w || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + radius > h || this.y - radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}


var circleArr = [];

function init() {
    circleArr = [];
    // for loop
    for (i = 0; i < 800; i++) {
        var radius = Math.floor(Math.random() * 4 + 1);
        var x = Math.floor(Math.random() * (w - radius * 2) + radius);
        var y = Math.floor(Math.random() * (h - radius * 2) + radius);
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, w, h);

    for (i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
}

animate();
init();