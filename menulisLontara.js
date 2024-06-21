import DrawingBoard from "./object/drawingBoard.js";
class menulisLontara extends Phaser.Scene {
    constructor() {
        super({ key: 'menulisLontara' });
    }

    preload() {
        this.load.image('menulisbg', 'assets/Frame pengenalan lontara.png');
    }

    create() {
        const menulisbg = this.add.image(0, 0, 'menulisbg').setOrigin(0, 0);
        this.resizeImage(menulisbg);

        // Responsif saat ukuran jendela berubah
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(menulisbg);
        });

        this.drawingBoard = new DrawingBoard(this, 100, 170, 400, 300);
        this.resizeImage(this.drawingBoard)
    }
    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }    

}

export default menulisLontara;
