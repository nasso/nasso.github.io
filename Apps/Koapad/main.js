var chars = ("1234567890AZERTYUIOPQSDFGHJKLMWXCVBN,;:!").split("");
var keys;

function start(){
	keys = $(".key");
	
	for(var i = 0; i < keys.length; i++){
		var key = keys[i];
		
		key.innerHTML = '<span class="keyNumber">'+chars[i]+'</span>';
	}
}
