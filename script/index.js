const el_letter_paths = document.getElementsByClassName("letter-path");

// Reset dash array (animation)
setTimeout(function() {
	for(let i = 0; i < el_letter_paths.length; i++) {
		el_letter_paths[i].classList.remove("animating");
	}
}, 3000);
