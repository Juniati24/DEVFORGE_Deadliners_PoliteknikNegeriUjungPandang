class musikBg extends Phaser.Scene {
    constructor() {
        super({ key: 'musikBg' });
    }

    preload() {
        this.load.audio('backgroundMusic', 'music/ALOSI_RIPOLO_DUA_COVER_INSTRUMEN_LAGU_BUGIS_SANTAI_LAGU_JALAN_JALAN.mp3');
    }

    create() {
        // Tampilkan pesan untuk memulai game
        const startText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'Ayo Mulai !!', { fontSize: '32px', fill: '#fff' });
        startText.setOrigin(0.5, 0.5);

        // klik pengguna
        this.input.once('pointerdown', () => {
        // Sembunyikan pesan setelah klik
        startText.setVisible(false);

            // Mainkan musik latar belakang
            this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
            this.backgroundMusic.play();

            // Mulai scene Home
            this.scene.start('Home');
        });
    }
}

export default musikBg;
