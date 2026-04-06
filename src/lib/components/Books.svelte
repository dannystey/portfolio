<script lang="ts">
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { loadModels } from './books/loadModels';
    import { Dust } from './books/Dust';

    let container: HTMLDivElement;
    let { books } = $props();

    onMount(async () => {
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        // Position camera: centered, slightly from above
        camera.position.set(0, 8, 10);
        camera.lookAt(0, 8, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(7, 20, 40);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.bias = -0.0005;
        directionalLight.shadow.normalBias = 0.02;
        const d =25; // Adjusted frustum size
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        scene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(5, 10, 10);
        scene.add(fillLight);

        // Ground Plane
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        scene.add(ground);

        // Load Model

        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');

        books.forEach(book => {
            if (book.cover) {
                book.texture = textureLoader.load(book.cover, (texture) => {
                    texture.flipY = false;
                });
            }
        });

        const readingBooks = books.filter(b => b.cover && b.readingState.status == 'IS_READING');
        const bookModels = await loadModels(scene, readingBooks, books);

        scene.fog = new THREE.Fog( 0xf5f5f5, 15, 40);

        const dust = new Dust(scene);
        dust.add();

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            
            bookModels.forEach((m, i) => {
                const time = Date.now() * 0.001;
                // Subtle floating and rotating
                m.rotation.y = Math.PI + Math.sin(time * 0.5 + i) * 0.1;
                m.position.y = Math.sin(time + i * 0.5) * 0.2 + 8;
            });

            dust.animate();
            
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

<div bind:this={container} class="w-full h-full"></div>
