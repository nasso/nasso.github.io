attribute vec3 vertexPosition;
attribute vec3 vertexNormal;
attribute vec2 vertexTextureCoords;

uniform mat4 pvm;

varying lowp vec2 vTextureCoords;
varying highp vec3 vPosition;
varying highp vec3 vNormal;

void main(){
	highp vec4 position = pvm * vec4(vertexPosition, 1);
	
	vNormal = vertexNormal;
	vPosition = position.xyz;
	vTextureCoords = vertexTextureCoords;
	
	gl_Position = position;
}
