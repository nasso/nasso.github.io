uniform samplerCube cubemap;
uniform lowp vec4 skycolor;

varying highp vec3 vDirection;

void main(){
	gl_FragColor = skycolor;
}
