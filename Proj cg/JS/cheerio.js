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

		material = new THREE.MeshBasicMaterial({ color: 0x000000 });
		geometry = new THREE.TorusGeometry(0.8, 0.4, 10, 50);
		mesh = new THREE.Mesh(geometry, material);

		this.obj.add(mesh);
		this.obj.position.set(x, y, z);
		this.obj.rotateX(1.4);

		scene.add(this.obj);
	}

	cheerioBoundingSphere(){
		this.BSphere = new THREE.Sphere(this.obj.position, 0.8);
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
