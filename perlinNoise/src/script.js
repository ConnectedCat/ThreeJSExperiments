import './style.css'
import * as THREE from 'three'
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js'

let scene, camera, renderer, controls, clock

init()
animate()

function init() 
{

    /**
     * Create a scene
     */

    scene = new THREE.Scene();

    /**
     * Create a camera
     */ 
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    scene.add(camera)

    const geometry = new THREE.PlaneGeometry(100, 100, 100, 100)
    geometry.rotateX(-Math.PI/3)
    const material = new THREE.MeshBasicMaterial({
        color: 0xaa00ff,
        wireframe: true
    })

    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    /**
     * Renderer
     */
    const canvas = document.querySelector('.webgl')
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)

    controls = new FirstPersonControls( camera, renderer.domElement )
	controls.movementSpeed = 2
	controls.lookSpeed = 0.1
    controls.autoForward = false

    clock = new THREE.Clock()

    window.addEventListener('resize', onWindowResize)
}

function animate()
{
    controls.update(clock.getDelta())
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

function onWindowResize()
{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()

    controls.handleResize()

    renderer.setSize(window.innerWidth, window.innerHeight)
}