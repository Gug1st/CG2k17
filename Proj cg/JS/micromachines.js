var NUM_ORANGES = 15;
var NUM_BUTTERS = 8;

var cameraOrthographic, cameraPerspective, cameraDriver, scene, renderer;

var car, ring;
var geometry, material, lambertMaterial, phongMaterial, basicMaterial, mesh;

var aspect = window.innerWidth / window.innerHeight;

var continueAnimating = true;
var id;

var clock, delta;
var timer = 0;
var timerChanger = 0;

var map = {37: false, 38: false, 39: false, 40: false};
var mapOranges = [];
var mapButters = [];
var stackLostOranges = [];
var mapCheerios = [];

var frustumSize = 1000; cameraFactor = 10;
var lastPressed, lastCamera;
var typeMaterial; // 0 - Lambert , 1 - Phong
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Adds (numberOranges) between the min and max values randomly
 */
function addOranges(numberOranges) {
	var i;

	for (i=0; i<numberOranges; i++){
		mapOranges[i] = new orange();
		// adicionar uma velocidade aleatoria a cada laranja no intervalo entre 0.009 e 0.06
		mapOranges[i].currentVel = Math.random() * (0.06 - 0.009) + 0.009;
		mapOranges[i].createOrange(getRandomInt(-70, 70), 1, getRandomInt(-70, 70));
		mapOranges[i].orangeBoundingSphere();
	}
}

/**
 * Adds (numberButters) between the min and max values randomly
 */
function addButters(numberButters) {
	var i;

	for (i=0; i<numberButters; i++){
		mapButters[i] = new butter();
		mapButters[i].createButter(getRandomInt(-70, 70), 0, getRandomInt(-50, 50));
		mapButters[i].butterBoundingSphere();
	}
}

function addBorders() {
	'use strict';
	var i, j=0;

	// i = 21
	for (i=0; i<21; i++){
		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(48-i*4.5, 1, 53);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	for (i=0; i<21; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(47.5-i*4.8, 1, -52.5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	for (i=0; i<21; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(48, 1, 53-i*5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	for (i=0; i<21; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(-48, 1, 53-i*5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	// i = 29
	for (i=0; i<29; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(70-i*4.84, 0.2, 70.5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	for (i=0; i<29; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(70-i*4.84, 0.2, -69.5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	for (i=0; i<29; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(70, 0.2, 70.5-i*5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
	for (i=0; i<29; i++){

		mapCheerios[j] = new cheerio();
		mapCheerios[j].createCheerio(-70, 0.2, 70.5-i*5);
		mapCheerios[j].cheerioBoundingSphere();
		j++;
	}
}

function addTable(obj, x, y, z) {
	'use strict';
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function createTable(x, y, z) {
	'use strict';

	var table = new THREE.Object3D();

	var diffuseColor = new THREE.Color(0.33,0.72,0.0);
	var specularColor = new THREE.Color(0.64,0.65,0.43);

	// instantiate a loader
	var loader = new THREE.TextureLoader();

	// load a resource
	loader.load(
		// resource URL
		'https://st.depositphotos.com/1780362/2555/v/950/depositphotos_25556957-stock-illustration-tablecloth-pattern.jpg',
		// Function when resource is loaded
		function ( texture ) {
			// in this example we create the material when the texture is loaded
			material = new THREE.MeshBasicMaterial( {
				map: texture
			 } );
		},
		// Function called when download progresses
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// Function called when download errors
		function ( xhr ) {
			console.error( 'An error happened' );
		}
	);

	//var texture = THREE.ImageUtils.loadTexture('/textures/toalha.jpg');

	//material = new THREE.MeshBasicMaterial({ side: THREE.FrontSide, map: texture });
  	//material = new THREE.MeshBasicMaterial({ color: 0x00cc66 });
	//phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
	//lambertMaterial = new THREE.MeshLambertMaterial({ color: 0x00cc66 });
	//lambertMaterial = new THREE.MeshLambertMaterial({ map: texture });

  	geometry = new THREE.CubeGeometry(150, 0, 150);
	mesh = new THREE.Mesh(geometry, material);
	addTable(table, x, y, z);
  	geometry.computeFaceNormals();
  	geometry.computeVertexNormals();
  	mesh.receiveShadow = true;
	scene.add(table);
	addBorders();
}

function createCameras() {
	'use strict';
	// Orthographic Camera (Top View) - OrthographicCamera( left, right, top, bottom, near, far )
	cameraOrthographic = new THREE.OrthographicCamera( frustumSize * aspect / - cameraFactor, frustumSize * aspect / cameraFactor,
		frustumSize / cameraFactor, frustumSize / - cameraFactor, 1, 2000 );
	cameraOrthographic.position.y = 400;
	cameraOrthographic.lookAt(scene.position);
	// Perspective Camera (Perspective View) - PerspectiveCamera( fov, aspect, near, far )
	cameraPerspective = new THREE.PerspectiveCamera( 60, frustumSize * aspect / frustumSize, 1, 2000 );
	cameraPerspective.position.y = 100;
	cameraPerspective.position.x = -150;
	cameraPerspective.position.z = 50;
	cameraPerspective.lookAt(scene.position);
	// Driver Camera (Perspective View) - PerspectiveCamera( fov, aspect, near, far )
	cameraDriver = new THREE.PerspectiveCamera( 90, frustumSize * aspect / frustumSize, 1, 2000 );
	car.obj.add(cameraDriver);
	cameraDriver.position.y = 5;
	cameraDriver.position.z = 10;
	scene.add(cameraOrthographic);
	scene.add(cameraPerspective);
	lastCamera = 1;
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x003300);
	createTable(0, 0, 0);

	car = new vehicle();
	car.createCar(0, 0, 0);
	car.changePosition(61, 1, 37);
	car.vehicleBoundingSphere();
  	addPointlights();
  	addDirectionalLight();
	// Driver Camera (Chase Camera behind car View) - PerspectiveCamera( fov, aspect, near, far )
	addOranges(NUM_ORANGES);
	addButters(NUM_BUTTERS);
}

function checkOrangeCollisions() {
	'use strict';

	var i;
	var x1, x2, x3;
	var z1, z2, z3;
	var distance, dSquare;

	for (var i = 0; i<mapOranges.length; i++){
		// colisao para a laranja?
		//teorema de pitagoras?
		x1 = car.obj.position.x;
		x2 = mapOranges[i].obj.position.x;
		z1 = car.obj.position.z;
		z2 = mapOranges[i].obj.position.z;

		if (x1 > x2)
			x3 = x1 - x2;
		else
			x3 = x2 - x1;

		if (z1 > z2)
			z3 = z1 - z2;
		else
			z3 = z2 - z1;

		distance = (x3*x3) + (z3*z3);
		dSquare = Math.sqrt(distance);

		if (dSquare < (mapOranges[i].BSphere.radius + car.BSphere.radius)){
			car.changePosition(61, 1, 37);
			car.currentVel = 0;
		}
	}
}

function checkCheerioCollisions() {
	'use strict';

	var i;
	var x1, x2, x3;
	var z1, z2, z3;
	var distance, dSquare;

	for (i = 0; i <mapCheerios.length; i++){
		//teorema de pitagoras?
		x1 = car.obj.position.x;
		x2 = mapCheerios[i].obj.position.x;
		z1 = car.obj.position.z;
		z2 = mapCheerios[i].obj.position.z;

		if (x1 > x2)
			x3 = x1 - x2;
		else
			x3 = x2 - x1;

		if (z1 > z2)
			z3 = z1 - z2;
		else
			z3 = z2 - z1;

		distance = (x3*x3) + (z3*z3);
		dSquare = Math.sqrt(distance);

		if (dSquare < mapCheerios[i].BSphere.radius + car.BSphere.radius) {
			 mapCheerios[i].currentVel = car.currentVel;
       mapCheerios[i].rotationAxis = car.rotationAxis;
       mapCheerios[i].cheerioMovement();
		}
	}
}

function checkButterCollisions(){
	var i;
	var x1, x2, x3;
	var z1, z2, z3;
	var distance, dSquare;

	for (i = 0; i <mapButters.length; i++){
		//teorema de pitagoras?
		x1 = car.obj.position.x;
		x2 = mapButters[i].obj.position.x;
		z1 = car.obj.position.z;
		z2 = mapButters[i].obj.position.z;

		if (x1 > x2)
			x3 = x1 - x2;
		else
			x3 = x2 - x1;

		if (z1 > z2)
			z3 = z1 - z2;
		else
			z3 = z2 - z1;

		distance = (x3*x3) + (z3*z3);
		dSquare = Math.sqrt(distance);

		if (dSquare < mapButters[i].BSphere.radius + car.BSphere.radius) {
			if (car.lastPressed == "f")
				car.cantMove = "f";
			else if (car.lastPressed == "b")
				car.cantMove = "b";
			car.inside = i;
			break;
		}
	}
}

function checkButterOutside(butterid) {

	var i;
	var x1, x2, x3;
	var z1, z2, z3;
	var distance, dSquare;

		// colisao para a laranja?
		//teorema de pitagoras?
		x1 = car.obj.position.x;
		x2 = mapButters[butterid].obj.position.x;
		z1 = car.obj.position.z;
		z2 = mapButters[butterid].obj.position.z;

		if (x1 > x2)
			x3 = x1 - x2;
		else
			x3 = x2 - x1;

		if (z1 > z2)
			z3 = z1 - z2;
		else
			z3 = z2 - z1;

		distance = (x3*x3) + (z3*z3);
		dSquare = Math.sqrt(distance);

		if (dSquare >= mapButters[butterid].BSphere.radius + car.BSphere.radius) {
			car.cantMove = "";
			car.inside = -1;
		}
}

function checkTableBounderings(){
	var i;
	for (i=0; i<mapOranges.length; i++){

		if (mapOranges[i].obj.position.z > 71){
			stackLostOranges.push(i);
			scene.remove(mapOranges[i].obj);
			/*altero a posicao da laranja nos eixos dos zz para 0
			para quando voltar a ver quais as laranjas que passaram os limites,
			a mesma que já foi vista nao ser adicionada novamente a pilha*/
			mapOranges[i].obj.position.z = 0;
		}
	}
}

function addLostOranges(){
	var index;
	/* Se mais de 2 laranjas ja tiverem saido da mesa,
	adiciona uma laranja numa posicao aleatoria*/
	if (stackLostOranges.length > 1){
		index = stackLostOranges.pop();
		mapOranges[index].changePosition(getRandomInt(-70, 70), 1, getRandomInt(-70, 70));
		scene.add(mapOranges[index].obj);
	}
}

function checkTimer(){
	var i;
	// quando passarem 5 segundos, aumenta a velocidade das laranjas
	if ((clock.elapsedTime - timer) > 5){
		timer = clock.elapsedTime;

		for (i=0; i<mapOranges.length; i++){
			mapOranges[i].increaseSpeed();
		}
	}
}

function moveOranges(){
	var i;

	for (i=0; i<mapOranges.length; i++){
		mapOranges[i].movement();
	}
}

function checkCollisions(){
	'use strict';

	checkCheerioCollisions();
	checkOrangeCollisions();

	if (car.inside == -1)
		checkButterCollisions();
	else
		checkButterOutside(car.inside);
}

function render() {
	'use strict';
	if (lastCamera == 1) {
		renderer.render(scene, cameraOrthographic);
	}
	else if  (lastCamera == 2){
		renderer.render(scene, cameraPerspective);
	}
	else if (lastCamera == 3){
		renderer.render(scene, cameraDriver);
	}
}

function animate() {
	'use strict';
	// adiciona laranjas aleatoriamente
	addLostOranges();

	checkTimer();
	moveOranges();

	car.calcVelocity();
	car.movement();

	checkCollisions();
	//updateChaseCam();
	// verificar se ha laranjas que sairam da mesa
	checkTableBounderings();

	render();
	if (continueAnimating) 
		requestAnimationFrame(animate);

}

function onResize(){
	'use strict';
	aspect = window.innerWidth / window.innerHeight;
	// Orthographic Camera Resize
	cameraOrthographic.left = frustumSize * aspect / - cameraFactor;
	cameraOrthographic.right = frustumSize * aspect / cameraFactor;
	cameraOrthographic.top = frustumSize / cameraFactor;
	cameraOrthographic.bottom = frustumSize / - cameraFactor;
	cameraOrthographic.aspect = 1;
    cameraOrthographic.updateProjectionMatrix();
	// Perspective Camera Resize
    cameraPerspective.aspect = aspect;
    cameraPerspective.updateProjectionMatrix();
	// Driver Camera Resize
    cameraDriver.aspect = aspect;
    cameraDriver.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {

	case 65: //A
	case 97: //a
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
			}
		});
		break;

	case 37: //Arrow Left
		map[e.keyCode] = true;
		break;

	case 38: //Arrow Up
		car.lastPressed = "f";
		map[e.keyCode] = true;
		break;

	case 39: //Arrow Right
		map[e.keyCode] = true;
		break;

	case 40: //Arrow Down
		car.lastPressed = "b";
		map[e.keyCode] = true;
		break;

	case 49: // 1 - Orthographic Camera
		lastCamera=1;
		break;

	case 50: // 2 - Perspective Camera
		lastCamera=2;
		break;

	case 51: // 3 - Driver Camera
		lastCamera=3;
		break;

	case 83: // S - stop animate
	case 115: // s - stop animate
		continueAnimating = !continueAnimating;
		animate();

	case 67: // C - Toggle 6 Pointligths
	case 99: // c
	  	togglePointlights(); // Turns on/off the 6 pointlights
	  	break;

	case 71: //G
	case 67: // g
	    // alternates between Goroud and Phong
	    toggleButterMaterials();
	    toggleOrangeMaterials();
	    toggleCheerioMaterials();
	    break;

		// sun light
	case 76: //L
	    // Turns illumination on/off
	    toggleOrangeIllumination();
	    toggleCheerioIllumination();
	    toggleButterIllumination()
	    break;
	case 78: //N
	case 110: //n
	    // alternates between night and day
	    toggleDirectionalLight();
		break;
	}
}

function onKeyUp(e) {
	'use strict';
	switch (e.keyCode) {

	case 37: //Arrow Left
		map[e.keyCode] = false;
		break;

	case 38: //Arrow Up
		map[e.keyCode] = false;
		map[e.keyCode] = false;
		break;

	case 39: //Arrow Right
		map[e.keyCode] = false;
		break;

	case 40: //Arrow Down
		map[e.keyCode] = false;
		break;
	}
}

function init() {
	'use strict';
	clock = new THREE.Clock();
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
	createCameras();
	render();
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
