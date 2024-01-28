import * as THREE from './js/three.module.js';
import {OrbitControls} from './js/OrbitControls.js';
import {playPianoD, playPianoA, playPianoBm, playPianoG, playPianoFsharpm} from './library/instruments.js';
import {stopWatch} from './library/stopWatch.js';


const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let aspect = window.innerWidth/window.innerHeight;

const toggles = {
     sound: document.getElementById('sound-toggle')
}

let soundEnabled = false;
let pulseEnabled = true;

const handleSoundToggle = (enabled = !soundEnabled) => {
     soundEnabled = enabled;
     toggles.sound.dataset.toggled = enabled;
}

document.onvisibilitychange = () => {
     handleSoundToggle(false);
}

const colors = [
     0xffffff,
     0xff0000,
     0x0000ff,
     0xffff00,
     0x00ff00,
     0xff7f00,
     0x9400d3,
     0x4b0082,
]


////////// THREE 

///// variables
let scene, camera, renderer, orbitControls;
let cameraFront, cameraTop, insetWidth, insetHeight;
let boom = new THREE.Object3D();

const textureLoader = new THREE.TextureLoader();
const space = textureLoader.load('./assets/images/bkg1_back.png');
const sparkTexture = textureLoader.load('./assets/images/spark1.png');
const metalTextureColor = textureLoader.load('./assets/textures/Metal043A_1K_Color.jpg');
const metalTextureRoughness = textureLoader.load('./assets/textures/Metal043A_1K_Roughness.jpg');

//const color = new THREE.Color();
const groupRight = new THREE.Object3D();
let rightCubes = [];//outer vibraphone hidden
let innerRing;
let spinningGroup = new THREE.Object3D();
let particleStars;

let ballRadius = 2;
let stringLength = 32;
let stringWidth = 0.25;
const maxPendulum = 7;
const maxPendulumSet = 8;
const pendulums1 = [];
const pendulums2 = [];
const pendulums3 = [];
const pendulums4 = [];
const pendulums5 = [];
const pendulums6 = [];
const pendulums7 = [];
const pendulums8 = [];

const container = document.querySelector('.container');
const overlay = document.getElementById('overlay');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function(){
     overlay.style.display = 'none';
     container.style.display = 'block';
   
     //functions//
     initThree();
     createLights();
     createVibraphone();
     //cameraFrontMove();
     //cameraMove();
     createPendulums();
     createTorus();
     createParticles();
     
})
canvas.onclick = () => {
     handleSoundToggle();
     stopWatch();
     animate();
}
///// THREE /////

function initThree(){
     scene = new THREE.Scene();
     scene.background = new THREE.Color(0x111111);
     scene.background = space;
     scene.fog = new THREE.Fog(0x555555, 1, 580);
     camera = new THREE.PerspectiveCamera(
          65,
          window.innerWidth/window.innerHeight,
          0.1,
          10000
     )
     scene.position.x = 15;
     scene.position.y = -55;

     //camera.position.set(10, 29.5, 85);
     camera.position.set(0, 150, 0);
     camera.lookAt(0, 0, 0);
     boom.add(camera);

     insetWidth = window.innerHeight * 0.34;
     insetHeight = window.innerHeight * 0.34;

     // camera top //
     cameraTop = new THREE.PerspectiveCamera(70, insetWidth/insetHeight, 1, 500);
     cameraTop.position.set(25, 0, 90);
     cameraTop.lookAt(0, 0, -14);
     cameraTop.name = 'cameraTop';
     
     //cameraFront
     
     cameraFront = new THREE.PerspectiveCamera( 60, insetWidth / insetHeight,
     1, 500)
     cameraFront.position.set(0, 5, 50);
     cameraFront.name = 'frontCamera';     

     renderer = new THREE.WebGLRenderer({antialias: true, 
     canvas: canvas});
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.shadowMap.enabled = true;

     orbitControls = new OrbitControls(camera, renderer.domElement);
     orbitControls.enableDamping = true;
     orbitControls.dampingFactor = 0.04;  
}

//camera controls

function cameraMove(){     
     let tl = gsap.timeline({repeat: 20, repeatDelay: 60});
     // move 1
   tl.to(camera.position, {y: 30, delay: 90, duration:120});
    
     tl.to(camera.position, {y:120, delay: 0, duration:120}); // 5min 30s

     tl.fromTo(boom.rotation, {y: 0}, {y: Math.PI, delay: 30, duration: 60, repeat: 1, yoyo: true});//8min 
  
     tl.to(camera.position, {z: 120, y:70, delay: 0, duration:60}); //9min 0s

     tl.fromTo(boom.rotation, {y: 0}, {y: Math.PI, delay: 0, duration: 60, repeat: 1, yoyo: true}); //11min0s

     tl.to(camera.position, {x: 0, z: 0, y:120, delay: 0, duration:90}); //12min0s
     
     


 /*  
     //move 2
     tl.to(camera.position, {x: 50, y: 0, z: -50, duration: 60})
     tl.to(camera.position, {x: -50, y: 0, z: 50, delay: 120, duration: 180}) // 6min
  
     // move 3
     tl.to(camera.position, {x: 0, y: 70, z: -60, duration: 60})
     tl.to(camera.position, {y: -50, x: 0, z: -60, delay: 120, duration: 180})// 6min
     tl.to(camera.position, {x: 0, y: 0, z: 120, duration: 120})
  */      
}

function cameraFrontMove(){
     let tl = gsap.timeline({repeat: 30, repeatDelay: 12});
     tl.to(cameraFront.position, {z: 20, delay: 5, duration:24});
     tl.to(cameraFront.position, {z: 30, duration:12});
     tl.to(cameraFront.position, {z: 50, duration:12});
     tl.to(cameraFront.position, {x: -30, duration: 24});
     tl.to(cameraFront.position, {y: 20, duration: 12});
     tl.to(cameraFront.position, {x: 28, duration:12});
     tl.to(cameraFront.position, {x: 0, duration:12});
     tl.to(cameraFront.position, {z: 20 , duration: 24});
     tl.to(cameraFront.position, {y: 10 , duration: 24});
     tl.to(cameraFront.position, {x: 30  , duration: 12});
     tl.to(cameraFront.position, {z: 18, duration:12}); 
     tl.to(cameraFront.position, {y: 25, duration:12}); 
     tl.to(cameraFront.position, {x: 30, duration:12}); 
     tl.to(cameraFront.position, {x: -30, duration:24}); 
     tl.to(cameraFront.position, {x: 1, duration:24});  
     tl.to(cameraFront.position, {z: 20, duration:12});  
     tl.to(cameraFront.position, {y: 20, duration:24});  
     tl.to(cameraFront.position, {z: 10, duration:24});  
     tl.to(cameraFront.position, {y: 20, duration:12});  
     tl.to(cameraFront.position, {z: 20, duration:12});
}

function createLights(){
     const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.75);
     scene.add(ambientLight);

     const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
     dirLight.position.set(5, 500, 150);
     scene.add(dirLight);
     dirLight.castShadow = true;
     dirLight.shadow.mapSize.width = 1024;
     dirLight.shadow.mapSize.height = 1024;
     const d = 150;
     dirLight.shadow.camera.top = d;
     dirLight.shadow.camera.right = d;
     dirLight.shadow.camera.bottom = -d;
     dirLight.shadow.camera.left = -d;
     dirLight.shadow.camera.near = 0.1;
     dirLight.shadow.camera.far = 100;

     const pointLight = new THREE.PointLight(0xffffff, 0.6);
     pointLight.position.set(0, 300, 25);
     scene.add(pointLight);

     const spotLight = new THREE.SpotLight(0xffffff, 0.5);
     spotLight.position.set(0, 300, -5);
     scene.add(spotLight);

     const greenLight = new THREE.PointLight(0x00ff00, 0.5, 1000, 0);
     greenLight.position.set(550, 50, 0);
     scene.add(greenLight);

     const redLight = new THREE.PointLight(0xff0000, 0.5, 1000, 0);
     redLight.position.set(-550, 50, 0);
     scene.add(redLight);

     const blueLight = new THREE.PointLight(0x0000ff, 0.5, 1000, 0);
     greenLight.position.set(0, 50, 550);
     scene.add(blueLight);
}

// particles //
function createParticles(){
     const amount = 5000;
     const radius = 1000;

     const positions = new Float32Array( amount * 3 );
     const colors = new Float32Array( amount * 3 );
     const sizes = new Float32Array( amount );

     const vertex = new THREE.Vector3();
     const color = new THREE.Color( 0xffffff );

     for ( let i = 0; i < amount; i ++ ) {
          vertex.x = ( Math.random() * 2 - 1 ) * radius;
          vertex.y = ( Math.random() * 2 - 1 ) * radius;
          vertex.z = ( Math.random() * 2 - 1 ) * radius;
          vertex.toArray( positions, i * 3 );

          if ( vertex.x < 0 ) {
          color.setHSL( 0.5 + 0.5 * ( i / amount ), 0.7, 0.5 );
          } else {
          color.setHSL( 0.0 + 0.5 * ( i / amount ), 0.9, 0.5 );
          }
          color.toArray( colors, i * 3 );
          sizes[ i ] = 10;
     }
     
     const geometry = new THREE.BufferGeometry();
     geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
     geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
     geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

     const material = new THREE.ShaderMaterial( {
          uniforms: {
               color: { value: new THREE.Color( 0xffffff ) },
               pointTexture: { value: new THREE.TextureLoader().load( './assets/images/spark1.png' ) }
          },
          vertexShader: document.getElementById( 'vertexshader' ).textContent,
          fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
          opacity: 0.37
     } );
     
     particleStars = new THREE.Points( geometry, material );
     scene.add( particleStars );  
}

function createCube(){
     const geometry = new THREE.BoxGeometry();
     const material = new THREE.MeshPhongMaterial({
          color: 0x555555,
          transparent: true,
          opacity: 1
     })
     const cubeMesh = new THREE.Mesh(geometry, material);
     cubeMesh.castShadow = true;
     cubeMesh.receiveShadow = true;
     scene.add(cubeMesh);
     return cubeMesh;
}

///// create half Ring Torus //////
function createTorus(){
     const ringGeo = new THREE.TorusGeometry(32, 1, 16, 100, Math.PI);
     const ringMat = new THREE.MeshPhongMaterial({
          color: 0xeeeeee,
          map: sparkTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1
     })
     const ring = new THREE.Mesh(ringGeo, ringMat);
     ring.rotation.x = -Math.PI / 2;
     ring.position.y = 33;
     ring.castShadow = true;
     ring.receiveShadow = true;
     scene.add(ring);

     // inner ring
     const innerRingGeo = new THREE.TorusGeometry(3, 1, 16, 100);
     innerRing = new THREE.Mesh(innerRingGeo, ringMat);
     innerRing.rotation.x = -Math.PI/2;
     innerRing.position.y = 15;
     innerRing.castShadow = true;
     innerRing.receiveShadow = true;
     scene.add(innerRing);

     //outerRing --hidden
     const outerRingGeo = new THREE.TorusGeometry(57, 1, 16, 100);
     const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
     outerRing.position.y = 13.5;
     outerRing.rotation.x = -Math.PI/2;
     outerRing.castShadow = true;
     outerRing.receiveShadow = true;
     //scene.add(outerRing);
}

///// Vibraphone right(outer/left(inner hidden)
function createVibraphone(){
     for(let i = 0; i < 56; i++){
          const cube = createCube();
          //cube.material.color = new THREE.Color(0xffffff * Math.random());
          cube.material.color = new THREE.Color(colors[i % 8]);
          cube.scale.set(1.75, 58 - i, 3);
          let angle = Math.PI / 56;
          let radius = 62;
          cube.position.x = radius * Math.cos(angle * i);
          cube.position.z = radius * Math.sin(angle * i);
          cube.rotation.y = -angle * i;
          rightCubes.push(cube);
          groupRight.add(cube);
          groupRight.rotation.y = Math.PI - angle;
          groupRight.position.set(0, 14, 0);
     }
     scene.add(groupRight);

    
}
 
///// pendulum string mesh / ball mesh

function createStringMesh(color){
     const geometry = new THREE.CylinderGeometry(stringWidth, stringWidth, stringLength);
     const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          //color: 0xeeffee,

     })
     const string = new THREE.Mesh(geometry, material);
     string.position.set(0, 0, 0);
     string.castShadow = true;
     string.receiveShadow = true;
     scene.add(string);
     return string;
}

function createBallMesh(color){
     const geometry = new THREE.SphereGeometry(ballRadius, 30);
     const material = new THREE.MeshStandardMaterial({
          //color: 0xffffff,
          color: color,
          map: sparkTexture,
          roughness: 0.61,
          roughnessMap: metalTextureRoughness,
          metalness: 0.52
     })
     const ball = new THREE.Mesh(geometry, material);
     ball.castShadow = true;
     ball.receiveShadow = true;
     scene.add(ball);     
     return ball;
}

class Pendulum {
     constructor(string, ball, frequency, amplitude, a){
          this.string = string;
          this.ball = ball;
          this.frequency = frequency;
          this.amplitude = amplitude;
          this.a = a;
     }
     update(totalTime){
          this.string.rotation.z = this.amplitude * Math.cos((this.frequency * totalTime)/3000);
          this.ball.rotation.z = this.amplitude * Math.cos((this.frequency * totalTime)/3000);
          
        
          //rotation by angle    
          this.string.rotation.y = this.a;       
          this.ball.rotation.y = this.a;
     }
};

function createPendulum(origin, frequency, amplitude, a, color){
     const stringMesh = createStringMesh(color);
     stringMesh.position.add(origin);
     stringMesh.translateY(stringLength);
     stringMesh.geometry.translate(0, -(stringLength * 0.5), 0);

     const ballMesh = createBallMesh(color);
     ballMesh.position.add(origin);
     ballMesh.translateY(stringLength);
     ballMesh.geometry.translate(0, -stringLength, 0);

     const pendulum = new Pendulum(stringMesh, ballMesh, frequency, amplitude, a, color);
     return pendulum; //a is for angle positions
};

///// create pendulums make ring circle


function createPendulums(){
     for(let i = 0; i < maxPendulum; i++){
          let radius = 32;     
          let angle = Math.PI / maxPendulum;
          //let frequency = 1.12 - i * 0.01; //
          //let frequency = 2.8 - i * 0.02; //
          let frequency = 1.4 - i * 0.01; //

          let amplitude = Math.PI/3;

          let posX1 = -radius * Math.cos(angle * i + angle/maxPendulumSet);
          let posZ1 = -radius * Math.sin(angle * i + angle/maxPendulumSet) ;
          const pendulum1 = createPendulum(new THREE.Vector3(posX1, 0, posZ1), frequency, amplitude, -angle * i - angle/maxPendulumSet , colors[0]);     
          pendulums1.push(pendulum1);

          let posX2 = radius * -Math.cos(angle * i + angle * 2/maxPendulumSet);
          let posZ2 = radius * -Math.sin(angle * i + angle * 2/maxPendulumSet );
          const pendulum2 = createPendulum(new THREE.Vector3(posX2, 0, posZ2), frequency, amplitude, -angle * i - angle * 2/maxPendulumSet, colors[1]);  
          pendulums2.push(pendulum2);

          let posX3 = radius * -Math.cos(angle * i + angle * 3/maxPendulumSet);
          let posZ3 = radius * -Math.sin(angle * i + angle * 3/maxPendulumSet );
          const pendulum3 = createPendulum(new THREE.Vector3(posX3, 0, posZ3), frequency, amplitude, -angle * i - angle * 3/maxPendulumSet, colors[2]);  
          pendulums3.push(pendulum3);

          let posX4 = radius * -Math.cos(angle * i + angle * 4/maxPendulumSet);
          let posZ4 = radius * -Math.sin(angle * i + angle * 4/maxPendulumSet );
          const pendulum4 = createPendulum(new THREE.Vector3(posX4, 0, posZ4), frequency, amplitude, -angle * i - angle* 4/maxPendulumSet, colors[3]);  
          pendulums4.push(pendulum4);

          let posX5 = radius * -Math.cos(angle * i + angle * 5/maxPendulumSet);
          let posZ5 = radius * -Math.sin(angle * i + angle * 5/maxPendulumSet );
          const pendulum5 = createPendulum(new THREE.Vector3(posX5, 0, posZ5), frequency, amplitude, -angle * i - angle* 5/maxPendulumSet, colors[4]);  
          pendulums5.push(pendulum5);

          let posX6 = radius * -Math.cos(angle * i + angle * 6/maxPendulumSet);
          let posZ6 = radius * -Math.sin(angle * i + angle * 6/maxPendulumSet );
          const pendulum6 = createPendulum(new THREE.Vector3(posX6, 0, posZ6), frequency, amplitude, -angle * i - angle* 6/maxPendulumSet, colors[5]);  
          pendulums6.push(pendulum6);

          let posX7 = radius * -Math.cos(angle * i + angle * 7/maxPendulumSet);
          let posZ7 = radius * -Math.sin(angle * i + angle * 7/maxPendulumSet );
          const pendulum7 = createPendulum(new THREE.Vector3(posX7, 0, posZ7), frequency, amplitude, -angle * i - angle* 7/maxPendulumSet, colors[6]);  
          pendulums7.push(pendulum7);

          let posX8 = radius * -Math.cos(angle * i + angle * 8/maxPendulumSet);
          let posZ8 = radius * -Math.sin(angle * i + angle * 8/maxPendulumSet );
          const pendulum8 = createPendulum(new THREE.Vector3(posX8, 0, posZ8), frequency, amplitude, -angle * i - angle* 8/maxPendulumSet, colors[7]);  
          pendulums8.push(pendulum8);
     };
};



let startTime = null;

function animate(time){
     if(startTime == null){
          startTime = time;
     }
    
     const totalTime = time - startTime;
     if(soundEnabled){
          update(totalTime);
     }

     renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);// need for cameraFront
     renderer.render(scene, camera);
     window.requestAnimationFrame(animate);

     //for cameraFront
     renderer.clearDepth();
     renderer.setScissorTest(true);
     // front
     renderer.setScissor(window.innerWidth - insetWidth ,  insetHeight / 4 - 15,
          insetWidth + 9, insetHeight);
     renderer.setViewport(window.innerWidth - insetWidth,  insetHeight / 4 - 15, insetWidth + 9, insetHeight + 16);
     renderer.render(scene, cameraFront);
     // top
     renderer.setScissor(8,  insetHeight / 4 - 15,
          insetWidth + 9, insetHeight);
     renderer.setViewport(8,  insetHeight / 4 - 15, insetWidth + 9, insetHeight + 16);
     renderer.render(scene, cameraTop);
     
     renderer.setScissorTest(false);
}

//Canon D progress DABmF#m GDGA D0 G1 A2 F#m1 Bm2 
// 12 8 8 7 8 6 8 7   // 11 7 7 6 7 5 7 6

function update(totalTime){
     orbitControls.update();
     spinningGroup.rotation.y += 0.04;
     particleStars.rotation.z = 0.0000125 * totalTime;
     particleStars.rotation.x = 0.0000175 * totalTime;
     const geometry = particleStars.geometry;
     const attributes = geometry.attributes;
     attributes.size.needsUpdate = true;

        
     for ( let i = 0; i < attributes.size.array.length; i ++ ) {
          attributes.size.array[ i ] = 10 + 15 * Math.sin( 0.1 * i + totalTime / 1000);
     }
      
     //pendulumsSet1(totalTime);
     setTimeout(function(){pendulums1.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoD(index + 9);
               }
               if(pulseEnabled){
                    vibraphoneMove(ndx, index);
               }
          } 
     })}, 0);

     setTimeout(function (){pendulumsSet2(totalTime)}, 3000);
     setTimeout(function (){pendulumsSet3(totalTime)}, 6000);
     setTimeout(function (){pendulumsSet4(totalTime)}, 9000);
     setTimeout(function (){pendulumsSet5(totalTime)}, 12000);
     setTimeout(function (){pendulumsSet6(totalTime)}, 15000);
     setTimeout(function (){pendulumsSet7(totalTime)}, 18000);
     setTimeout(function (){pendulumsSet8(totalTime)}, 21000);
     
};


function pendulumsSet2(totalTime){
     pendulums2.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 1;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoA(index + 8);
               }
               if(pulseEnabled){
                         vibraphoneMove(ndx, index);
                    
               } 
              
          } 
     })
};
function pendulumsSet3(totalTime){
     pendulums3.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 2;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoBm(index + 7);
               }
                    if(pulseEnabled){
                         vibraphoneMove(ndx, index);
               } 
          } 
     })
};

function pendulumsSet4(totalTime){
     pendulums4.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 3;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoFsharpm(index + 6);
               }
                    if(pulseEnabled){                    
                         vibraphoneMove(ndx, index);
               } 
          } 
     })
};

function pendulumsSet5(totalTime){
     pendulums5.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 4;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoG(index + 7);
               }
               if(pulseEnabled){
                    vibraphoneMove(ndx, index);
               } 
          } 
     })
};

function pendulumsSet6(totalTime){
     pendulums6.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 5;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoD(index + 5);
               }
               if(pulseEnabled){
                         vibraphoneMove(ndx, index);
               } 
          } 
     })
};

function pendulumsSet7(totalTime){
     pendulums7.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 6;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoG(index + 7);
               }
               if(pulseEnabled){
                         vibraphoneMove(ndx, index);
               } 
          } 
     })
};

function pendulumsSet8(totalTime){
     pendulums8.forEach((p, index) => {
          p.update(totalTime);
          let ndx = index * 8 + 7;
          if(p.ball.rotation.z <= -1.04714) { 
               if(soundEnabled){
                    playPianoA(index + 6);
               }
               if(pulseEnabled){
                         vibraphoneMove(ndx, index);
               }
          } 
     })
};

function vibraphoneMove(ndx, index){
          let tl = gsap.timeline({});
          tl.to(rightCubes[ndx].material, {opacity: 1, duration: 0.5}) ; 
          tl.to(rightCubes[ndx].position, {y: 36 - index  , duration: 0.5, ease: 'power1.easeInOut'}, '<') ;
          tl.to(rightCubes[ndx].position, {y: 0, duration: 4}) ;  
          tl.to(rightCubes[ndx].material, {opacity: 0.65, duration: 4}, '<') ; 
}

window.addEventListener('resize', () => {
     //let aspect = window.innerWidth/window.innerHeight;
     camera.aspect = aspect;
     camera.updateProjectionMatrix();
     //camera.position.z = Math.max(8/aspect, 6);
     camera.lookAt(0, 0, 0);
     renderer.setSize(window.innerWidth, window.innerHeight);

     insetWidth = window.innerHeight * 0.35;
     insetHeight = window.innerHeight * 0.35;
     cameraFront.aspect = insetWidth / insetHeight;
     cameraFront.updateProjectionMatrix();
     cameraTop.aspect = insetWidth / insetHeight;
     cameraTop.updateProjectionMatrix();
});
