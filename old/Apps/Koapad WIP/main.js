var chars = ("1234567890AZERTYUIOPQSDFGHJKLMWXCVBN,;:!").split("");
var azertyMap = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 65, 90, 69, 82, 84, 89, 85, 73, 79, 80, 81, 83, 68, 70, 71, 72, 74, 75, 76, 77, 87, 88, 67, 86, 66, 78, 188, 59, 58, 161];
var bindings = [];
var keyState = [];

var selectColor = [46, 204, 113];
var hoverColor = [26, 188, 156];
var barsCount = 128;

var selectedPadKey = null;

var audioContext;

var analyser;
var masterGain;

var freqs;
var bars = [];
var maximum = 0;

var settings = [];

var padkeys;

var test;

// Cross browser compatibility
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
function playSound(soundBuffer, time){
	var bufferSource = audioContext.createBufferSource();
	bufferSource.buffer = soundBuffer;
	
	bufferSource.connect(masterGain);
	
	bufferSource.addEventListener("ended", function(){
		this.disconnect(masterGain);
	});
	
	bufferSource.start(time);
}

function initKeys(){
	padkeys = document.getElementsByClassName("key");
		
	for(var i = 0; i < padkeys.length; i++){
		var keyNumber = document.createElement("span");
		keyNumber.setAttribute("class", "keyNumber");
		keyNumber.innerHTML = chars[i];
		
		padkeys[i].playSound = function(time){
			if(this.soundBuffer){
				playSound(this.soundBuffer, time);
			}
		};
		
		padkeys[i].addEventListener("dragover", function(e){
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		}, false);
		
		padkeys[i].addEventListener("drop", function(e){
			e.stopPropagation();
			e.preventDefault();
			
			this.soundFile = e.dataTransfer.files[0];
			
			var reader = new FileReader();
			
			var padkey = this;
				
			reader.addEventListener("load", function(e){
				audioContext.decodeAudioData(e.target.result, function(buffer){
					padkey.soundBuffer = buffer;
				});
			});
			
			reader.readAsArrayBuffer(this.soundFile);
		}, false);
		
		padkeys[i].appendChild(keyNumber);
		
		padkeys[i].setColor = function(r, g, b){
			var color = "rgb("+r+", "+g+", "+b+")";
			var grayscale = (r + g + b)/3.0;
			var lighting = -(grayscale/255.0 - 1.0) * settings["lightPower"].currentValue;
			
			this.color = [r, g, b];
			this.lighting = lighting;
			this.style.backgroundColor = color;
			this.style.boxShadow = "0px 0px "+this.lighting+"px "+color;
		};
		
		padkeys[i].setColorv = function(color){
			this.setColor(color[0], color[1], color[2]);
		};
		
		padkeys[i].resetColor = function(){
			this.setColor(189.0, 195.0, 199.0);
		};
		
		padkeys[i].onmouseenter = function(){
			if(!this.selected()){
				this.setColorv(hoverColor);
			}else{
				this.setColorv(selectColor);
			}
		};
		
		padkeys[i].onmouseout = function(){
			if(!this.selected()){
				this.resetColor();
			}else{
				this.setColorv(selectColor);
			}
		};
		
		padkeys[i].selected = function(){
			return selectedPadKey == this;
		};
		
		padkeys[i].unselect = function(){
			this.resetColor();
			selectedPadKey = null;
		};
		
		padkeys[i].selectPadKey = function(){
			if(selectedPadKey != null || this.selected()){
				selectedPadKey.unselect();
			}
			
			selectedPadKey = this;
			this.setColorv(selectColor);
		};
		
		padkeys[i].toggleSelect = function(){
			if(this.selected()){
				this.unselect();
			}else{
				this.selectPadKey();
			}
		};
		
		padkeys[i].onmousedown = function(){
			this.toggleSelect();
		};
		
		padkeys[i].refreshPadKey = function(){
			this.setColorv(this.color);
		};
		
		padkeys[i].resetColor();
	}
	
	for(var i = 0; i < azertyMap.length; i++){
		bindings[azertyMap[i]] = i;
	}
}

function refreshPad(){
	for(var i = 0; i < padkeys.length; i++){
		padkeys[i].refreshPadKey();
	}
}

function keyDown(event){
	event.preventDefault();
	
	if(keyState[event.keyCode]){
		return;
	}
	
	keyState[event.keyCode] = true;
	
	var currentPadKey = padkeys[bindings[event.keyCode]];
	
	if(!currentPadKey){
		return;
	}
	
	var r = Math.random() * 255.0;
	var g = Math.random() * 255.0;
	var b = Math.random() * 255.0;
	
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	
	currentPadKey.unselect(); // Unselected the padkey if it is selected
	currentPadKey.setColor(r, g, b); // Set a random color
	
	currentPadKey.playSound(0);
}

function keyUp(event){
	var currentPadKey = padkeys[bindings[event.keyCode]];
	
	if(!currentPadKey){
		return;
	}
	
	keyState[event.keyCode] = false;
	
	
	currentPadKey.resetColor();
}

function initKeyboard(){
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);
}

function initAudioContext(){
	try{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		
		audioContext = new AudioContext();
	}catch(e){
		alert("This navigator doesn't seems to support the Audio API used by Koapad !\nTry to update it or to change it.");
		throw new Error("Context initialisation failed");
	}
	
	analyser = audioContext.createAnalyser();
	analyser.fftSize = barsCount;
	
	masterGain = audioContext.createGain();
	var volumeEl = $("#volume")[0];
	var normVolume = parseInt(volumeEl.getAttribute("data-initial")) / parseInt(volumeEl.getAttribute("data-max"));
	masterGain.gain.value = normVolume * normVolume;
	
	masterGain.connect(analyser);
	masterGain.connect(audioContext.destination);
}

function initUI(){
	var circleButtons = $(".circleButton");
	
	for(var i = 0; i < circleButtons.length; i++){
		var button = circleButtons[i];
		
		button.currentValue = parseInt(button.getAttribute("data-initial"));
		
		button.valueDiv = document.createElement("div");
		button.valueDiv.setAttribute("class", "value");
		button.valueDiv.innerHTML = button.currentValue;
		button.appendChild(button.valueDiv);
		
		button.controllersDiv = document.createElement("div");
		button.controllersDiv.setAttribute("class", "controllers");
		
		button.controllersDiv.plus = document.createElement("div");
		button.controllersDiv.plus.setAttribute("class", "plus");
		button.controllersDiv.plus.innerHTML = "+";
		
		button.controllersDiv.minus = document.createElement("div");
		button.controllersDiv.minus.setAttribute("class", "minus");
		button.controllersDiv.minus.innerHTML = "-";
		
		button.controllersDiv.appendChild(button.controllersDiv.plus);
		button.controllersDiv.appendChild(button.controllersDiv.minus);
		
		button.appendChild(button.controllersDiv);
		
		button.min = parseInt(button.getAttribute("data-min"));
		button.max = parseInt(button.getAttribute("data-max"));
		
		button.refreshDisplay = function(){
			this.valueDiv.innerHTML = this.currentValue;
		};
		
		button.setValue = function(x){
			if(this.min != null && x < this.min){
				return;
			}
			
			if(this.max != null && x > this.max){
				return;
			}
			
			this.currentValue = x;
			
			if(this.onvaluechanged != null){
				this.onvaluechanged(this.currentValue);
			}
			
			this.refreshDisplay();
		};
		
		button.moveValue = function(x){
			this.setValue(this.currentValue + x);
		};
		
		button.setRange = function(min, max){
			this.min = min;
			this.max = max;
		};
		
		button.getNormalizedValue = function(){
			if(this.max == null || this.max == 0){
				return 0;
			}
			
			return this.currentValue / this.max;
		};
		
		var wheelListener = function(e){
			e.preventDefault();
			
			var side = 0;
			
			if('wheelDelta' in e){
				// No firefox
				if(e.wheelDelta < 0){
					side = 1;
				}else if(e.wheelDelta > 0){
					side = -1;
				}
			}else{
				// Firefox
				if(e.detail < 0){
					side = 1;
				}else if(e.detail > 0){
					side = -1;
				}
			}
			
			this.moveValue(side);
		}
		
		button.addEventListener("onmousewheel", wheelListener);
		button.addEventListener("DOMMouseScroll", wheelListener);
		
		button.controllersDiv.plus.onmousedown = function(e){
			e.preventDefault();
			
			this.parentNode.parentNode.moveValue(+1);
		};
		
		button.controllersDiv.minus.onmousedown = function(e){
			e.preventDefault();
			
			this.parentNode.parentNode.moveValue(-1);
		};
		
		settings[button.id] = button;
	}
		
	settings["lightPower"].onvaluechanged = function(){
		refreshPad();
	};
	
	settings["volume"].onvaluechanged = function(){
		var normVolume = settings.volume.getNormalizedValue();
		masterGain.gain.value = normVolume * normVolume;
	}
	
	// Visualizer
	var barsUl = document.createElement("ul");
	barsUl.setAttribute("id", "bars");
	
	for(var i = 0; i < analyser.frequencyBinCount; i++){
		var currBar = document.createElement("li");
		currBar.setAttribute("class", "visualizerBar");
		currBar.setAttribute("id", "visualizerBar"+i);
		
		bars = bars.concat([currBar]);
		barsUl.appendChild(currBar);
	}
	
	$("#visualizer")[0].appendChild(barsUl);
}

function visualize(){
	freqs = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqs);
	
	for(var i = 0; i < analyser.frequencyBinCount; i++){
		var height = (freqs[i] / 255.0) * 64.0;
		
		bars[i].style.height = height+"px";
	}
	
	// Call this function the next frame
	window.requestAnimationFrame(visualize);
}

function start(){
	initAudioContext();
	
	initUI();
	initKeys();
	initKeyboard();
	
	visualize();
}
