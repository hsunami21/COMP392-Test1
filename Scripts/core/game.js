/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var axes;
    var plane;
    var ambientLight;
    var spotLight;
    var cubes;
    var tower;
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
        plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0x9e9e9e }), 0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(-40, 120, -40);
        spotLight.castShadow = true;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        // create a new array of cubes and populate it
        cubes = new Array();
        tower = new THREE.Object3D();
        cubes.push(new gameObject(new THREE.CubeGeometry(6, 6, 6), new THREE.MeshLambertMaterial({ color: (Math.random() * 0xFFFFFF << 0) }), 0, 3, 0));
        cubes.push(new gameObject(new THREE.CubeGeometry(5, 5, 5), new THREE.MeshLambertMaterial({ color: (Math.random() * 0xFFFFFF << 0) }), 0, 8.5, 0));
        cubes.push(new gameObject(new THREE.CubeGeometry(4, 4, 4), new THREE.MeshLambertMaterial({ color: (Math.random() * 0xFFFFFF << 0) }), 0, 13, 0));
        cubes.push(new gameObject(new THREE.CubeGeometry(3, 3, 3), new THREE.MeshLambertMaterial({ color: (Math.random() * 0xFFFFFF << 0) }), 0, 16.5, 0));
        cubes.push(new gameObject(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshLambertMaterial({ color: (Math.random() * 0xFFFFFF << 0) }), 0, 19, 0));
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
    function addControl(controlObject) {
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
    function gameLoop() {
        stats.update();
        // change rotation of each cube individually
        cubes[0].rotation.y += control.cube1RotY;
        cubes[1].rotation.y += control.cube2RotY;
        cubes[2].rotation.y += control.cube3RotY;
        cubes[3].rotation.y += control.cube4RotY;
        cubes[4].rotation.y += control.cube5RotY;
        // check if random colour
        if (control.changeColor) {
            for (var i = 0; i < cubes.length; i++) {
                cubes[i].material.setValues({ color: (Math.random() * 0xFFFFFF << 0) });
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
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
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
    };
})();

//# sourceMappingURL=game.js.map
