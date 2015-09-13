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
var songBuffer;
var songSource;
var position = 0;
var playing = false;

var playTime = 0;
var lastTime = 0;

// Images
var dsg;
var picture;

// Settings
var playPause;
var volumeInput;
var imageShaking = 8;
var bassMovementPower = 0.8;
var endErrorBias = 0.1;

// ProgressBar
var pBar;
var pGtx;
var currentTimeSpan;

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
	if(playing){
		position += (Date.now() - lastTime)/1000;
		lastTime = Date.now();
	}
	refreshBarPosition();
	
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
		var xShake = 0;
		var yShake = 0;
		
		if(playing){
			xShake = (Math.random()-0.5) * (normHigher * imageShaking);
			yShake = (Math.random()-0.5) * (normHigher * imageShaking);
		}
		
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

function initSong(buffer){
	if(songSource){
		songSource.stop();
	}
	
	songBuffer = buffer;
	position = 0;
	refreshBarPosition();
	playPause.setPlaying(false);
}

function onSongSourceEnded(){
	songSource.disconnect(lowFilter);
	songSource.disconnect(splitter);
	songSource.disconnect(context.destination);
	
	playing = false;
	
	var stoppedPos = position + (Date.now() - lastTime)/1000;
	stoppedPos += endErrorBias; // Error bias
	
	if(stoppedPos >= songBuffer.duration){
		position = 0;
		playPause.setPlaying(false);
		refreshBarPosition();
	}
}

function play(){
	if(playing){
		songSource.stop();
	}
	
	songSource = context.createBufferSource();
	songSource.buffer = songBuffer;
	songSource.connect(lowFilter);
	songSource.connect(splitter);
	songSource.connect(masterGain);
	songSource.start(0, position);
	
	lastTime = Date.now();
	playing = true;
	
	songSource.addEventListener("ended", onSongSourceEnded);
}

function pause(){
	if(!playing){
		return;
	}
	
	songSource.stop();
}

function refreshBarPosition(){
	pGtx.clearRect(0, 0, pBar.width, pBar.height);
	
	var totalDuration = 0;
	if(songBuffer){
		totalDuration = songBuffer.duration;
	}
	var pixelPos = position / totalDuration * (pBar.width - 8); // 8px margin;
	
	pixelPos = Math.min(pixelPos+4, pBar.width-4);
	
	pGtx.beginPath();
		pGtx.strokeStyle = "#ecf0f1";
		pGtx.shadowColor = "#ecf0f1";
		pGtx.shadowBlur = 2;
		pGtx.lineWidth = 4;
		
		pGtx.moveTo(4, pBar.height/2);
		pGtx.lineTo(pixelPos, pBar.height/2);
		
		pGtx.stroke();
	pGtx.closePath();
	
	// Update the current time span
	var minutes = Math.floor(position / 60);
	var seconds = Math.floor(position % 60);
	var totalMinutes = Math.floor(totalDuration / 60);
	var totalSeconds = Math.floor(totalDuration % 60);
	
	var minStr = minutes.toString();
	var secStr = seconds.toString();
	var tMinStr = totalMinutes.toString();
	var tSecStr = totalSeconds.toString();
	
	if(minStr.length < 2){
		minStr = "0"+minStr;
	}
	if(secStr.length < 2){
		secStr = "0"+secStr;
	}
	if(tMinStr.length < 2){
		tMinStr = "0"+tMinStr;
	}
	if(tSecStr.length < 2){
		tSecStr = "0"+tSecStr;
	}
	
	currentTimeSpan.innerHTML = minStr+":"+secStr+"/"+tMinStr+":"+tSecStr;
}

function setPosition(sec){
	if(playing){
		songSource.removeEventListener("ended", onSongSourceEnded)
		songSource.stop();
		onSongSourceEnded();
		
		position = sec;
		
		play();
	}else{
		position = sec;
	}
	
	refreshBarPosition();
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
					initSong(buffer);
				});
			});
			
			reader.readAsArrayBuffer(file);
		}
	}, false);
	
	volumeInput = $("#volume")[0];
	
	volumeInput.addEventListener("input", function(){
		masterGain.gain.value = (this.value + this.min) / (this.max + this.min);
	});
	
	masterGain.gain.value = (volumeInput.value + volumeInput.min) / (volumeInput.max + volumeInput.min);
	
	playPause = $("#playPause")[0];
	
	playPause.addEventListener("mousedown", function(e){
		if(e.button == 0){
			this.setPlaying(!this.isPlaying);
		}
	});
	
	playPause.setPlaying = function(state){
		if(!state){
			this.src = "play.png";
			
			pause();
			this.isPlaying = false;
		}else{
			if(!songBuffer){
				alert("There is no song to play !\nTry to drag & drop one in the DSG disk !\n\nIf it still doesn't work, try a different format.");
			}else{
				this.src = "pause.png";
				
				play();
				this.isPlaying = true;
			}
		}
	};
		
	playPause.setPlaying(false);
	
	pBar = $("#progressBar")[0];
	
	pBar.addEventListener("mouseup", function(e){
		if(!songBuffer){
			return;
		}
		
		var relX = e.clientX - (e.target.offsetLeft + 4);
		relX = Math.max(0, relX);
		relX = Math.min(e.target.width-4, relX);
		
		setPosition(relX / (e.target.width - 8) * songBuffer.duration);
	});
	
	pGtx = pBar.getContext("2d");
	currentTimeSpan = $("#currentTime")[0];
}

function start(){
	initAudioContext();
	initCanvas();
	initInput();
	
	visualize();
}
