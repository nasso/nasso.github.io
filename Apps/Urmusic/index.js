var AudioContext = window.AudioContext || window.webkitAudioContext;

var drawMode = {
	lines: 0,
	fill: 1,
	outline: 2
};

function createSection(defaultValues) {
	var sec = {
		minDecibels: -100,
		maxDecibels: -20,
		barCount: 32,
		freqStart: 0,
		freqEnd: 0.03,
		barsWidth: 0.060,
		barsStartX: -1,
		barsEndX: 1,
		barsY: -0.5,
		color: 'white',
		barsPow: 2,
		barsHeight: 0.7,
		barsMinHeight: 0.01,
		glowness: 0.0,
		
		polar: 0.0,
		mode: drawMode.lines,
		clampShapeToZero: true,
		closeShape: true
	};
	
	if(defaultValues) {
		for(var x in defaultValues) {
			if(sec[x] !== undefined) {
				sec[x] = defaultValues[x];
			}
		}
	}
	
	return sec;
}

function createSettings(defaultValues) {
	var settings = {
		smoothingTimeConstant: 0.65,
		
		sections: [ createSection() ],
		
		imageX: 0,
		imageY: 0,
		imageWidth: 0.4,
		imageHeight: 0.4,
		
		backgroundColor: '#2A2C31'
	};
	
	if(defaultValues) {
		for(var x in defaultValues) {
			if(settings[x] !== undefined) {
				if(Array.isArray(settings[x])) {
					if(Array.isArray(defaultValues[x])) {
						for(var i = 0; i < defaultValues[x].length; i++) {
							settings[x][i] = createSection(defaultValues[x][i]);
						}
					}
				} else {
					settings[x] = defaultValues[x];
				}
			}
		}
	}
	
	return settings;
}

var settingsPresets = {
	'Default': createSettings(),
	'Image disk': createSettings({
		smoothingTimeConstant: 0.65,
		
		sections: [
			{
				minDecibels: -48,
				maxDecibels: -20,
				barCount: 128,
				freqStart: 0,
				freqEnd: 0.015,
				barsWidth: 0.008,
				barsStartX: -0.5,
				barsEndX: 0.5,
				barsY: 0.4,
				color: 'white',
				barsPow: 3,
				barsHeight: 0.25,
				barsMinHeight: 0.005,
				glowness: 0.0,
				
				polar: 1.0,
				mode: drawMode.fill,
				clampShapeToZero: false,
				closeShape: false
			},
			{
				minDecibels: -48,
				maxDecibels: -20,
				barCount: 128,
				freqStart: 0,
				freqEnd: 0.015,
				barsWidth: 0.008,
				barsStartX: 1.5,
				barsEndX: 0.5,
				barsY: 0.4,
				color: 'white',
				barsPow: 3,
				barsHeight: 0.25,
				barsMinHeight: 0.005,
				glowness: 0.0,
				
				polar: 1.0,
				mode: drawMode.fill,
				clampShapeToZero: false,
				closeShape: false
			}
		],
		
		imageX: 0,
		imageY: 0,
		imageWidth: 0.8,
		imageHeight: 0.8
	}),
	'Rebellion': createSettings({
		smoothingTimeConstant: 0.5,
		
		sections: [
			{
				minDecibels: -54,
				maxDecibels: -25,
				barCount: 128,
				freqStart: 0.015,
				freqEnd: 0.030,
				barsWidth: 0.008,
				barsStartX: -0.5,
				barsEndX: 0.5,
				barsY: 0.4,
				color: "#bdc3c7",
				barsPow: 2,
				barsHeight: 0.25,
				barsMinHeight: 0.005,
				glowness: 0.0,
				
				polar: 1.0,
				mode: drawMode.outline,
				clampShapeToZero: false,
				closeShape: false
			},
			{
				minDecibels: -54,
				maxDecibels: -25,
				barCount: 128,
				freqStart: 0.015,
				freqEnd: 0.030,
				barsWidth: 0.008,
				barsStartX: 1.5,
				barsEndX: 0.5,
				barsY: 0.4,
				color: "#bdc3c7",
				barsPow: 2,
				barsHeight: 0.25,
				barsMinHeight: 0.005,
				glowness: 0.0,
				
				polar: 1.0,
				mode: drawMode.outline,
				clampShapeToZero: false,
				closeShape: false
			},
			{
				minDecibels: -48,
				maxDecibels: -20,
				barCount: 128,
				freqStart: 0,
				freqEnd: 0.015,
				barsWidth: 0.008,
				barsStartX: -0.5,
				barsEndX: 0.5,
				barsY: 0.4,
				color: "#ffffff",
				barsPow: 3,
				barsHeight: 0.25,
				barsMinHeight: 0.005,
				glowness: 0.0,
				
				polar: 1.0,
				mode: drawMode.fill,
				clampShapeToZero: false,
				closeShape: false
			},
			{
				minDecibels: -48,
				maxDecibels: -20,
				barCount: 128,
				freqStart: 0,
				freqEnd: 0.015,
				barsWidth: 0.008,
				barsStartX: 1.5,
				barsEndX: 0.5,
				barsY: 0.4,
				color: "#ffffff",
				barsPow: 3,
				barsHeight: 0.25,
				barsMinHeight: 0.005,
				glowness: 0.0,
				
				polar: 1.0,
				mode: drawMode.fill,
				clampShapeToZero: false,
				closeShape: false
			}
		],
		
		imageX: 0,
		imageY: 0,
		imageWidth: 0.8,
		imageHeight: 0.8
	})
};

var settings = createSettings();

function loadPreset(presetName) {
	var preset = settingsPresets[presetName];
	
	for(var x in settings) {
		if(preset[x] !== undefined && preset[x] !== null && !Array.isArray(preset[x])) {
			settings[x] = preset[x];
		}
	}
	
	settings.sections = [];
	for(var i = 0; i < preset.sections.length; i++) {
		var original = preset.sections[i];
		var copy = {};
		
		for(var x in original) {
			copy[x] = original[x];
		}
		
		settings.sections.push(copy);
	}
}

// Debug
loadPreset('Rebellion');

$(function() {
	var requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback){ setTimeout(callback, 1000/60); };
	
	var cvs = $("#cvs")[0];
	var gtx = cvs.getContext('2d');
	var ctx = new AudioContext();
	
	var audioSource;
	var gainNode;
	var analyser;
	var freqData;
	
	var imgReady = false;
	
	var img = new Image();
	var audioElement = $("#audioElement")[0];
	
	function processImageFile(imageFile) {
		if(!imageFile.type.match('image.*')) {
			return;
		}
		
		var reader = new FileReader();
		
		reader.addEventListener('load', function(e) {
			imgReady = false;
			img.src = e.target.result;
		});
		
		reader.readAsDataURL(imageFile);
	}
	
	function processAudioFile(soundFile) {
		if(!soundFile.type.match('audio.*')) {
			return;
		}
		
		var reader = new FileReader();
		
		reader.addEventListener('load', function(e) {
			audioElement.src = e.target.result;
		});
		
		reader.readAsDataURL(soundFile);
	}
	
	function processFiles(files) {
		var imageFile;
		var soundFile;
		
		for(var i = 0; i < files.length; i++) {
			if(files[i].type.match('image.*')) {
				imageFile = files[i];
			}else if(files[i].type.match('audio.*')) {
				soundFile = files[i];
			}
		}
		
		if(imageFile) {
			processImageFile(imageFile);
		}
		if(soundFile) {
			processAudioFile(soundFile);
		}
	}
	
	function lerp(a, b, x) {
		return a + x * (b - a);
	}
	
	function getValue(array, index) {
		if(index < 0) {
			return array[0];
		} else if(index >= array.length - 1) {
			return array[array.length - 1];
		}
		
		var flr = Math.floor(index);
		var cel = Math.ceil(index);
		var rdn = Math.floor(index + 0.5);
		
		var flrv = array[flr];
		var celv = array[cel];
		
		// Quadratic interpolation
		if(index < 1.5) {
			return quadCurve(array[0], array[1], lerp(array[1], array[2], 0.5), index / 1.5);
		} else if(index > array.length - 2.5) {
			var a = lerp(array[array.length - 3], array[array.length - 2], 0.5);
			
			return quadCurve(a, array[array.length - 2], array[array.length - 1], (index - array.length + 2.5) / 1.5);
		} else {
			return quadCurve(lerp(array[rdn - 1], array[rdn], 0.5), array[rdn], lerp(array[rdn], array[rdn + 1], 0.5), index - rdn + 0.5);
		}
	}
	
	function freqValue(nind, section) {
		return Math.max(getValue(freqData, lerp(section.freqStart, section.freqEnd, nind) * freqData.length) - section.minDecibels, 0) / (section.maxDecibels - section.minDecibels);
	}
	
	function quadCurve(p0y, cpy, p1y, t) {
		var y = (1.0 - t) * (1.0 - t) * p0y + 2.0 * (1.0 - t) * t * cpy + t * t * p1y;
		
		return y;
	}
	
	function loop() {
		analyser.smoothingTimeConstant = settings.smoothingTimeConstant;
		
		if(!freqData) {
			freqData = new Float32Array(analyser.frequencyBinCount);
			
			if(audioElement.paused) {
				for(var i = 0; i < freqData.length; i++) {
					freqData[i] = Number.MIN_SAFE_INTEGER
				}
			}
		}
		
		if(!audioElement.paused) {
			analyser.getFloatFrequencyData(freqData);
		}
		
		if(cvs.width != cvs.clientWidth || cvs.height != cvs.clientHeight) {
			cvs.width = cvs.clientWidth;
			cvs.height = cvs.clientHeight;
		}
		
		render();
		
		requestAnimationFrame(loop);
	}
	
	function getProps(cwidth, cheight, section, per) {
		var height = Math.pow(freqValue(per, section), section.barsPow) * section.barsHeight;
		
		var x = lerp(section.barsStartX, section.barsEndX, per);
		var y = section.barsY;
		
		var ey = y + section.barsMinHeight + height;
		var ex = x;
		
		if(section.polar > 0.0) {
			var cosx = Math.cos((x * 0.5 + 0.5) * Math.PI * 2);
			var sinx = Math.sin((x * 0.5 + 0.5) * Math.PI * 2);
			
			var xp = cosx * y;
			var yp = sinx * y;
			var exp = cosx * ey;
			var eyp = sinx * ey;
			
			x = lerp(x * cwidth, xp * cwidth, section.polar);
			y = lerp(y * cheight, yp * cheight, section.polar);
			ex = lerp(ex * cwidth, exp * cwidth, section.polar);
			ey = lerp(ey * cheight, eyp * cheight, section.polar);
		} else {
			x *= cwidth;
			y *= cheight;
			ex *= cwidth;
			ey *= cheight;
		}
		
		return {
			x: x,
			y: y,
			ex: ex,
			ey: ey
		};
	}
	
	function render() {
		var aspect = cvs.width / cvs.height;
		var cwidth = cvs.width;
		var cheight = cvs.height;
		
		if(cwidth > cheight) {
			cwidth /= aspect;
		} else {
			cheight *= aspect;
		}
		
		gtx.clearRect(0, 0, cvs.width, cvs.height);
		
		gtx.fillStyle = settings.backgroundColor;
		gtx.fillRect(0, 0, cvs.width, cvs.height);
		
		gtx.save();
			gtx.translate(cvs.width/2, cvs.height/2);
			gtx.scale(0.5, -0.5);
			
			for(var is = 0; is < settings.sections.length; is++) {
				var section = settings.sections[is];
				var mode = section.mode;
				
				gtx.strokeStyle = section.color;
				gtx.fillStyle = section.color;
				gtx.lineWidth = section.barsWidth * Math.min(cvs.width, cvs.height);
				gtx.shadowColor = section.color;
				gtx.shadowBlur = section.glowness;
				
				gtx.beginPath();
				for(var i = 0; i < section.barCount; i++) {
					var per = i / (section.barCount - 1);
					
					var p = getProps(cwidth, cheight, section, per);
					
					if(mode == drawMode.lines || (i == 0 && section.clampShapeToZero)) {
						gtx.moveTo(p.x, p.y);
					}
					
					gtx.lineTo(p.ex, p.ey);
					
					if(i == section.barCount - 1 && section.clampShapeToZero) {
						gtx.lineTo(p.x, p.y);
					}
				}
				
				if(section.closeShape) {
					gtx.closePath();
				}
				
				if(mode == drawMode.fill) {
					gtx.fill();
				} else {
					gtx.stroke();
				}
			}
			
			if(imgReady) {
				gtx.shadowColor = 'rgba(0, 0, 0, 0)'
				gtx.shadowBlur = 0;
				
				gtx.scale(1, -1);
				gtx.drawImage(img,
					(settings.imageX - settings.imageWidth/2) * cwidth,
					(settings.imageY - settings.imageHeight/2) * cheight,
					settings.imageWidth * cwidth,
					settings.imageHeight * cheight);
			}
		gtx.restore();
	}
	
	function init() {
		if(!cvs || !gtx || !ctx) {
			alert("Your browser isn't compatible"); 
			throw new Error("Couldn't initialize");
			
			return;
		}
		
		cvs.width = document.body.clientWidth;
		cvs.height = document.body.clientHeight;
		
		cvs.addEventListener('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			e.dataTransfer.dropEffect = 'copy';
		}, false);
		
		cvs.addEventListener('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			processFiles(e.dataTransfer.files);
		}, false);
		
		audioElement.addEventListener('volumechange', function(e) {
			gainNode.gain.value = 1.0 / audioElement.volume;
		});
		
		var setNav = $('#settingsNav')[0];
		$('#hambParent').on('click', function(e) {
			setNav.classList.contains('activated') ? setNav.classList.remove('activated') : setNav.classList.add('activated');
		});
		
		/*
		<li class="settingsCtrl">
			<span class="ctrlName">smoothingTimeConstant</span>
			<input type="text" placeholder="number" class="ctrlInput" />
		</li>
		*/
		
		var settingsCtrlsList = $("#settingsCtrlsList")[0];
		for(var x in settings) {
			if(typeof settings[x] === 'object') {
				continue;
			}
		
			var li = $('<li>')[0];
			var span = $('<span>')[0];
			var input = $('<input>')[0];
			
			li.classList.add("settingsCtrl");
			span.classList.add("ctrlName");
			input.classList.add("ctrlInput");
			
			span.innerHTML = x;
			input.type = 'text';
			input.placeholder = typeof settings[x];
			input.value = settings[x].toString();
		
			input.addEventListener('change', (function() {
				var k = x;
				
				if(typeof settings[k] === 'number') {
					return function() {
						this.value = settings[k] = parseFloat(this.value);
					};
				}
				
				return function() {
					settings[k] = this.value;
				};
			})());
			
			li.appendChild(span);
			li.appendChild(input);
			
			settingsCtrlsList.appendChild(li);
		}
		
		audioSource = ctx.createMediaElementSource(audioElement);
		gainNode = ctx.createGain();
		analyser = ctx.createAnalyser();
		analyser.fftSize = 2048;
		
		gainNode.gain.value = 1.0 / audioElement.volume;
		
		audioSource.connect(gainNode);
		gainNode.connect(analyser);
		audioSource.connect(ctx.destination);
		
		img.addEventListener('load', function() {
			imgReady = true;
		});
		
		console.log(
			" _    _ ________     __  _ \n"
		+	"| |  | |  ____\\ \\   / / | |\n"
		+	"| |__| | |__   \\ \\_/ /  | |\n"
		+	"|  __  |  __|   \\   /   | |\n"
		+	"| |  | | |____   | |    |_|\n"
		+	"|_|  |_|______|  |_|    (_)\n\n"
		+	"Hey you! I'm working on the interface of this app but it is already highly customizable through the JavaScript console! Have fun!");
		
		loop();
	}
	
	init();
});
