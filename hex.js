var sides = 6;
var radius = 35;
var offset_x = radius+50; var offset_y = radius+50;

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');
var angle = (Math.PI*(2*sides-2))/sides;

function draw_shape(X, Y, COLOR) {
	if(isNaN(X) || isNaN(Y))
		return;
	var cX = Math.cos(0)*radius+X;
	var cY = Math.sin(0)*radius+Y;

	ctx.beginPath();
	ctx.moveTo(cX, cY);
	for (var i = 1; i < sides+1; i++) {
		cX = Math.cos(angle*i)*radius+X;
		cY = Math.sin(angle*i)*radius+Y;
		ctx.lineTo(cX, cY);
	}
	var cX = Math.cos(0)*radius+X-radius*1.6;
	var cY = Math.sin(0)*radius+Y;
	ctx.fillStyle = COLOR;
	ctx.fill();
	ctx.stroke();
}

function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

//*
var objs = [];
for (var X = 0; X < 20; X++) {
	for (var Y = 0; Y < 9; Y++) {
		var quackY = radius*Math.sqrt(3)*Y+radius*Math.sqrt(3)*0.5*(X%2 == 0 ? 0 : 1);
		var quackX = radius*1.5*X;
		if (isPrime((Y)*20+X+1))
			objs.push({x: quackX, y: quackY, type: "water"});
		else
			objs.push({x: quackX, y: quackY, type: "land"});
	}
}

function draw_shapes() {
	for (var i = 0; i < objs.length; i++) {
		var X=objs[i].x, Y=objs[i].y;
		var color = "purple";
		switch (objs[i].type) {
			case "land": color = "green"; break;
			case "water": color = "blue"; break;
		}
		draw_shape(X+offset_x, Y+offset_y, color);

	}
}
draw_shapes();

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x, y};
}

canvas.addEventListener('mousedown', function(e) {
    mouse = getCursorPosition(canvas, e);
    console.log(mouse.x, mouse.y);
    var closest = -1;
    var closest_len = -1;
    for (var i = 0; i < objs.length; i++) {
    	var curr_len = Math.sqrt(Math.abs(mouse.y-(objs[i].y+offset_y))**2+Math.abs(mouse.x-(objs[i].x+offset_x))**2);
    	if (curr_len < closest_len || closest_len == -1)
    	{
    		closest = i;
    		closest_len = curr_len;
    		if (curr_len < radius) break;
    	}
    }
    if (closest_len > radius)
    	return;
    if (objs[closest].type == "land")
    	objs[closest].type = "water";
    else
    	objs[closest].type = "land";
    draw_shapes();
});

console.log(objs);
//*/
