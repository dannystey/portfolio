import * as THREE from 'three';

export class Dust {

    private geometry: THREE.BufferGeometry;
    private material: THREE.PointsMaterial;
    private texture: THREE.Texture;
    private particles: THREE.Points;
    private initialColors: Float32Array;
    private flashOffsets: Float32Array;
    private count = 6000;

    constructor(private scene: THREE.Scene) {

    }

    add() {
        this.createTexture();
        this.createGeometry();
        this.createMaterial();

        this.scene.add(this.particles);
    }

    animate() {
        this.particles.rotation.y += 0.0001;
        this.particles.rotation.x += 0.0001;

        const colors = this.geometry.attributes.color.array as Float32Array;
        const time = Date.now() * 0.001;

        for (let i = 0; i < this.count; i++) {
            const i3 = i * 3;
            // Ein individueller Faktor basierend auf Zeit und Offset
            // Wir nutzen sin^8, damit es nur ab und zu kurz aufblinkt (vereinzelte Blitze)
            const flash = Math.pow(Math.sin(time * 0.5 + this.flashOffsets[i]), 8);

            // Interpolieren zwischen Ursprungsfarbe und Weiß (1.0)
            colors[i3] = this.initialColors[i3] + (1.0 - this.initialColors[i3]) * flash;
            colors[i3 + 1] = this.initialColors[i3 + 1] + (1.0 - this.initialColors[i3 + 1]) * flash;
            colors[i3 + 2] = this.initialColors[i3 + 2] + (1.0 - this.initialColors[i3 + 2]) * flash;
        }

        this.geometry.attributes.color.needsUpdate = true;
    }

    createGeometry() {
        const particlesGeometry  = new THREE.BufferGeometry();
        const positions = new Float32Array(this.count * 3);
        const colors = new Float32Array(this.count * 3);
        this.initialColors = new Float32Array(this.count * 3);
        this.flashOffsets = new Float32Array(this.count);

        const colorBase = 0.3 + (Math.random() * 0.5);

        for( let i = 0; i < this.count ; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;

            colors[i3] = colorBase;
            colors[i3 + 1] = colorBase;
            colors[i3 + 2] = colorBase;

            this.initialColors[i3] = colorBase;
            this.initialColors[i3 + 1] = colorBase;
            this.initialColors[i3 + 2] = colorBase;

            this.flashOffsets[i] = Math.random() * Math.PI * 2;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        this.geometry = particlesGeometry;
    }

    createMaterial() {
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            alphaMap: this.texture,
            transparent: true,
            //alphaTest: 0.001
            // depthTest: true,
            depthWrite: false,
            //blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        const particles = new THREE.Points(this.geometry, particlesMaterial)

        this.particles = particles;
    }

    createTexture() {
        const textureLoader = new THREE.TextureLoader()
        this.texture = textureLoader.load('/textures/particles/3.png')
    }
}