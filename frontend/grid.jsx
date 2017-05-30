// import React from 'react';
// import ReactDOM from 'react-dom';
import Square from './square';
import Column from './column';

document.addEventListener('DOMContentLoaded', () => {
   const root = document.getElementById('main');
   let mainGrid = new Grid(root, 16);
   mainGrid.play(0);
  //  const col = new Column(root, 16);
  //  let square = new Square('tone1', mainGrid.grid);
 });


class Grid{

  constructor(parent, numCols){
    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    this.numCols = numCols;
    parent.appendChild(this.grid);
    this.columns = new Array(this.numCols).fill();
    this.columns = this.columns.map( (el, i) => new Column(this.grid, 16) );
    this.play = this.play.bind(this);
  }

  play(colIndex){
    let nextIndex = (colIndex === 15 ? 0 : colIndex+1);
    setTimeout(() => {
      this.columns[colIndex].playAll();
      console.log(this);
      this.play(nextIndex);
    }, 500);
  }

}
