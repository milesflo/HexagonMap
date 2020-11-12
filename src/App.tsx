import React from 'react';
import Canvas from './canvas';

import { Hexagon, Player } from "./models";

interface iBoardState {
  board: Hexagon[][]
  player: Player
}

interface iBoardProps {

}

class App extends React.Component<iBoardProps, iBoardState> {
  constructor(props: iBoardProps) {
    super(props);

    let defaultBoard = [];

    let dim = 6;

    for (let x = -dim; x <= dim; x++) {
      let row = [];
      for (let y = -dim; y <= dim; y++) {
        if (x + y < dim + 1 && x + y > -1-dim) {
          row.push(new Hexagon(x, y))

        }
      }
      defaultBoard.push(row)

    }
    
    this.state = {
      board: defaultBoard,
      player: new Player()
    }

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  render() {
    return <div className="App">
      <Canvas boardstate={this.state.board} player={this.state.player}/>
    </div>
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeypress, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeypress, false)

  }

  handleKeypress(event: KeyboardEvent) {
    type Dict = { [key: string]: [number, number] };
    const directionMap: Dict = {
      "q": [-1, 0],
      "w": [0, -1],
      "e": [1, -1],
      "a": [-1, 1],
      "s": [0, 1],
      "d": [1, 0],
    }

    switch(event.key) {
      case "q":
      case "w":
      case "e":
      case "a":
      case "s":
      case "d": {
        this.state.player.travel(...directionMap[event.key])
        break;
      }
    }
  }

}

export default App;
