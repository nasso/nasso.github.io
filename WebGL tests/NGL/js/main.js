// Fix for cross-browser compatibility
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

// Vars
var ngl;

var scene = null;
var overlayScene = null;

var font = null;

var camera = null;

var materials = {};

var waterPosCosAngle = 0;

var settings = {
	rotationSpeed: 45,
	movementSpeed: 4,
	
	useVSYNC: true
};

// Functions
function gameLoop(){
	// Calculate delta
	ngl.loop();
	
	var events = ngl.getEventPool();
	
	for(var i = 0; i < events.keyboard.length; i++){
		var e = events.keyboard[i];
		
		if(e.key === NGL.keyCodes.t && e.type === "up"){
			scene.objects.terrain.wire = !scene.objects.terrain.wire;
		}
		if(e.key === NGL.keyCodes.v && e.type === "up"){
			settings.useVSYNC = !settings.useVSYNC;
		}
	}
	
	if(overlayScene.objects.infos){
		var infos = "";
		infos += ngl.fps+" FPS\n";
		infos += "VSYNC: "+(settings.useVSYNC ? "true" : "false") + "\n";
		
		overlayScene.objects.infos.setText(infos);
		
		if(ngl.fps > 60){
			overlayScene.objects.infos.color = NGL.color(1, 1, 0, 1);
		}else if(ngl.fps > 30){
			overlayScene.objects.infos.color = NGL.color(1, 0, 1, 0);
		}else if(ngl.fps > 20){
			overlayScene.objects.infos.color = NGL.color(1, 1, 1, 0);
		}else{
			overlayScene.objects.infos.color = NGL.color(1, 1, 0, 0);
		}
	}
	
	// Make the water waves !
	waterPosCosAngle += 1 * ngl.delta;
	var waterPosCos = Math.cos(waterPosCosAngle);
	var cosClamped = (waterPosCos + 2) / 2;
	scene.objects.waterPlan.position.z = (cosClamped * 0.5) - 6;
	
	// Render
	ngl.render();
	
	// Animation frame
	if(settings.useVSYNC){
		window.requestAnimationFrame(gameLoop);
	}else{
		setTimeout(gameLoop, 0);
	}
}

function init(){
	// Set the fullscreen key. Enter fullscreen when pressed
	ngl.fullscreenKey = NGL.keyCodes.f11;
	
	scene = ngl.createScene();
	ngl.addScene(scene);
	
	scene.skybox.color = NGL.color(1, 0.7, 0.84, 1.0);
	
	overlayScene = ngl.createScene(false);
	ngl.addScene(overlayScene, 0);
	
	overlayScene.activeCamera = ngl.create2DCamera();
	
	ngl.loadFont("res/fonts/candara.fnt", function(fnt){
		font = fnt;
		overlayScene.addObject(ngl.createTextObject({
			text: "0 FPS",
			font: font,
			color: NGL.color(),
			x: 10,
			y: ngl.canvas.height - 2,
			extraCharSpace: -20,
			extraLineSpace: -40,
			size: 0.3
		}), "infos");
	});
	
	materials.grass = ngl.createMaterial();
	materials.grass.color = NGL.color(255, 143, 201, 96);
	materials.grass.shiness = 1;
	materials.grass.hardness = 16;
	
	scene.addObject(ngl.createTerrain({
		color: NGL.color("#483223")
	}), "terrain");
	scene.objects.terrain.backface = true;
	
	NGL.loadImage("res/heightmap.png", function(img){
		scene.objects.terrain.heightmap = ngl.loadHeightmap(img);
		
		// Need to regenerate the terrain
		scene.objects.terrain.generate();
	});
	scene.addObject(ngl.createTerrain({
		color: NGL.color(255, 118, 197, 255, 50)
	}), "waterPlan");
	scene.objects.waterPlan.backface = true;
	scene.objects.waterPlan.position.z = -4;
	
	// Set the sun direction.
	scene.sunDir.x = 1;
	scene.sunDir.y = 1;
	scene.sunDir.z = -0.5;

	camera = ngl.createFPSCamera();
	camera.forward = NGL.keyCodes.z;
	camera.strafeLeft = NGL.keyCodes.q;
	camera.mouseSensitivity = 0.2;
	camera.canFly = true;

	scene.activeCamera = camera;
	
	var origin = ngl.createDebugObject(1);
	scene.addObject(origin, "origin");

	// Load a mesh and add it when his loading is finished
	

	// Start game loop
	gameLoop();
}

function start(){
	ngl = new NGL($("#canvas")[0]);
	
	ngl.onready = init;
	
	ngl.init();
}
