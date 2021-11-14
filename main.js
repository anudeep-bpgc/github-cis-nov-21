// Find the latest version by visiting https://cdn.skypack.dev/three.
import gsap from 'gsap'
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

var styles = {
    position: 'fixed',
    left: (window.innerWidth / 2 - 50) + 'px',
    top: (window.innerHeight / 2 - 50) + 'px',
    height: '100px',
    width: '100px'
};
var ctrlObj = document.getElementById('ctrlObj1');
Object.assign(ctrlObj.style, styles);
//console.log();


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

//scene.add(sphere);

// add pin

let pin = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.10, 50, 50),
    //    new THREE.MeshBasicMaterial({color: 0x80f004})
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);

// lat: 15.2993° N long: 74.1240° E
var lat = 15.2993,
    lon = 74.1240,
    radius = 5,
    x = ((radius) * Math.cos(lon)),
    y = -((radius) * Math.cos(lat) * Math.cos(lon)),
    z = ((radius) * Math.sin(lon));
//console.log(x + ' ' + y + ' ' + z);
pin.position.set(x, y, z);

const sphereGroup = new THREE.Group();
sphereGroup.add(sphere);
sphereGroup.add(pin);
scene.add(sphereGroup);


// render a atmosphere //
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

const group = new THREE.Group();
group.add(sphereGroup);
scene.add(group);




camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //    console.log('rotation y '+sphereGroup.rotation.y);
    if (mouseActions.clicked) {
    } else {
        sphereGroup.rotation.y += 0.025;
//        sphereGroup.rotation.y = 3.5;
        gsap.to(group.rotation, {
            y: mouse.x * Math.sign(mouse.x),
            duration: 3
        });
    }
    mouseActions.moved = false;
}

const mouse = {
    x: 0,
    y: 0
}

const mouseActions = {
    moved: false,
    clicked: false
};

animate();

document.getElementById('focusLoc').addEventListener('click', () => {
//    console.log("Link Clicked");
    group.rotation.x = 0;
    group.rotation.y = 0;
    sphereGroup.rotation.x = 0;
    sphereGroup.rotation.y = 0;
    sphereGroup.rotation.y = 2.5;
    
    mouseActions.clicked = !mouseActions.clicked;
});

addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 4;
    mouse.y = (event.clientY / innerHeight) * 4 - 2;
    // console.log(mouse);
    //    mouseActions.moved = true;
});
