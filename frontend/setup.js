import anime from 'animejs';
import Grid from './grid';

document.addEventListener('DOMContentLoaded', () => {
   setupInstruments();
   setupRotationControls();
   loadContent();
   //spin title animation
   anime({
     targets: 'h1',

     rotate: {
      value: 360,
      duration: 3000,
      easing: 'easeInOutSine',
    },
    delay: 1000
  });
 });

 const setupRotationControls = () => {
   //DRYed up code by making event listener on wrapping div instead of each
   //individual button
   let cubeControls = document.getElementById('cube-controls');
   let cube = document.getElementById('cube');

   cubeControls.addEventListener('click', (e)=>{
     e.preventDefault();
     const side = e.target.id.split("-")[0];
     cube.className = `show-${side}`;
   });
 };

 const setupInstruments = () => {
   //setup each side of cube
   const front = document.getElementsByClassName('front')[0];
   let snares = new Grid(front, 16, 16, 'claps&snares', 'wav');
   const left = document.getElementsByClassName('left')[0];
   let bells = new Grid(left, 16, 16, 'tones2', 'mp3');
   const bottom = document.getElementsByClassName('bottom')[0];
   let drums = new Grid(bottom, 16, 16, 'kicks', 'wav');
   const right = document.getElementsByClassName('right')[0];
   let hats = new Grid(right, 16, 16, 'hats', 'wav');
   const back = document.getElementsByClassName('back')[0];
   let shakers = new Grid(back, 16, 16, 'shakers', 'wav');
   const top = document.getElementsByClassName('top')[0];
   let bongos = new Grid(top, 16, 16, 'bongos', 'wav');
   hats.play(0);
   shakers.play(0);
   bongos.play(0);
   bells.play(0);
   drums.play(0);
   snares.play(0);
   let grids = [{instrument: bells, face: "left"},
                 {instrument: drums, face: "bottom"},
                 {instrument: snares, face: "front"},
                 {instrument: hats, face: "right"},
                 {instrument: shakers, face: "back"},
                 {instrument: bongos, face: "top"}];
   setupResetButtons(grids);
 };

 const setupResetButtons = (grids) => {
   let resetAllButton = document.getElementById('reset-all');
   resetAllButton.addEventListener('click', () => {
     grids.forEach( grid => grid.instrument.reset() );
   });

   let resetFaceButton = document.getElementById('reset-face');
   let cube = document.getElementById('cube');
   resetFaceButton.addEventListener('click', ()=> {
     let currentFace = cube.className.split('-')[1];
     for (let i = 0; i < grids.length; i++) {
       if(grids[i].face === currentFace){
         grids[i].instrument.reset();
       }
     }
   });
 };

//spinner for audio buffer time
 const loadContent = () => {
   setTimeout(()=>{
     document.getElementById('loading-screen').style.display = 'none';
   }, 1000);
 };
