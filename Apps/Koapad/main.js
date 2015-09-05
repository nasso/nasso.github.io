var chars = ("1234567890AZERTYUIOPQSDFGHJKLMWXCVBN,;:!").split("");
var azertyMap = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 65, 90, 69, 82, 84, 89, 85, 73, 79, 80, 81, 83, 68, 70, 71, 72, 74, 75, 76, 77, 87, 88, 67, 86, 66, 78, 188, 59, 58, 161];
var bindings = [];
var keyState = [];

var padLightPower = 8.0;
var padkeys;

function initKeys(){
	padkeys = document.getElementsByClassName("key");
		
	for(var i = 0; i < padkeys.length; i++){
		padkeys[i].innerHTML = '<span class="keyNumber">'+chars[i]+'</span>';
		
		padkeys[i].setColor = function(r, g, b){
			var color = "rgb("+r+", "+g+", "+b+")";
			var grayscale = (r + g + b)/3.0;
			var lighting = -(grayscale/255.0 - 1.0) * padLightPower;
			
			this.style.backgroundColor = color;
			this.style.boxShadow = "0px 0px "+lighting+"px "+color;
		};
		
		padkeys[i].resetColor = function(){
			this.setColor(189.0, 195.0, 199.0);
		};
		
		padkeys[i].onmouseenter = function(){
			this.setColor(46.0, 204.0, 113.0);
		};
		
		padkeys[i].onmouseout = function(){
			this.resetColor();
		};
		
		padkeys[i].resetColor();
	}
	
	for(var i = 0; i < azertyMap.length; i++){
		bindings[azertyMap[i]] = i;
	}
}

function refreshPad(){
	for(var i = 0; i < padkeys.length; i++){
		padkeys[i].resetColor();
	}
}

function keyDown(event){
	event.preventDefault();
	
	if(keyState[event.keyCode]){
		return;
	}
	
	keyState[event.keyCode] = true;
	
	var r = Math.random() * 255.0;
	var g = Math.random() * 255.0;
	var b = Math.random() * 255.0;
	
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	
	padkeys[bindings[event.keyCode]].setColor(r, g, b);
}

function keyUp(event){
	keyState[event.keyCode] = false;
	
	padkeys[bindings[event.keyCode]].resetColor();
}

function initKeyboard(){
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);
}

function start(){
	initKeys();
	initKeyboard();
}
