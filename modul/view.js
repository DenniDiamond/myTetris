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
  
    preview () {
        this.container.textContent = '';
        const preview = document.createElement('div');
        preview.innerHTML = 'Press "ENTER" <br> to START';
        preview.style.cssText = `
        border: 3px solid black;
        font-size: 18px;
        text-align: center;
        padding: 50px;
        grid-column: 1/3;`
        this.container.append(preview);
    }
    


    init() {
        this.container.textContent = '';
        this.canvas.style.gridArea = 'game'
        this.canvas.classList.add('game-area');
        this.container.append(this.canvas);
        this.canvas.width = SIZE_BLOCK * COLUMS;
        this.canvas.height = SIZE_BLOCK * ROWS;
    }

    createBlockScore () {
        const scoreBlock = document.createElement('div');
        scoreBlock.style.cssText = `
        border: 2px solid black;
        font-size: 18px;
        text-align: center;
        padding: 20px;
        grid-area: score;`;
        const linesElem = document.createElement('p');
        const scoreElem = document.createElement('p');
        const levelElem = document.createElement('p');
        const recordElem = document.createElement('p');
        scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);
        this.container.append(scoreBlock);
    };
    createBlockNextTetromino () {
        const tetrominoBlock = document.createElement('div');
        tetrominoBlock.style.cssText = `
        border: 2px solid black;
        width: ${SIZE_BLOCK * 4}px;
        height: ${SIZE_BLOCK * 4}px;
        padding: 20px;
        grid-area: next;
        display: flex;
        align-items: center;
        justify-content: center;`;
       
        const canvas = document.createElement('canvas');
        const context = this.canvas.getContext('2d');

        tetrominoBlock.append(canvas);
        this.container.append(tetrominoBlock);
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