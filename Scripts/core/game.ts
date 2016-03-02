/// <reference path="_reference.ts"/>

/*
    Source name: COMP392-MidTerm
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: March 2, 2016
    Program Description: Creation of a tower for COMP392-MidTerm using THREEJS and TypeScript

*/

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;


//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    
    var axes: AxisHelper;
    var plane: Mesh;
    var ambientLight: AmbientLight;
    var pointLight: PointLight;
    var spotLight: SpotLight;
    var cubes: gameObject[];
    var tower: THREE.Object3D;
    var skybox: gameObject;
    
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera


        /* ENTER CODE HERE */
        // add an axis helper to the scene
        axes = new AxisHelper(30);
        scene.add(axes);
        console.log("Added Axis Helper to scene...");
    
        //Add a Plane to the Scene
        plane = new gameObject(
            new PlaneGeometry(60, 40, 1, 1),
            new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/grass.jpg') }),
            0, 0, 0);

        plane.rotation.x = -0.5 * Math.PI;
    
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        
        // Add a PointLight to the scene
        pointLight = new PointLight(0xffffff, 1, 5000);
        pointLight.position.set(0, 50, 0);
        
        scene.add(pointLight);
        
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(-40, 80, 10);
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 2048;
        spotLight.shadowMapHeight = 2048;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
    
        skybox = new gameObject(
            new THREE.SphereGeometry(45, 32, 32),
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/skybox.jpeg'), side: THREE.BackSide}),
            0, 0, 0
        );

        
        skybox.castShadow = false;
        scene.add(skybox);
        console.log("Added a Skybox to Scene");
                
        // create a new array of cubes and populate it
        cubes = new Array<gameObject>();
        tower = new THREE.Object3D();
        
        cubes.push(new gameObject(
            new THREE.CubeGeometry(6, 6, 6),
            new THREE.MeshLambertMaterial({color: (Math.random() * 0xFFFFFF << 0), map: THREE.ImageUtils.loadTexture('../../Assets/Images/stone.jpg')}),
            0, 3, 0
        ));
        
        cubes.push(new gameObject(
            new THREE.CubeGeometry(5, 5, 5),
            new THREE.MeshLambertMaterial({color: (Math.random() * 0xFFFFFF << 0), map: THREE.ImageUtils.loadTexture('../../Assets/Images/stone.jpg')}),
            0, 8.5, 0
        ));
        
        cubes.push(new gameObject(
            new THREE.CubeGeometry(4, 4, 4),
            new THREE.MeshLambertMaterial({color: (Math.random() * 0xFFFFFF << 0), map: THREE.ImageUtils.loadTexture('../../Assets/Images/stone.jpg')}),
            0, 13, 0
        ));
        
        cubes.push(new gameObject(
            new THREE.CubeGeometry(3, 3, 3),
            new THREE.MeshLambertMaterial({color: (Math.random() * 0xFFFFFF << 0), map: THREE.ImageUtils.loadTexture('../../Assets/Images/stone.jpg')}),
            0, 16.5, 0
        ));
        
        cubes.push(new gameObject(
            new THREE.CubeGeometry(2, 2, 2),
            new THREE.MeshLambertMaterial({color: (Math.random() * 0xFFFFFF << 0), map: THREE.ImageUtils.loadTexture('../../Assets/Images/stone.jpg')}),
            0, 19, 0
        ));
        
        // add all cubes to tower
        for (var i = 0; i < cubes.length; i++) {
            tower.add(cubes[i]);
            console.log("Added cube to tower");
        }
        
        // add tower to scene
        scene.add(tower);
        console.log("Added tower to scene");
        
        // add controls
        gui = new GUI();
        control = new Control(0.01, 0.01, 0.01, 0.01, 0.01, false, 1);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    function addControl(controlObject: Control): void {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, "cube1RotY", -0.5, 0.5);
        gui.add(controlObject, "cube2RotY", -0.5, 0.5);
        gui.add(controlObject, "cube3RotY", -0.5, 0.5);
        gui.add(controlObject, "cube4RotY", -0.5, 0.5);
        gui.add(controlObject, "cube5RotY", -0.5, 0.5);
        gui.add(controlObject, "randomColor");
        gui.add(controlObject, "scale", 0.1, 1.5);
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();

        skybox.rotation.y += 0.005;
        
        // change rotation of each cube individually
        cubes[0].rotation.y += control.cube1RotY;
        cubes[1].rotation.y += control.cube2RotY;
        cubes[2].rotation.y += control.cube3RotY;
        cubes[3].rotation.y += control.cube4RotY;
        cubes[4].rotation.y += control.cube5RotY;
        
        // check if random colour
        if (control.changeColor) {
            for (var i = 0; i < cubes.length; i++) {
                cubes[i].material.setValues({color: (Math.random() * 0xFFFFFF << 0)})
            }
            control.changeColor = false;
        }
        
        tower.scale.x = control.scale;
        tower.scale.y = control.scale;
        tower.scale.z = control.scale;
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

