export class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.view.init();
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
        setInterval(() => {
            this.game.moveDown();
            this.view.showArea(this.game.viewArea);
        }, 500);

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