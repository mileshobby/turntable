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
    //frequency slider
    this.slider = document.createElement('input');
    let freqLabel = document.createElement('label');
    freqLabel.innerHTML = "Hz";
    parent.appendChild(freqLabel);
    parent.appendChild(this.slider);
    this.slider.setAttribute("type", "range");
    this.slider.setAttribute("min", 100);
    this.slider.setAttribute("max", 1000);
    this.slider.setAttribute("value", 200);
    this.frequency = 200;
    this.slider.addEventListener('input', (e)=>{
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
  }

  play(colIndex){
    if (this.stopPlay) return;
    let nextIndex = (colIndex === 15 ? 0 : colIndex+1);
    setTimeout(() => {
      this.columns[colIndex].playAll();
      this.play(nextIndex);
    }, this.frequency);
  }

}
