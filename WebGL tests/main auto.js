var canvas = null;
var gl = null;

var shaderProgram;

var aspectRatio;

var projection = null;
var modelView = null;

var cubeVerticesBuffer;
var cubeColorBuffer;
var cubeIndexBuffer;

var vertexPositionAttribute;
var vertexColorAttribute;

// FIX FOR COMPATIBILITY

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

function initCanvas(){
	var error = false;
	canvas = $("#canvas")[0];
	
	if(!canvas){
		alert("Error while getting the <canvas> element.");
		error = true;
	}else{
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		if(!gl){
			alert("Error while getting the <canvas> WebGL context.");
			error = true;
		}
	}
	
	if(error){
		var errorMsg = document.createElement("p");
		errorMsg.innerHTML = "Your browser isn't compatible :( !";
		document.body.appendChild(errorMsg);
		
		throw new Error("Something went badly wrong :( !");
	}else{
		aspectRatio = canvas.width / canvas.height
	}
}

function getShader(id){
	var shaderScript, theSource, currentChild, shader;
	
	shaderScript = document.getElementById(id);

	if (!shaderScript) {
		return null;
	}

	theSource = shaderScript.innerHTML;
	currentChild = shaderScript;
	
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}
	
	gl.shaderSource(shader, theSource);
	
	gl.compileShader(shader);  
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
		alert("Error while compiling shaders: " + gl.getShaderInfoLog(shader));
		return null;  
	}

	return shader;
}

function setFullScreen(elem){
	if(elem.requestFullscreen){
		elem.requestFullscreen();
	}else if(elem.mozRequestFullScreen){
		elem.mozRequestFullScreen();
	}else if(elem.webkitRequestFullscreen){
		elem.webkitRequestFullscreen();
	}
}

function unsetFullScreen(elem){
	if(elem.cancelFullscreen){
		elem.requestFullscreen();
	}else if(elem.mozCancelFullScreen){
		elem.mozRequestFullScreen();
	}else if(elem.webkitCancelFullscreen){
		elem.webkitRequestFullscreen();
	}
}

function identity() {
	return Matrix.I(4);
}

function multMatrix(a, m) {
	return a.x(m);
}

function translate(a, v) {
	return multMatrix(a, Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function rotate(a, angle, v) {
	return multMatrix(a, Matrix.Rotation(angle * Math.PI / 180, $V([v[0], v[1], v[2]])).ensure4x4());
}

function scale(a, v) {
	return multMatrix(a, Matrix.Scale($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
	var pUniform = gl.getUniformLocation(shaderProgram, "projection");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(projection.flatten()));
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "modelView");
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(modelView.flatten()));
}

function start(){
	initCanvas();
	
	init();
	loop();
}

function init(){
	// alert("Press F11 to enable fullscreen, and press escape to disable it.");
	
	initShaders();
	initBuffers();
	initListeners();
	
	//GL
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
}

function initBuffers(){
	// VERTICES
	
	var vertices = [
		// Front face
		-1.0, -1.0,  1.0,
		 1.0, -1.0,  1.0,
		 1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		 1.0,  1.0,  1.0,
		 1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		 1.0, -1.0, -1.0,
		 1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		 1.0, -1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0,  1.0,  1.0,
		 1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0
	];
	
	cubeVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	// COLORS
	
	var facesColors = [
		[1.0, 1.0, 1.0, 1.0],
		[1.0, 0.0, 0.0, 1.0],
		[0.0, 1.0, 0.0, 1.0],
		[0.0, 0.0, 1.0, 1.0],
		[1.0, 1.0, 0.0, 1.0],
		[1.0, 0.0, 1.0, 1.0]
	];
	
	var colors = [];
	
	for(j=0; j<6; j++){
		var face = facesColors[j];
		
		for(i=0; i<4; i++){
			colors = colors.concat(face);
		}
	}
	
	cubeColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	
	// INDICES
	
	var indices = [
		0,  1,  2,      0,  2,  3,    // front
		4,  5,  6,      4,  6,  7,    // back
		8,  9,  10,     8,  10, 11,   // top
		12, 13, 14,     12, 14, 15,   // bottom
		16, 17, 18,     16, 18, 19,   // right
		20, 21, 22,     20, 22, 23    // left
	];
	
	cubeIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
}

function initShaders(){
	var fragmentShader = getShader("shader-fs");
	var vertexShader = getShader("shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Shader init failed.");
	}

	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
	gl.enableVertexAttribArray(vertexPositionAttribute);
	
	vertexColorAttribute = gl.getAttribLocation(shaderProgram, "vertexColor");
	gl.enableVertexAttribArray(vertexColorAttribute);
}

var keyState = [];

function initListeners(){
	window.addEventListener("keydown", function(e){
		var e = window.event || e;
		
		e.preventDefault();
		keyState[e.keyCode] = true;
		directKeyDown(e.keyCode);
	});
	
	window.addEventListener("keyup", function(e){
		var e = window.event || e;
		
		e.preventDefault();
		keyState[e.keyCode] = false;
		directKeyUp(e.keyCode);
	});
}

var fullscreen = false;

function directKeyDown(keycode){
	if(keycode == 122 && !fullscreen){
		setFullScreen(canvas);
		fullscreen = true;
	}
}

function directKeyUp(keycode){
	if(keycode == 27 && fullscreen){
		unsetFullScreen(canvas);
		fullscreen = false;
	}
}

var angleX = 0.0;
var angleY = 0.0;
var angleZ = 0.0;

function optimizeAngles(){
	if(angleX >= 360){
		angleX -= 360;
	}else if(angleX < 0){
		angleX += 360;
	}
	
	if(angleY >= 360){
		angleY -= 360;
	}else if(angleY < 0){
		angleY += 360;
	}
	
	if(angleZ >= 360){
		angleZ -= 360;
	}else if(angleZ < 0){
		angleZ += 360;
	}
}

var lastUpdate = Date.now();
var delta = 0;

function loop(){
	var now = Date.now();
	delta = now - lastUpdate;
	lastUpdate = now;
	
	render();
	
	angleX += 0.1 * delta;
	angleZ += 0.5 * delta;
	
	if(keyState[38]){
		angleX -= 0.1 * delta;
	}
	if(keyState[40]){
		angleX += 0.1 * delta;
	}
	if(keyState[37]){
		angleY -= 0.1 * delta;
	}
	if(keyState[39]){
		angleY += 0.1 * delta;
	}
	
	optimizeAngles();
	
	// Animation
	window.requestAnimationFrame(loop);
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	projection = makePerspective(70, aspectRatio, 0.1, 100.0);
	
	modelView = identity();
	modelView = translate(modelView, [0.0, 0.0, -6.0]);
	modelView = rotate(modelView, angleX, [1.0, 0.0, 0.0])
	modelView = rotate(modelView, angleY, [0.0, 1.0, 0.0])
	modelView = rotate(modelView, angleZ, [0.0, 0.0, 1.0])
	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
	gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
	setMatrixUniforms();
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}
