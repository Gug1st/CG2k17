/*
/ Lights
/
*/

var pointLight_state;
var directionalLight_state;
var pointlights = [];


function addPointlights(){
  'use strict';
  pointlights =
    [new THREE.PointLight( 0xFFFF00, 3, 50, 1 ),
    new THREE.PointLight( 0xFFFF00, 3, 50, 1  ),
    new THREE.PointLight( 0xFFFF00, 3, 50, 1  ),
    new THREE.PointLight( 0xFFFF00, 3, 50, 1  ),
    new THREE.PointLight( 0xFFFF00, 3, 50, 1  ),
    new THREE.PointLight( 0xFFFF00, 3, 50, 1  )];
  pointlights[0].position.set( -60, 30, 60 );
  pointlights[1].position.set( 60, 30, 60 );
  pointlights[2].position.set( -60, 30, 0 );
  pointlights[3].position.set( 0, 30, 60 );
  pointlights[4].position.set( -60, 30, -60 );
  pointlights[5].position.set( 60, 30, -60 );
  for (var i in pointlights) {
    pointlights[i].castShadow = true;
    scene.add(pointlights[i]);
    scene.add(new THREE.PointLightHelper(pointlights[i], 3));
  }
  pointLight_state =1;
}

function addDirectionalLight(){
  // add sun light
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 500;
  scene.add(directionalLight);
  directionalLight_state = 1;
}

function toggleDirectionalLight(){
  // Turns Light ON and OFF
  if (directionalLight_state == 1){
    directionalLight.intensity = 0;
    directionalLight_state = 0;
    }
  else if (directionalLight_state == 0) {
    directionalLight.intensity = 1;
    directionalLight_state = 1;
    }
}

function togglePointlights(){
  // Turns Light ON and OFF
  if (pointLight_state == 1){
    for (var i in pointlights) {
      pointlights[i].intensity = 0;
    }
    pointLight_state = 0;
  }
  else if (pointLight_state == 0) {
    for (var i in pointlights) {
      pointlights[i].intensity = 3;
    }
    pointLight_state = 1;
  }
}
