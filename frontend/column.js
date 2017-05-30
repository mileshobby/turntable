import Square from './square';

class Column{

  constructor(parent, numRows, frequency){
    this.column = document.createElement('div');
    this.column.className = 'column';
    parent.appendChild(this.column);
    this.squares = new Array(numRows).fill();
    this.squares = this.squares.map((el,i)=>new Square(`tone${i+1}`,this.column, frequency));
    this.playAll = this.playAll.bind(this);
  }

  playAll(){
    this.squares.forEach(square => square.play());
  }
}

export default Column;
