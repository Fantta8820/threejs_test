import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

let rotation = 0.00;

export function setSliderValue(value) {
    rotation = value / 100
}

window.setSliderValue = setSliderValue;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color( 0x09090d )

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var startColor;
var objects = []

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xfc9a5d } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
objects.push( cube );

camera.position.z = 5;

var controls = new DragControls( objects, camera, renderer.domElement );

controls.addEventListener( 'dragstart', function ( event ) {
    startColor = event.object.material.color.getHex();
    event.object.material.color.setHex(0x5d78fc)
});

controls.addEventListener( 'dragend', function ( event ) {
    event.object.material.color.setHex(startColor);
});

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += rotation;
    cube.rotation.y += rotation;

    renderer.render( scene, camera);
}

animate();