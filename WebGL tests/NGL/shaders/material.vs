attribute vec3 vertexPosition;
attribute vec2 vertexTextureCoords;
attribute vec3 vertexNormal;

uniform mat4 pvm;

varying lowp vec2 vTextureCoords;
varying highp vec3 vPosition;
varying highp vec3 vNormal;

void main(){
	highp vec4 position = pvm * vec4(vertexPosition, 1);
	
	vTextureCoords = vertexTextureCoords;
	vNormal = vertexNormal;
	vPosition = position.xyz;
	
	gl_Position = position;
}
