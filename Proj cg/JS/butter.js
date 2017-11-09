/*
/ Construtor da manteiga
/
*/

class butter {

	constructor() {
		this.obj = new THREE.Object3D();
		this.BSphere;
	}

	/*
	/ Funcao change position, para alterar a posicao da manteiga
	*/
	changePosition(x, y, z) {
		'use strict';
		this.obj.position.set(x, y, z);
	}


	createButter(x, y, z) {
		'use strict';
		lambertMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});
		phongMaterial = new THREE.MeshPhongMaterial({color: 0xffff00});
		geometry = new THREE.CubeGeometry(3, 1.5, 6);
		mesh = new THREE.Mesh(geometry, lambertMaterial);
		this.obj.add(mesh);
		this.obj.position.set(x, y, z);
		scene.add(this.obj);
	}

	butterBoundingSphere(){
		this.BSphere = new THREE.Sphere(this.obj.position, 3.35);
		//this.obj.children[0].geometry.computeBoundingSphere();
	}

}
