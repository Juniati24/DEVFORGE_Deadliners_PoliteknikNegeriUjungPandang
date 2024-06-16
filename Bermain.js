class Bermain extends Phaser.Scene {
    constructor() {
        super({ key: 'Bermain' });
    }

    preload() {
        this.load.image('bermainbg', 'assets/bg.png');
        this.load.image('buttonHome', 'assets/button home (1).png');
        this.load.image('bermainButton1', 'assets/button kuis.png');
        this.load.image('bermainButton2', 'assets/button menulis lontara.png');
        this.load.audio('soundHome', 'music/click_effect-86995.mp3'); // Suara tombol home
        this.load.audio('buttonSound', 'music/item-pick-up-38258.mp3'); // Suara tombol
    }

    create() {
        // gambar latar belakang 
        const bermainbg = this.add.image(0, 0, 'bermainbg').setOrigin(0, 0);
        this.resizeImage(bermainbg);

         // suara tombol home
        const soundHome = this.sound.add('soundHome');

        // suara tombol
        const buttonSound = this.sound.add('buttonSound');

        // Jarak antara tombol
        const buttonSpacing = 200;

        // Koordinat posisi untuk kedua tombol di tengah layar
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const button1X = centerX - buttonSpacing;
        const button2X = centerX + buttonSpacing;

        const bermainButton1 = this.createButton(button1X, centerY, 'bermainButton1', buttonSound, () => {
        this.scene.start('Kuis');
    });

        const bermainButton2 = this.createButton(button2X, centerY, 'bermainButton2', buttonSound, () => {
        this.scene.start('menulisLontara');
    });

        // tombol home
        const buttonMargin = 60; 
        const buttonHome = this.createButton(buttonMargin, buttonMargin, 'buttonHome', soundHome, () => {
        buttonHome.setOrigin(0, 0); 
        this.scene.start('Home');
     });

     // responsif saat ukuran jendela berubah
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(bermainbg);
            this.resizeButton(buttonHome);
            this.resizeButton(bermainButton1);
            this.resizeButton(bermainButton2);

        // Update posisi tombol saat jendela diubah ukurannya
        const newCenterX = window.innerWidth / 2;
        const newCenterY = window.innerHeight / 2;

        const newButton1X = newCenterX - buttonSpacing;
        const newButton2X = newCenterX + buttonSpacing;

        bermainButton1.setPosition(newButton1X, newCenterY);
        bermainButton2.setPosition(newButton2X, newCenterY);
    });
}

    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }

    createButton(x, y, texture, sound, callback) {
        const button = this.add.image(x, y, texture).setInteractive();
        button.setOrigin(0.5, 0.5);
        button.setScale(0.60);

        // efek visual dan suara untuk tombol saat ditekan
        button.on('pointerdown', () => {
            sound.play();
            button.setScale(0.46); // Kecilkan tombol saat ditekan
        });

        button.on('pointerup', () => {
            button.setScale(0.60); // Kembalikan ukuran tombol saat dilepas
            callback(); // Panggil callback saat tombol dilepas
        });

        button.on('pointerout', () => {
            button.setScale(0.60); // Kembalikan ukuran tombol saat kursor keluar dari tombol
        });

        return button;
    }

    resizeButton(button, offsetY = 0) {
        // Set posisi tombol kembali di tengah layar dengan offset Y yang diberikan
        button.setPosition(window.innerWidth / 2, window.innerHeight / 2 + offsetY);
    }
}

export default Bermain;
