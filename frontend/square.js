import anime from 'animejs';

class Square{

  constructor(toneI, parent, frequency, folder){
    this.audio = document.getElementById(`${folder}-${toneI}`);
    this.play = this.play.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.square = document.createElement('div');
    this.square.className = 'square';
    parent.appendChild(this.square);
    this.frequency = frequency;
    this.square.addEventListener("mouseover", this.toggleState);
    this.square.addEventListener("mousedown", this.toggleState);
    this.selected = false;
    this.animate = this.animate.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  play(e){
    if (this.selected && this.audio.readyState === 4 ){
     this.audio.pause();
     this.audio.currentTime = 0.0;
     this.square.classList.add('playing');
     this.animate();
     this.audio.play();
     setTimeout(()=>{
       this.square.classList.remove('playing');
     }, this.frequency);
   }

  }

  turnOff(){
    this.selected = false;
    this.square.classList.remove('selected');
    this.square.classList.remove('playing');
  }

  animate(){
    anime({
       targets: this.square,
       translateY: [
         { value: 10, duration: this.frequency/2 },
         { value: 0, duration: this.frequency/2 }
       ],
       rotate: '1turn',
       duration: this.frequency*2,
     });
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
