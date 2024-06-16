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

        // Membuat canvas untuk menulis 
        const canvasWidth = 400; // Lebar canvas
        const canvasHeight = window.innerHeight; // Tinggi canvas 
        const canvas = this.add.dom(
            canvasWidth / 2, // Posisi X di tengah kiri
            window.innerHeight / 2, // Posisi Y di tengah layar
            'canvas', 
            `width: ${canvasWidth}px; height: ${canvasHeight}px; border: 2px solid #000;`
        ).setOrigin(0.5);

        // Menyimpan konteks 2D dari canvas untuk digunakan
        const graphics = canvas.node.getContext('2d');
        graphics.fillStyle = '#ffffff'; // Warna fill putih
        graphics.fillRect(0, 0, canvasWidth, canvasHeight); // Mengisi canvas dengan warna putih
    }

    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }
}

export default menulisLontara;
