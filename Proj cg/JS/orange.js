/*
/ Construtor da laranja
/
/ currentVel = velocidade atual da laranja
/
*/

var geometry, material, mesh;

class orange{

	constructor() {
		this.currentVel = 0;
		this.obj = new THREE.Object3D();
		this.collision = false;
		this.BSphere;
	}

	/*
	/ Funcao change position, para alterar a posicao da laranja
	*/
	changePosition(x, y, z) {
		'use strict';
		this.obj.position.set(x, y, z);
	}

	addOrange(x, y, z){
		'use strict';
	  material = new THREE.MeshBasicMaterial({color: 0xffa500 });
	  geometry = new THREE.SphereGeometry(1, 10, 10);
	  mesh = new THREE.Mesh(geometry, material);
	  this.obj.add(mesh);
	}

	addCaule(x, y, z){
		'use strict';
	  geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 8, 1);
		material = new THREE.MeshBasicMaterial( {color: 0x006400} );
		mesh = new THREE.Mesh( geometry, material );
	  this.obj.add(mesh);
	}

	addFolha(x, y, z){
		'use strict';
	  geometry = new THREE.CircleGeometry( 1, 2, 2, 1 );
		material = new THREE.MeshBasicMaterial( { color: 0x006400 } );
		mesh = new THREE.Mesh( geometry,material );
		mesh.rotateX(1.2);
	  this.obj.add(mesh);
	}


	createOrange(x, y, z) {
	  'use strict';
	  this.addOrange(x, y, z);
	  this.addCaule(x, y+1, z); // position in orange axis
	  this.addFolha(x, y+1, z); // position in orange axis
		this.obj.position.set(x, y, z);
	  scene.add(this.obj);
	}


	increaseSpeed(){

	}

	orangeBoundingSphere(){
		this.BSphere = new THREE.Sphere(this.obj.position, 1);
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
