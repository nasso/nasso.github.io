attribute vec3 vertexPosition;

uniform mat4 pvFixed;

varying highp vec3 vDirection;

void main(){
	vDirection = normalize(vertexPosition);
	
	gl_Position = pvFixed * vec4(vertexPosition, 1);
}
