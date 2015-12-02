uniform sampler2D diffuseTexture;
uniform sampler2D normalTexture;
uniform sampler2D specularTexture;
uniform samplerCube skybox;

uniform lowp float hasDiffuseTexture;
uniform lowp float hasNormalTexture;
uniform lowp float hasSpecularTexture;
uniform lowp float hasSkybox;

uniform lowp vec4 color;
uniform highp vec3 lightDirection;
uniform highp mat4 normalMatrix;
uniform highp vec3 cameraPosition;

uniform lowp float hardness;
uniform lowp float shiness;
uniform lowp float reflectivity;

uniform lowp float shadeless;

varying lowp vec2 vTextureCoords;
varying highp vec3 vPosition;
varying highp vec3 vNormal;

void main(){
	lowp vec4 textureColor = vec4(1.0, 1.0, 1.0, 1.0);
	
	if(hasDiffuseTexture > 0.5){
		textureColor = texture2D(diffuseTexture, vTextureCoords);
	}
	
	if(shadeless > 0.5){
		gl_FragColor = textureColor * color;
		
		return;
	}
	
	highp vec3 transformedNormal = normalize((normalMatrix * vec4(vNormal.xyz, 1.0)).xyz);
	
	highp vec3 toLightVector = lightDirection * -1.0;
	highp float cosTheta = clamp(dot(transformedNormal, toLightVector), 0.0, 1.0);
	
	highp vec3 cameraToHere = normalize(vPosition - cameraPosition);
	highp vec3 reflectDirection = reflect(cameraToHere, transformedNormal);
	lowp float specular = clamp(dot(reflectDirection, toLightVector), 0.0, 1.0);
	specular = specular * shiness;
	specular = pow(specular, hardness);
	lowp vec3 specularColor = vec3(specular);
	
	lowp vec4 ambientColor = vec4(0.1, 0.1, 0.1, 1.0);
	
	gl_FragColor = 
		ambientColor +
		vec4(specularColor, 1.0) * cosTheta +
		textureColor * color * cosTheta;
}
