var barsCount = 128;
var maxBarsHeight = 256;
var circleRadius = 128;

var rightDataLength = 64;
var leftDataLength = 64;

var settings = [];
var masterGain;
var splitter;

var canvas;
var gtx;
var context;

var leftAnalyser;
var rightAnalyser;

var leftData;
var rightData;

// Song
var songSource;

// Images
var dsg;

// Settings
var volumeInput;

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
	
	splitter = context.createChannelSplitter(2);
	
	masterGain = context.createGain();
	masterGain.gain.value = 0.3;
	masterGain.connect(context.destination);
	
	// LEFT ANALYSER
	leftAnalyser = context.createAnalyser();
	leftAnalyser.fftSize = barsCount;
	
	leftAnalyser.minDecibels = -49;
	leftAnalyser.maxDecibels = -10;
	leftAnalyser.smoothingTimeConstant = 0.86;
	splitter.connect(leftAnalyser, 0);
	
	// RIGHT ANALYSER
	rightAnalyser = context.createAnalyser();
	rightAnalyser.fftSize = barsCount;
	
	rightAnalyser.minDecibels = -49;
	rightAnalyser.maxDecibels = -10;
	rightAnalyser.smoothingTimeConstant = 0.86;
	splitter.connect(rightAnalyser, 1);
	
	leftData = new Uint8Array(leftAnalyser.frequencyBinCount);
	rightData = new Uint8Array(rightAnalyser.frequencyBinCount);
	rightDataLength = rightData.length;
	leftDataLength = leftData.length;
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
	
	gtx.shadowBlur = 6;
	gtx.lineWidth = 8;
	gtx.shadowColor = "#ecf0f1";
	
	// Images
	dsg = $("#dsg")[0];
}

function visualize(){
	leftAnalyser.getByteFrequencyData(leftData);
	rightAnalyser.getByteFrequencyData(rightData);
	
	gtx.clearRect(0, 0, canvas.width, canvas.height);
	
	gtx.beginPath();
		for(var i = 0; i < leftDataLength; i++){
			var normData = Math.pow(leftData[i] / 255, 2);
			var height = normData * maxBarsHeight;
			height = Math.max(height, 2);
			
			gtx.moveTo(canvas.width/2, canvas.height/2);
			
			var angle = i/leftDataLength * Math.PI;
			var x = Math.cos(angle) * (circleRadius + height);
			var y = Math.sin(angle) * (circleRadius + height);
			
			gtx.lineTo(canvas.width/2 + x, canvas.height/2 + y);
		}
		
		for(var i = 0; i < rightDataLength; i++){
			var normData = Math.pow(rightData[i] / 255, 2);
			var height = normData * maxBarsHeight;
			height = Math.max(height, 2);
			
			gtx.moveTo(canvas.width/2, canvas.height/2);
			
			var angle = i/rightDataLength * Math.PI + Math.PI;
			var x = Math.cos(angle) * (circleRadius + height);
			var y = Math.sin(angle) * (circleRadius + height);
			
			gtx.lineTo(canvas.width/2 + x, canvas.height/2 + y);
		}
		
		gtx.strokeStyle = "#ecf0f1";
		gtx.stroke();
	gtx.closePath();
	
	gtx.drawImage(dsg, canvas.width/2 - circleRadius, canvas.height/2 - circleRadius, circleRadius*2, circleRadius*2);
	
	// CALL IT NEXT FRAME
	window.requestAnimationFrame(visualize);
}

function stopSong(bufferSource){
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
		
		var soundFile = e.dataTransfer.files[0];
		
		var reader = new FileReader();
			
		reader.addEventListener("load", function(e){
			context.decodeAudioData(e.target.result, function(buffer){
				startSong(buffer);
			});
		});
		
		reader.readAsArrayBuffer(soundFile);
	}, false);
	
	volumeInput = $("#volume")[0];
	
	volumeInput.addEventListener("change", function(){
		masterGain.gain.value = (this.value + this.min) / (this.max + this.min);
	});
	
	volumeInput.addEventListener("input", function(){
		masterGain.gain.value = (this.value + this.min) / (this.max + this.min);
	});
}

function start(){
	initAudioContext();
	initCanvas();
	initInput();
	
	visualize();
}
