/*

Things to know:

• Transformation:
	- First Scale if needed
	- Then set the direction (rotate)
	- Then set the position (translate)
	Or you'll get problems... with... logic and... you'll... rage quit and... JUST DO IT !

*/

var canvas = null;
var gl = null;
var keyState = [];
var fullscreen = false;

var lightFrameBuffer;
var lightDepthTexture;
var lightColorTexture;

var shaderProgram;
var lightShaderProgram;
var HUDShaderProgram;
var waterShaderProgram;

var attributes = [];
var uniforms = [];

var aspectRatio;

var lightProjection = null;
var lightView = null;

var pvm;
var projection = null;
var model = null;
var view = null;

var settings = {
	// PROJECTION
	fov: 70.0,
	resolution: {width: 1280, height: 720},
	ratio: 16/9,
	
	// SHADOW
	shadowMapSize: 4096,
	
	// WATER
	waterLevel: -0.4,
	waterColor: [0.2, 0.3, 0.6, 0.6]
};

var zqsdRadio;
var wasdRadio;
var resolRadios = [];

var currentControls = "wasd";
var controls;

var world = [];
var water = [];
var hud = [];

var showHUD = false;

var lightDirection = $V([-0.6, -0.4, -1.0]).toUnitVector();
var lightCenterLookAt = lightDirection;

var oldMouseCoordsDirty = false;
var relMouseCoords = {x: 0, y: 0};
var mouseCoords = {x: null, y: null};
var lastMouseCoords = {x: null, y: null};
var phi = 0;
var theta = 0;
var camera = [];
var speed = 1.0;

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
		
	String.prototype.contains = function(it){
		return this.indexOf(it) != -1
	};
}

// UTILS
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

function createProgram(vertexShaderID, fragmentShaderID){
	var vertexShader = getShader(vertexShaderID);
	var fragmentShader = getShader(fragmentShaderID);
	
	var program;
	
	program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		alert("Shader creation failed !");
	}
	
	program.attributes = [];
	program.uniforms = [];
	
	return program;
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

function translate(a, x, y, z) {
	if(a == null){
		a = identity();
	}
	
	x = x || 0.0;
	y = y || 0.0;
	z = z || 0.0;
	
	if(x == 0.0 && y == 0.0 && z == 0.0){
		return a;
	}
	
	return Matrix.Translation($V([x, y, z])).ensure4x4().x(a);
}

function rotate(a, angle, x, y, z) {
	if(a == null){
		a = identity();
	}
	
	angle = angle || 0.0;
	x = x || 0.0;
	y = y || 0.0;
	z = z || 0.0;
	
	if(angle == 0.0 || (x == 0.0 && y == 0.0 && z == 0.0)){
		return a;
	}
	
	return Matrix.Rotation(angle * Math.PI / 180, $V([x, y, z])).ensure4x4().x(a);
}

function scale(a, x, y, z) {
	if(a == null){
		a = identity();
	}
	
	x = x || 0.0;
	y = y || 0.0;
	z = z || 0.0;
	
	if(x == 0.0 && y == 0.0 && z == 0.0){
		return a;
	}
	
	return $M([
			[x, 0, 0, 0],
			[0, y, 0, 0],
			[0, 0, z, 0],
			[0, 0, 0, 1]
		]).ensure4x4().x(a);
}

// OBJECTS

/* class HUDComponent */ {
	function HUDComponent(startX, startY, width, height){
		this.vertices = [
			startX, startY, // Bottom left
			startX + width, startY, // Bottom right
			startX + width, startY + height, // Top right
			startX, startY + height // Top left
		];
		
		this.textureCoord = [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0
		];
		
		this.indices = [
			0, 1, 3, 2
		];
		
		this.verticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		
		this.textureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoord), gl.STATIC_DRAW);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		
		this.texture = null;
		
		return this;
	}
}

/* class Mesh */ {
	function Mesh(vertices, colors, normals, indices){
		this.vertices = vertices;
		this.colors = colors;
		this.normals = normals;
		this.indices = indices;
		this.size = indices.length;
		this.transform = identity();
		
		this.verticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		
		this.colorsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
		
		this.normalsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}

	Mesh.prototype.identity = function(){
		this.transform = Matrix.I(4);
	};

	Mesh.prototype.translate = function(x, y, z){
		x = x || 0.0;
		y = y || 0.0;
		z = z || 0.0;
		
		if(x == 0.0 && y == 0.0 && z == 0.0){
			return;
		}
		
		this.transform = Matrix.Translation($V([x, y, z])).ensure4x4().x(this.transform);
	};

	Mesh.prototype.rotate = function(angle, x, y, z){
		angle = angle || 0.0;
		x = x || 0.0;
		y = y || 0.0;
		z = z || 0.0;
		
		if(angle == 0.0 || (x == 0.0 && y == 0.0 && z == 0.0)){
			return;
		}
		
		this.transform = Matrix.Rotation(angle * Math.PI / 180, $V([x, y, z])).ensure4x4().x(this.transform);
	};

	Mesh.prototype.scale = function(x, y, z){
		x = x || 0.0;
		y = y || 0.0;
		z = z || 0.0;
		
		if(x == 0.0 && y == 0.0 && z == 0.0){
			return;
		}
		
		this.transform = $M([
				[x, 0, 0, 0],
				[0, y, 0, 0],
				[0, 0, z, 0],
				[0, 0, 0, 1]
			]).ensure4x4().x(this.transform);
	};
}

// INIT
function initCanvas(){
	var error = false;
	canvas = $("#canvas")[0];
	
	if(!canvas){
		alert("Error while getting the <canvas> element.");
		error = true;
	}else{
		gl = canvas.getContext("webgl", {stencil:true}) || canvas.getContext("experimental-webgl", {stencil:true});
		
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

function start(){
	initCanvas();
	fixCompatibility();
	
	init();
	loop();
	
	// Animation
	window.requestAnimationFrame(loop);
}

function init(){
	camera.eye = $V([0.0, 1.0, 1.8]);
	
	camera.orientation = $V([0.0, 1.0, 0.0]);
	
	camera.center = camera.eye.add(camera.orientation);

	camera.up = $V([0.0, 0.0, 1.0]);
	
	// Extension
	gl.getExtension("WEBGL_depth_texture");
	
	initControls();
	initShaders();
	initBuffers();
	initWater();
	initWorld();
	initListeners();
	
	//GL
	gl.clearColor(0.63921568627451, 0.819607843137255, 0.96078431372549, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.depthFunc(gl.LEQUAL);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function initControls(){
	controls = JSON.parse($("#controls")[0].innerHTML);
}

function initBuffers(){
	// Shadow mapping
	
	// Color Texture
	lightColorTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, lightColorTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, settings.shadowMapSize, settings.shadowMapSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
	// Depth Texture
	lightDepthTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, lightDepthTexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, settings.shadowMapSize, settings.shadowMapSize, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	// Framebuffer
	lightFrameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, lightFrameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lightColorTexture, 0);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, lightDepthTexture, 0);
	
	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function initShaders(){
	waterShaderProgram = createProgram("water-shader-vs", "water-shader-fs");
	
	gl.useProgram(waterShaderProgram);
		// Attributes
		waterShaderProgram.attributes.vertexPosition = gl.getAttribLocation(waterShaderProgram, "vertexPos");
		
		// Uniforms
		waterShaderProgram.uniforms.waterLevel = gl.getUniformLocation(waterShaderProgram, "waterLevel");
		waterShaderProgram.uniforms.waterColor = gl.getUniformLocation(waterShaderProgram, "waterColor");
		waterShaderProgram.uniforms.pvm = gl.getUniformLocation(waterShaderProgram, "pvm");
	gl.useProgram(null);
	
	HUDShaderProgram = createProgram("hud-shader-vs", "hud-shader-fs");
	
	gl.useProgram(HUDShaderProgram);
		// Attributes
		HUDShaderProgram.attributes.vertexPosition = gl.getAttribLocation(HUDShaderProgram, "vertexPos");
		HUDShaderProgram.attributes.vertexTextureCoordinate = gl.getAttribLocation(HUDShaderProgram, "textureCoord");
		
		// Uniforms
		HUDShaderProgram.uniforms.uSampler = gl.getUniformLocation(HUDShaderProgram, "uSampler");
	gl.useProgram(null);
	
	lightShaderProgram = createProgram("light-shader-vs", "light-shader-fs");
	
	gl.useProgram(lightShaderProgram);
		// Attributes
		lightShaderProgram.attributes.vertexPosition = gl.getAttribLocation(lightShaderProgram, "vertexPos");
		
		// Uniforms
		lightShaderProgram.uniforms.pvm = gl.getUniformLocation(lightShaderProgram, "pvm");
	gl.useProgram(null);
	
	shaderProgram = createProgram("shader-vs", "shader-fs");
	
	gl.useProgram(shaderProgram);
		// Attributes
		shaderProgram.attributes.vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPos");
		shaderProgram.attributes.vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
		shaderProgram.attributes.vertexNormal = gl.getAttribLocation(shaderProgram, "vertexNormal");
		
		// Uniforms
		shaderProgram.uniforms.lightBiasPVM = gl.getUniformLocation(shaderProgram, "lightBiasPVM");
		shaderProgram.uniforms.pvm = gl.getUniformLocation(shaderProgram, "pvm");
		shaderProgram.uniforms.normalMatrix = gl.getUniformLocation(shaderProgram, "normalMatrix");
		shaderProgram.uniforms.lightDirection = gl.getUniformLocation(shaderProgram, "lightDirection");
		
		shaderProgram.uniforms.lightDepthTexture = gl.getUniformLocation(shaderProgram, "lightDepthTexture");
		
		shaderProgram.uniforms.overrideColor = gl.getUniformLocation(shaderProgram, "overrideColor");
	gl.useProgram(null);
}

function initWater(){
	water.vertices = [
		-500.0, -500.0,
		+500.0, -500.0,
		+500.0, +500.0,
		-500.0, +500.0
	];
	
	water.indices = [
		0, 1, 3, 2
	];
	
	water.verticesBuffer = gl.createBuffer();
	water.indicesBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, water.verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(water.vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, water.indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(water.indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function initWorld(){
	// Objects of the world
	world[0] = loadObj("groundObj", rgbFloat(163, 214, 81));
	world[1] = loadObj("suzanneObj", rgbFloat(247, 209, 59));
	world[2] = loadObj("sphereObj", rgbFloat(124, 95, 27));
	
	// Positions of objects
	world[0].identity();
	
	world[1].identity();
	world[1].scale(0.8, 0.8, 0.8);
	world[1].translate(0.0, -16.0, 2.0);
	
	world[2].identity();
	world[2].scale(0.8, 0.8, 0.8);
	world[2].translate(0.0, 2.0, 1.0);
	
	// HUD
	hud[0] = new HUDComponent(-1.0, -1.0, 512.0 / canvas.width, 512.0 / canvas.height);
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
	
	wasdRadio = $("#wasdRadio")[0];
	zqsdRadio = $("#zqsdRadio")[0];
	
	resolRadios["1280x720"] = $("#1280x720")[0];
	resolRadios["1920x1080"] = $("#1920x1080")[0];
	resolRadios["1280x800"] = $("#1280x800")[0];
	resolRadios["1920x1200"] = $("#1920x1200")[0];
	
	generateChange = function(callback, radio){
		radio.onchange = function(){
			if(radio.checked){
				callback();
			}
		};
	};
	
	generateChange(function(){
		currentControls = "wasd";
	}, wasdRadio);
	
	generateChange(function(){
		currentControls = "zqsd";
	}, zqsdRadio);
	
	generateChange(function(){
		settings.resolution.width = 1280;
		settings.resolution.height = 720;
		settings.ratio = 16/9;
	}, resolRadios["1280x720"]);
	
	generateChange(function(){
		settings.resolution.width = 1920;
		settings.resolution.height = 1080;
		settings.ratio = 16/9;
	}, resolRadios["1920x1080"]);
	
	generateChange(function(){
		settings.resolution.width = 1280;
		settings.resolution.height = 800;
		settings.ratio = 16/10;
	}, resolRadios["1280x800"]);
	
	generateChange(function(){
		settings.resolution.width = 1920;
		settings.resolution.height = 1200;
		settings.ratio = 16/10;
	}, resolRadios["1920x1200"]);
}

// RENDER STUFF
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
	
	if(keycode == controls[currentControls].toggleHUD){
		showHUD = !showHUD;
	}
}

function calcDelta(){
	var now = Date.now();
	delta = (now - lastUpdate) / 1000;
	lastUpdate = now;
}

function input(){
	phi += -relMouseCoords.y * controls[currentControls].mouseSensitivity;
	theta += -relMouseCoords.x * controls[currentControls].mouseSensitivity;
	
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
	
	if(keyState[controls[currentControls].run]){
		speed = 2.0;
	}else{
		speed = 1.0;
	}
	
	if(keyState[controls[currentControls].forward]){
		camera.eye = camera.eye.add(camera.orientation2d.x((speed * 5.0) * delta));
	}
	
	if(keyState[controls[currentControls].backward]){
		camera.eye = camera.eye.subtract(camera.orientation2d.x((speed * 5.0) * delta));
	}
	
	if(keyState[controls[currentControls].strafeLeft]){
		camera.eye = camera.eye.add(lateral.x((speed * 5.0) * delta));
	}
	
	if(keyState[controls[currentControls].strafeRight]){
		camera.eye = camera.eye.subtract(lateral.x((speed * 5.0) * delta));
	}
	
	camera.center = camera.eye.add(camera.orientation);
}

function setUniforms() {
	gl.uniformMatrix4fv(shaderProgram.uniforms.pvm, false, new Float32Array(projection.x(view).x(model).flatten()));
	
	var lightBias = $M([
		[0.5, 0.0, 0.0, 0.5],
		[0.0, 0.5, 0.0, 0.5],
		[0.0, 0.0, 0.5, 0.5],
		[0.0, 0.0, 0.0, 1.0]
	]);
	gl.uniformMatrix4fv(shaderProgram.uniforms.lightBiasPVM, false, new Float32Array(lightBias.x(lightProjection.x(lightView).x(model)).flatten()));
	
	var normalMatrix = model.inv();
	normalMatrix = normalMatrix.transpose();
	gl.uniformMatrix4fv(shaderProgram.uniforms.normalMatrix, false, new Float32Array(normalMatrix.flatten()));
	
	gl.uniform3fv(shaderProgram.uniforms.lightDirection, new Float32Array(lightDirection.elements));
}

function setLightUniforms(){
	gl.uniformMatrix4fv(lightShaderProgram.uniforms.pvm, false, new Float32Array(lightProjection.x(lightView).x(model).flatten()));
}

function loadObj(id, color, body){
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
	
	return new Mesh(vertices, colors, normals, faces, body);
}

function updateHUD(){
	hud[0].texture = lightDepthTexture;
}

function loop(){
	if(canvas.width != settings.resolution.width){
		canvas.width = settings.resolution.width;
	}
	if(canvas.height != settings.resolution.height){
		canvas.height = settings.resolution.height;
	}
	
	calcDelta();
	
	input();
	render();
	
	// Animation
	window.requestAnimationFrame(loop);
}

function renderWater(){
	gl.useProgram(waterShaderProgram);
		gl.enableVertexAttribArray(waterShaderProgram.attributes.vertexPosition);
		
		model = translate(null, camera.eye.elements[0], camera.eye.elements[0], 0.0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, water.verticesBuffer);
		gl.vertexAttribPointer(waterShaderProgram.attributes.vertexPosition, 2, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, water.indicesBuffer);
		
		gl.uniformMatrix4fv(waterShaderProgram.uniforms.pvm, false, projection.x(view).x(model).flatten());
		gl.uniform4fv(waterShaderProgram.uniforms.waterColor, new Float32Array(settings.waterColor));
		
		gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);
		
		gl.disableVertexAttribArray(waterShaderProgram.attributes.vertexPosition);
	gl.useProgram(null);
}

function render(){
	// SHADOW MAP RENDER
	lightProjection = makeOrtho(-16.0, 16.0, -16.0, 16.0, -16.0, 16.0);
	
	lightCenterLookAt = $V([camera.eye.elements[0], camera.eye.elements[1], 0.0]).add(lightDirection);
	lightView = makeLookAt(	camera.eye.elements[0], camera.eye.elements[1], 0.0,
							lightCenterLookAt.elements[0], lightCenterLookAt.elements[1], lightCenterLookAt.elements[2],
							0.0, 0.0, 1.0);
	
	gl.viewport(0, 0, settings.shadowMapSize, settings.shadowMapSize);
	gl.bindFramebuffer(gl.FRAMEBUFFER, lightFrameBuffer);
	gl.colorMask(false, false, false, false);
	gl.clear(gl.DEPTH_BUFFER_BIT);
	
	gl.useProgram(lightShaderProgram);
		gl.enableVertexAttribArray(lightShaderProgram.attributes.vertexPosition);
		
		for(var i = 0; i < world.length; i++){
			var mesh = world[i];
			
			model = translate(mesh.transform, 0.0, 0.0, -settings.waterLevel);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
			gl.vertexAttribPointer(lightShaderProgram.attributes.vertexPosition, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
			setLightUniforms();
			gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);
		}
		
		gl.disableVertexAttribArray(lightShaderProgram.attributes.vertexPosition);
	gl.useProgram(null);
	
	gl.colorMask(true, true, true, true);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	// CLASSIC RENDER
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	projection = makePerspective(settings.fov, settings.ratio, 0.1, 1000.0);
	
	view = makeLookAt(	camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2]+settings.waterLevel,
						camera.center.elements[0], camera.center.elements[1], camera.center.elements[2]+settings.waterLevel,
						camera.up.elements[0], camera.up.elements[1], camera.up.elements[2]);
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.useProgram(shaderProgram);
		gl.enableVertexAttribArray(shaderProgram.attributes.vertexPosition);
		gl.enableVertexAttribArray(shaderProgram.attributes.vertexColor);
		gl.enableVertexAttribArray(shaderProgram.attributes.vertexNormal);
		
		for(var i = 0; i < world.length; i++){
			var mesh = world[i];
			
			model = translate(mesh.transform, 0.0, 0.0, -settings.waterLevel);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.verticesBuffer);
			gl.vertexAttribPointer(shaderProgram.attributes.vertexPosition, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorsBuffer);
			gl.vertexAttribPointer(shaderProgram.attributes.vertexColor, 4, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalsBuffer);
			gl.vertexAttribPointer(shaderProgram.attributes.vertexNormal, 3, gl.FLOAT, false, 0, 0);
			
			gl.activeTexture(gl.TEXTURE0)
			gl.bindTexture(gl.TEXTURE_2D, lightDepthTexture);
			gl.uniform1i(shaderProgram.uniforms.lightDepthTexture, 0);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indicesBuffer);
			setUniforms();
			gl.uniform4fv(shaderProgram.uniforms.overrideColor, new Float32Array([0.0, 0.0, 0.0, 0.0]));
			gl.drawElements(gl.TRIANGLES, mesh.size, gl.UNSIGNED_SHORT, 0);
		}
		
		gl.disableVertexAttribArray(shaderProgram.attributes.vertexNormal);
		gl.disableVertexAttribArray(shaderProgram.attributes.vertexColor);
		gl.disableVertexAttribArray(shaderProgram.attributes.vertexPosition);
	gl.useProgram(null);
	
	// WATER RENDER
	gl.enable(gl.BLEND);
	
	renderWater();
	
	// HUD RENDER
	if(showHUD){
		updateHUD();
		
		gl.disable(gl.DEPTH_TEST);
		
		gl.useProgram(HUDShaderProgram);
			gl.enableVertexAttribArray(HUDShaderProgram.attributes.vertexPosition);
			gl.enableVertexAttribArray(HUDShaderProgram.attributes.vertexTextureCoordinate);
			
			for(var i = 0; i < hud.length; i++){
				var hudel = hud[i];
				
				gl.bindBuffer(gl.ARRAY_BUFFER, hudel.verticesBuffer);
				gl.vertexAttribPointer(HUDShaderProgram.attributes.vertexPosition, 2, gl.FLOAT, false, 0, 0);
				
				gl.bindBuffer(gl.ARRAY_BUFFER, hudel.textureCoordBuffer);
				gl.vertexAttribPointer(HUDShaderProgram.attributes.vertexTextureCoordinate, 2, gl.FLOAT, false, 0, 0);
				
				gl.activeTexture(gl.TEXTURE0)
				gl.bindTexture(gl.TEXTURE_2D, hudel.texture);
				gl.uniform1i(HUDShaderProgram.uniforms.uSampler, 0);
				
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, hudel.indicesBuffer);
				gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);
			}
			
			gl.disableVertexAttribArray(HUDShaderProgram.attributes.vertexTextureCoordinate);
			gl.disableVertexAttribArray(HUDShaderProgram.attributes.vertexPosition);
		gl.useProgram(null);
		
		gl.enable(gl.DEPTH_TEST);
	}
	
	gl.disable(gl.BLEND);
}
