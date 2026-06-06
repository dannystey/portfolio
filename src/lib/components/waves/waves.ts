import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import waterVertexShader from '../../shaders/water/vertex.glsl'
import waterFragmentShader from '../../shaders/water/fragment.glsl'

export class Waves {
    private canvas: HTMLCanvasElement
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    private controls: OrbitControls
    private waterGeometry: THREE.PlaneGeometry
    private waterMaterial: THREE.ShaderMaterial
    private water: THREE.Mesh
    private clock: THREE.Clock
    private gui: GUI
    private animationFrameId = 0
    private raycaster = new THREE.Raycaster()
    private waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    private pointerTarget = new THREE.Vector2()
    private pointerActive = false
    private sunHeight = 1.6
    private sunInfluence = 0.4
    private introStartY = 5
    private introEndY = 1.5
    private introDuration = 2.5
    private sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    constructor(canvas: HTMLCanvasElement, showGui = false) {
        this.canvas = canvas

        // Debug GUI — hidden unless `showGui` is true; toggle at runtime with the "g" key.
        this.gui = new GUI({ width: 340 })
        if (!showGui) this.gui.hide()
        const debug = {
            depthColor: '#888',
            surfaceColor: '#e2e2e2',
            sunColor: '#ffffff',
            fogColor: '#fbfbff'
        }

        this.sizes.width = canvas.offsetWidth;
        this.sizes.height = canvas.offsetHeight;

        // Scene
        this.scene = new THREE.Scene()

        /**
         * Water
         */
        // Geometry
        this.waterGeometry = new THREE.PlaneGeometry(5, 5, 512, 512)

        // Material
        this.waterMaterial = new THREE.ShaderMaterial({
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            uniforms: {
                uTime: { value: 0 },

                uBigWavesElevation: { value: 0.02 },
                uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
                uBigWavesSpeed: { value: 0.75 },
                uBigWavesSteepness: { value: 0.6 },

                uSmallWavesElevation: { value: 0.075 },
                uSmallWavesFrequency: { value: 3 },
                uSmallWavesSpeed: { value: 0.25 },
                uSmallWavesIterations: { value: 4 },

                uDepthColor: { value: new THREE.Color(debug.depthColor) },
                uSurfaceColor: { value: new THREE.Color(debug.surfaceColor) },

                uColorOffset: { value: 0.08 },
                uColorMultiplier: { value: 5 },

                uSunDirection: { value: new THREE.Vector3(0.25, 0.31, -0.3) },
                uSunColor: { value: new THREE.Color(debug.sunColor) },
                uSunIntensity: { value: 2 },
                uSpecularPower: { value: 0 },
                uSpecularIntensity: { value: 0 },

                uFogEnabled: { value: true },
                uFogColor: { value: new THREE.Color(debug.fogColor) },
                uFogNear: { value: 2.5 },
                uFogFar: { value: 3 },

                uMouse: { value: new THREE.Vector2(0, 0) },
                uMouseStrength: { value: 0 },
                uMouseRadius: { value: 0.24 },
                uMouseElevation: { value: 0.35 }
            }
        })

        // Debug
        this.gui.add(this.waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
        this.gui.add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.01).name('uBigWavesFrequency.x')
        this.gui.add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.01).name('uBigWavesFrequency.y')
        this.gui.add(this.waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(10).step(0.01).name('uBigWavesSpeed')
        this.gui.add(this.waterMaterial.uniforms.uBigWavesSteepness, 'value').min(0).max(1).step(0.01).name('uBigWavesSteepness')

        this.gui.addColor(debug, 'depthColor').name('depthColor').onChange(() => {
            this.waterMaterial.uniforms.uDepthColor.value.set(debug.depthColor)
        })
        this.gui.addColor(debug, 'surfaceColor').name('surfaceColor').onChange(() => {
            this.waterMaterial.uniforms.uSurfaceColor.value.set(debug.surfaceColor)
        })
        this.gui.add(this.waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
        this.gui.add(this.waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
        this.gui.add(this.waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
        this.gui.add(this.waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
        this.gui.add(this.waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
        this.gui.add(this.waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')

        this.gui.addColor(debug, 'sunColor').name('sunColor').onChange(() => {
            this.waterMaterial.uniforms.uSunColor.value.set(debug.sunColor)
        })
        this.gui.add(this.waterMaterial.uniforms.uSunIntensity, 'value').min(0).max(3).step(0.01).name('uSunIntensity')
        this.gui.add(this.waterMaterial.uniforms.uSpecularPower, 'value').min(1).max(200).step(1).name('uSpecularPower')
        this.gui.add(this.waterMaterial.uniforms.uSpecularIntensity, 'value').min(0).max(5).step(0.01).name('uSpecularIntensity')
        this.gui.add(this, 'sunHeight').min(0.05).max(2).step(0.01).name('sunHeight')
        this.gui.add(this, 'sunInfluence').min(0).max(2).step(0.01).name('sunInfluence')

        this.gui.add(this.waterMaterial.uniforms.uFogEnabled, 'value').name('fog')
        this.gui.addColor(debug, 'fogColor').name('fogColor').onChange(() => {
            this.waterMaterial.uniforms.uFogColor.value.set(debug.fogColor)
        })
        this.gui.add(this.waterMaterial.uniforms.uFogNear, 'value').min(0).max(10).step(0.01).name('uFogNear')
        this.gui.add(this.waterMaterial.uniforms.uFogFar, 'value').min(0).max(20).step(0.01).name('uFogFar')

        this.gui.add(this.waterMaterial.uniforms.uMouseRadius, 'value').min(0.05).max(1.5).step(0.01).name('uMouseRadius')
        this.gui.add(this.waterMaterial.uniforms.uMouseElevation, 'value').min(0).max(0.5).step(0.001).name('uMouseElevation')

        // Mesh
        this.water = new THREE.Mesh(this.waterGeometry, this.waterMaterial)
        this.water.rotation.x = -Math.PI * 0.5
        this.scene.add(this.water)

        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        // Top-down: 'up' must not be parallel to the view direction, so flip it before lookAt.
        this.camera.position.set(0, this.introStartY, 0)
        //this.camera.up.set(0, 0, -1)
        this.camera.lookAt(0, 0, 0)
        this.scene.add(this.camera)

        // Controls (orbit disabled — fixed top-down view), kept for clean disposal.
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enabled = false

        // Mouse interaction
        window.addEventListener('pointermove', this.onPointerMove)
        document.addEventListener('pointerleave', this.onPointerLeave)
        window.addEventListener('keydown', this.onKeyDown)

        /**
         * Renderer
         */
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        })
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */
        this.clock = new THREE.Clock()

        window.addEventListener('resize', this.onResize)

        this.tick()
    }

    private onPointerMove = (e: PointerEvent) => {
        const rect = this.canvas.getBoundingClientRect()
        if (e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top || e.clientY > rect.bottom) {
            this.pointerActive = false
            return
        }

        const ndc = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
        )
        this.raycaster.setFromCamera(ndc, this.camera)

        const hit = new THREE.Vector3()
        if (this.raycaster.ray.intersectPlane(this.waterPlane, hit)) {
            this.pointerTarget.set(hit.x, hit.z)
            this.pointerActive = true
        }
    }

    private onPointerLeave = () => {
        this.pointerActive = false
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'g') this.gui.show(this.gui._hidden)
    }

    private onResize = () => {
        // Update sizes
        this.sizes.width = this.canvas.offsetWidth;
        this.sizes.height = this.canvas.offsetHeight;

        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        // Update renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    private tick = () => {
        const elapsedTime = this.clock.getElapsedTime()

        this.waterMaterial.uniforms.uTime.value = elapsedTime

        // Intro: ease the camera in from introStartY to introEndY
        const t = Math.min(elapsedTime / this.introDuration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        this.camera.position.y = this.introStartY + (this.introEndY - this.introStartY) * eased
        this.camera.lookAt(0, 0, 0)

        // Soft follow + fade of the mouse bump
        const m = this.waterMaterial.uniforms
        m.uMouse.value.lerp(this.pointerTarget, 0.1)
        const targetStrength = this.pointerActive ? 1 : 0
        m.uMouseStrength.value += (targetStrength - m.uMouseStrength.value) * 0.08

        // Sun follows the mouse: tilt its direction toward the cursor's XZ on the plane.
        m.uSunDirection.value
            .set(m.uMouse.value.x * this.sunInfluence, this.sunHeight, m.uMouse.value.y * this.sunInfluence)
            .normalize()

        // Render
        this.renderer.render(this.scene, this.camera)

        // Call tick again on the next frame
        this.animationFrameId = window.requestAnimationFrame(this.tick)
    }

    dispose() {
        window.cancelAnimationFrame(this.animationFrameId)
        window.removeEventListener('resize', this.onResize)
        window.removeEventListener('pointermove', this.onPointerMove)
        document.removeEventListener('pointerleave', this.onPointerLeave)
        window.removeEventListener('keydown', this.onKeyDown)

        this.controls.dispose()
        this.waterGeometry.dispose()
        this.waterMaterial.dispose()
        this.renderer.dispose()
        this.gui.destroy()
    }
}
