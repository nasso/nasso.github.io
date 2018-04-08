uniform lowp vec4 color;
uniform highp vec3 lightDirection;
uniform highp mat4 normalMatrix;

uniform lowp float shadeless;

varying lowp vec2 vTextureCoords;
varying highp vec3 vPosition;
varying highp vec3 vNormal;

void main(){
	if(shadeless > 0.5){
		gl_FragColor = color;
		
		return;
	}
	
	highp vec3 transformedNormal = normalize((normalMatrix * vec4(vNormal.xyz, 1.0)).xyz);
	
	highp vec3 toLightVector = lightDirection * -1.0;
	highp float cosTheta = clamp(dot(transformedNormal, toLightVector), 0.0, 1.0);
	
	lowp vec4 ambientColor = vec4(0.1, 0.1, 0.1, color.a);
	
	gl_FragColor = 
		ambientColor +
		color * cosTheta;
}
