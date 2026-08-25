"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's layer field.
 *
 * The contour shader is adapted from ThreeUI's TopoField
 * (@designcodeio/threeui — MIT, Copyright (c) 2026 Meng To; full notice in
 * THIRD-PARTY-NOTICES.md). It draws stacked contour bands from simplex noise
 * over a fine grid. Those contours are not decoration here — a slicer turns a
 * 3D model into exactly this, a stack of closed contour paths, one per layer,
 * and this shop's price list is denominated in layer heights.
 *
 * Why the shader is vendored rather than imported: ThreeUI ships each component
 * as an <iframe srcDoc> wrapping the original demo page, which pulls
 * cdn.tailwindcss.com and five api.iconify.design requests at runtime — measured
 * — for chrome that is cropped out and never rendered. The shader itself needs
 * none of it: three uniforms, no library, 5KB. Running it directly means zero
 * third-party requests on the most important page, and the colour is ours to
 * set instead of a CSS hue-rotate over someone else's palette.
 *
 * The one addition to the original: a build sweep. A soft band rises through the
 * field the way a print head climbs a part, warming the contours just behind it
 * to the brand orange before they cool back to grey. Ambient, never a claim
 * about a real job — the shop's motion vocabulary, not a fake dashboard.
 */

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_dpr;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = st;
  p.x *= aspect;

  // Print-bed grid, one physical pixel wide at any DPR.
  float gridSize = 52.0 * u_dpr;
  vec2 gridFract = fract(gl_FragCoord.xy / gridSize);
  float lineThickness = 1.0 / gridSize;
  float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);
  gridLines = clamp(gridLines, 0.0, 1.0) * 0.10;

  // Contour bands. numBands is the layer count: more bands, finer layer lines.
  float noiseScale = 1.25;
  vec2 noisePos = p * noiseScale + vec2(u_time * 0.012, u_time * 0.018);
  float n = snoise(noisePos) * 0.5 + 0.5;
  float numBands = 17.0;
  float bandVal = n * numBands;
  float triangleWave = abs(fract(bandVal) - 0.5) * 2.0;
  float topoLines = smoothstep(0.025, 0.0, triangleWave);

  // The build sweep: a print head climbing the part, ~22s per pass, always
  // upward because that is the only direction a print goes. It carries a short
  // warm trail rather than leaving everything below it lit — a full field of
  // orange would have to snap back to grey at the end of each pass, and the
  // trail is what actually reads as "this layer, just laid down". Both ends of
  // the cycle fade out, so the wrap is invisible.
  float head = fract(u_time * 0.045);
  float cycleFade = smoothstep(0.0, 0.10, head) * smoothstep(1.0, 0.90, head);
  float atHead = smoothstep(0.045, 0.0, abs(st.y - head)) * cycleFade;
  float trail = smoothstep(0.28, 0.0, head - st.y) * step(st.y, head) * cycleFade;

  vec3 hot     = vec3(0.976, 0.451, 0.086); // #f97316, the one brand accent
  vec3 pending = vec3(0.30, 0.31, 0.35);

  vec3 lineColor = mix(pending, hot, clamp(trail * 0.85 + atHead, 0.0, 1.0));

  vec3 color = vec3(0.0);
  color += vec3(1.0) * gridLines;
  color += lineColor * topoLines * 0.85;
  color += hot * atHead * 0.05;         // faint bloom at the head itself

  // Vignette, so the type above always has a quiet ground to sit on.
  float vig = smoothstep(1.15, 0.25, length(st - 0.5));
  color *= vig;

  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LayerField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Under reduced motion the static gradient underneath is the whole design.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uDpr = gl.getUniformLocation(program, "u_dpr");

    // Cap DPR: this is an ambient background, and a retina phone rendering it
    // at 3x is spending battery no one can see the benefit of.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uDpr, dpr);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Only run while the hero is actually on screen and the tab is visible.
    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) loop(performance.now());
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let frame = 0;
    let running = false;
    const start = performance.now();

    function loop(now: number) {
      running = true;
      if (!onScreen || document.hidden) {
        running = false;
        return;
      }
      gl!.uniform1f(uTime, (now - start) * 0.001);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (!document.hidden && onScreen && !running) loop(performance.now());
    };
    document.addEventListener("visibilitychange", onVisibility);

    loop(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
