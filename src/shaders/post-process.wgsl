struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) texCoords: vec2f,
}

@vertex
fn vertexMain(
  @location(0) pos: vec2f, // xy
  @location(1) texCoords: vec2f, // uv
) -> VertexOut
{
  var output : VertexOut;

  output.position = vec4f(pos, 0.0, 1.0);
  output.texCoords = texCoords;

  return output;
}

@group(0) @binding(0)
var texSampler: sampler;

@group(0) @binding(1)
var tex: texture_2d<f32>;

@fragment
fn fragmentMain(fragData: VertexOut) -> @location(0) vec4f
{
  var screenTexture = textureSample(tex, texSampler, fragData.texCoords);
  // screenTexture.r *= 2.0;
  // screenTexture.g *= 0.8;
  // screenTexture.b *= 0.8;

  var avarage = (screenTexture.r + screenTexture.g + screenTexture.b) / 3.0;
  return vec4f(avarage, avarage, avarage, 1.0);
}
