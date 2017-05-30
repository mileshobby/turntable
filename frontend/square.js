class Square{

  constructor(tone, parent, frequency){
    this.audio = new Audio(`../assets/drums/${tone}.wav`);
    this.play = this.play.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.square = document.createElement('div');
    this.square.className = 'square';
    parent.appendChild(this.square);
    this.frequency = frequency;
    this.square.addEventListener("mouseover", this.toggleState);
    this.square.addEventListener("mousedown", this.toggleState);
    this.selected = false;
    // this.randomColor = this.randomColor.bind(this);
  }

  play(e){
    if (this.selected){
     this.square.classList.add('playing');
    //  this.square.style.background = this.randomColor();
     this.audio.play();
     setTimeout(()=>{
       this.square.classList.remove('playing');
     }, this.frequency);
   }

  }

  // randomColor(){
  //   const HEX = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  //   let randomColor = "#";
  //   for (let i = 0; i < 6; i++) {
  //     randomColor += (HEX[Math.floor(Math.random()*16)]);
  //   }
  //   console.log(randomColor);
  //   return randomColor;
  // }

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
