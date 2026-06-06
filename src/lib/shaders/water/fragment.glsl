uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

uniform vec3 uSunDirection;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uSpecularPower;
uniform float uSpecularIntensity;

uniform bool uFogEnabled;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 L = normalize(uSunDirection);
  vec3 H = normalize(L + V);

  // Base water color by height
  float mixStrength = clamp((vElevation + uColorOffset) * uColorMultiplier, 0.0, 1.0);
  vec3 baseColor = mix(uDepthColor, uSurfaceColor, mixStrength);

  // Diffuse (softened — water is not Lambertian-harsh)
  float diffuse = clamp(dot(N, L), 0.0, 1.0) * 0.5 + 0.5;
  vec3 sun = uSunColor * uSunIntensity;
  vec3 color = baseColor * diffuse * sun;

  // Blinn-Phong specular sun glint
  float spec = pow(clamp(dot(N, H), 0.0, 1.0), uSpecularPower);
  color += spec * uSpecularIntensity * sun;

  // Fresnel sheen toward the surface/sky color at grazing angles
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
  color = mix(color, uSurfaceColor, fresnel * 0.6);

  // Distance fog: fade toward the fog color so far waves blend into the background
  if (uFogEnabled) {
    float fogDistance = length(cameraPosition - vWorldPosition);
    float fogFactor = clamp((fogDistance - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
    color = mix(color, uFogColor, fogFactor);
  }

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
