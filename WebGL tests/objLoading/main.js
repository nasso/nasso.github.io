var canvas = null;
var gl = null;
var keyState = [];
var fullscreen = false;

var lightDirection = $V([-0.6, -0.4, -1.0]);

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

function rgbFloat(r, g, b){
	return [r / 255, g / 255, b / 255];
}

function rgbaFloat(r, g, b, a){
	return [r / 255, g / 255, b / 255, a / 255];
}

function identity() {
	return Matrix.I(4);
}

function translate(a, v) {
	if(a == null){
		a = identity();
	}
	
	return a.x(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function rotate(a, angle, v) {
	if(a == null){
		a = identity();
	}
	
	return a.x(Matrix.Rotation(angle * Math.PI / 180, $V([v[0], v[1], v[2]])).ensure4x4());
}

function scale(a, v) {
	if(a == null){
		a = identity();
	}
	
	return a.x(Matrix.Scale($V([v[0], v[1], v[2]])).ensure4x4());
}

function setUniforms() {
	var pvmUniform = gl.getUniformLocation(shaderProgram, "pvm");
	gl.uniformMatrix4fv(pvmUniform, false, new Float32Array(projection.x(view).x(model).flatten()));
	
	var normalMatrix = model.inv();
	normalMatrix = normalMatrix.transpose();
	var nUniform = gl.getUniformLocation(shaderProgram, "normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
	
	var lightUniform = gl.getUniformLocation(shaderProgram, "lightDirection");
	gl.uniform3fv(lightUniform, new Float32Array(lightDirection.elements));
}

function setLightUniforms() {
	var pUniform = gl.getUniformLocation(lightShaderProgram, "projection");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(lightProjection.flatten()));
	
	var mUniform = gl.getUniformLocation(lightShaderProgram, "model");
	gl.uniformMatrix4fv(mUniform, false, new Float32Array(model.flatten()));
	
	var vUniform = gl.getUniformLocation(lightShaderProgram, "view");
	gl.uniformMatrix4fv(vUniform, false, new Float32Array(lightView.flatten()));
}

function createMesh(vertices, colors, normals, indices, material){
	var mesh = [];
	
	mesh.vertices = vertices;
	mesh.colors = colors;
	mesh.normals = normals;
	mesh.indices = indices;
	mesh.size = indices.length;
	mesh.material = material;
	mesh.transform = identity();
	
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

function loadObj(id, color, material){
	if(color.length == 3){
		color = color.concat([1.0]);
	}
	
	var readedVertices = [];
	var readedNormals = [];
	
	var verticesNumber = 0;
	var verticesProt = [];
	var faces = [];
	
	var objSource = $("#"+id)[0].innerHTML;
	var lines = objSource.split("\n");
	
	for(var i = 0; i < lines.length; i++){
		var line = lines[i];
		
		while(line.contains("\t")){
			line = line.replace("\t", "");
		}
		
		var words = line.split(" ");
		
		if(words[0] == "v"){
			readedVertices = readedVertices.concat([parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3])]);
		}else if(words[0] == "vn"){
			readedNormals = readedNormals.concat([parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3])]);
		}else if(words[0] == "f"){
			var verts = [words[1].split("/"), words[2].split("/"), words[3].split("/")];
			
			for(var j = 0; j < verts.length; j++){
				var vertProt = {
					vertIndex: (verts[j][0]-1),
					normIndex: (verts[j][2]-1)
				};
				
				var doublon = false;
				var globalIndex = 0;
				for(var e = 0; e < verticesNumber; e++){
					var currVertProt = verticesProt[e];
					
					if(currVertProt.vertIndex == vertProt.vertIndex && currVertProt.normIndex == vertProt.normIndex){
						doublon = true;
						globalIndex = e;
						break;
					}
					
					globalIndex = e+1;
				}
				
				if(!doublon){
					verticesProt = verticesProt.concat(vertProt);
					verticesNumber++;
				}
				
				faces = faces.concat([globalIndex]);
			}
		}
	}
	
	var vertices = [];
	var normals = [];
	var colors = [];
	
	for(var i = 0; i < verticesNumber; i++){
		var vertIndex = verticesProt[i].vertIndex * 3;
		var normIndex = verticesProt[i].normIndex * 3;
		
		vertices = vertices.concat([
			readedVertices[vertIndex],
			readedVertices[vertIndex+1],
			readedVertices[vertIndex+2]
		]);
		normals = normals.concat([
			readedNormals[normIndex],
			readedNormals[normIndex+1],
			readedNormals[normIndex+2]
		]);
	}
	
	for(var i = 0; i < vertices.length/3; i++){
		colors = colors.concat(color);
	}
	
	return createMesh(vertices, colors, normals, faces, material);
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
	gl.enable(gl.CULL_FACE);
	gl.depthFunc(gl.LEQUAL);
}

function initBuffers(){
	var vertices = [
		-8.0, -8.0, 0.0,
		-8.0, 8.0, 0.0,
		8.0, 8.0, 0.0,
		8.0, -8.0, 0.0
	];
	
	var colors = [
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0
	];
	
	var normals = [
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0
	];
	
	var indices = [
		0, 3, 1,
		3, 2, 1
	];
	
	world[0] = createMesh(vertices, colors, normals, indices, materials.iron);
	
	world[1] = loadObj("suzanneObj", rgbFloat(247, 209, 59), materials.iron);
	world[1].transform = translate(world[1].transform, [0.0, 0.0, 1.0]);
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
	
	gl.useProgram(null);
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
	
	canvas.addEventListener("mousedown", function(e){
		if(e.button == 0){
			canvas.requestPointerLock();
		}
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

var angle = 0.0;

function loop(){
	calcDelta();
	
	if(canvas.width != settings.resolution.width){
		canvas.width = settings.resolution.width;
	}
	if(canvas.height != settings.resolution.height){
		canvas.height = settings.resolution.height;
	}
	
	angle += 0.1 * delta;
	
	if(angle > 360.0){
		angle -= 360.0;
	}else if(angle < 0.0){
		angle += 360.0;
	}
	
	world[1].transform = rotate(null, angle, [0.0, 0.0, 1.0]);
	
	input();
	render();
	
	// Animation
	window.requestAnimationFrame(loop);
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	gl.useProgram(shaderProgram);
	
	projection = makePerspective(settings.fov, settings.ratio, 0.1, 1000.0);
	
	model = identity();
	
	view = makeLookAt(	camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2],
						camera.center.elements[0], camera.center.elements[1], camera.center.elements[2],
						camera.up.elements[0], camera.up.elements[1], camera.up.elements[2]);
	
	for(var i = 0; i < world.length; i++){
		var mesh = world[i];
		
		model = mesh.transform;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
		gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
		gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
		setUniforms();
		gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);
	}
	
	gl.useProgram(null);
}
