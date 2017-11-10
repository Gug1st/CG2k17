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
		// add all materials to a multi-material array
		var mm = [
				new THREE.MeshLambertMaterial({color: 0x000000}),
				new THREE.MeshPhongMaterial({color: 0x000000}),
				new THREE.MeshBasicMaterial({color: 0x000000})
		];
		geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		mesh = new THREE.Mesh(geometry, mm);
		this.obj.castShadow = true;
		this.obj.receiveShadow = true;
		this.obj.add(mesh);
		this.obj.position.set(x, y, z);
		this.obj.rotateX(1.4);
		scene.add(this.obj);
	}

	cheerioBoundingSphere(){
		this.BSphere = new THREE.Sphere(this.obj.position, 0.8);
	}

toggleCheerioMaterials(){
	for (cheerio in mapCheerios) {
		if (typeMaterial = 0) {
			this.obj.mesh.material = phongMaterial;
			typeMaterial = 1;
			}
		else {
			this.obj.mesh.material = lambertMaterial;
			typeMaterial=0;
			}
		}
}

toggleCheerioIllumination(){
	for (cheerio in mapCheerios) {
		if(typeMaterial == 0){
			mesh.material = basicMaterial;
			typeMaterial = 2;
		}
	}
}


	cheerioMovement() {
		var yAxis = new THREE.Vector3(0, 1, 0);
			this.obj.translateX(this.currentVel);
		}
}
