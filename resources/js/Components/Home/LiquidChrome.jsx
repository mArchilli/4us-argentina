import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Desktop: 4-sample AA, 8 iterations
const fragmentShaderDesktop = `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec3 uBaseColor;
  uniform float uAmplitude;
  uniform float uFrequencyX;
  uniform float uFrequencyY;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec3 renderImage(vec2 uvCoord) {
      vec2 fragCoord = uvCoord * uResolution.xy;
      vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);
      for (float i = 1.0; i < 8.0; i++){
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
      }
      vec2 diff = (uvCoord - uMouse);
      float dist = length(diff);
      float falloff = exp(-dist * 20.0);
      float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
      uv += (diff / (dist + 0.0001)) * ripple * falloff;
      return uBaseColor / abs(sin(uTime - uv.y - uv.x));
  }

  void main() {
      float px = 1.0 / min(uResolution.x, uResolution.y);
      vec3 col = renderImage(vUv)
               + renderImage(vUv + vec2(px, 0.0))
               + renderImage(vUv + vec2(0.0, px))
               + renderImage(vUv + vec2(px, px));
      gl_FragColor = vec4(col * 0.25, 1.0);
  }
`;

// Mobile: NO AA, 5 iterations, no mouse ripple
const fragmentShaderMobile = `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec3 uBaseColor;
  uniform float uAmplitude;
  uniform float uFrequencyX;
  uniform float uFrequencyY;
  varying vec2 vUv;

  void main() {
      vec2 fragCoord = vUv * uResolution.xy;
      vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);
      for (float i = 1.0; i < 5.0; i++){
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime);
      }
      vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
      gl_FragColor = vec4(color, 1.0);
  }
`;

export const LiquidChrome = ({
  baseColor = [0.557, 1.0, 0.443],
  speed = 0.2,
  amplitude = 0.5,
  frequencyX = 3,
  frequencyY = 2,
  interactive = true,
  quality = 'auto',
  maxFps = 60,
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 900px)').matches;
    const isLowPower = prefersReducedMotion || isSmallScreen;

    let renderScale = 1;
    if (quality === 'low') renderScale = 0.4;
    if (quality === 'medium') renderScale = 0.65;
    if (quality === 'high') renderScale = 1;
    if (quality === 'auto') renderScale = isLowPower ? 0.4 : 0.75;

    const targetFps = isLowPower ? Math.min(24, maxFps) : Math.min(30, maxFps);
    const effectiveInteractive = interactive && !isLowPower;

    const renderer = new Renderer({ antialias: false });
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const chosenFragment = isLowPower ? fragmentShaderMobile : fragmentShaderDesktop;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
      },
      uBaseColor: { value: new Float32Array(baseColor) },
      uAmplitude: { value: amplitude },
      uFrequencyX: { value: frequencyX },
      uFrequencyY: { value: frequencyY },
    };
    if (!isLowPower) {
      uniforms.uMouse = { value: new Float32Array([0, 0]) };
    }

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: chosenFragment,
      uniforms,
    });
    const mesh = new Mesh(gl, { geometry, program });

    gl.canvas.style.position = 'absolute';
    gl.canvas.style.inset = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    container.appendChild(gl.canvas);

    let resizeTimer;
    function resize() {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (!w || !h) return;
      gl.canvas.width = Math.round(w * renderScale);
      gl.canvas.height = Math.round(h * renderScale);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      const resUniform = program.uniforms.uResolution.value;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }

    function debouncedResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    const resizeObserver = new ResizeObserver(() => debouncedResize());
    resizeObserver.observe(container);
    window.addEventListener('resize', debouncedResize);
    resize();

    function handleMouseMove(event) {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const mouseUniform = program.uniforms.uMouse.value;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    if (effectiveInteractive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animationId;
    let lastFrameTime = 0;
    let isVisible = true;
    const frameDuration = 1000 / Math.max(1, targetFps);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    function update(t) {
      animationId = requestAnimationFrame(update);
      if (!isVisible) return;
      if (t - lastFrameTime < frameDuration) return;
      lastFrameTime = t;
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedResize);
      if (effectiveInteractive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return <div ref={containerRef} className="relative w-full h-full" {...props} />;
};

export default LiquidChrome;
