import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export default function RobotScene({model='humanoid',running=true,wireframe=false,reset=0,finish='titanium',speed=1,theme='dark'}) {
 const host=useRef(null), api=useRef(null); const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const el=host.current; let renderer; const resources=[];
  try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'}); } catch {setFailed(true);return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.65)); renderer.setClearColor(0x000000,0); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.5; el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(34,1,.1,60);camera.position.set(4,2.7,7.8);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.4,0);controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.55;controls.maxPolarAngle=1.8;controls.enableDamping=true;controls.autoRotate=false;
  const hemi=new THREE.HemisphereLight(0xe2f0f4,0x313a30,3.3); scene.add(hemi);
  function light(color,intensity,pos){const l=new THREE.DirectionalLight(color,intensity);l.position.set(...pos);scene.add(l);return l;}
  const key=light(0xffffff,5,[3,7,5]);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=6;key.shadow.camera.bottom=-3;
  light(0xc1f45c,3,[-4,3,-2]);light(0xb8d7ee,4,[3,4,-4]);
  const white=new THREE.MeshStandardMaterial({color:0xdde0da,metalness:.64,roughness:.26});
  const dark=new THREE.MeshStandardMaterial({color:0x171b1b,metalness:.8,roughness:.3});
  const black=new THREE.MeshStandardMaterial({color:0x040a0b,metalness:.7,roughness:.17});
  const lime=new THREE.MeshStandardMaterial({color:0xc1f45c,emissive:0x8cad3f,emissiveIntensity:.45,metalness:.35,roughness:.24});
  const steel=new THREE.MeshStandardMaterial({color:0x78817b,metalness:.85,roughness:.22});const mats=[white,dark,black,lime,steel];
  const root=new THREE.Group();scene.add(root);const animated=[];
  function mesh(geo,mat,parent,pos=[0,0,0]){const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.castShadow=true;m.receiveShadow=true;parent.add(m);resources.push(geo);return m;}
  function box(w,h,d,mat,parent,pos,r=.08){return mesh(new RoundedBoxGeometry(w,h,d,3,r),mat,parent,pos);}
  function cyl(r1,r2,h,mat,parent,pos){return mesh(new THREE.CylinderGeometry(r1,r2,h,40),mat,parent,pos);}
  function ball(r,mat,parent,pos){return mesh(new THREE.SphereGeometry(r,28,20),mat,parent,pos);}
  function joint(parent,pos,r=.16){const g=new THREE.Group();g.position.set(...pos);parent.add(g);const c=cyl(r,r,.22,dark,g);c.rotation.z=Math.PI/2;const cap=cyl(r*.7,r*.7,.24,steel,g);cap.rotation.z=Math.PI/2;return g;}
  if(model==='humanoid'){
   root.rotation.y=-.18;
   box(.69,.38,.39,dark,root,[0,1.48,0]);box(.62,.23,.4,white,root,[0,1.51,.04]);
   const chest=new THREE.Group();chest.position.y=1.8;root.add(chest);box(.9,.72,.44,white,chest,[0,.25,0],.15);box(.58,.35,.025,dark,chest,[0,.34,.235],.05);box(.2,.026,.018,lime,chest,[0,.45,.255],.006);box(.3,.03,.027,steel,chest,[0,.22,.255],.008);
   for(let i=0;i<4;i++)box(.055,.14,.03,black,chest,[-.105+i*.07,.01,.23],.015);
   cyl(.11,.14,.2,dark,root,[0,2.63,0]);const head=new THREE.Group();head.position.set(0,2.85,.01);root.add(head);animated.push({g:head,kind:'head'});box(.58,.5,.47,white,head,[0,0,0],.16);box(.52,.22,.08,black,head,[0,.015,.225],.065);box(.3,.026,.012,lime,head,[0,.024,.271],.009);cyl(.11,.11,.06,steel,head,[0,.26,0]);
   for(const s of [-1,1]){
    const arm=joint(root,[s*.6,2.31,0],.2);arm.rotation.z=s*.13;animated.push({g:arm,kind:'arm',s});box(.28,.58,.3,white,arm,[0,-.35,0],.09);box(.038,.32,.02,lime,arm,[s*.14,-.34,.1],.008);const elbow=joint(arm,[0,-.7,0],.135);elbow.rotation.x=-.16;box(.24,.49,.29,white,elbow,[0,-.28,.04],.09);box(.15,.21,.19,dark,elbow,[0,-.64,.04],.04);
    for(let f=0;f<3;f++)box(.039,.14,.075,steel,elbow,[-.05+f*.05,-.8,.06],.015);
    const hip=joint(root,[s*.235,1.34,0]);box(.32,.55,.37,white,hip,[0,-.31,0],.1);box(.16,.2,.035,dark,hip,[0,-.27,.2],.035);const knee=joint(hip,[0,-.66,0]);box(.27,.5,.31,white,knee,[0,-.28,.01]);box(.06,.29,.018,lime,knee,[0,-.28,.18],.01);box(.32,.18,.55,dark,knee,[0,-.6,.12]);box(.32,.085,.46,white,knee,[0,-.54,.16]);
   }
  }else if(model==='arm'){
   controls.target.set(0,1.2,0);camera.position.set(4,2.8,7);cyl(.65,.74,.22,dark,root,[0,.11,0]);cyl(.42,.48,.3,white,root,[0,.34,0]);cyl(.4,.4,.035,lime,root,[0,.51,0]);const swivel=new THREE.Group();swivel.position.y=.55;root.add(swivel);animated.push({g:swivel,kind:'swivel'});
   const j=joint(swivel,[0,.16,0],.28);j.rotation.z=-.45;box(.34,1.12,.4,white,j,[0,.6,0]);box(.15,.65,.035,lime,j,[0,.65,.21]);const e=joint(j,[0,1.2,0],.26);e.rotation.z=1.1;box(.28,.96,.34,white,e,[0,.53,0]);box(.11,.62,.03,dark,e,[0,.53,.18]);const wrist=joint(e,[0,1.06,0],.18);wrist.rotation.z=.8;box(.22,.3,.24,steel,wrist,[0,.21,0]);for(const s of [-1,1]){box(.075,.34,.14,dark,wrist,[s*.17,.43,0]);box(.17,.07,.14,dark,wrist,[s*.12,.59,0]);}
  }else{
   controls.target.set(0,.8,0);camera.position.set(4,2.7,6.5);box(1.2,.45,1.55,white,root,[0,.7,0],.16);box(1.1,.18,1.35,dark,root,[0,.99,0]);box(.86,.055,.05,lime,root,[0,.74,.79]);for(const s of [-1,1])for(const z of [-.51,.51]){const wheel=cyl(.29,.29,.23,black,root,[s*.65,.37,z]);wheel.rotation.z=Math.PI/2;const hub=cyl(.18,.18,.25,steel,root,[s*.66,.37,z]);hub.rotation.z=Math.PI/2;}
   cyl(.07,.09,.55,steel,root,[0,1.33,-.22]);box(.6,.25,.32,dark,root,[0,1.66,-.22]);for(const x of [-.18,.18])ball(.07,lime,root,[x,1.67,-.045]);cyl(.19,.21,.12,lime,root,[0,1.09,.22]);
  }
  const platform=cyl(1.45,1.54,.11,dark,scene,[0,-.085,0]);platform.receiveShadow=true;
  const ring=mesh(new THREE.TorusGeometry(1.47,.013,8,100),lime,scene,[0,-.022,0]);ring.rotation.x=Math.PI/2;
  const grid=new THREE.GridHelper(14,28,0x414b3b,0x242b25);grid.position.y=-.15;grid.material.transparent=true;grid.material.opacity=.28;scene.add(grid);
  const plane=mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.25}),scene,[0,-.14,0]);plane.rotation.x=-Math.PI/2;
  let frame,visible=true,active=true,spin=true,rate=1;const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let t=0,last=performance.now();
  api.current={setFinish:v=>{white.color.set({titanium:0xdde0da,graphite:0x454e58,ceramic:0xefe5d2}[v]||0xdde0da);},setSpeed:v=>{rate=v;},setTheme:v=>{renderer.toneMappingExposure=v==='light'?1.2:1.5;grid.material.opacity=v==='light'?.4:.28;},setRun:v=>{spin=v;},setWire:v=>mats.forEach(m=>{m.wireframe=v;}),reset:()=>{camera.position.set(4,model==='humanoid'?2.7:2.8,model==='humanoid'?7.8:7);controls.target.set(0,model==='humanoid'?1.4:1.2,0);root.rotation.y=model==='humanoid'?-.18:0;controls.update();}};
  const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();});resize.observe(el);
  const observe=new IntersectionObserver(([e])=>visible=e.isIntersecting);observe.observe(el);
  function loop(now){frame=requestAnimationFrame(loop);const delta=Math.min((now-last)/1000,.05);last=now;if(!visible||!active)return;if(spin&&!reduce){t+=delta*rate;root.rotation.y+=delta*.085*rate;animated.forEach(({g,kind,s})=>{if(kind==='head')g.rotation.y=Math.sin(t*.6)*.12;if(kind==='arm')g.rotation.z=s*(.13+Math.sin(t*.8)*.035);if(kind==='swivel')g.rotation.y=Math.sin(t*.6)*.3;});}controls.update();renderer.render(scene,camera);}frame=requestAnimationFrame(loop);
  function vis(){active=!document.hidden;}document.addEventListener('visibilitychange',vis);
  return()=>{cancelAnimationFrame(frame);resize.disconnect();observe.disconnect();document.removeEventListener('visibilitychange',vis);controls.dispose();resources.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());plane.material.dispose();grid.geometry.dispose();grid.material.dispose();renderer.dispose();renderer.domElement.remove();api.current=null;};
 },[model]);
 useEffect(()=>api.current?.setFinish(finish),[finish,model]);useEffect(()=>api.current?.setSpeed(speed),[speed,model]);useEffect(()=>api.current?.setTheme(theme),[theme,model]);useEffect(()=>api.current?.setRun(running),[running,model]);useEffect(()=>api.current?.setWire(wireframe),[wireframe,model]);useEffect(()=>{if(reset)api.current?.reset();},[reset]);
 return <div className="robot-scene" ref={host} role="img" aria-label={`Interactive 3D ${model} robot. Drag to rotate.`}>{failed&&<div className="webgl-fallback"><span>AXIOM / {model.toUpperCase()}</span><h3>Engineered for motion.</h3><p>Interactive 3D requires a browser with WebGL enabled. All product details are available below.</p></div>}</div>;
}
