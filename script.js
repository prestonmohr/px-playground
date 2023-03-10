const canvas = document.getElementById("game");
canvas.style.overflow = `hidden`;
const ctx = canvas.getContext("2d");

let beeX = window.innerWidth / 2;
let beeY = window.innerHeight / 2;
let beeVX = 0;
let beeVY = 0;
let beeSpeed = 5;
let beeSize = 10;
let beeMomentum = 0.8;
let deceleration = 0.985;
let gravity = 0.5;
let isFlying = false;
let leftPressed = false;
let rightPressed = false;
var trailLength = 60;

let trail = [];

const title = document.createElement('div');
title.style.position = 'fixed';
title.style.top = '5px';
title.style.left = '36px';
title.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
title.style.padding = '5px 10px';
title.style.borderRadius = '20px';
title.style.fontSize = '12px';
title.style.fontFamily = 'Arial, Helvetica, sans-serif';
title.style.color = 'rgba(255, 255, 255, 0.75)';
title.style.zIndex = '999999';
title.textContent = `px-playground`;
document.body.appendChild(title);

const backArrow = document.createElement('div');
backArrow.style.position = 'fixed';
backArrow.style.top = '5px';
backArrow.style.left = '5px';
backArrow.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
backArrow.style.padding = '5px 10px';
backArrow.style.borderRadius = '20px';
backArrow.style.fontSize = '12px';
backArrow.style.fontFamily = 'Arial, Helvetica, sans-serif';
backArrow.style.color = 'rgba(255, 255, 255, 0.75)';
backArrow.style.zIndex = '999999';
var linkGit = document.createElement("a");
linkGit.href = "https://github.com/prestonmohr/px-playground";
linkGit.textContent = "<";
linkGit.target="_blank"
linkGit.style.fontSize = '12px';
linkGit.style.fontFamily = 'Arial, Helvetica, sans-serif';
linkGit.style.color = 'rgba(255, 255, 255, 0.75)';
linkGit.style.textDecoration = 'none';
backArrow.appendChild(linkGit);
document.body.appendChild(backArrow);

/*
 const plus = document.createElement('button');
 plus.style.position = 'fixed';
 plus.style.bottom = '33px';
 plus.style.left = '35px';
 plus.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
 plus.style.padding = '5px 10px';
 plus.style.borderRadius = '20px';
 plus.style.fontSize = '12px';
 plus.style.fontFamily = 'Arial, Helvetica, sans-serif';
 plus.style.color = 'rgba(255, 255, 255, 0.75)';
 plus.style.zIndex = '999999';
 plus.textContent = `+`;
 plus.onClick = extendTrail();
 //plus.addEventListener("click", extendTrail());
 document.body.appendChild(plus);
 
 const minus = document.createElement('button');
 minus.style.position = 'fixed';
 minus.style.bottom = '33px';
 minus.style.left = '5px';
 minus.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
 minus.style.padding = '5px 10px';
 minus.style.borderRadius = '20px';
 minus.style.fontSize = '12px';
 minus.style.fontFamily = 'Arial, Helvetica, sans-serif';
 minus.style.color = 'rgba(255, 255, 255, 0.75)';
 minus.style.zIndex = '999999';
 minus.textContent = `-`;
 //minus.onClick = retractTrail();
 document.body.appendChild(minus);
 */

const displayPalette = document.createElement('div');
displayPalette.style.position = 'fixed';
displayPalette.style.bottom = '5px';
displayPalette.style.left = '5px';
displayPalette.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
displayPalette.style.padding = '5px 10px';
displayPalette.style.borderRadius = '20px';
displayPalette.style.fontSize = '12px';
displayPalette.style.fontFamily = 'Arial, Helvetica, sans-serif';
displayPalette.style.color = 'rgba(255, 255, 255, 0.75)';
displayPalette.style.zIndex = '999999';
displayPalette.textContent = 'RGB trail';
document.body.appendChild(displayPalette);

const displayCredit = document.createElement('div');
displayCredit.style.position = 'fixed';
displayCredit.style.bottom = '5px';
displayCredit.style.right = '5px';
displayCredit.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
displayCredit.style.padding = '5px 10px';
displayCredit.style.borderRadius = '20px';
displayCredit.style.fontSize = '12px';
displayCredit.style.fontFamily = 'Arial, Helvetica, sans-serif';
displayCredit.style.color = 'rgba(255, 255, 255, 0.75)';
displayCredit.style.zIndex = '999999';
var link = document.createElement("a");
link.href = "https://www.prestonmohr.com";
link.textContent = "preston mohr";
link.target="_blank"
link.style.fontSize = '12px';
link.style.fontFamily = 'Arial, Helvetica, sans-serif';
link.style.color = 'rgba(255, 255, 255, 0.75)';
link.style.textDecoration = 'none';
displayCredit.appendChild(link);
document.body.appendChild(displayCredit);

const displayYear = document.createElement('div');
displayYear.style.position = 'fixed';
displayYear.style.bottom = '33px';
displayYear.style.right = '5px';
displayYear.style.backgroundColor = 'rgba(35, 35, 35, 0.75)';
displayYear.style.padding = '5px 10px';
displayYear.style.borderRadius = '20px';
displayYear.style.fontSize = '12px';
displayYear.style.fontFamily = 'Arial, Helvetica, sans-serif';
displayYear.style.color = 'rgba(255, 255, 255, 0.75)';
displayYear.style.zIndex = '999999';
displayYear.textContent = '2023';
document.body.appendChild(displayYear);

document.onkeydown = function(event) {
    if (event.code === "ArrowLeft") {
        leftPressed = true;
        beeVX = -beeSpeed;
        event.preventDefault();
    } else if (event.code === "ArrowRight") {
        rightPressed = true;
        beeVX = beeSpeed;
        event.preventDefault();
    } else if (event.code === "ArrowUp") {
        isFlying = true;
        beeVY = -beeSpeed;
        event.preventDefault();
    } else if (event.code === "ArrowDown") {
        event.preventDefault();
    } else if (event.code === "Space") {
        isFlying = true;
        beeVY = -beeSpeed;
        event.preventDefault();
    } else if (event.keyCode === 65) {
        leftPressed = true;
        beeVX = -beeSpeed;
    } else if (event.keyCode === 68) {
        rightPressed = true;
        beeVX = beeSpeed;
    } else if (event.keyCode === 87) {
        isFlying = true;
        beeVY = -beeSpeed;
    }
};

document.onkeyup = function(event) {
    if (event.code === "ArrowLeft") {
        leftPressed = false;
        event.preventDefault();
    } else if (event.code === "ArrowRight") {
        rightPressed = false;
        event.preventDefault();
    } else if (event.code === "ArrowUp") {
        isFlying = false;
        event.preventDefault();
    } else if (event.code === "ArrowDown") {
        event.preventDefault();
    } else if (event.code === "Space") {
        isFlying = false;
        event.preventDefault();
    } else if (event.keyCode === 65) {
        leftPressed = false;
    } else if (event.keyCode === 68) {
        rightPressed = false;
    } else if (event.keyCode === 87) {
        isFlying = false;
    }
};

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.onresize();

function drawBee() {
    ctx.fillStyle = "black";
    ctx.fillRect(beeX, beeY, beeSize*5, beeSize*5);
}

function drawTrail() {
    for (let i = 0; i < trail.length; i++) {
        const opacity = i / trail.length;
        ctx.fillStyle = `hsla(${(i+40)*5}, 100%, 50%, ${opacity})`;
        ctx.fillRect(trail[i].x, trail[i].y, beeSize*5, beeSize*5);
    }
}

function updateBee() {
    if (!leftPressed && !rightPressed) {
        beeVX *= deceleration;
    }
    if (!isFlying) {
        beeVY += gravity;
    }
    beeX += beeVX;
    beeY += beeVY;
    
    if (beeX + beeSize >= canvas.width - 25) {
        beeX = canvas.width - beeSize*5;
        beeVX = -beeVX*2.5;
    } else if (beeX <= 0) {
        beeX = 0;
        beeVX = -beeVX*2.5;
    }
    if (beeY + beeSize >= canvas.height-25) {
        beeY = canvas.height - beeSize*5;
        beeVY = -beeVY;
    } else if (beeY <= 0) {
        beeY = 0;
        beeVY = -beeVY;
    }
}

function updateTrail() {
    trail.push({
    x: beeX,
    y: beeY,
    size: beeSize
    });
    
    
    if (trail.length > trailLength) {
        trail.shift();
    }
}

/*
 function extendTrail(){
 trailLength= trailLength+10;
 console.log("extend button was clicked!");
 }
 
 function retractTrail(){
 if (trailLength >= 0) {
 trailLength= trailLength-10;
 }
 console.log("retract button was clicked!");
 }
 */

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBee();
    updateTrail();
    drawTrail();
    drawBee();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
