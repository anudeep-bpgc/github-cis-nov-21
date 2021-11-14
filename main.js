// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://cdn.skypack.dev/three@0.134.0'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosVertexShader from './shaders/atmosVertex.glsl'
import atmosFragmentShader from './shaders/atmosFragment.glsl'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.append(renderer.domElement);

// render a sphere //
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    /*new THREE.MeshBasicMaterial({
        // color: 0xFF0000,
        map: new THREE.TextureLoader().load('./img/earth.jpg')
    })*/
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./img/earth.jpg')

            }
        }
    })
);

scene.add(sphere);

// render a sphere //
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosVertexShader,
        fragmentShader: atmosFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //    mesh.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    atmosphere.rotation.y += 0.005;
}

animate();
