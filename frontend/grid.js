// import React from 'react';
// import ReactDOM from 'react-dom';
import Square from './square';
import Column from './column';

document.addEventListener('DOMContentLoaded', () => {
   const root = document.getElementById('main');
   let mainGrid = new Grid(root, 16);
   mainGrid.play(0);
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
    let play = document.getElementById('play');
    play.addEventListener('click', () => {
      if (this.stopPlay){
        this.stopPlay = false;
        this.play(this.pauseIndex);
    }});
    let pause = document.getElementById('pause');
    pause.addEventListener('click', () => {
      console.log('hi');
      this.stopPlay = true;
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
