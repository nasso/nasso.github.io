var AudioContext = window.AudioContext || window.webkitAudioContext;

var drawMode = {
	lines: 0,
	fill: 1,
	outline: 2
};

function Section(p) {
	p = p || {};
	
	this.name = 'A section';
	this.minDecibels = p.minDecibels !== undefined ? p.minDecibels : -100;
	this.maxDecibels = p.maxDecibels !== undefined ? p.maxDecibels : -20;
	this.barCount = p.barCount !== undefined ? p.barCount : 32;
	this.freqStart = p.freqStart !== undefined ? p.freqStart : 0;
	this.freqEnd = p.freqEnd !== undefined ? p.freqEnd : 0.03;
	this.barsWidth = p.barsWidth !== undefined ? p.barsWidth : 6.0;
	this.barsStartX = p.barsStartX !== undefined ? p.barsStartX : -1;
	this.barsEndX = p.barsEndX !== undefined ? p.barsEndX : 1;
	this.barsY = p.barsY !== undefined ? p.barsY : -0.5;
	this.color = p.color !== undefined ? p.color : '#ffffff';
	this.barsPow = p.barsPow !== undefined ? p.barsPow : 2;
	this.barsHeight = p.barsHeight !== undefined ? p.barsHeight : 0.7;
	this.barsMinHeight = p.barsMinHeight !== undefined ? p.barsMinHeight : 0.01;
	this.glowness = p.glowness !== undefined ? p.glowness : 0.0;
	this.polar = p.polar !== undefined ? p.polar : 0.0;
	this.mode = p.mode !== undefined ? p.mode : drawMode.lines;
	this.clampShapeToZero = p.clampShapeToZero !== undefined ? p.clampShapeToZero : true;
	this.closeShape = p.closeShape !== undefined ? p.closeShape : true;
	this.drawLast = p.drawLast !== undefined ? p.drawLast : true;
}

function Settings(p) {
	this.set(p);
}
Settings.prototype.addSection = function(p) {
	this.sections.push(new Section(p));
	
	return this;
};
Settings.prototype.set = function(p) {
	p = p || {};
	
	this.smoothingTimeConstant = p.smoothingTimeConstant !== undefined ? p.smoothingTimeConstant : 0.65;
	
	this.sections = [];
	if(Array.isArray(p.sections)) {
		for(var i = 0; i < p.sections.length; i++) {
			this.addSection(p.sections[i]);
		}
	}
	
	this.imageX = p.imageX !== undefined ? p.imageX : 0;
	this.imageY = p.imageY !== undefined ? p.imageY : 0;
	this.imageWidth = p.imageWidth !== undefined ? p.imageWidth : 0.4;
	this.imageHeight = p.imageHeight !== undefined ? p.imageHeight : 0.4;
	
	this.backgroundColor = p.backgroundColor !== undefined ? p.backgroundColor : '#2A2C31';
};

var settingsPresets = {
	'Default': new Settings().addSection(),
	'Image disk': new Settings({
			smoothingTimeConstant: 0.65,
			imageX: 0,
			imageY: 0,
			imageWidth: 0.8,
			imageHeight: 0.8
		}).addSection({
			minDecibels: -48,
			maxDecibels: -20,
			barCount: 128,
			freqStart: 0,
			freqEnd: 0.015,
			barsWidth: 0.8,
			barsStartX: -0.5,
			barsEndX: 0.5,
			barsY: 0.4,
			color: '#ffffff',
			barsPow: 3,
			barsHeight: 0.25,
			barsMinHeight: 0.005,
			glowness: 0.0,
			
			polar: 1.0,
			mode: drawMode.fill,
			clampShapeToZero: false,
			closeShape: false
		}).addSection({
			minDecibels: -48,
			maxDecibels: -20,
			barCount: 128,
			freqStart: 0,
			freqEnd: 0.015,
			barsWidth: 0.8,
			barsStartX: 1.5,
			barsEndX: 0.5,
			barsY: 0.4,
			color: '#ffffff',
			barsPow: 3,
			barsHeight: 0.25,
			barsMinHeight: 0.005,
			glowness: 0.0,
			
			polar: 1.0,
			mode: drawMode.fill,
			clampShapeToZero: false,
			closeShape: false
		}), 
	'Rebellion': new Settings({
			smoothingTimeConstant: 0.5,
			imageX: 0,
			imageY: 0,
			imageWidth: 0.8,
			imageHeight: 0.8
		}).addSection({
			minDecibels: -54,
			maxDecibels: -25,
			barCount: 128,
			freqStart: 0.015,
			freqEnd: 0.030,
			barsWidth: 0.8,
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
		}).addSection({
			minDecibels: -54,
			maxDecibels: -25,
			barCount: 128,
			freqStart: 0.015,
			freqEnd: 0.030,
			barsWidth: 0.8,
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
		}).addSection({
			minDecibels: -48,
			maxDecibels: -20,
			barCount: 128,
			freqStart: 0,
			freqEnd: 0.015,
			barsWidth: 0.8,
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
		}).addSection({
			minDecibels: -48,
			maxDecibels: -20,
			barCount: 128,
			freqStart: 0,
			freqEnd: 0.015,
			barsWidth: 0.8,
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
		})
};

var settings = new Settings();

function loadPreset(name) {
	// Creates the settings object if someone set it to null :D
	if(!settings) settings = new Settings(settingsPresets[name]);
	else settings.set(settingsPresets[name]);
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
				gtx.lineWidth = (section.barsWidth / 100) * Math.min(cvs.width, cvs.height);
				gtx.shadowColor = section.color;
				gtx.shadowBlur = section.glowness;
				
				gtx.beginPath();
				for(var i = 0; i < section.barCount; i++) {
					if(!section.drawLast && i === section.barCount - 1) {
						break;
					}
					
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
	
	var refreshControls = (function(){
		var glblSettings = $("#globalSettings")[0];
		var secTabs = $("#settingsSectionTabs")[0];
		var addTabLi = $("#addTab")[0];
		var sectionSettingsUl = $("#sectionSettings")[0];
		var presetList = $("#settingsPresetsList")[0];
		var presetNameIn = $("#presetNameInput")[0];
		var loadPresetBtn = $("#settingsPresetsOptOpen")[0];
		var savePresetBtn = $("#settingsPresetsOptSave")[0];
		
		var downloader = $('#downloader')[0];
		var fileChooser = $('#fileChooser')[0];
		
		var sectionControls = [];
		
		var refreshTabs = function() {
			var thisIndex = -1;
			
			for(var i = 0; i < secTabs.children.length; i++) {
				if(secTabs.children[i].classList.contains("activated")) {
					thisIndex = i;
					continue;
				}
			}
			
			while(sectionSettingsUl.children.length !== 0) {
				sectionSettingsUl.removeChild(sectionSettingsUl.children[0]);
			}
			
			while(secTabs.children.length !== 0 && secTabs.children[0] !== addTabLi) {
				secTabs.removeChild(secTabs.children[0]);
			}
			
			for(var i = 0; i < settings.sections.length; i++) {
				actionAddTab(i);
			}
			
			if(thisIndex !== -1) {
				for(var i = 0; i < sectionControls[thisIndex].length; i++) {
					sectionSettingsUl.appendChild(sectionControls[thisIndex][i]);
				}
				
				secTabs.children[thisIndex].classList.add("activated");
			}
		};
		
		var createControl = function(s, x) {
			var p = s[x];
			
			if(typeof p === 'object' || typeof p === 'function') {
				return null;
			}
			
			var li = $('<li>')[0];
			var span = $('<span>')[0];
			var input = $('<input>')[0];
			
			li.classList.add("settingsCtrl");
			span.classList.add("ctrlName");
			input.classList.add("ctrlInput");
			
			span.innerHTML = x;
			
			if(typeof p === 'boolean') {
				input.type = 'checkbox';
				
				input.checked = p;
			} else if(x.toLowerCase().endsWith('color')) { // Assume this is a color
				input.type = 'color';
				
				input.value = p.toString();
			} else {
				input.type = 'text';
				
				input.placeholder = typeof p;
				input.value = p.toString();
			}
			
			input.addEventListener('change', function(){
				if(typeof s[x] === 'number') {
					var val = parseFloat(this.value);
					
					this.value = s[x] = (!val ? 0 : val);
				} else if(typeof s[x] === 'boolean') {
					s[x] = this.checked;
				} else {
					s[x] = this.value;
				}
			});
			
			li.appendChild(span);
			li.appendChild(input);
			
			if(typeof p === 'boolean') {
				var chkbx = $('<span>')[0];
				chkbx.classList.add("ctrlCheckbox", "fa");
				
				chkbx.addEventListener('click', function(e) {
					s[x] = input.checked = !input.checked;
				});
				
				li.appendChild(chkbx);
			}
			
			return li;
		}
		
		var createControlCombo = function(s, x, vals) {
			var p = s[x];
			
			if(typeof p === 'object' || typeof p === 'function') {
				return null;
			}
			
			var li = $('<li>')[0];
			var span = $('<span>')[0];
			var select = $('<select>')[0];
			
			li.classList.add("settingsCtrl");
			span.classList.add("ctrlName");
			select.classList.add("ctrlInput");
			
			span.innerHTML = x;
			for(var h in vals) {
				var opt = $('<option>')[0];
				opt.value = h;
				opt.innerHTML = h;
				
				select.appendChild(opt);
				
				if(s[x] === vals[h]) {
					select.value = h;
				}
			}
			
			select.addEventListener('change', function(){
				var val = vals[this.value];
				s[x] = val;
			});
			
			li.appendChild(span);
			li.appendChild(select);
			
			return li;
		}
		
		var createSectionNameControl = function(s, x) {
			var p = s[x];
			
			var li = $('<li>')[0];
			var input = $('<input>')[0];
			var ul = $('<ul>')[0];
			
			li.classList.add("settingsMajorCtrl");
			input.classList.add("ctrlMajorInput");
			ul.classList.add("ctrlOptions");
			
			input.type = 'text';
			input.placeholder = x;
			input.value = p.toString();
			
			var cloneLi = $('<li>')[0];
			var deleteLi = $('<li>')[0];
			var moveLi = $('<li>')[0];
			
			cloneLi.classList.add("fa", "fa-clone", "w3-large", "ctrlOptClone");
			deleteLi.classList.add("fa", "fa-trash-o", "w3-large", "ctrlOptDelete");
			
			var rightI = $('<i>')[0];
			var leftI = $('<i>')[0];
			
			rightI.classList.add("fa", "fa-angle-right", "w3-small", "ctrlOptRight");
			leftI.classList.add("fa", "fa-angle-left", "w3-small", "ctrlOptLeft");
			
			moveLi.classList.add("ctrlOptMoves");
			
			moveLi.appendChild(rightI);
			moveLi.appendChild($('<br>')[0]);
			moveLi.appendChild(leftI);
			
			rightI.addEventListener('click', function() {
				var index = settings.sections.indexOf(s);
				
				if(index >= settings.sections.length - 1) {
					return;
				}
				
				var a = settings.sections[index];
				settings.sections[index] = settings.sections[index + 1];
				settings.sections[index + 1] = a;
				
				refreshTabs();
				
				secTabs.children[index + 1].click();
			});
			
			leftI.addEventListener('click', function() {
				var index = settings.sections.indexOf(s);
				
				if(index <= 0) {
					return;
				}
				
				var a = settings.sections[index];
				settings.sections[index] = settings.sections[index - 1];
				settings.sections[index - 1] = a;
				
				refreshTabs();
				
				secTabs.children[index - 1].click();
			});
			
			cloneLi.addEventListener('click', function() {
				var copy = new Section(s);
				settings.sections.push(copy);
				
				actionAddTab(settings.sections.length - 1);
			});
			
			deleteLi.addEventListener('click', function() {
				var index = settings.sections.indexOf(s);
				
				settings.sections.splice(index, 1);
				
				actionRemoveTab(index);
			});
			
			ul.appendChild(moveLi);
			ul.appendChild(cloneLi);
			ul.appendChild(deleteLi);
			
			input.addEventListener('change', function(){
				s[x] = this.value;
			});
			
			li.appendChild(input);
			li.appendChild(ul);
			
			return li;
		};
		
		var createSectionControls = function(s) {
			var ctrls = [];
			
			for(var x in s) {
				var ctrl = null;
				
				if(x === 'mode') {
					ctrl = createControlCombo(s, x, drawMode);
				} else if(x === 'name') {
					// Special case for name
					ctrl = createSectionNameControl(s, x);
				} else {
					ctrl = createControl(s, x);
				}
				
				if(ctrl) ctrls.push(ctrl);
			}
			
			return ctrls;
		};
		
		var actionTabClicked = function(e) {
			if(this.classList.contains('activated'))
				return;
			
			var thisIndex = -1;
			
			for(var i = 0; i < settings.sections.length; i++) {
				if(secTabs.children[i] === this) {
					thisIndex = i;
					continue;
				}
				
				if(secTabs.children[i].classList.contains('activated'))
					secTabs.children[i].classList.remove('activated');
			}
			
			this.classList.add('activated');
			
			while(sectionSettingsUl.children.length !== 0) {
				sectionSettingsUl.removeChild(sectionSettingsUl.children[0]);
			}
			
			for(var i = 0; i < sectionControls[thisIndex].length; i++) {
				sectionSettingsUl.appendChild(sectionControls[thisIndex][i]);
			}
		};
		
		var actionAddTab = function(i) {
			var tabLi = $("<li>")[0];
			tabLi.innerHTML = i.toString();
			tabLi.addEventListener('click', actionTabClicked);
			
			secTabs.insertBefore(tabLi, addTabLi);
			sectionControls[i] = createSectionControls(settings.sections[i]);
		};
		
		var actionRemoveTab = function(i) {
			var e = secTabs.children[i];
			if(!e) return;
			
			e.removeEventListener('click', actionTabClicked);
			
			secTabs.removeChild(e);
			
			refreshTabs();
		}
		
		var refreshSettings = function() {
			while(glblSettings.children.length !== 0) {
				glblSettings.removeChild(glblSettings.children[0]);
			}
			
			for(var x in settings) {
				var ctrl = createControl(settings, x);
				
				if(ctrl) glblSettings.appendChild(ctrl);
			}
		};
		
		var refreshPresetList = function() {
			while(presetList.children.length !== 0) {
				presetList.removeChild(presetList.children[0]);
			}
			
			for(var x in settingsPresets) {
				var preset = $('<li>')[0];
				preset.innerHTML = x.toString(); // SHOULD be a string
				
				preset.addEventListener('click', (function() {
					var presetName = x;
					
					return function() {
						loadPreset(presetName);
						refreshTabs();
					};
				})());
				
				presetList.appendChild(preset);
			}
		};
		
		addTabLi.addEventListener('click', function() {
			var newSec = new Section();
			settings.sections.push(newSec);
			
			actionAddTab(settings.sections.length - 1);
		});
		
		fileChooser.addEventListener('change', function(e) {
			var f = e.target.files[0];
			if(!f) return;
			
			var fileName = f.name.substr(0, f.name.lastIndexOf('.'));
			var reader = new FileReader();
			reader.onload = function(e) {
				var newSets = new Settings(JSON.parse(e.target.result));
				console.log(f.name);
				var newPresetName = fileName;
				
				var counter = 0;
				while(settingsPresets[newPresetName] !== undefined) {
					newPresetName = fileName + ' (' + counter + ')';
					counter++;
				}
				
				settingsPresets[newPresetName] = newSets;
				
				loadPreset(newPresetName);
				
				refreshSettings();
				refreshTabs();
				refreshPresetList();
			};
			
			reader.readAsText(f);
		});
		
		loadPresetBtn.addEventListener('click', function() {
			// Ask for .urm file
			fileChooser.accept = ".urm";
			fileChooser.click();
		});
		
		savePresetBtn.addEventListener('click', function() {
			// Download .urm
			downloader.href = "data:text/plain;base64," + btoa(JSON.stringify(settings));
			downloader.download = (presetNameIn.value ? presetNameIn.value : "untitled") + ".urm";
			downloader.click();
			
			refreshSettings();
			refreshTabs();
		});
		
		return function() {
			refreshSettings();
			refreshTabs();
			refreshPresetList();
			
			actionTabClicked.call(secTabs.children[0]);
		};
	})();
	
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
			gainNode.gain.value = (audioElement.volume === 0 ? 0.0 : (1.0 / audioElement.volume));
		});
		audioElement.crossOrigin = "anonymous";
		
		var setNav = $('#settingsNav')[0];
		var presetMenuOpenCloseBtn = $('#presetMenuOpenCloseBtn')[0];
		var presetMenu = $('#settingsPresetsMenu')[0];
		
		$('#hambParent').on('click', function(e) {
			setNav.classList.contains('activated') ? setNav.classList.remove('activated') : setNav.classList.add('activated');
			
			if(!setNav.classList.contains('activated')) {
				presetMenu.classList.remove('opened');
				presetMenuOpenCloseBtn.classList.remove('opened');
			}
		});
		
		presetMenuOpenCloseBtn.addEventListener('click', function() {
			if(this.classList.contains('opened')) {
				this.classList.remove('opened');
				presetMenu.classList.remove('opened');
			} else {
				this.classList.add('opened');
				presetMenu.classList.add('opened');
			}
		});
		
		refreshControls();
		
		audioSource = ctx.createMediaElementSource(audioElement);
		gainNode = ctx.createGain();
		analyser = ctx.createAnalyser();
		analyser.fftSize = 2048;
		
		gainNode.gain.value = (audioElement.volume === 0 ? 0.0 : (1.0 / audioElement.volume));
		
		audioSource.connect(gainNode);
		gainNode.connect(analyser);
		audioSource.connect(ctx.destination);
		
		img.addEventListener('load', function() {
			imgReady = true;
		});
		
		console.log(
			" _    _ ________     __  _ \n"
		+	"| |  | |  ____\\ \\   / / | |\t" +	"Hey you! This app is highly customizable\n"
		+	"| |__| | |__   \\ \\_/ /  | |\t" +	"through the JavaScript console too! Have fun!\n"
		+	"|  __  |  __|   \\   /   | |\t" +	"\n"
		+	"| |  | | |____   | |    |_|\t" +	"Urmusic V0.9\n"
		+	"|_|  |_|______|  |_|    (_)\t" +	"By Nasso (http://nasso.github.io/)\n\n");
		
		loop();
	}
	
	init();
});
