import Square from './square';

class Column{

  constructor(parent, numRows, frequency, folder){
    this.column = document.createElement('div');
    this.column.className = 'column';
    parent.appendChild(this.column);
    this.squares = new Array(numRows).fill();
    this.squares = this.squares.map((el,i)=>new Square(`${i+1}`,this.column, frequency, folder));
    this.playAll = this.playAll.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  playAll(){
    this.squares.forEach(square => square.play());
  }

  turnOff(){
    this.squares.forEach(square => square.turnOff());
  }
}

export default Column;
