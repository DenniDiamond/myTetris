const SIZE_BLOCK = 30;


// mechanic
const game = {
    area: [
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'o', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'x'],
        ['O', 'O', 'O', 'O', 'x', 'x', 'O', 'O', 'O', 'x'],
        ['O', 'O', 'O', 'O', 'x', 'x', 'O', 'O', 'x', 'x'],
    ],

    activeTetromino: {
        x: 3,
        y: 0,
        block: [
            ['O', 'x', 'O'], 
            ['O', 'x', 'O'], 
            ['x', 'x', 'O'],
        ],
        rotationIndex: 0,
        rotation: [
        [
            ['O', 'x', 'O'], 
            ['O', 'x', 'O'], 
            ['x', 'x', 'O'],
         ],
        [
            ['x', 'O', 'O'], 
            ['x', 'x', 'x'], 
            ['O', 'O', 'O'],
         ],
        [
            ['O', 'x', 'x'], 
            ['O', 'x', 'O'], 
            ['O', 'x', 'O'],
        ],
         [
            ['O', 'O', 'O'], 
            ['x', 'x', 'x'], 
            ['O', 'O', 'x'],
        ],
     ]
    },

    moveLeft() {
        if (this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)) {
            this.activeTetromino.x -= 1;
        } 
        
    },
    moveRight() {
        if (this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)) {
            this.activeTetromino.x += 1;
        }
        
    },
    moveDown() {
        if (this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1 )) {
            this.activeTetromino.y += 1;
        } else {
            this.stopMove();
        }
        
    },
    rotateTetramino() {
        this.activeTetromino.rotationIndex = 
            this.activeTetromino.rotationIndex < 3 ?
                this.activeTetromino.rotationIndex + 1 : 0; 

        this.activeTetromino.block = 
            this.activeTetromino.rotation[this.activeTetromino.rotationIndex];

        if (!this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)) {
            this.activeTetromino.rotationIndex = 
                this.activeTetromino.rotationIndex > 0 ?
                    this.activeTetromino.rotationIndex - 1 : 3; 

            this.activeTetromino.block = 
                this.activeTetromino.rotation[this.activeTetromino.rotationIndex];

        }

    },

    get viewArea() {
        const area = JSON.parse(JSON.stringify(this.area));
        const {x, y, block: tetromino} = this.activeTetromino;

        for(let i = 0; i < tetromino.length; i++) {
            const row = tetromino[i];
            for(let j = 0; j < row.length; j++) {
                if(row[j] !== 'O') {
                    area[y + i][x + j] = tetromino[i][j];
                }
            }
        }
        return area;
    },

    checkOutPosition(x, y) {
        const tetromino = this.activeTetromino.block;
        for(let i = 0; i < tetromino.length; i++) {
            for(let j = 0; j < tetromino[i].length; j++) {
                if (tetromino[i][j] === 'O') continue;

                if (!this.area[y + i] ||
                    !this.area[y + i][x + j] ||
                    this.area[y + i][x + j] !== 'O') {
                    return false
                }
            }
        }
        return true
    },
    stopMove() {
        const {x, y, block: tetromino} = this.activeTetromino;

        for(let i = 0; i < tetromino.length; i++) {
            const row = tetromino[i];
            for(let j = 0; j < row.length; j++) {
                if(row[j] !== 'O') {
                    this.area[y + i][x + j] = tetromino[i][j];
                }
            }
        }
    }
}

// drawing
const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);

canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext('2d')

const showArea = area => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < area.length; y++) {
        const line = area[y];

        for(let x = 0; x < line.length; x++) {
            const block = line[x];
            if(block !== 'O') { 
                context.fillStyle = 'MediumVioletRed';
                context.strokeStyle = 'white';
                context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            }
        }
    }
    
};

window.addEventListener('keydown', (e) => {
const key = e.code;
switch (key) {
    case 'ArrowLeft':
    game.moveLeft()//действие
    showArea(game.viewArea);
    break;
    case 'ArrowRight':
    game.moveRight()//действие
    showArea(game.viewArea);
    break;
    case 'ArrowDown':
    game.moveDown()//действие
    showArea(game.viewArea);
    break;
    case 'ArrowUp':
    game.rotateTetramino()//действие
    showArea(game.viewArea);    
    break;
}
});

showArea(game.viewArea);