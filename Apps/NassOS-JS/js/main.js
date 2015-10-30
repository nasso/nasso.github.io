// Vars
var canvas;
var gtx;

// Cross-browser support
window.requestAnimationFrame = function(){
	return (
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(foo){
			window.setTimeout(foo, 1000 / 60);
		}
	);
}();

// Functions
function initCanvas(){
	canvas = $("#canvas")[0];
	
	if(!canvas){
		alert("Can't get <canvas> element");
		throw new Error("Can't get <canvas> element");
	}else{
		gtx = canvas.getContext("2d");
		
		if(!gtx){
			alert("Can't get the graphics context");
			throw new Error("Can't get the graphics context");
		}else{
			nindow.init(canvas, gtx);
		}
	}
}

function loop(){
	nindow.refresh();
	
	window.requestAnimationFrame(loop);
}

function start(){
	initCanvas();
	
	var back = new Image();
	back.onload = function(){
		nindow.setBackground(this);
	};
	back.src = "res/back.jpg";
	
	nindow.addWindow("Hello world", {x: null, y: null}, {width: 400, height: 400});
	nindow.addWindow("Foo", {x: 50, y: 50}, {width: 800, height: 600});
	
	loop();
}
