import Square from './square';
import Column from './column';
import anime from 'animejs';


document.addEventListener('DOMContentLoaded', () => {
   setupInstruments();
   setupRotationControls();
   loadContent();
 });

//TODO refactor this out into its own file
class Grid{

  constructor(parent, numCols, numRows, folder, filetype){
    // slider
    let slider = document.getElementById('freq');
    this.frequency = slider.value;
    slider.addEventListener('input', (e)=>{
      this.frequency = e.target.value;
    });

    //grid
    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    this.numCols = numCols;
    this.numRows = numRows;
    parent.appendChild(this.grid);
    this.columns = new Array(this.numCols).fill();
    this.columns = this.columns.map( (el, i) => new Column(this.grid, this.numRows, this.frequency, folder, filetype) );
    this.play = this.play.bind(this);
    this.stopPlay = false;
    this.pauseIndex = 0;
    this.reset = this.reset.bind(this);

    // play-pause
    // TODO refactor out of this class
    this.playButton = document.getElementById('play');
    this.playButton.addEventListener('click', () => {
      if (this.stopPlay){
        this.stopPlay = false;
        this.play(this.pauseIndex);
        this.playButton.classList.add('off');
        this.pause.classList.remove('off');
    }});
    this.pause = document.getElementById('pause');
    this.pause.addEventListener('click', () => {
      this.stopPlay = true;
      this.pause.classList.add('off');
      this.playButton.classList.remove('off');
    });
  }

  play(colIndex){
    this.pauseIndex = colIndex;
    if (this.stopPlay) return;
    let nextIndex = (colIndex === this.numCols-1 ? 0 : colIndex+1);
    setTimeout(() => {
      this.columns[colIndex].playAll();
      this.play(nextIndex);
    }, this.frequency);
  }

  reset(){
    this.columns.forEach( column => column.turnOff());
  }

}

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
  //setup
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

const loadContent = () => {
  setTimeout(()=>{
    document.getElementById('loading-screen').style.display = 'none';
  }, 5000);
};
