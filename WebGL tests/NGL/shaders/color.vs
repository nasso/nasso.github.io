attribute vec3 vertexPosition;
attribute vec4 vertexColor;

uniform mat4 pvm;

varying lowp vec4 vColor;

void main(){
	vColor = vertexColor;
	
	gl_Position = pvm * vec4(vertexPosition, 1);
}
