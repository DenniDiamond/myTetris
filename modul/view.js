import { SIZE_BLOCK, COLUMS, ROWS } from "../index.js";

export class View {
    constructor(container){
        this.container = container;
        this.preview();
    }

    color =  {
        J: 'FireBrick' ,
        I: 'CadetBlue',
        H: 'Gold',
        U: 'StaleBlue',
        N: 'RoyalBlue',
        T: 'Indigo',
        S: 'MediumSeaGreen',
    };

    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');

    preview() {

    }

    init() {
        this.canvas.classList.add('game-area');
        this.container.append(this.canvas);
        this.canvas.width = SIZE_BLOCK * COLUMS;
        this.canvas.height = SIZE_BLOCK * ROWS;
    }
    
    showArea(area) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        for (let y = 0; y < area.length; y++) {
            const line = area[y];
    
            for(let x = 0; x < line.length; x++) {
                const block = line[x];
                if(block !== 'O') { 
    
                    this.context.fillStyle = this.color[block];
                    this.context.strokeStyle = 'white';
                    this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                }
            }
        }
        
    };
}