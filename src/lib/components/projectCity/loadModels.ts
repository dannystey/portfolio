import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadModels = () => {
    return new Promise((resolve, reject) => {
        let loadedFloor = false;
        let loadedRoof = false;
        let loadedGround = false;

        const loader = new GLTFLoader();
        const groundBuilding = new THREE.Group();
        const floor = new THREE.Group();
        const roof = new THREE.Group();

        const buildingMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.5,
            roughness: 1,
            side: THREE.DoubleSide,
            flatShading: true
        });

        const lightWindowMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffcc,
            flatShading: true,
            metalness: 0,
            roughness: 0.1,
            emissive: 0xffffaa,
            emissiveIntensity: 2,
            flatShading: true
        });
        const darkWindowMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, flatShading: true, metalness: 1, roughness: 0.5 });

        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, flatShading: true, metalness: 1, roughness: 0.5 });

        const building = new THREE.Group();

        const addToScene = () => {
            if (loadedFloor && loadedGround && loadedRoof) {
                resolve(building);
            }
        }

        loader.load(
            '/models/building-fragments-floor.glb',
            (gltf) => {
                gltf.scene.children.forEach(child => {

                    if(child.name === 'Building') {
                        // apply building material
                        child.material = buildingMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }

                    if (child.name === 'Windows') {
                        child.material = lightWindowMaterial;
                        child.receiveShadow = true;

                    }
                    if (child.name === 'Windows005') {
                        child.material = darkWindowMaterial;
                        child.receiveShadow = true;

                    }

                    if (child.name === 'Frame') {
                        child.material = frameMaterial;
                    }
                })

                gltf.scene.scale.set(0.5, 0.5, 0.5);
                gltf.scene.position.y = 0.5;
                gltf.scene.name = 'floor';
                building.add(gltf.scene);
                loadedFloor = true;
                addToScene();
            })

        loader.load(
            '/models/building-fragments-ground.glb',
            (gltf) => {
                gltf.scene.children.forEach(child => {

                    if(child.name === 'Building001') {
                        // apply building material
                        child.material = buildingMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }

                    if (child.name === 'Windows001') {
                        child.material = lightWindowMaterial;
                        child.receiveShadow = true;

                    }
                    if (child.name === 'Windows003') {
                        child.material = darkWindowMaterial;
                        child.receiveShadow = true;

                    }

                    if (child.name === 'Frame001') {
                        child.material = frameMaterial;
                    }
                })
                gltf.scene.scale.set(0.5, 0.5, 0.5);
                gltf.scene.name = 'ground';
                building.add(gltf.scene);
                loadedGround = true;
                addToScene();
            })

        loader.load(
            '/models/building-fragments-roof.glb',
            (gltf) => {
                gltf.scene.children.forEach(child => {

                    if(child.name === 'Building002') {
                        // apply building material
                        child.material = buildingMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }

                    if (child.name === 'Windows002') {
                        child.material = lightWindowMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;

                    }
                    if (child.name === 'Windows004') {
                        child.material = darkWindowMaterial;
                        child.castShadow = true;
                        child.receiveShadow = true;

                    }

                    if (child.name === 'Frame002') {
                        child.material = frameMaterial;
                        child.castShadow = true;
                    }
                })

                gltf.scene.scale.set(0.5, 0.5, 0.5);
                gltf.scene.name = 'roof';
                gltf.scene.position.y = 1;
                building.add(gltf.scene);
                loadedRoof = true;
                addToScene();
            })
    })



};