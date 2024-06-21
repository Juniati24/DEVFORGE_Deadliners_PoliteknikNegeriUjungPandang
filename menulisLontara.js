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
        // Menambahkan tombol "Mulai Menulis"
        this.startButton = this.add.text(50, 500, 'Mulai Menulis', { fontSize: '20px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.drawingBoard.isDrawingEnabled = true;
            });

        // Menambahkan tombol "Hapus"
        this.clearButton = this.add.text(200, 500, 'Hapus', { fontSize: '20px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.drawingBoard.clear();
                this.drawingBoard.fillStyle(0xffffff, 1);
                this.drawingBoard.fillRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
                this.drawingBoard.strokeRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
            });

        // Menambahkan tombol "Tangkap Gambar"
        this.captureButton = this.add.text(350, 500, 'Tangkap Gambar', { fontSize: '20px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.drawingBoard.captureCanvasImage();
            });
    }
    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }    

}

export default menulisLontara;
