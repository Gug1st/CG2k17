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
		geometry = new THREE.SphereGeometry(1, 10, 10);
		var diffuseColor = new THREE.Color(1.0,0.45,0.0);
		var specularColor = new THREE.Color(0.66,0.48,0.29);
		phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		lambertMaterial = new THREE.MeshLambertMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		mesh = new THREE.Mesh(geometry, lambertMaterial);
		this.obj.add(mesh);
	}

	addCaule(){
		'use strict';
		geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 8, 1);
		var diffuseColor = new THREE.Color(0.25,0.19,0.0);
		var specularColor = new THREE.Color(0.45,0.33,0.29);
		phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		lambertMaterial = new THREE.MeshLambertMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		mesh = new THREE.Mesh( geometry, lambertMaterial);
		mesh.position.set(0, 1, 0);
		this.obj.add(mesh);
	}

	addFolha(){
		'use strict';
		geometry = new THREE.CircleGeometry( 1, 2, 2, 1 );
		var diffuseColor = new THREE.Color(0.0,1.0,0.0);
		var specularColor = new THREE.Color(0.15,0.43,0.19);
		phongMaterial = new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		lambertMaterial = new THREE.MeshLambertMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		mesh = new THREE.Mesh( geometry, lambertMaterial);
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
		this.currentVel += 0.009;

	}

	movement() {
		var xAxis = new THREE.Vector3(1, 0, 0);

		this.obj.position.z += this.currentVel;
		// roda sobre si propria
		this.obj.rotateOnAxis(xAxis, 0.05);
	}
}
