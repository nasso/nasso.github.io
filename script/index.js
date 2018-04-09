var el_main = document.getElementsByTagName("main")[0];
var el_content = document.getElementById("content");
var el_container = document.getElementById("container");

function loadContent(hash) {
	if(hash === "") {
		el_content.classList.toggle("active", false);
		el_main.classList.remove("hidden");
		el_main.classList.remove("animating");
		el_main.classList.add("animating");
	} else {
		el_main.classList.add("hidden");

		el_content.classList.toggle("active", false);

		setTimeout(function() {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				el_container.innerHTML = xhr.response;
				el_content.classList.toggle("active", true);
			};
			xhr.open("GET", "./content/about.html");
			xhr.send();
		}, 500);
	}
}

loadContent(window.location.hash);

window.addEventListener("hashchange", function() {
	loadContent(window.location.hash);
});
