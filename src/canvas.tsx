import React from 'react';
import p5 from 'p5';

import { Hexagon, Player } from "./models";

interface iProps {
    boardstate: Hexagon[][]
    player: Player
}

interface iState {
    myRef: React.RefObject<any>;
    myP5? : p5;
}

class Canvas extends React.Component<iProps, iState> {
    constructor(props: any) {
        super(props)
        this.state = {
            myRef: React.createRef()
        }
    }

    Sketch = (p: p5) => {
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.translate(p.windowWidth / 2, p.windowHeight / 2);
        }

        p.draw = () => {
            p.rectMode(p.CENTER);
            p.translate(p.windowWidth / 2, p.windowHeight / 2);
            p.background(60);

            p.fill(26, 76, 154)

            

            this.props.boardstate.forEach(x => x.forEach(y => y.render(p)))
            this.props.player.render(p)
        }

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
    }

    componentDidMount() {
        this.setState({
            myP5: new p5(this.Sketch, this.state.myRef.current)
        })
    }


    render() {
        return <div ref={this.state.myRef} />
    }
}

export default Canvas;