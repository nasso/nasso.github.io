nindow = {};

nindow.init = function(canvas, gtx){
	nindow.canvas = canvas;
	nindow.canvas.requestPointerLock =	nindow.canvas.requestPointerLock ||
										nindow.canvas.mozRequestPointerLock ||
										nindow.canvas.webkitRequestPointerLock;
	nindow.exitPointerLock =	document.exitPointerLock    ||
								document.mozExitPointerLock ||
								document.webkitExitPointerLock;
	nindow.gtx = gtx;
	
	// Display
	nindow.background = "#007BA2";
	nindow.blurredBackground = null;
	
	nindow.windowBorderColor = "rgba(0, 0, 0, 0.2)";
	
	// Logo
	nindow.logo = new Image();
	nindow.logo.loaded = false;
	nindow.logo.onload = function(){
		nindow.logo.loaded = true;
	};
	nindow.logo.src = "res/logo.png";
	
	nindow.windows = [];
	nindow.mouse = {
		x: nindow.canvas.width / 2,
		y: nindow.canvas.height / 2,
		down: [],
		sensibility: 1
	};
	nindow.pointerLock = false;
	nindow.focusWindow = null;
	nindow.pressedWindow = null;
	
	pointerLockChangeListener = function(){
		if(document.pointerLockElement === nindow.canvas ||
		   document.mozPointerLockElement === nindow.canvas ||
		   document.webkitPointerLockElement === nindow.canvas){
			nindow.pointerLock = true;
		}else{
			nindow.pointerLock = false;
		}
	};
	
	document.addEventListener("pointerlockchange", pointerLockChangeListener);
	document.addEventListener("mozpointerlockchange", pointerLockChangeListener);
	document.addEventListener("webkitpointerlockchange", pointerLockChangeListener);
	
	nindow.canvas.addEventListener("mousedown", function(e){
		if(!nindow.pointerLock){
			nindow.canvas.requestPointerLock();
		}
		
		nindow.mouse.down[e.button] = true;
		
		var x = nindow.mouse.x;
		var y = nindow.mouse.y;
		var found = false;
		
		for(var i = 0; i < nindow.windows.length; i++){
			var win = nindow.windows[i];
			
			if(nutils.inBounds(x, y, win.position.x, win.position.y, win.size.width, win.size.height)){
				nindow.focusWindow = win;
				nutils.arrayMove(nindow.windows, i, 0);
				win.zIndex = 0;
				if(!nutils.inBounds(x, y, win.position.x+3, win.position.y+31, win.size.width-7, win.size.height-35)){
					nindow.pressedWindow = win;
				}
				found = true;
				break;
			}
		}
		
		if(!found){
			nindow.focusWindow = null;
		}
	});
	
	nindow.canvas.addEventListener("mouseup", function(e){
		nindow.mouse.down[e.button] = false;
		nindow.pressedWindow = null;
	});
	
	nindow.canvas.addEventListener("mousemove", function(e){
		var x = e.movementX;
		var y = e.movementY;

		nindow.mouse.x += x * nindow.mouse.sensibility;
		nindow.mouse.y += y * nindow.mouse.sensibility;
		
		if(nindow.mouse.x > nindow.canvas.width-1){
			nindow.mouse.x = nindow.canvas.width-1;
		}
		if(nindow.mouse.x < 0){
			nindow.mouse.x = 0;
		}
		if(nindow.mouse.y > nindow.canvas.height-1){
			nindow.mouse.y = nindow.canvas.height-1;
		}
		if(nindow.mouse.y < 0){
			nindow.mouse.y = 0;
		}
		
		if(nindow.pressedWindow){
			nindow.pressedWindow.position.x += x;
			nindow.pressedWindow.position.y += y;
			// Lock right
			if(nindow.pressedWindow.position.x + 4 > canvas.width){
				nindow.pressedWindow.position.x = canvas.width - 4;
			}	
			// Lock down
			if(nindow.pressedWindow.position.y > canvas.height - 96){
				nindow.pressedWindow.position.y = canvas.height - 96;
 			}
			// Lock up
			if(nindow.pressedWindow.position.y < 0){
				nindow.pressedWindow.position.y = 0; 
			}
			// Lock left
			if(nindow.pressedWindow.position.x + nindow.pressedWindow.size.width - 4 < 0){
				nindow.pressedWindow.position.x = -nindow.pressedWindow.size.width + 4;
			}
		}
	});
};

nindow.refresh = function(){
	if(typeof nindow.background == "string"){
		nindow.gtx.fillStyle = nindow.background;
		nindow.gtx.fillRect(0, 0, nindow.canvas.width, nindow.canvas.height);
	}else if(typeof nindow.background == "object"){
		nindow.gtx.clearRect(0, 0, nindow.canvas.width, nindow.canvas.height);
		nindow.gtx.drawImage(nindow.background, 0, 0, nindow.canvas.width, nindow.canvas.height);	
	}

	// Draw windows
	nindow.windows.slice(0).reverse().forEach(function(win, index, winList){
		if(win.visible){
			// Draw border
			nindow.gtx.beginPath();
				if(nindow.focusWindow === win){
					nindow.gtx.shadowBlur = 12;
				}else{
					nindow.gtx.shadowBlur = 6;
				}
				nindow.gtx.shadowColor = "#000000";
				nindow.gtx.shadowOffsetX = 0;
				nindow.gtx.shadowOffsetY = 0;
				
				ngl.roundRect(nindow.gtx, win.position.x, win.position.y, win.size.width, win.size.height, 2);
				
				if(nindow.blurredBackgroundPattern){
					nindow.gtx.fillStyle = nindow.blurredBackgroundPattern;

					nindow.gtx.fill();
				}
				
				nindow.gtx.fillStyle = nindow.windowBorderColor;
				
				nindow.gtx.fill();
			nindow.gtx.closePath();
			
			ngl.disableShadows(nindow.gtx);
			
			// Draw title
			nindow.gtx.shadowBlur = 2;
			nindow.gtx.font = "16pt Roboto";
			nindow.gtx.fillStyle = "#ffffff";
			nindow.gtx.fillText(win.title, win.position.x+8, win.position.y + 24);
			
			ngl.disableShadows(nindow.gtx);
			
			// Draw frame panel
			nindow.gtx.beginPath();
				nindow.gtx.rect(win.position.x+4, win.position.y+32, win.size.width-8, win.size.height-36);

				nindow.gtx.fillStyle = "#ededed";
				
				nindow.gtx.fill();
			nindow.gtx.closePath();
			
			// Draw task bar
			nindow.gtx.beginPath();
				nindow.gtx.rect(0,canvas.height - 64,canvas.width,64);
				
				if(nindow.blurredBackgroundPattern){
					nindow.gtx.fillStyle = nindow.blurredBackgroundPattern;

					nindow.gtx.fill();
				}
				
				nindow.gtx.fillStyle = "rgba(0,0,0,0.5)";
				
				nindow.gtx.fill();
			nindow.gtx.closePath();
			
			
			// Draw start button
			if(nindow.logo.loaded){
				nindow.gtx.drawImage(nindow.logo, 8, nindow.canvas.height-56, 48, 48);
			}
		}
	});
	
	// Display mouse cursor
	gtx.beginPath();
		gtx.shadowOffsetX = 0;
		gtx.shadowOffsetY = 0;
		gtx.shadowBlur = 4;
		gtx.shadowColor = "#000000";
	
		gtx.moveTo(nindow.mouse.x, nindow.mouse.y);
		gtx.lineTo(nindow.mouse.x+20, nindow.mouse.y+10);
		gtx.lineTo(nindow.mouse.x+10, nindow.mouse.y+10);
		gtx.lineTo(nindow.mouse.x+10, nindow.mouse.y+20);
		gtx.lineTo(nindow.mouse.x, nindow.mouse.y);
		
		gtx.fillStyle = "#ffffff";
		gtx.strokeStyle = "#000000";
		
		gtx.fill();
		
		ngl.disableShadows(gtx);
		gtx.stroke();
	gtx.closePath();
};

nindow.addWindow = function(title, position, size, visible, zIndex){
	var window = {};
	window.title = title;
	window.visible = visible;
	
	if(!size){
		throw new Error("Size isn't a valid");
	}
	
	if(position.x === null && position.y === null){
		position.x = nindow.canvas.width/2-size.width/2;
		position.y = nindow.canvas.height/2-size.height/2;
	}
	
	window.position = position;
	window.size = size;
	
	if(visible === undefined || visible === null){
		window.visible = true;
	}else{
		window.visible = false;
	}
	
	if(zIndex === undefined || zIndex === null){
		window.zIndex = nindow.windows.length;
	}else{
		window.zIndex = zIndex;
	}
	
	nindow.windows.splice(window.zIndex, 0, window);
	
	return window;
};

nindow.setBackground = function(back){
	if(typeof back == "string"){
		nindow.background = back;
		nindow.blurredBackground = null;
		nindow.blurredBackgroundPattern = null;
	}else if(typeof back == "object"){
		var blurredBack = ngl.blurImage(back, 0, 0, nindow.canvas.width, nindow.canvas.height, 8);
		nindow.blurredBackgroundPattern = nindow.gtx.createPattern(blurredBack, "no-repeat");
		nindow.background = back;
		
		delete blurredBack;
	}
};
