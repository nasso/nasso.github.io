var canvas = null;
var gl = null;
var keyState = [];
var fullscreen = false;

var lightDirection = $V([0.0, 0.0, -1.0]);

var oldMouseCoordsDirty = false;
var relMouseCoords = {x: 0, y: 0};
var mouseCoords = {x: null, y: null};
var lastMouseCoords = {x: null, y: null};
var phi = 0;
var theta = 0;
var camera = [];
var speed = 1.0;

var settings = {
	fov: 70.0,
	resolution: {width: 1280, height: 720},
	ratio: 16/9
};

var controls = {
	forward: 90, // Z
	backward: 83, // S
	strafeLeft: 81, // Q
	strafeRight: 68, // D
	run: 17, // CTRL
	fullscreen: 122, // F11
	
	mouseSensitivity: 0.5
};

var shaderProgram;

var aspectRatio;

var projection = null;
var model = null;
var view = null;

var materials = {
	iron: {name: "iron"}
};

var world = [];

var vertexPositionAttribute;
var vertexColorAttribute;
var vertexNormalAttribute;

// FIX FOR COMPATIBILITY
function fixCompatibility(){
	canvas.requestPointerLock = canvas.requestPointerLock ||
								canvas.mozRequestPointerLock ||
								canvas.webkitRequestPointerLock;
	
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
	
	document.exitPointerLock = 	document.exitPointerLock    ||
								document.mozExitPointerLock ||
								document.webkitExitPointerLock;
}

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
		aspectRatio = canvas.width / canvas.height;
	}
}

function getShader(id){
	var shaderScript, theSource, currentChild, shader;
	
	shaderScript = $("#"+id)[0];

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

function translate(a, v) {
	return a.x(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function rotate(a, angle, v) {
	return a.x(Matrix.Rotation(angle * Math.PI / 180, $V([v[0], v[1], v[2]])).ensure4x4());
}

function scale(a, v) {
	return a.x(Matrix.Scale($V([v[0], v[1], v[2]])).ensure4x4());
}

function setUniforms() {
	var pUniform = gl.getUniformLocation(shaderProgram, "projection");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(projection.flatten()));
	
	var mUniform = gl.getUniformLocation(shaderProgram, "model");
	gl.uniformMatrix4fv(mUniform, false, new Float32Array(model.flatten()));
	
	var vUniform = gl.getUniformLocation(shaderProgram, "view");
	gl.uniformMatrix4fv(vUniform, false, new Float32Array(view.flatten()));
	
	var normalMatrix = model.inv();
	normalMatrix = normalMatrix.transpose();
	var nUniform = gl.getUniformLocation(shaderProgram, "normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
	
	var lightUniform = gl.getUniformLocation(shaderProgram, "lightDirection");
	gl.uniform3fv(lightUniform, lightDirection.elements);
}

function createMesh(vertices, colors, normals, indices){
	var mesh = [];
	
	mesh.vertices = vertices;
	mesh.colors = colors;
	mesh.normals = normals;
	mesh.indices = indices;
	mesh.size = indices.length;
	
	mesh.verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
	
	mesh.colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.colors), gl.STATIC_DRAW);
	
	mesh.normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.normals), gl.STATIC_DRAW);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	mesh.indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	return mesh;
}

function start(){
	initCanvas();
	fixCompatibility();
	
	init();
	loop();
}

function init(){
	alert("Press F11 to enable fullscreen, and press escape to disable it.");
	
	camera.eye = $V([0.0, 1.0, 1.8]);
	
	camera.orientation = $V([0.0, 1.0, 0.0]);
	
	camera.center = camera.eye.add(camera.orientation);

	camera.up = $V([0.0, 0.0, 1.0]);
	
	initShaders();
	initBuffers();
	initListeners();
	
	//GL
	gl.clearColor(0.6, 0.8, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
}

function initBuffers(){
	world[0] = [];
	
	var vertices = [
		-8.0, -8.0, 0.0,
		-8.0, 8.0, 0.0,
		8.0, 8.0, 0.0,
		8.0, -8.0, 0.0,
	];
	
	var colors = [
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,
	];
	
	var normals = [
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
	];
	
	var indices = [
		0, 1, 2,
		0, 3, 2
	];
	
	world[0].mesh = createMesh(vertices, colors, normals, indices);
	world[0].mesh.transform = identity();
	world[0].material = materials.iron;
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
	
	vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "vertexNormal");
	gl.enableVertexAttribArray(vertexNormalAttribute);
}

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
	
	canvas.addEventListener("mousemove", function(e){
		if(oldMouseCoordsDirty){
			mouseCoords.x = e.clientX;
			mouseCoords.y = e.clientY;
			oldMouseCoordsDirty = false;
		}
		
		lastMouseCoords.x = mouseCoords.x;
		lastMouseCoords.y = mouseCoords.y;
		
		mouseCoords.x = e.clientX;
		mouseCoords.y = e.clientY;
		
		if(lastMouseCoords.x == null || lastMouseCoords.y == null){
			lastMouseCoords.x = mouseCoords.x;
			lastMouseCoords.y = mouseCoords.y;
			
			relMouseCoords.x = e.movementX || e.mozMovementX ||e.webkitMovementX || 0;
			relMouseCoords.y = e.movementY || e.mozMovementY ||e.webkitMovementY || 0;
		}else{
			relMouseCoords.x = e.movementX || e.mozMovementX ||e.webkitMovementX || (mouseCoords.x - lastMouseCoords.x);
			relMouseCoords.y = e.movementY || e.mozMovementY ||e.webkitMovementY || (mouseCoords.y - lastMouseCoords.y);
		}
	});
}

var lastUpdate = Date.now();
var delta = 0;

function directKeyDown(keycode){
	if(keycode == 122){
		setFullScreen(canvas);
		canvas.requestPointerLock();
		oldMouseCoordsDirty = true;
		fullscreen = true;
	}
}

function directKeyUp(keycode){
	if(keycode == 27){
		unsetFullScreen(canvas);
		document.exitPointerLock();
		oldMouseCoordsDirty = true;
		fullscreen = false;
	}
}

function calcDelta(){
	var now = Date.now();
	delta = now - lastUpdate;
	lastUpdate = now;
}

function input(){
	phi += -relMouseCoords.y * controls.mouseSensitivity;
	theta += -relMouseCoords.x * controls.mouseSensitivity;
	
	relMouseCoords.x = 0;
	relMouseCoords.y = 0;
	
	if(phi > 89) {
		phi = 89;
	} else if (phi < -89) {
		phi = -89;
	}
	
	var phiRadian = phi * Math.PI / 180;
	var thetaRadian = theta * Math.PI / 180;
	
	camera.orientation.elements[0] = Math.cos(phiRadian) * Math.cos(thetaRadian);
	camera.orientation.elements[1] = Math.cos(phiRadian) * Math.sin(thetaRadian);
	camera.orientation.elements[2] = Math.sin(phiRadian);
	camera.orientation = camera.orientation.toUnitVector();
	
	camera.orientation2d = $V([camera.orientation.elements[0], camera.orientation.elements[1], 0.0]);
	var lateral = camera.up.cross(camera.orientation2d).toUnitVector();
	
	if(keyState[controls.run]){
		speed = 1.5;
	}else{
		speed = 1.0;
	}
	
	
	if(keyState[controls.forward]){
		camera.eye = camera.eye.add(camera.orientation2d.x((speed * 0.01) * delta));
	}
	
	if(keyState[controls.backward]){
		camera.eye = camera.eye.subtract(camera.orientation2d.x((speed * 0.01) * delta));
	}
	
	if(keyState[controls.strafeLeft]){
		camera.eye = camera.eye.add(lateral.x((speed * 0.01) * delta));
	}
	
	if(keyState[controls.strafeRight]){
		camera.eye = camera.eye.subtract(lateral.x((speed * 0.01) * delta));
	}
	
	camera.center = camera.eye.add(camera.orientation);
}

function loop(){
	calcDelta();
	
	if(canvas.width != settings.resolution.width){
		canvas.width = settings.resolution.width;
	}
	if(canvas.height != settings.resolution.height){
		canvas.height = settings.resolution.height;
	}
	
	input();
	render();
	
	// Animation
	window.requestAnimationFrame(loop);
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	projection = makePerspective(settings.fov, settings.ratio, 0.1, 1000.0);
	
	model = identity();
	
	view = makeLookAt(	camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2],
						camera.center.elements[0], camera.center.elements[1], camera.center.elements[2],
						camera.up.elements[0], camera.up.elements[1], camera.up.elements[2]);
	
	for(var i = 0; i < world.length; i++){
		var mesh = world[i].mesh;
		
		var modelMatrixSave = model;
			model = model.x(mesh.transform);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
			gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
			gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
			gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
			setUniforms();
			gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);
		model = modelMatrixSave;
	}
}
