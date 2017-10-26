/*
/ Construtor da laranja
/ 
/ currentVel = velocidade atual da laranja
/ 
*/

class orange{
	
	constructor() {
		this.currentVel = 0.03;
		this.obj = new THREE.Object3D();
		this.BSphere;
	}

	/*
	/ Funcao change position, para alterar a posicao da laranja
	*/	
	changePosition(x, y, z) {	
		'use strict';
		this.obj.position.set(x, y, z);
	}

	createOrange(x, y, z) {
		'use strict';

		material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffa500 });
		geometry = new THREE.SphereGeometry(2, 10, 10);
		mesh = new THREE.Mesh(geometry, material);

		this.obj.add(mesh);

		/*folha

		var leafGeometry = new THREE.PlaneGeometry( 1, 5, 32);
		var leafMaterial = new THREE.MeshBasicMaterial( {color: 0x32CD32, side: THREE.DoubleSide} );
		var leafMesh = new THREE.Mesh( geometry, material );

		leafMesh.position.set(x, y, z);
		this.obj.add(leafMesh);*/

		this.obj.position.set(x, y, z);

		scene.add(this.obj);
	}

	orangeBoundingSphere() {
		this.BSphere = new THREE.Sphere(this.obj.position, 2);
		//this.obj.children[0].geometry.computeBoundingSphere();
	}

	increaseSpeed() {
		// mov rectilineo uniforme
		// velocidades diferentes ??
		//this.currentVel += getRandomInt(0.001, 0.005);
		this.currentVel += 0.009;

	}

	movement() {
		var zAxis = new THREE.Vector3(0, 0, 1);

		this.obj.translateZ(this.currentVel);
		// roda sobre si propria
		this.obj.rotateOnAxis(zAxis, 0.005);
	}
}

/* function changePosition(orange, x, y, z) {	
	'use strict';

	orange.obj.position.set(x, y, z);
}


function createOrange(orange, x, y, z) {
	'use strict';

	orange.obj = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xffa500 });
	geometry = new THREE.SphereGeometry(2, 10, 10);
	mesh = new THREE.Mesh(geometry, material);

	orange.obj.add(mesh);

	//orange.obj.geometry.computeBoundingSphere();
	//geometry.computeBoundingSphere();

	orange.obj.position.set(x, y, z);

	scene.add(orange);
}

function increaseSpeed(orange){

}*/
