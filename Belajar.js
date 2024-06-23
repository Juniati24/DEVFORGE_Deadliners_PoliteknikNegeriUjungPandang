class Belajar extends Phaser.Scene {
    constructor() {
        super({ key: 'Belajar' });
    }

    preload() {
        this.load.image('belajarbg', 'assets/bg.png');
        this.load.image('buttonHome', 'assets/button_home_(1).png');
        this.load.image('belajarButton1', 'assets/button_baju_adat.png');
        this.load.image('belajarButton2', 'assets/button_lontara.png');
        this.load.image('belajarButton3', 'assets/button_alat_musik.png');
        this.load.image('belajarButton4', 'assets/button_rumah_adat.png');
        this.load.image('belajarButton5', 'assets/button_menulis.png');
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

        // Koordinat posisi untuk sedikit bergeser ke kanan dari tengah
        const button5X = window.innerWidth / 2 ; // Geser 330 piksel ke kanan dari tengah
        const button5Y = button4Y + -100; 

        // Assign buttons to class properties
        this.belajarButton1 = this.createButton(button1X, button1Y, 'belajarButton1', buttonSound, () => {
            this.scene.start('bajuAdat');
        });

        this.belajarButton2 = this.createButton(button2X, button2Y, 'belajarButton2', buttonSound, () => {
            this.scene.start('Lontara');
        });

        this.belajarButton3 = this.createButton(button3X, button3Y, 'belajarButton3', buttonSound, () => {
            this.scene.start('alatMusik');
        });

        this.belajarButton4 = this.createButton(button4X, button4Y, 'belajarButton4', buttonSound, () => {
            this.scene.start('rumahAdat');
        });

        this.belajarButton5 = this.createButton(button5X, button5Y, 'belajarButton5', buttonSound, () => {
            this.scene.start('latihanMenulisLontara');
        });

        // tombol home
        const buttonMargin = 60; 
        this.buttonHome = this.createButton(buttonMargin, buttonMargin, 'buttonHome', soundHome, () => {
            this.buttonHome.setOrigin(0, 0); 
            this.scene.start('Home');
        });

        this.updateButtonPositions();

        // responsif saat ukuran jendela berubah
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(belajarbg);
            this.updateButtonPositions();
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

    isMobile(){
        return window.innerWidth <= 800;
    }

    updateButtonPositions() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        if (this.isMobile()) {
            // Adjust button positions for mobile (vertical layout)
            const buttonVerticalSpacing = 150; // Adjust the spacing for mobile view
            this.belajarButton1.setPosition(centerX, centerY - 1.5 * buttonVerticalSpacing);
            this.belajarButton2.setPosition(centerX, centerY - 0.5 * buttonVerticalSpacing);
            this.belajarButton3.setPosition(centerX, centerY + 0.5 * buttonVerticalSpacing);
            this.belajarButton4.setPosition(centerX, centerY + 1.5 * buttonVerticalSpacing);
        } else {
            // Adjust button positions for desktop (horizontal layout)
            const buttonHorizontalSpacing = 330; // Adjust the spacing for desktop view
            const buttonVerticalSpacing = 225; // Original spacing
            this.belajarButton1.setPosition(centerX - buttonHorizontalSpacing, centerY - buttonVerticalSpacing / 2);
            this.belajarButton2.setPosition(centerX - buttonHorizontalSpacing, centerY + buttonVerticalSpacing / 2);
            this.belajarButton3.setPosition(centerX + buttonHorizontalSpacing, centerY - buttonVerticalSpacing / 2);
            this.belajarButton4.setPosition(centerX + buttonHorizontalSpacing, centerY + buttonVerticalSpacing / 2);
        }
    }
}

export default Belajar;
