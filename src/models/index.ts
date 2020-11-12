import p5 from "p5";


const gridsize = 30;

class Hexagon {
    x; y; w; h;
    centerX; centerY;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.w = 2 * gridsize;
        this.h = Math.sqrt(3) * gridsize;

        this.centerX = this.x * (this.w* 3/4)
        this.centerY = (this.y * this.h) + (this.x * gridsize) * 7/8
    }

    render(ctx: p5) {
        if (this.x === 0 && this.y === 0) {
            ctx.fill("green")
        }
        ctx.beginShape();

        for (let i = 0; i < 6; i++) {
            let angle_deg = 60*i
            let angle_rad = ctx.PI / 180 * angle_deg;
            let sx = this.centerX + (gridsize * ctx.cos(angle_rad));
            let sy = this.centerY + (gridsize * ctx.sin(angle_rad));
            ctx.vertex(sx, sy);
        }
        ctx.endShape(ctx.CLOSE);
        ctx.textAlign("center")
        ctx.color("white")
        ctx.fill("white")
        ctx.text(`${this.x} ${this.y}`, this.centerX, this.centerY)

        ctx.fill(26, 76, 154)
    }
}

class Player {
    x = 0;
    y = 0;
    w = 2 * gridsize;
    h = Math.sqrt(3) * gridsize;
    

    setPosition(x: number,y: number) {
        this.x = x;
        this.y = y;
    }

    travel(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    render(p: p5) {

        let centerX = this.x * (this.w * 3 / 4)
        let centerY = (this.y * this.h) + (this.x * gridsize) * 7 / 8
        p.fill("yellow")
        p.circle(centerX, centerY, 30);
    }
}

export {
    Hexagon,
    Player
}