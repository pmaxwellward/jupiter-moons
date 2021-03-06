
if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
}   
let createScene = () => {

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let containers = [];

    let currentScene;

// MAIN
/*****************************************************************************************************/

// Meshes
//----------------------------------------------------------------------------------------------------

    let main_container = new BABYLON.AssetContainer(scene);

    // This creates and initially positions a follow camera 
    let camDefaultPos = new BABYLON.Mesh("camDefaultPos", scene);
    camDefaultPos.position = new BABYLON.Vector3(0, 0, -410);	
    let camera = new BABYLON.FollowCamera("FollowCam", camDefaultPos.position, scene);
	//The goal distance of camera from target
	//camera.radius = -50;
	// The goal height of camera above local origin (centre) of target
	camera.heightOffset = 0;
	// The goal rotation of camera around local origin (centre) of target in x y plane
	camera.rotationOffset = 0;
	//Acceleration of camera in moving from current to goal position
	camera.cameraAcceleration = 0.05;
	//The speed at which acceleration is halted 
	camera.maxCameraSpeed = 10;
	//camera.target is set after the target's creation
	// This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    //
    //main_container.cameras.push(camera);
    //
    const sun = new BABYLON.DirectionalLight("sun", new BABYLON.Vector3(-1000, 0, 10), scene);
    sun.intensity = 2;
    let shadowGen = new BABYLON.ShadowGenerator(1024, sun);
    shadowGen.usePoissonSampling = true;
    main_container.lights.push(sun);

    // Load the sound and play it automatically once ready
    const music = new BABYLON.Sound("planetsounds", "./sounds/01 - Jupiter.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    
    // Skybox
    let skybox = BABYLON.Mesh.CreateBox("skyBox", 1e4, scene);
    skybox.isPickable = false 
    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox",scene);
    skyboxMaterial.backFaceCulling = false;
    let files = [
        "textures/skybox/right.png", 
        "textures/skybox/top.png", 
        "textures/skybox/front.png", 
        "textures/skybox/left.png", 
        "textures/skybox/bottom.png", 
        "textures/skybox/back.png"
    ];
    skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0,0,0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    sun.parent = skybox;

    main_container.meshes.push(skybox);
    
    // Jupiter
    let jup_mat = new BABYLON.StandardMaterial("jup_mat", scene);
    jup_mat.specularColor = new BABYLON.Color3(0, 0, 0);
    jup_mat.diffuseTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    jup_mat.emissiveTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    jup_mat.ambientTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    let jup_p = new BABYLON.Mesh("jup_p", scene);
    let jup = BABYLON.Mesh.CreateSphere("JUPITER", 32, 130, scene);
    jup.id = "jup";
    jup.parent = jup_p;
    jup.position = new BABYLON.Vector3(0, 0, 0);
    jup.material = jup_mat;
    jup.receivesShadows = true;
    let jup_l = new BABYLON.Mesh("jup_l", scene);
    jup_l.parent = jup;
    jup_l.position = new BABYLON.Vector3(0, 85, 0);
    jup.assetContainer = new BABYLON.AssetContainer(scene);

    // Europa
    let eur_p = new BABYLON.Mesh("eur_p",scene);
    eur_p.parent = jup;
    let eur_mat = new BABYLON.StandardMaterial("eur_mat", scene);
    eur_mat.emissiveTexture = new BABYLON.Texture("textures/eur.png", scene);
    eur_mat.ambientTexture = new BABYLON.Texture("textures/eur.png", scene);
    eur_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let eur = BABYLON.Mesh.CreateSphere("EUROPA", 16, 5, scene);
    eur.id = "eur";
    eur.parent = eur_p;
    eur.material = eur_mat;
    eur.receivesShadows = true;
    let eur_l = new BABYLON.Mesh("eur_l", scene);
    eur_l.parent = eur;
    eur_l.position = new BABYLON.Vector3(0, 15, 0);
    eur.assetContainer = new BABYLON.AssetContainer(scene);
    
    // Ganymede
    let gan_p = new BABYLON.Mesh("gan_p",scene);
    gan_p.parent = jup;
    let gan_mat = new BABYLON.StandardMaterial("gan_mat", scene);
    gan_mat.emissiveTexture = new BABYLON.Texture("textures/gan.png", scene);
    gan_mat.ambientTexture = new BABYLON.Texture("textures/gan.png", scene);
    gan_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let gan = BABYLON.Mesh.CreateSphere("GANYMEDE", 16, 5, scene);
    gan.id = "gan";
    gan.parent = gan_p;
    gan.material = gan_mat;
    gan.receivesShadows = true;
    let gan_l = new BABYLON.Mesh("gan_l", scene);
    gan_l.parent = gan;
    gan_l.position = new BABYLON.Vector3(0, 15, 0);
    gan.assetContainer = new BABYLON.AssetContainer(scene);
    
    // Io
    let io_p = new BABYLON.Mesh('io_p', scene);
    io_p.parent = jup;
    let io_mat = new BABYLON.StandardMaterial("io_mat", scene);
    io_mat.emissiveTexture = new BABYLON.Texture("textures/io.png", scene);
    io_mat.ambientTexture = new BABYLON.Texture("textures/io.png", scene);
    io_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let io = BABYLON.Mesh.CreateSphere("IO", 16, 5, scene);
    io.id = "io";
    io.parent = io_p;
    io.material = io_mat;
    io.receivesShadows = true;
    let io_l = new BABYLON.Mesh("io_l", scene);
    io_l.parent = io;
    io_l.position = new BABYLON.Vector3(0, 15, 0);
    io.assetContainer = new BABYLON.AssetContainer(scene);
    
    // Calisto
    let cal_p = new BABYLON.Mesh('cal_p', scene);
    cal_p.parent = jup;
    let cal_mat = new BABYLON.StandardMaterial("cal_mat", scene);
    cal_mat.emissiveTexture = new BABYLON.Texture("textures/cal.png", scene);
    cal_mat.ambientTexture = new BABYLON.Texture("textures/cal.png", scene);
    cal_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let cal = BABYLON.Mesh.CreateSphere("CALISTO", 16, 5, scene);
    cal.id = "cal";
    cal.parent = cal_p;
    cal.material = cal_mat;
    cal.receivesShadows = true;
    let cal_l = new BABYLON.Mesh("cal_l", scene);
    cal_l.parent = cal;
    cal_l.position = new BABYLON.Vector3(0, 15, 0);
    cal.assetContainer = new BABYLON.AssetContainer(scene);

    let planets = [jup, eur, gan, io, cal];

    planets.forEach(planetContainer);

    function planetContainer (item) {
        main_container.meshes.push(item);
        main_container.meshes.push(item.parent)
        main_container.meshes.push(scene.getMeshByName(item.id + "_l"));
    }

    containers.push(main_container);

    currentScene = main_container;

//----------------------------------------------------------------------------------------------------

// GUI
//----------------------------------------------------------------------------------------------------

    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //
    let warpKeys = [];
    let fadeKeys = [];
    //
    let rect1 = new BABYLON.GUI.Rectangle();
    rect1.alpha = 0;
    rect1.background = "White";
    //
    let warpAnim = new BABYLON.Animation("warpAnim", "radius", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    let fadeAnim = new BABYLON.Animation("fadeAnim", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    //            
    warpKeys.push({
        frame: 0,
        value: camera.radius
    });
    warpKeys.push({
        frame: 30,
        value: 2
    });
    //
    fadeKeys.push({
        frame: 0,
        value: 0
    });
    fadeKeys.push({
        frame: 15,
        value: 1
    });
    //
    warpAnim.setKeys(warpKeys);
    fadeAnim.setKeys(fadeKeys);
    camera.animations = [];
    rect1.animations = [];
    camera.animations.push(warpAnim);
    rect1.animations.push(fadeAnim);
    advancedTexture.addControl(rect1);
    //
    planets.forEach(planet => applyActions(planet));

    let newScene;

    function applyActions(planet) {
        //
        planet.actionManager = new BABYLON.ActionManager(scene);
        planet.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function () {
                    scene.beginAnimation(camera, 0, 30, false);
                    setTimeout( () => {
                        let anim = scene.beginAnimation(rect1, 0, 15, false);
                        anim.onAnimationEnd = switchScenes;
                        newScene = planet.assetContainer;
                    }, 800);
                    
                }
            )
        )
    }

    function switchScenes() {
        //scene.beginAnimation(rect1, 15, 31, false);
        buttons.forEach(item => item.isVisible = false);
        currentScene.removeAllFromScene();
        newScene.addAllToScene();
        scene.activeCamera.lockedTarget = undefined;
        scene.activeCamera.rotation = new BABYLON.Vector3(0, 0, 0);
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        BABYLON.Animation.CreateAndStartAnimation('camDefaultPos', camera, "position", 60, 120, new BABYLON.Vector3(0,0,-410), new BABYLON.Vector3(0,0,-210), 0, ease);
        scene.beginAnimation(rect1, 15, 0, false);
    }
    //
    let buttons = [];

    let eur_but = BABYLON.GUI.Button.CreateImageOnlyButton("eur_but", "textures/buttons/eur_off.svg");
    let io_but = BABYLON.GUI.Button.CreateImageOnlyButton("io_but", "textures/buttons/io_off.svg");
    let jup_but = BABYLON.GUI.Button.CreateImageOnlyButton("jup_but", "textures/buttons/jup_off.svg");
    let gan_but = BABYLON.GUI.Button.CreateImageOnlyButton("gan_but", "textures/buttons/gan_off.svg");
    let cal_but = BABYLON.GUI.Button.CreateImageOnlyButton("cal_but", "textures/buttons/cal_off.svg");

    buttons.push(
        eur_but,
        io_but,
        jup_but,
        gan_but,
        cal_but,
    );

    buttons.forEach(createButtons)
    //
    function createButtons(item) {
        item.state = "off";
        item.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
        item.color = "transparent";
        item.width = 0.1;
        item.height = 0.1;
        item.top = "38.5%"
        item.isPointerBlocker = true;
        item.isSelected = false;
        //
        let mobile = window.matchMedia("(max-width: 500px)");
        if (mobile.matches) {
            switch (item) {
                case eur_but:
                    eur_but.left = '-30%';
                    break;
                case io_but:
                    io_but.left = '-15%';
                    break;
                case jup_but:
                    jup_but.left = '0%';
                    break;
                case gan_but:
                    gan_but.left = '15%';
                    break;
                case cal_but:
                    cal_but.left = '30%';
                    break;
                default:
                    throw new Error(item + " is not defined");
            }
        } else {
            switch (item) {
                case eur_but:
                    eur_but.left = '-20%';
                    break;
                case io_but:
                    io_but.left = '-10%';
                    break;
                case jup_but:
                    jup_but.left = '0%';
                    break;
                case gan_but:
                    gan_but.left = '10%';
                    break;
                case cal_but:
                    cal_but.left = '20%';
                    break;
                default:
                    throw new Error(item + " is not defined");
            }  
        }

        //
        let planetName = item.name.split("_").shift();
        let meshParent = planetName + '_p';
        //
        item.onPointerUpObservable.add(function () {
            if(item.state === 'on') {
                item.image.source = "textures/buttons/" + planetName + "_off.svg";
                item.state = "off";
                item.isSelected = false;
                scene.activeCamera.lockedTarget = undefined;
                let ease = new BABYLON.CubicEase();
                ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                BABYLON.Animation.CreateAndStartAnimation('camDefaultPos', camera, "position", 60, 120, camera.position, new BABYLON.Vector3(0,0,-410), 0, ease);
                BABYLON.Animation.CreateAndStartAnimation('camDefaultRot', camera, "rotation", 60, 120, camera.rotation, new BABYLON.Vector3(0,0,0), 0, ease);
            } else {
                buttons.forEach(function(item) {
                    if (item.isSelected == true) {
                        item.image.source = "textures/buttons/" + item.name.split("_").shift() + "_off.svg";
                        item.isSelected = false;
                    }
                });
                item.state = "on";
                item.isSelected = true;
                item.image.source = "textures/buttons/" + planetName + "_on.svg";
                (meshParent == "jup_p") ? camera.radius = -250 : camera.radius = -50;
                scene.activeCamera.lockedTarget = scene.getMeshByName(meshParent);
                if(label.isVisible)
                    label.isVisible = false;
            }
        });
        //
        item.onPointerEnterObservable.add(function () {
            var label = document.createElement("span");
            label.setAttribute("id", "label");
            label.zIndex = 1;
            label.textContent = scene.getMeshByID(planetName).name;
            var sty = label.style;
            sty.position = "absolute";
            sty.color = "#ffffff";
            sty.backgroundColor = "none";
            sty.fontSize = "15pt";
            sty.top = "0";
            sty.left = "0";
            sty.cursor = "pointer";
            sty.animation = "tracking-in-expand 0.9s cubic-bezier(0.215, 0.610, 0.355, 1.000) both";
            sty.fontFamily = "'Questrial', sans-serif";
            sty.letterSpacing = "8px";
            sty.transform = "translate3d(50vw, 50px, 0px)";
            document.body.appendChild(label);
        });
        item.onPointerOutObservable.add(function () {
            document.getElementById("label").parentNode.removeChild(document.getElementById("label"));
        });

        advancedTexture.addControl(item);
    }

    // Planet movement & rotation
    let alphaSkybox = 0;
    let alphaJupiter = 0;
    let alphaEuropa = Math.PI;
    let alphaGanymede = Math.PI;
    let alphaIo = Math.PI;
    let alphaCalisto = Math.PI;

    scene.registerBeforeRender(function() {
        skybox.rotation.y = alphaSkybox;
        //
        jup.rotation.y = alphaJupiter;
        //
        eur_p.position = new BABYLON.Vector3(150 * Math.sin(alphaEuropa), eur_p.parent.position.y, 150 * Math.cos(alphaEuropa));
        eur.rotation.y += .03;
        //
        gan_p.position = new BABYLON.Vector3(175 * Math.sin(alphaGanymede+2), gan_p.parent.position.y, 175 * Math.cos(alphaGanymede+2));
        gan.rotation.y += .03;
        //
        io_p.position = new BABYLON.Vector3(200 * Math.sin(alphaIo+3), io_p.parent.position.y, 200 * Math.cos(alphaIo+3));
        io.rotation.y += .03; 
        //
        cal_p.position = new BABYLON.Vector3(200 * Math.sin(alphaCalisto+4), cal_p.parent.position.y, 200 * Math.cos(alphaCalisto+4));
        cal.rotation.y += .03; 
        //
        alphaJupiter += 0.004;
        alphaSkybox += 0.0001;
        alphaEuropa += 0.0005;
        alphaGanymede += 0.0001;
        alphaIo += 0.0003;
        alphaCalisto += 0.0004;
        //
    });

    scene.onAfterRenderObservable.add(() => {

        if(document.getElementById("label") != undefined) {

            var planet;

            switch(document.getElementById("label").innerHTML) {
                case "EUROPA":
                    planet = eur_l;
                    break;
                case "IO":
                    planet = io_l;
                    break;
                case "JUPITER":
                    planet = jup_l;
                    break;
                case "GANYMEDE":
                    planet = gan_l;
                    break;
                case "CALISTO":
                    planet = cal_l;
                    break;
                default:
                    planet = undefined;
                    break;
            }
            vertexScreenCoords = BABYLON.Vector3.Project(
            BABYLON.Vector3.Zero(), planet.getWorldMatrix(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(engine.getRenderWidth(true), engine.getRenderHeight(true))
            );
            //
            ofstX = canvas.offsetLeft,
            ofstY = canvas.offsetTop;
            //
            var label = document.getElementById("label");
            label.style.transform = "translate3d(calc(" + (vertexScreenCoords.x + ofstX) + "px - 50%), calc(" + (vertexScreenCoords.y + ofstY) + "px - 90%), 0px)";
        }
    });

// EUROPA
/*****************************************************************************************************/

    //let eur_camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    //// This targets the camera to scene origin
    //eur_camera.setTarget(BABYLON.Vector3.Zero());
    //// This attaches the camera to the canvas
    //eur_camera.attachControl(canvas, true);

    //eur_container.cameras.push("eur_camera")

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    let eur_light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    eur_light.intensity = 0.7;

    eur.assetContainer.lights.push(eur_light);

    // Our built-in 'sphere' shape.
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 20, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    // Our built-in 'ground' shape.
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 60, height: 60}, scene);

    eur.assetContainer.meshes.push(sphere);
    eur.assetContainer.meshes.push(ground);

    eur.assetContainer.removeAllFromScene();

    containers.push(eur.assetContainer);

/*****************************************************************************************************/

//var toggle = 0;
//document.onkeydown = ()=>{
//
//    if (currentScene == main_container) {
//        main_container.removeAllFromScene();
//        eur.assetContainer.addAllToScene();
//        currentScene = eur.assetContainer;
//    } else {
//        eur.assetContainer.removeAllFromScene();
//        main_container.addAllToScene();
//        currentScene = main_container;
//    }
//        
//}

    return scene;
}
var scene = createScene();

engine.runRenderLoop(function() {
    scene.render()
});
//
window.addEventListener("resize", function() {
    engine.resize()
});