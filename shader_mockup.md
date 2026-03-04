### React component mockup - Modern - animated:

```typescript
import React, { useEffect, useRef, useState } from "react"
import { Monitor, Smartphone, Tablet, ExternalLink, Info } from "lucide-react"

/**
 * ShaderAnimation Component
 * Logic: Dynamically loads Three.js and initializes a custom fragment shader 
 * that mimics flowing architectural lines or neon topography.
 */
function ShaderAnimation() {
  const containerRef = useRef(null)
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    // Load Three.js dynamically via CDN for standalone execution
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
    script.async = true
    
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS()
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup resources on unmount
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = () => {
    const { renderer, uniforms, camera } = sceneRef.current
    if (renderer && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }
  }

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return

    const THREE = window.THREE
    const container = containerRef.current
    container.innerHTML = ""

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    
    // Geometry covering the full screen
    const geometry = new THREE.PlaneBufferGeometry(2, 2)

    // Uniforms for time-based animation and resolution scaling
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
      }
      
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        // Mosaic scaling for the "grid" feel
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0012; // Slightly thicker lines for visibility

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            // Creating nested orbital-like lines
            color[j] += lineWidth * float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));        
          }
        }

        gl_FragColor = vec4(color[2], color[1], color[0], 1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: null }

    handleResize()
    window.addEventListener("resize", handleResize, false)

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.03
      renderer.render(scene, camera)
    }
    animate()
  }

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}

/**
 * Main App Component
 * Structure: Header, Hero with Shader, and Info Cards
 */
export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="text-xl font-bold tracking-widest uppercase">
          Muhamad <span className="text-blue-500">Design</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="hover:text-white transition-colors">AI Research</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-all">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="p-4 md:p-8">
        <div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-black shadow-2xl">
          {/* Background Shader */}
          <ShaderAnimation />
          
          {/* Content Overlay */}
          <div className="z-10 flex flex-col items-center text-center space-y-6 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Generative Architecture
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1]">
              SHADED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                LUMINANCE
              </span>
            </h1>
            
            <p className="max-w-md text-neutral-400 text-lg leading-relaxed">
              Integrating algorithmic aesthetics into modern Saudi Arabian architectural concepts.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                Explore Project <ExternalLink size={18} />
              </button>
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors">
                View Source
              </button>
            </div>
          </div>

          {/* Bottom Bar Decor */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">
              Rendered with WebGL 2.0 <br />
              Frame: Dynamic_001
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Monitor size={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Smartphone size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 space-y-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl w-fit">
              <Info className="text-blue-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold">Dynamic Geometry</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              This shader utilizes fragment processing to calculate real-time distance fields, creating an organic "pulse" that reacts to time.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 space-y-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl w-fit">
              <Tablet className="text-purple-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold">Architectural Intent</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Designed as a background for high-end digital twins or architectural walkthroughs in the Riyadh tech hub.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 space-y-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl w-fit">
              <Monitor className="text-emerald-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold">Optimization</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Low-overhead WebGL execution ensuring smooth 60FPS performance across desktop and mobile browsers.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-20 p-8 border-t border-white/5 text-center text-neutral-500 text-sm">
        © 2025 Muhamad Architectural Design. All Rights Reserved.
      </footer>
    </div>
  )
}
```