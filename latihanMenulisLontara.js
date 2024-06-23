import DrawingBoard from "./object/drawingBoard.js";

class latihanMenulisLontara extends Phaser.Scene {
    constructor() {
        super({ key: 'latihanMenulisLontara' });
        this.training_questions = [
            { imageKey: 'lat_a', answer: 'a' },
            { imageKey: 'lat_ba', answer: 'ba' },
            { imageKey: 'lat_ca', answer: 'ca' },
            { imageKey: 'lat_da', answer: 'da' },
            { imageKey: 'lat_ga', answer: 'ga' },
            { imageKey: 'lat_ha', answer: 'ha' },
            { imageKey: 'lat_ja', answer: 'ja' },
            { imageKey: 'lat_ka', answer: 'ka' },
            { imageKey: 'lat_la', answer: 'la' },
            { imageKey: 'lat_ma', answer: 'ma' },
            { imageKey: 'lat_na', answer: 'na' },
            { imageKey: 'lat_mpa', answer: 'mpa' },
            { imageKey: 'lat_nca', answer: 'nca' },
            { imageKey: 'lat_nga', answer: 'nga' },
            { imageKey: 'lat_ngka', answer: 'ngka' },
            { imageKey: 'lat_nra', answer: 'nra' },
            { imageKey: 'lat_nya', answer: 'nya' },
            { imageKey: 'lat_pa', answer: 'pa' },
            { imageKey: 'lat_ra', answer: 'ra' },
            { imageKey: 'lat_sa', answer: 'sa' },
            { imageKey: 'lat_ta', answer: 'ta' },
            { imageKey: 'lat_wa', answer: 'wa' },
            { imageKey: 'lat_ya', answer: 'ya' },
        ];
        this.usedIndices = [];
        this.currentQuestionIndex = Math.floor(Math.random() * this.training_questions.length);
    }

    preload() {
        this.load.image('latihanmenulisbg', 'assets/bg2.png');
        this.load.image('buttonHome', 'assets/button_kembali.png');
        this.load.audio('button_click', 'music/click_effect-86995.mp3'); // Suara tombol home
        this.load.audio('soundHome', 'music/click_effect-86995.mp3');
        this.load.audio('wrong_answer_sound', 'music/negative_beeps-6008.mp3');
        this.load.audio('true_answer_sound', 'music/correct-2-46134.mp3');
        this.training_questions.forEach(question => {
            this.load.image(question.imageKey, `assets/menulis/${question.imageKey}.png`);
        });
        this.load.image('button_hapus', 'assets/button_hapus.png');
        this.load.image('button_submit_jawaban', 'assets/button_submit_jawaban.png');
        this.load.image('wrongMessage', 'assets/Frame_salah.png');
        this.load.image('trueMessage', 'assets/Frame_benar.png');
        console.log(this.training_questions);
    }

    create() {
        const latihanmenulisbg = this.add.image(0, 0, 'latihanmenulisbg').setOrigin(0, 0);
        const button_click = this.sound.add('button_click');
        const soundHome = this.sound.add('soundHome');

        this.resizeImage(latihanmenulisbg);
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(latihanmenulisbg);
        });

        this.drawingBoardX = 100
        this.drawingBoardY = 170
        this.drawingBoard = new DrawingBoard(this, this.drawingBoardX, this.drawingBoardY, 400, 300);

        const button_hapus = this.createButton(this.drawingBoardX + 270, this.drawingBoardY + 322, 'button_hapus', button_click, () => {
            this.clearBoard()
        });

        const button_submit_jawaban = this.createButton(this.drawingBoardX + 358, this.drawingBoardY + 325, 'button_submit_jawaban', button_click, () => {
            this.drawingBoard.captureCanvasImage(this.checkAnswer.bind(this));
        });
        const screenWidth = this.scale.width;
        // Menambahkan latar belakang putih dan gambar soal
        this.questionBackground = this.add.graphics();

        this.questionImage = this.add.image(750, 145, this.training_questions[this.currentQuestionIndex].imageKey).setScale(0.9).setOrigin(0, 0);

        this.wrongMessage = this.add.image(screenWidth / 2, this.scale.height / 2, 'wrongMessage').setOrigin(0.5, 0.5).setScale(0.8).setVisible(false);

        this.trueMessage = this.add.image(screenWidth / 2, this.scale.height / 2, 'trueMessage').setOrigin(0.5, 0.5).setScale(0.8).setVisible(false);

        const buttonMargin = 60; 
        this.buttonHome = this.createButton(buttonMargin, buttonMargin, 'buttonHome', soundHome, () => {
            this.buttonHome.setOrigin(0, 0); 
            this.scene.start('Belajar');
        });
        
    }


    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }

    clearBoard(){
        this.drawingBoard.clear();
        this.drawingBoard.fillStyle(0xffffff, 1);
        this.drawingBoard.fillRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
        this.drawingBoard.strokeRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
        this.drawingBoard.lineStyle(10, 0x000000); // Pastikan ketebalan garis tetap 10
    }

    createButton(x, y, texture, sound, callback) {
        const button = this.add.image(x, y, texture).setInteractive();
        button.setOrigin(0.6, 0.6);
        button.setScale(0.60);

        button.on('pointerdown', () => {
            sound.play();
            button.setScale(0.50); // Kecilkan tombol saat ditekan
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

    showWrongMessage() {
        this.sound.add('wrong_answer_sound').play();
        this.wrongMessage.setVisible(true);
        this.time.delayedCall(1500, () => {
            this.wrongMessage.setVisible(false);
        });
    }

    showTrueMessage() {
        this.sound.add('true_answer_sound').play();
        this.trueMessage.setVisible(true);
        this.time.delayedCall(1500, () => {
            this.trueMessage.setVisible(false);
        });
    }

    checkAnswer(predictedAnswer) {
        const currentQuestion = this.training_questions[this.currentQuestionIndex];
        if (predictedAnswer === currentQuestion.answer) {
            this.usedIndices.push(this.currentQuestionIndex); // buat property baru untuk menampung index
            this.showTrueMessage()
            if (this.usedIndices.length < this.training_questions.length) {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * this.training_questions.length);
                } while (this.usedIndices.includes(nextIndex))
                this.currentQuestionIndex = nextIndex;
                this.questionImage.setTexture(this.training_questions[this.currentQuestionIndex].imageKey);
            } else {
                alert('Anda telah menyelesaikan semua soal!');
            }
        } else {
            this.showWrongMessage()
        }
        this.clearBoard()
    }
}

export default latihanMenulisLontara;
