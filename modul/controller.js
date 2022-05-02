export class Controller {
    constructor (game, view) {
        this.game = game;
        this.view = view;
    }

    init(codeKey) {
        window.addEventListener('keydown', (e) => {
            if(e.code === codeKey) {
                this.view.init();
                this.start();
            }
        })

    }

    start() {
        this.view.showArea(this.game.viewArea);
        const showScore = this.view.createBlockScore();
        const showNextTetromino =  this.view.createBlockNextTetromino();
        this.game.createUpdatePanels(showScore, showNextTetromino);

          const tick = () => {
              const time = (1100 - 100 * this.game.level);
              if (this.game.gameOver) return;
            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.viewArea);
                tick()
            }, time > 100 ? time : 100);
        };

        tick();

        window.addEventListener('keydown', (e) => {
            const key = e.code;

            switch (key) {
                case 'ArrowLeft':
                this.game.moveLeft()//действие
                this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowRight':
                this.game.moveRight()//действие
                this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowDown':
                this.game.moveDown()//действие
                this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowUp':
                this.game.rotateTetramino()//действие
                this.view.showArea(this.game.viewArea);    
                break;
            }
            });
    }
}