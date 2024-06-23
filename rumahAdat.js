class rumahAdat extends Phaser.Scene {
    constructor() {
        super({ key: 'rumahAdat' });
        this.currentContentIndex = 0;
        this.contents = ['rumahAdatContent1', 'rumahAdatContent2', 'rumahAdatContent3', 'rumahAdatContent4']; // Daftar konten
    }

    preload() {
        this.load.image('rumahAdatbg', 'assets/bg.png');
        this.load.image('rumahAdatContent1', 'assets/papan_menu_balajar_rumah_1.png');
        this.load.image('rumahAdatContent2', 'assets/papan_menu_balajar_rumah_2.png');
        this.load.image('rumahAdatContent3', 'assets/papan_menu_balajar_rumah_3.png');
        this.load.image('rumahAdatContent4', 'assets/papan_menu_balajar_rumah_4.png');
        this.load.image('buttonBack', 'assets/button_kembali.png');
        this.load.image('buttonKiri', 'assets/button_geser_ke_kiri.png');
        this.load.image('buttonKanan', 'assets/button_geser_ke_kanan.png');
        this.load.audio('soundBack', 'music/click_effect-86995.mp3'); // Suara tombol
    }

    create() {
        // Gambar latar belakang
        const rumahAdatbg = this.add.image(0, 0, 'rumahAdatbg').setOrigin(0, 0);
        this.resizeImage(rumahAdatbg);

        // Suara tombol
        const soundBack = this.sound.add('soundBack');

        // menu belajar
        this.currentContent = this.add.image(window.innerWidth / 2, window.innerHeight / 2, this.contents[this.currentContentIndex]).setInteractive();
        this.currentContent.setOrigin(0.5, 0.5);
        this.resizeContent(this.currentContent);

        // Tombol kembali
        const buttonBack = this.createButton(80, 40, 'buttonBack', soundBack, () => {
            this.scene.start('Belajar');
        });

        // Tombol geser ke kiri
        const buttonKiri = this.createButton(window.innerWidth / 2 - 500, window.innerHeight / 2, 'buttonKiri', soundBack, () => {
            this.changeContent(-1);
        });

        // Tombol geser ke kanan
        const buttonKanan = this.createButton(window.innerWidth / 2 + 500, window.innerHeight / 2, 'buttonKanan', soundBack, () => {
            this.changeContent(1);
        });

        // Responsif saat ukuran jendela berubah
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(rumahAdatbg);
            this.resizeContent(this.currentContent);
            buttonBack.setPosition(80, 80);

            buttonKiri.setPosition(window.innerWidth / 2 - 500, window.innerHeight / 2);
            buttonKanan.setPosition(window.innerWidth / 2 + 500, window.innerHeight / 2);
        });
    }

    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }

    resizeContent(image) {
        const imageWidth = window.innerWidth * 0.6;
        const imageHeight = window.innerHeight * 0.9;
        image.setDisplaySize(imageWidth, imageHeight);

        // Set posisi gambar kembali di tengah layar
        image.setPosition(window.innerWidth / 2, window.innerHeight / 2);
    }

    createButton(x, y, texture, sound, callback) {
        const button = this.add.image(x, y, texture).setInteractive();
        button.setOrigin(0.5, 0.5);
        button.setScale(0.50);

        // Efek visual dan suara untuk tombol saat ditekan
        button.on('pointerdown', () => {
            sound.play();
            button.setScale(0.35); // Kecilkan tombol saat ditekan
        });

        button.on('pointerup', () => {
            button.setScale(0.50); // Kembalikan ukuran tombol saat dilepas
            callback(); // Panggil callback saat tombol dilepas
        });

        button.on('pointerout', () => {
            button.setScale(0.50); // Kembalikan ukuran tombol saat kursor keluar dari tombol
        });

        return button;
    }

    resizeButton(button, offsetY = 0) {
        // Set posisi tombol kembali di tengah layar dengan offset Y yang diberikan
        button.setPosition(window.innerWidth / 2, window.innerHeight / 2 + offsetY);
    }

    changeContent(direction) {
        // Hapus konten saat ini
        this.currentContent.destroy();

        // Perbarui indeks konten
        this.currentContentIndex += direction;
        if (this.currentContentIndex < 0) {
            this.currentContentIndex = this.contents.length - 1;
        } else if (this.currentContentIndex >= this.contents.length) {
            this.currentContentIndex = 0;
        }

        // Tambahkan konten baru
        this.currentContent = this.add.image(window.innerWidth / 2, window.innerHeight / 2, this.contents[this.currentContentIndex]).setInteractive();
        this.currentContent.setOrigin(0.5, 0.5);
        this.resizeContent(this.currentContent);
    }
}

export default rumahAdat;
