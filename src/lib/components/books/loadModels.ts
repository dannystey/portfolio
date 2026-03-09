import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadModels = async (scene: THREE.Scene, readingBooks, books) => {
    const bookModels: THREE.Group[] = [];
    const backgroundGroup = new THREE.Group();
    const model = await loadBookModels();

    const completedBooks = books.filter(book => book.readingState.status === 'FINISHED');

    // place a book on the ground
    const backgroundBook = model.clone();
    backgroundBook.position.y = 0.5;
    backgroundBook.position.z = 0;
    backgroundBook.position.x = 0;

    backgroundBook.rotation.y = Math.PI;
    backgroundBook.rotation.x = -Math.PI / 2;
    //backgroundBook.rotation.z = Math.P;
    backgroundBook.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            //child.material = new THREE.MeshStandardMaterial({ color: 0x333333 });
            child.castShadow = true;
        }
    });

    completedBooks[1].model = backgroundBook;
    applyTextureToBook(completedBooks[1], completedBooks[1].texture);
    const backgroundBook2 = backgroundBook.clone();
    backgroundBook2.position.y = 1.5;
    backgroundBook2.rotation.z = Math.PI + 0.1;
    completedBooks[0].model = backgroundBook2;
    applyTextureToBook(completedBooks[0], completedBooks[0].texture);

    backgroundGroup.add(backgroundBook2);
    backgroundGroup.add(backgroundBook);

    const backgroundGroup2 = backgroundGroup.clone();

    backgroundGroup2.children.forEach((child, index) => {
        if (index === 0) {
            child.rotation.z = Math.PI - 0.1;
            completedBooks[3].model = child;
            child.castShadow = true;
            applyTextureToBook(completedBooks[3], completedBooks[3].texture);
        }
        if (index === 1) {
            child.rotation.z = Math.PI + 0.2;
            completedBooks[2].model = child;
            child.castShadow = true;
            applyTextureToBook(completedBooks[2], completedBooks[2].texture);
        }
    })

    backgroundGroup.position.x = 12;
    backgroundGroup2.position.x = -12;
    backgroundGroup.position.z = -6;
    backgroundGroup2.position.z = -6;
    backgroundGroup2.rotation.y = -Math.PI * 0.2;
    scene.add(backgroundGroup);
    scene.add(backgroundGroup2);

    readingBooks.forEach((book, index) => {
        const bookModel = model.clone();
        book.model = bookModel;

        // Arrange books in a row
        const spacing = 4.3;
        const totalWidth = (readingBooks.length - 1) * spacing;
        bookModel.position.x = (index * spacing) - (totalWidth / 2);

        bookModel.position.y = 0;
        bookModel.position.z = Math.sin(index * 0.5) * 2; // Add some depth variation
        bookModel.rotation.y = Math.PI + (Math.random() - 0.5) * 0.8; // Slight random rotation

        if (book.texture) {
            applyTextureToBook(book, book.texture);
        }

        bookModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });

        scene.add(bookModel);
        bookModels.push(bookModel);
    });

    return bookModels;
}

const applyTextureToBook = (book: any, texture: THREE.Texture) => {
    if (book.model) {
        texture.colorSpace = THREE.SRGBColorSpace;
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

export const loadBookModels =  () => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            '/models/book_v2.glb',
            (gltf) => {
                const model = gltf.scene;
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.position.sub(center);
                    }
                });
                resolve(model);
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the model:', error);
            }
        );
    })
}