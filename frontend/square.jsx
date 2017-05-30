class Square{
  constructor(tone, parent){
    this.audio = new Audio(`../assets/tones/${tone}.wav`);
    this.play = this.play.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.square = document.createElement('div');
    this.square.className = 'square';
    parent.appendChild(this.square);
    this.square.addEventListener("mouseover", this.toggleState);
    this.square.addEventListener("mousedown", this.toggleState);
    this.selected = false;
  }

  play(e){
    if (this.selected) this.audio.play();
  }

  toggleState(e){
    e.preventDefault();
    if(e.type==='mouseover' && e.buttons !== 1) return;
    const wasSelected = this.selected;
    if(wasSelected){
      this.square.classList.remove('selected');
    }
    else{
      this.square.classList.add('selected');
    }
    this.selected = !this.selected;
  }
}

export default Square;
