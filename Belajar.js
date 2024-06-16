class Belajar extends Phaser.Scene {
    constructor() {
        super({ key: 'Belajar' });
    }

    preload() {
        this.load.image('belajarbg', 'assets/bg.png');
        this.load.image('buttonHome', 'assets/button home (1).png');
        this.load.image('belajarButton1', 'assets/button baju adat.png');
        this.load.image('belajarButton2', 'assets/button lontara.png');
        this.load.image('belajarButton3', 'assets/button alat musik.png');
        this.load.image('belajarButton4', 'assets/button rumah adat.png');
        this.load.audio('soundHome', 'music/click_effect-86995.mp3'); // Suara tombol home
        this.load.audio('buttonSound', 'music/item-pick-up-38258.mp3'); // Suara tombol
    }

    create() {
        // gambar latar belakang 
        const belajarbg = this.add.image(0, 0, 'belajarbg').setOrigin(0, 0);
        this.resizeImage(belajarbg);

         // suara tombol home
        const soundHome = this.sound.add('soundHome');

        // suara tombol
        const buttonSound = this.sound.add('buttonSound');

        // Jarak vertikal antara kedua tombol
        const buttonVerticalSpacing = 225;

        // Koordinat posisi untuk sedikit bergeser ke kiri dari tengah
        const button1X = window.innerWidth / 2 - 330; // Geser 330 piksel ke kiri dari tengah
        const button1Y = window.innerHeight / 2 - buttonVerticalSpacing / 2; 

        // Koordinat posisi untuk tombol kedua (sedikit bergeser ke kiri dari tengah)
        const button2X = window.innerWidth / 2 - 330; // Geser 330 piksel ke kiri dari tengah
        const button2Y = button1Y + buttonVerticalSpacing; 

        // Koordinat posisi untuk sedikit bergeser ke kanan dari tengah
        const button3X = window.innerWidth / 2 + 330; // Geser 330 piksel ke kanan dari tengah
        const button3Y = window.innerHeight / 2 - buttonVerticalSpacing / 2; 

        // Koordinat posisi untuk sedikit bergeser ke kanan dari tengah
        const button4X = window.innerWidth / 2 + 330; // Geser 330 piksel ke kanan dari tengah
        const button4Y = button3Y + buttonVerticalSpacing; 

        const belajarButton1 = this.createButton(button1X, button1Y, 'belajarButton1', buttonSound, () => {
        this.scene.start('bajuAdat');
    });

        const belajarButton2 = this.createButton(button2X, button2Y, 'belajarButton2', buttonSound, () => {
        this.scene.start('Lontara');
    });

        const belajarButton3 = this.createButton(button3X, button3Y, 'belajarButton3', buttonSound, () => {
        this.scene.start('alatMusik');
    });

        const belajarButton4 = this.createButton(button4X, button4Y, 'belajarButton4', buttonSound, () => {
        this.scene.start('rumahAdat');
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
            this.resizeImage(belajarbg);
            this.resizeButton(buttonHome);
            this.resizeButton(belajarButton1);
            this.resizeButton(belajarButton2);
            this.resizeButton(belajarButton3);
            this.resizeButton(belajarButton4);

        // Update posisi tombol saat jendela diubah ukurannya
        belajarButton1.setPosition(window.innerWidth / 2 - 330, window.innerHeight / 2 - buttonVerticalSpacing / 2);
        belajarButton2.setPosition(window.innerWidth / 2 - 330, window.innerHeight / 2 + buttonVerticalSpacing / 2);
        belajarButton3.setPosition(window.innerWidth / 2 + 330, window.innerHeight / 2 - buttonVerticalSpacing / 2);
        belajarButton4.setPosition(window.innerWidth / 2 + 330, window.innerHeight / 2 + buttonVerticalSpacing / 2);
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

export default Belajar;
