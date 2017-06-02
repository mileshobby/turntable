import Square from './square';
import Column from './column';

class Grid{

  constructor(parent, numCols, numRows, folder, filetype){
    // slider
    let slider = document.getElementById('freq');
    this.frequency = 600 - slider.value;
    slider.addEventListener('input', (e)=>{
      this.frequency = 600 - e.target.value;
    });

    //setup audio
    let audio;
    let audioContainer = document.getElementById('audio-container');
    for (let i = 0; i < 16; i++) {
      audio = document.createElement('audio');
      audio.id = `${folder}-${i+1}`;
      audio.setAttribute("src", `./assets/${folder}/tone${i+1}.${filetype}`);
      audioContainer.appendChild(audio);
    }

    //grid
    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    this.numCols = numCols;
    this.numRows = numRows;
    parent.appendChild(this.grid);
    this.columns = new Array(this.numCols).fill();
    this.columns = this.columns.map( (el, j) => new Column(this.grid, this.numRows, this.frequency, folder) );
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

export default Grid;
