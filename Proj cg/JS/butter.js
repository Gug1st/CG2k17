/*
/ Construtor da manteiga
/ 
*/	

class butter {
	
	constructor() {
		this.obj = new THREE.Object3D();
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

		material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
		geometry = new THREE.CubeGeometry(3, 1.5, 6);

		mesh = new THREE.Mesh(geometry, material);

		this.obj.add(mesh);
		this.obj.position.set(x, y, z);

		scene.add(this.obj);
	}

	butterBoundingSphere(){
		for (var i = 0; i < this.obj.children.length; i++)
		    this.obj.children[i].geometry.computeBoundingSphere();
	}

}

/*function changePosition(butter, x, y, z) {	
	'use strict';

	butter.obj.position.set(x, y, z);
}


function createButter(butter, x, y, z) {
	'use strict';
	butter.obj = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	geometry = new THREE.CubeGeometry(3, 1.5, 6);
	mesh = new THREE.Mesh(geometry, material);
	butter.obj.add(mesh);

	//butter.obj.geometry.computeBoundingSphere();
	//geometry.computeBoundingSphere();

	butter.obj.position.set(x, y, z);
	scene.add(butter);
}*/