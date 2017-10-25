/*
/ Construtor da laranja
/ 
/ currentVel = velocidade atual da laranja
/ 
*/	

class orange{
	
	constructor() {
		this.currentVel = 0;
		this.obj = new THREE.Object3D();
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
		this.obj.position.set(x, y, z);

		scene.add(this.obj);
	}

	increaseSpeed(){

	}

	orangeBoundingSphere(){
		for (var i = 0; i < this.obj.children.length; i++) 
	    	this.obj.children[i].geometry.computeBoundingSphere();
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
