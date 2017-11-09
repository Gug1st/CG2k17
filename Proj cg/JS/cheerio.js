/*
/ Construtor do cheerio
/
/ currentVel = velocidade do cheerio
/
*/

class cheerio{

	constructor() {
		this.currentVel = 0;
		this.obj = new THREE.Object3D();
		this.collision = false;
		this.BSphere;
		this.rotationAxis = 0;
	}

	/*
	/ Funcao change position, para alterar a posicao do cheerio
	*/
	changePosition(x, y, z) {
		'use strict';
		this.obj.position.set(x, y, z);
	}

	createCheerio(x, y, z) {
		'use strict';
		lambertMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
		phongMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
		geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
		mesh = new THREE.Mesh(geometry, lambertMaterial);

		this.obj.add(mesh);
		this.obj.position.set(x, y, z);
		this.obj.rotateX(1.4);
		scene.add(this.obj);
	}

	cheerioBoundingSphere(){
		this.BSphere = new THREE.Sphere(this.obj.position, 0.8);
	}

	cheerioMovement() {
		var yAxis = new THREE.Vector3(0, 1, 0);
			this.obj.translateX(this.currentVel);
		}
}
