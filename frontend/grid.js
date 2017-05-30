import Square from './square';
import Column from './column';
import anime from 'animejs';


document.addEventListener('DOMContentLoaded', () => {
   //setup
   const root = document.getElementById('main');
   let mainGrid = new Grid(root, 16);
   mainGrid.play(0);

  //  document.addEventListener('mouseup',()=>{
    //  anime({
    //     targets: '.selected',
    //     translateY: [
    //       { value: 10, duration: 200 },
    //       { value: 0, duration: 200 }
    //     ],
    //     rotate: '1turn',
    //     duration: 2000,
    //     loop: true
    //   });
    // });
 });


class Grid{

  constructor(parent, numCols){
    //slider
    let slider = document.getElementById('freq');
    this.frequency = slider.value;
    slider.addEventListener('input', (e)=>{
      this.frequency = e.target.value;
    });

    //grid
    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    this.numCols = numCols;
    parent.appendChild(this.grid);
    this.columns = new Array(this.numCols).fill();
    this.columns = this.columns.map( (el, i) => new Column(this.grid, 16, this.frequency) );
    this.play = this.play.bind(this);
    this.stopPlay = false;
    this.pauseIndex = 0;

    //play-pause
    //TODO refactor out of this class
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
    let nextIndex = (colIndex === 15 ? 0 : colIndex+1);
    setTimeout(() => {
      this.columns[colIndex].playAll();
      this.play(nextIndex);
    }, this.frequency);
  }

}
