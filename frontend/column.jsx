import Square from './square';

class Column{

  constructor(parent, numRows){
    this.column = document.createElement('div');
    this.column.className = 'column';
    parent.appendChild(this.column);
    this.squares = new Array(numRows).fill();
    this.squares = this.squares.map((el,i)=>new Square(`tone${i+1}`,this.column));
    this.playAll = this.playAll.bind(this);
    window.addEventListener("keydown", this.playAll);
    window.addEventListener("keydown", this.playAll);
  }

  playAll(){
    this.squares.forEach(square => square.play());
  }
}

export default Column;
