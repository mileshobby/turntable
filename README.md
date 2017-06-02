## TurnTable

[TurnTable Live](https://mileshobby.github.io/turntable/)

### Background

TurnTable is a browser application written in vanilla JavaScript, HTML, and CSS. The app consists of a three-dimensional musical step-sequencer focused on percussion. Each face of the cube represents a different instrument, and each row of each grid represents a different tone or noise by that instrument. The idea was based upon the two dimensional pentatonic tonematrix audiotool.

The basic functionality of the site (without the most important feature: audio) can be seen below.
![](./assets/gifs/3d.gif)

### Structure & Organization

TurnTable is built with vanilla JavaScript, CSS, and HTML. A challenge in building this application was in managing internal state of different components without the use of any external libraries such as React, Redux, or jQuery. In order to solve this problem, I mirrored the parent/child component structure with unidirectional data flow found in React/Redux. The cube is split into three main classes: a grid, a column, and a square. The grid keeps track of playing each column, the columns keep track of playing each square, and the square keep track of their on/off state, and are the components that ultimately handle playing their associated Audio Element. Event listeners for mouseover (with additional testing to ensure the mouse is also depressed) are used for each square to toggle its state.

### Playing & Changing Tempo
An asynchronous recursive function is used by each grid to play each column consecutively at the speed dictated by the tempo bar. This is shown in the following code snippet:

```   
play(colIndex){
  if (this.stopPlay) return;
  this.pauseIndex = colIndex;
  let nextIndex = (colIndex === this.numCols-1 ? 0 : colIndex+1);
  setTimeout(() => {
    this.columns[colIndex].playAll();
    this.play(nextIndex);
  }, this.frequency);
}
```

In order to save the position when the user pauses the sequencer, the grid keeps track of a pauseIndex attribute. A click of the pause button will set each grid's stopPlay attribute to true, in which case the recursive algorithm will return until called again. Notice the second parameter in setTimeout is a variable frequency that is dynamically changed via an event listener on change of the HTML range input. This property can be observed in the gif below:

![](./assets/gifs/tempo.gif)

### Adding an extra dimension

Pure CSS was used to build a three dimension object using the perspective property, Z-translations, and X-Y rotations. Essentially, the cube consists of six separate "grid" divs, each of which are rotated in 3d space to yield the resulting object.
