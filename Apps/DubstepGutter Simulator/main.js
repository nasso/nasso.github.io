var barsCount = 256;
var maxBarsHeight = 128;
var circleRadius = 64;

var rightDataLength = 64;
var leftDataLength = 64;
var lowDataLength = 64;

var settings = [];
var masterGain;
var splitter;
var lowFilter;

var canvas;
var gtx;
var context;

var leftAnalyser;
var rightAnalyser;
var lowAnalyser;

var leftData;
var rightData;
var lowData;

// Song
var songSource;

// Images
var dsg;
var picture;

// Settings
var volumeInput;
var imageShaking = 8;
var bassMovementPower = 0.8;

// Compatibility cross-browser
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

// FUNCTIONS
function initAudioContext(){
	try{
		context = new (window.AudioContext || window.webkitAudioContext)();
	}catch(e){
		alert("Your browser is not compatible :(");
		throw new Error("The browser is not compatible");
	}
	
	lowAnalyser = context.createAnalyser();
	lowAnalyser.fftSize = barsCount;
	lowAnalyser.minDecibels = -45;
	lowAnalyser.maxDecibels = -16;
	lowAnalyser.smoothingTimeConstant = 0.9;
	
	lowFilter = context.createBiquadFilter();
	lowFilter.type = "lowpass";
	lowFilter.frequency.value = 80;
	lowFilter.connect(lowAnalyser);
	
	splitter = context.createChannelSplitter(2);
	
	masterGain = context.createGain();
	masterGain.gain.value = 0.8;
	masterGain.connect(context.destination);
	
	// LEFT ANALYSER
	leftAnalyser = context.createAnalyser();
	leftAnalyser.fftSize = barsCount;
	leftAnalyser.minDecibels = -45;
	leftAnalyser.maxDecibels = -16;
	leftAnalyser.smoothingTimeConstant = 0.8;
	
	splitter.connect(leftAnalyser, 0);
	
	// RIGHT ANALYSER
	rightAnalyser = context.createAnalyser();
	rightAnalyser.fftSize = barsCount;
	rightAnalyser.minDecibels = -45;
	rightAnalyser.maxDecibels = -16;
	rightAnalyser.smoothingTimeConstant = 0.8;
	
	splitter.connect(rightAnalyser, 1);
	
	leftData = new Uint8Array(leftAnalyser.frequencyBinCount / 2);
	rightData = new Uint8Array(rightAnalyser.frequencyBinCount / 2);
	lowData = new Uint8Array(lowAnalyser.frequencyBinCount / 2);
	rightDataLength = rightData.length;
	leftDataLength = leftData.length;
	lowDataLength = lowData.length;
}

function initCanvas(){
	canvas = $("#canvas")[0];
	
	if(!canvas){
		alert("Can't get the canvas element !");
		throw new Error("Error while getting the canvas element");
	}
	
	gtx = canvas.getContext("2d");
	
	if(!gtx){
		alert("Can't get the canvas graphics context !");
		throw new Error("Error while getting the canvas element");
	}
	
	gtx.lineWidth = 8;
	gtx.shadowColor = "#ecf0f1";
	
	// Images
	dsg = $("#dsg")[0];
}

function visualize(){
	leftAnalyser.getByteFrequencyData(leftData);
	rightAnalyser.getByteFrequencyData(rightData);
	lowAnalyser.getByteFrequencyData(lowData);
	
	var lowHigher = 0;
	
	for(var i = 0; i < lowDataLength; i++){
		if(lowHigher < lowData[i]){
			lowHigher = lowData[i];
		}
	}
	
	var normHigher = Math.pow(lowHigher / 255, 3);
	
	var factor = normHigher * bassMovementPower - bassMovementPower/2;
	var radius = circleRadius + circleRadius * factor;
	gtx.shadowBlur = 2 + (normHigher * 6);
	gtx.lineWidth = 4 + (normHigher * 6);
	var barsHeight = maxBarsHeight + maxBarsHeight * factor;
	
	gtx.clearRect(0, 0, canvas.width, canvas.height);
	
	if(picture){
		var xShake = (Math.random()-0.5) * (normHigher * imageShaking);
		var yShake = (Math.random()-0.5) * (normHigher * imageShaking);
		
		var width = picture.width;
		var height = picture.height;
		var ratio = width/height;
		
		if(width > height){
			width = canvas.width + imageShaking;
			height = width/ratio;
		}else{
			height = canvas.height + imageShaking;
			width = height * ratio;
		}
		
		var x = (canvas.width/2 - width/2) + xShake;
		var y = (canvas.height/2 - height/2) + yShake;
		
		gtx.drawImage(picture, x, y, width, height);
	}
	
	gtx.beginPath();
		for(var i = 0; i < leftDataLength; i++){
			var normData = Math.pow(leftData[i] / 255, 2);
			var height = normData * barsHeight;
			height = Math.max(height, 2);
			
			gtx.moveTo(canvas.width/2, canvas.height/2);
			
			var angle = i/leftDataLength * Math.PI;
			var x = Math.cos(angle) * (radius + height);
			var y = Math.sin(angle) * (radius + height);
			
			gtx.lineTo(canvas.width/2 + x, canvas.height/2 + y);
		}
		
		for(var i = 0; i < rightDataLength; i++){
			var normData = Math.pow(rightData[i] / 255, 2);
			var height = normData * barsHeight;
			height = Math.max(height, 2);
			
			gtx.moveTo(canvas.width/2, canvas.height/2);
			
			var angle = i/rightDataLength * Math.PI + Math.PI;
			var x = Math.cos(angle) * (radius + height);
			var y = Math.sin(angle) * (radius + height);
			
			gtx.lineTo(canvas.width/2 + x, canvas.height/2 + y);
		}
		
		gtx.strokeStyle = "#ecf0f1";
		gtx.stroke();
	gtx.closePath();
	
	gtx.drawImage(dsg, canvas.width/2 - radius, canvas.height/2 - radius, radius*2, radius*2);
	
	// CALL IT NEXT FRAME
	window.requestAnimationFrame(visualize);
}

function stopSong(bufferSource){
	bufferSource.disconnect(lowFilter);
	bufferSource.disconnect(splitter);
	bufferSource.disconnect(context.destination);
	bufferSource.stop();
}

function startSong(buffer){
	if(songSource){
		stopSong(songSource);
	}
	
	songSource = context.createBufferSource();
	songSource.buffer = buffer;
	songSource.connect(lowFilter);
	songSource.connect(splitter);
	songSource.connect(masterGain);
	songSource.start(0);
	
	songSource.addEventListener("ended", function(){
		stopSong(this);
	});
}

function initInput(){
	canvas.addEventListener("dragover", function(e){
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}, false);
	
	canvas.addEventListener("drop", function(e){
		e.stopPropagation();
		e.preventDefault();
		
		var file = e.dataTransfer.files[0];
		
		if(file.type.match("image.*")){
			var reader = new FileReader();
			
			reader.addEventListener("load", function(e){
				picture = new Image();
				picture.src = e.target.result;
			});
			
			reader.readAsDataURL(file);
		}else{
			var reader = new FileReader();
			
			reader.addEventListener("load", function(e){
				context.decodeAudioData(e.target.result, function(buffer){
					startSong(buffer);
				});
			});
			
			reader.readAsArrayBuffer(file);
		}
	}, false);
	
	volumeInput = $("#volume")[0];
	
	volumeInput.addEventListener("change", function(){
		masterGain.gain.value = (this.value + this.min) / (this.max + this.min);
	});
	
	volumeInput.addEventListener("input", function(){
		masterGain.gain.value = (this.value + this.min) / (this.max + this.min);
	});
	
	masterGain.gain.value = (volumeInput.value + volumeInput.min) / (volumeInput.max + volumeInput.min);
}

function start(){
	initAudioContext();
	initCanvas();
	initInput();
	
	visualize();
}
