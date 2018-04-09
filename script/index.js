var el_main = document.getElementsByTagName("main")[0];
var el_content = document.getElementById("content");
var el_container = document.getElementById("container");
var ell_main_focusable = document.querySelectorAll("main .focusable");
var ell_content_focusable = [];

function unblurMain() {
	for(var i = 0; i < ell_main_focusable.length; i++) {
		ell_main_focusable[i].setAttribute("tabindex", "");
	}
}

function blurMain() {
	for(var i = 0; i < ell_main_focusable.length; i++) {
		ell_main_focusable[i].setAttribute("tabindex", "-1");
	}
}

function blurContent() {
	for(var i = 0; i < ell_content_focusable.length; i++) {
		ell_content_focusable[i].setAttribute("tabindex", "-1");
	}
	
	ell_content_focusable = [];
}

function unblurContent() {
	var ell_this_focusable = document.querySelectorAll("#content .focusable");
	
	for(var i = 0; i < ell_this_focusable.length; i++) {
		var el = ell_this_focusable[i];
		el.setAttribute("tabindex", "0");
		
		ell_content_focusable.push(el);
	}
}

function loadContent(hash) {
	var hashname = hash.substr(1);
	
	if(hashname === "") {
		// Hide content if it isn't already
		el_content.classList.toggle("active", false);
		
		// Show the main menu, launching the animation if it didn't play already
		el_main.classList.remove("hidden");
		el_main.classList.add("animating");
		
		// Make main menu focusable
		unblurMain();
	} else {
		// Make main menu not focusable
		blurMain();
		
		// Clear any previous focusable elements
		blurContent();
		
		// Hide main menu
		el_main.classList.add("hidden");
		
		// Hide previous content?
		el_content.classList.toggle("active", false);
		
		setTimeout(function() {
			if(hash !== window.location.hash) return;
			
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				if(hash !== window.location.hash) return;
				
				el_container.innerHTML = xhr.responseText;
				el_content.classList.toggle("active", true);
				
				// Make content focusable
				unblurContent();
			};
			xhr.responseType = "text";
			xhr.open("GET", "./content/" + hashname + ".html");
			xhr.send();
		}, 500);
	}
}

loadContent(window.location.hash);

window.addEventListener("hashchange", function() {
	loadContent(window.location.hash);
});
