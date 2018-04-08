uniform sampler2D fontTexture;
uniform lowp float hasFontTexture;

uniform lowp vec4 color;

uniform lowp float charWidth;
uniform lowp float glowness;

varying highp vec2 vTextureCoords;

void main(){
	if(hasFontTexture > 0.5){
		highp float textureValue = 1.0-texture2D(fontTexture, vTextureCoords).a;
		highp float innerValue = 1.0-smoothstep(charWidth, charWidth+glowness, textureValue);
		
		gl_FragColor = vec4(color.xyz, innerValue);
	}else{
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
}
