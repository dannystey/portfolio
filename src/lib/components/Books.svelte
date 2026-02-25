<script lang="ts">
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    let container: HTMLDivElement;
    let { books } = $props();

    onMount(() => {
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
        camera.position.set(0, 1, 10);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 20);
        scene.add(directionalLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(5, 10, 10);
        scene.add(fillLight);
        let model = null;

        const bookModels: THREE.Group[] = [];

        // Load Model
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');

        const applyTextureToBook = (book: any, texture: THREE.Texture) => {
            if (book.model) {
                book.model.traverse((child: THREE.Object3D) => {
                    if (child instanceof THREE.Mesh && child.name === 'Cover') {
                        child.material = child.material.clone();
                        child.material.map = texture;
                        child.material.color.set(0xffffff);
                        child.material.needsUpdate = true;
                    }

                    if (child instanceof THREE.Mesh && child.name === 'Surrounding') {
                        child.material = new THREE.MeshMatcapMaterial();
                        child.material.color.set(book.gradientColors[0]);
                        child.material.needsUpdate = true;
                    }
                });
            }
        };

        books.forEach(book => {
            if (book.cover) {
                book.texture = textureLoader.load(book.cover, (texture) => {
                    texture.flipY = false;
                    applyTextureToBook(book, texture);
                });
            }
        });

        books = books.filter(b => b.cover && b.readingState.status == 'IS_READING');

        loader.load(
            '/models/book_v2.glb',
            (gltf) => {
                model = gltf.scene;
                
                // Center base model geometry
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.position.sub(center);
                    }
                });

                books.forEach((book, index) => {
                    const bookModel = model.clone();
                    book.model = bookModel;
                    
                    // Arrange books in a row
                    const spacing = 4.3;
                    const totalWidth = (books.length - 1) * spacing;
                    bookModel.position.x = (index * spacing) - (totalWidth / 2);

                    bookModel.position.y = 0;
                    bookModel.position.z = Math.sin(index * 0.5) * 2; // Add some depth variation
                    bookModel.rotation.y = Math.PI + (Math.random() - 0.5) * 0.8; // Slight random rotation

                    if (book.texture) {
                        applyTextureToBook(book, book.texture);
                    }
                    
                    scene.add(bookModel);
                    bookModels.push(bookModel);
                });
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the model:', error);
            }
        );

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            
            bookModels.forEach((m, i) => {
                const time = Date.now() * 0.001;
                // Subtle floating and rotating
                m.rotation.y = Math.PI + Math.sin(time * 0.5 + i) * 0.1;
                m.position.y = Math.sin(time + i * 0.5) * 0.2;
            });
            
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
