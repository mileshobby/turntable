import Square from './square';
import Column from './column';
import anime from 'animejs';


document.addEventListener('DOMContentLoaded', () => {
   //setup
   const front = document.getElementById('main');
   let mainGrid = new Grid(front, 16, 16, 'tones2', 'mp3');
   mainGrid.play(0);
  //  const back = document.getElementById('main-2');
  //  let drums = new Grid(back, 16, 16, 'drums', 'wav');
  //  drums.play(0);
   setupRotationControls();
 });


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

}

const setupRotationControls = () => {
  let topButton = document.getElementById('top-button');
  let bottomButton = document.getElementById('bottom-button');
  let leftButton = document.getElementById('left-button');
  let rightButton = document.getElementById('right-button');
  let frontButton = document.getElementById('front-button');
  let backButton = document.getElementById('back-button');
  let cube = document.getElementById('cube');
  frontButton.addEventListener('click', ()=>{
    cube.className = "show-front";
  });
  backButton.addEventListener('click', ()=>{
    cube.className = "show-back";
  });
  leftButton.addEventListener('click', ()=>{
    cube.className = "show-left";
  });
  rightButton.addEventListener('click', ()=>{
    cube.className = "show-right";
  });
  topButton.addEventListener('click', ()=>{
    cube.className = "show-top";
  });
  bottomButton.addEventListener('click', ()=>{
    cube.className = "show-bottom";
  });
};
