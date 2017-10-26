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


	addOrange(){
		'use strict';
		material = new THREE.MeshBasicMaterial({color: 0xffa500 });
		geometry = new THREE.SphereGeometry(1, 10, 10);
		mesh = new THREE.Mesh(geometry, material);
		this.obj.add(mesh);
	}

	addCaule(){
		'use strict';
		geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 8, 1);
		material = new THREE.MeshBasicMaterial( {color: 0x006400} );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(0, 1, 0);
		this.obj.add(mesh);
	}

	addFolha(){
		'use strict';
		geometry = new THREE.CircleGeometry( 1, 2, 2, 1 );
		material = new THREE.MeshBasicMaterial( { color: 0x006400 } );
		mesh = new THREE.Mesh( geometry,material );
		mesh.position.set(0, 1, 0);
		mesh.rotateX(1.2);
		this.obj.add(mesh);
	}


	createOrange(x, y, z) {
		'use strict';
		this.addOrange();
		this.addCaule(); // position in orange axis
		this.addFolha(); // position in orange axis
		this.obj.position.set(x, y, z);
		scene.add(this.obj);
	}

	/*
	/ Funcao change position, para alterar a posicao da laranja
	*/
	changePosition(x, y, z) {
		'use strict';
		this.obj.position.set(x, y, z);
	}



	orangeBoundingSphere() {
		this.BSphere = new THREE.Sphere(this.obj.position, 1);
		//this.obj.children[0].geometry.computeBoundingSphere();
	}

	increaseSpeed() {
		// mov rectilineo uniforme
		// velocidades diferentes ??
		//this.currentVel += getRandomInt(0.001, 0.005);
		this.currentVel += 0.009;

	}

	movement() {
		var xAxis = new THREE.Vector3(1, 0, 0);

		this.obj.position.z += this.currentVel;
		// roda sobre si propria
		this.obj.rotateOnAxis(xAxis, 0.05);
	}
}
