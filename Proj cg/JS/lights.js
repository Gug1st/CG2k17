/*
/ Lights
/
*/

pointLight_state = 1; // lights on
directionalLight_state = 1; // lights on


function addPointlights(){
  'use strict';
  var pointlight1 = new THREE.PointLight( 0x006400, 1, 100 );
  var pointlight2 = new THREE.PointLight( 0x006400, 1, 100 );
  var pointlight3 = new THREE.PointLight( 0xff0000, 1, 100 );
  var pointlight4 = new THREE.PointLight( 0xff0000, 1, 100 );
  var pointlight5 = new THREE.PointLight( 0xff0000, 1, 100 );
  var pointlight6 = new THREE.PointLight( 0xff0000, 1, 100 );
  pointlight1.position.set( -60, 20, 60 );
  pointlight2.position.set( -40, 20, 40 );
  pointlight3.position.set( -20, 20, 20 );
  pointlight4.position.set( 0, 20, 0 );
  pointlight5.position.set( 20, 20, -20 );
  pointlight6.position.set( 40, 20, -40 );
  scene.add(pointlight1);
  scene.add(pointlight2);
  scene.add(pointlight3);
  scene.add(pointlight4);
  scene.add(pointlight5);
  scene.add(pointlight6);
  scene.add(new THREE.PointLightHelper(pointlight1, 3));
  scene.add(new THREE.PointLightHelper(pointlight2, 3));
  scene.add(new THREE.PointLightHelper(pointlight3, 3));
  scene.add(new THREE.PointLightHelper(pointlight4, 3));
  scene.add(new THREE.PointLightHelper(pointlight5, 3));
  scene.add(new THREE.PointLightHelper(pointlight6, 3));
}

function addDirectionalLight(){
  // add sun light
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0,5,0);
  scene.add(directionalLight);
}

function toggleDirectionalLight(){
  // Turns Light ON and OFF
  if (directionalLight_state = 1){
    directionalLight.intensity = 0;
    directionalLight_state = 0;
    }
  else if (directionalLight_state = 0) {
    directionalLight.intensity = 2;
    directionalLight_state = 1;
    }
}

function togglePointlights(){
  // Turns Light ON and OFF
  if (pointLight_state = 1){
    pointlight1.intensity = 0;
    pointlight2.intensity = 0;
    pointlight3.intensity = 0;
    pointlight4.intensity = 0;
    pointlight5.intensity = 0;
    pointlight6.intensity = 0;
    pointLight_state = 0;
    }
  else if (pointLight_state = 0) {
    pointlight1.intensity = 1;
    pointlight2.intensity = 1;
    pointlight3.intensity = 1;
    pointlight4.intensity = 1;
    pointlight5.intensity = 1;
    pointlight6.intensity = 1;
    pointLight_state = 1;
  }
}
