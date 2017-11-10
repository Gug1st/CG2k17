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
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		var diffuseColor = new THREE.Color(1.0,0.45,0.0);
		var specularColor = new THREE.Color(0.66,0.48,0.29);
		var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xE69138});
		var phongMaterial =	new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2});
		var basicMaterial = new THREE.MeshBasicMaterial({color: 0xE69138});
		// add all materials to a multi-material array
		mesh = new THREE.Mesh(geometry, lambertMaterial);
		mesh.castShadow = true;
		this.obj.castShadow = true;
		this.obj.receiveShadow = true;
		this.obj.add(mesh);
	}

	addCaule(){
		'use strict';
		geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 8, 1);
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		var diffuseColor = new THREE.Color(0.25,0.19,0.0);
		var specularColor = new THREE.Color(0.45,0.33,0.29);
		// add all materials to a multi-material array
		var mm = [
				new THREE.MeshLambertMaterial({color: 0x32611A}),
				new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2}),
				new THREE.MeshBasicMaterial({color: 0x32611A})
		];
		mesh = new THREE.Mesh( geometry, mm);
		mesh.position.set(0, 1, 0);
		this.obj.add(mesh);
	}

	addFolha(){
		'use strict';
		geometry = new THREE.CircleGeometry( 1, 2, 2, 1 );
		var diffuseColor = new THREE.Color(0.0,1.0,0.0);
		var specularColor = new THREE.Color(0.15,0.43,0.19);
		// add all materials to a multi-material array
		var mm = [
				new THREE.MeshLambertMaterial({color: 0x32611A}),
				new THREE.MeshPhongMaterial({color: diffuseColor, specular: specularColor, shininess: 2}),
				new THREE.MeshBasicMaterial({color: 0x32611A})
		];
		mesh = new THREE.Mesh( geometry, mm);
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

	toggleOrangeMaterials(){
		for (orange in mapOranges) {
			if(typeMaterial == 0){
		    mesh.material = phongMaterial;
				typeMaterial = 1;
			}
			else{
				mesh.material = lambertMaterial;
				typeMaterial = 0;
			}
	}
}

toggleOrangeIllumination(){
	for (orange in mapOranges) {
		if(typeMaterial == 0){
			mesh.material = basicMaterial;
			typeMaterial = 2;
		}
	}
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
