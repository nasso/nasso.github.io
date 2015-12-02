attribute vec3 vertexPosition;
attribute vec2 vertexTextureCoords;

uniform mat4 pvm;

varying highp vec2 vTextureCoords;

void main(){
	vTextureCoords = vertexTextureCoords;
	
	gl_Position = pvm * vec4(vertexPosition, 1);
}
