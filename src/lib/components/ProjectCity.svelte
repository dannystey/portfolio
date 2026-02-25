<script lang="ts">
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { createNoise2D } from 'simplex-noise';

    import type { TogglProject } from '$lib/server/toggl';
    import { loadModels } from './projectCity/loadModels';

    let container: HTMLDivElement;
    let { projects }: {projects: TogglProject[]} = $props();

    onMount(async () => {
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        // Position camera: centered, slightly from above
        camera.position.set(0, 8, 35);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // fog
        scene.fog = new THREE.Fog( 0xffffff, 10, 60);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.bias = -0.0005;
        directionalLight.shadow.normalBias = 0.02;
        const d = 20; // Adjusted frustum size
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        scene.add(directionalLight);

        let model = null;
        // Perlin Noise Setup (fBm - Fractional Brownian Motion)
        const noise2D = createNoise2D();
        // Settings for Heightmap
        const noiseScale = 0.03;
        const noiseAmplitude = 14;
        const octaves = 5;
        const persistence = 0.5;
        const lacunarity = 2.0;

        const influenceRadius = 15; // Ab diesem Radius beginnt die Heightmap
        const smoothTransition = 15; // Übergangszone von flach zu Heightmap

        // ground
        const groundSize = 100;
        const groundSegments = 128; // Increased for more detail
        const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize, groundSegments, groundSegments);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: false,
            flatShading: false // Better for mountain-like look
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.receiveShadow = true;
        ground.needsUpdate = true;
        ground.rotation.x = -Math.PI / 2;

        // --- LOAD Building Fragments
        const building = await loadModels();

        const vertices = groundGeometry.attributes.position.array;

        const cityModels: THREE.Group = new THREE.Group();
        const placedBuildings: { x: number, z: number, size: number }[] = [];
        const minDistance = 0.5; // Mindestabstand zwischen den Gebäuden

        const setHeightOfBuilding = (group: THREE.Group, floors: number) => {
            group.children.forEach(child => {
                if(child.name == 'floor') {
                    for(let i = 0; i < floors; i++) {
                        const floorMesh = child.clone();
                        floorMesh.position.y = (1+ i) * 0.5;
                        const rand = Math.round(Math.random() * 4) * Math.PI / 2;
                        floorMesh.rotation.y = rand;
                        group.add(floorMesh);
                    }
                    child.visible = false;
                }
                if(child.name == 'roof') {
                    child.position.y = (1+floors) * 0.5;
                }
            })
        }

        // every project is a building as box
        projects = projects.filter(p => p.actual_hours);
        let i = 0;
        const gridWidth = Math.ceil(Math.sqrt(projects.length));
        while(projects.length) {
            const project = projects.pop();
            i++;

            // every 20 hours is adds a floor so
            const floors  = Math.floor(project.actual_hours / 20);

            const sizeX = 0.6 + Math.random() * 0.4;
            const sizeZ = 0.6 + Math.random() * 0.4;
            const buildingRadius = Math.max(sizeX, sizeZ) / 2;

            const mesh = building.clone();
            setHeightOfBuilding(mesh, Math.min(10, floors));

            let x = ((i % gridWidth) - gridWidth / 2) * 2;
            let z = (Math.floor(i / gridWidth) - gridWidth / 2) * 2;
            let placed = false;
            let attempts = 0;
            const maxAttempts = 50;

            // Position setzen
            mesh.position.set(x, 0, z);
            placedBuildings.push({ x, z, size: buildingRadius });

            // Gebäude auf den Boden setzen (Y ist die Mitte der Box)
            const rand = Math.round(Math.random() * 4) * Math.PI / 2;
            mesh.rotation.y = rand;

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            cityModels.add(mesh);
        }

        scene.add(cityModels);

        function getFBMNoise(x: number, y: number) {
            let total = 0;
            let frequency = noiseScale;
            let amplitude = 1;
            let maxValue = 0;
            for (let i = 0; i < octaves; i++) {
                // Using simplex noise in octaves
                total += (noise2D(x * frequency, y * frequency) + 1) / 2 * amplitude;
                maxValue += amplitude;
                amplitude *= persistence;
                frequency *= lacunarity;
            }
            // Normalize and apply power for sharper peaks
            let noiseValue = total / maxValue;
            return Math.pow(noiseValue, 2.5); // Increase power for more defined mountains
        }

        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];
            
            // Abstand vom Zentrum (0,0)
            const distance = Math.sqrt(x * x + y * y);
            
            // FBM Noise Wert berechnen
            const noise = getFBMNoise(x, y) * noiseAmplitude;
            
            // Einflussfaktor basierend auf Radius und Übergang berechnen
            let influence = 1;
            const transitionStart = influenceRadius;
            const transitionEnd = influenceRadius + smoothTransition;
            
            if (distance < transitionStart) {
                // Innerhalb des flachen Bereichs in der Mitte (für die Stadt)
                influence = 0;
            } else if (distance < transitionEnd) {
                // Übergang von flach (Mitte) zu Heightmap
                influence = (distance - transitionStart) / smoothTransition;
                influence = THREE.MathUtils.smoothstep(influence, 0, 1);
            } else {
                // Außerhalb der Übergangszone: Volle Heightmap
                influence = 1;
            }
            
            // Vertex Z-Position (Höhe) manipulieren
            vertices[i + 2] = (noise * influence);
        }
        
        groundGeometry.computeVertexNormals();
        scene.add(ground);

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            //camera.position.z -= 0.005 * Math.cos(Date.now() / 1000);
            camera.position.y -= 0.005 * Math.sin(Date.now() / 1000);

            // full circle rotation
            camera.position.x = 20 * Math.cos(Date.now() / 12000);
            camera.position.z = 15 * Math.sin(Date.now() / 12000);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            // Optional: dispose geometries and materials if needed
        };
    });
</script>

<div class="w-full min-h-[calc(100vh-96px)] mb-12 rounded-[4rem] overflow-hidden px-5 relative">
    <div bind:this={container} class="absolute inset-0"></div>
</div>
