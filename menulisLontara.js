import DrawingBoard from "./object/drawingBoard.js";

class menulisLontara extends Phaser.Scene {
    constructor() {
        super({ key: 'menulisLontara' });
        this.questions = [
            { imageKey: 'a', answer: 'a' },
            { imageKey: 'ba', answer: 'ba' },
            { imageKey: 'ca', answer: 'ca' },
            { imageKey: 'da', answer: 'da' },
            { imageKey: 'ga', answer: 'ga' },
            { imageKey: 'ha', answer: 'ha' },
            { imageKey: 'ja', answer: 'ja' },
            { imageKey: 'ka', answer: 'ka' },
            { imageKey: 'la', answer: 'la' },
            { imageKey: 'ma', answer: 'ma' },
            { imageKey: 'na', answer: 'na' },
            { imageKey: 'mpa', answer: 'mpa' },
            { imageKey: 'nca', answer: 'nca' },
            { imageKey: 'nga', answer: 'nga' },
            { imageKey: 'ngka', answer: 'ngka' },
            { imageKey: 'nra', answer: 'nra' },
            { imageKey: 'nya', answer: 'nya' },
            { imageKey: 'pa', answer: 'pa' },
            { imageKey: 'ra', answer: 'ra' },
            { imageKey: 'sa', answer: 'sa' },
            { imageKey: 'ta', answer: 'ta' },
            { imageKey: 'wa', answer: 'wa' },
            { imageKey: 'ya', answer: 'ya' },
        ];
        this.score = 0;
        this.usedIndices = [];
        this.currentQuestionIndex = Math.floor(Math.random() * this.questions.length);
        this.lives = 3;
        this.initialLives = 3;
    }

    preload() {
        this.load.image('heart', 'assets/heart.png')
        this.load.image('menulisbg', 'assets/Frame pengenalan lontara.png');
        this.load.audio('button_click', 'music/click_effect-86995.mp3'); // Suara tombol home
        this.load.audio('wrong_answer_sound', 'music/negative_beeps-6008.mp3');
        this.load.audio('true_answer_sound', 'music/correct-2-46134.mp3'); 
        this.questions.forEach(question => {
            this.load.image(question.imageKey, `assets/latin/${question.imageKey}.png`);
        });
        this.load.image('button_hapus', 'assets/button_hapus.png');
        this.load.image('button_submit_jawaban', 'assets/button_submit_jawaban.png');
        this.load.image('wrongMessage', 'assets/Frame salah.png');
        this.load.image('trueMessage', 'assets/Frame benar.png');
        this.load.image('buttonBack', 'assets/button kembali.png');
        this.load.audio('soundBack', 'music/click_effect-86995.mp3');
        this.load.image('akhirKuis', 'assets/Frame skor1.png');
        this.load.audio('tepukTangan', 'music/applause-alks-ses-efekti-125030.mp3');
    }

    create() {
        const menulisbg = this.add.image(0, 0, 'menulisbg').setOrigin(0, 0);
        const button_click = this.sound.add('button_click');

        const soundBack = this.sound.add('soundBack');

        // Tombol kembali
        const buttonBack = this.createButtonBack(80, 40, 'buttonBack',     soundBack, () => {
            if (this.questionImage) {
                this.questionImage.destroy();
                this.questionImage = null;
            }
            this.scene.start('Bermain');
        });

        this.resizeImage(menulisbg);
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(menulisbg);
            buttonBack.setPosition(80, 80);
        });

        this.hearts = [];
        // Tambahkan tiga gambar hati ke layar
        const screenWidth = this.scale.width;
        for (let i = 0; i < this.lives; i++) {
            const heart = this.add.image(screenWidth - (i * 60) - 50, 50, 'heart').setOrigin(1, 0).setScale(0.1);
            this.hearts.push(heart);
        }

        this.drawingBoardX = 100
        this.drawingBoardY = 170
        this.drawingBoard = new DrawingBoard(this, this.drawingBoardX, this.drawingBoardY, 400, 300);

        const button_hapus = this.createButton(this.drawingBoardX + 270, this.drawingBoardY + 322, 'button_hapus', button_click, () => {
            this.clearBoard()
        });

        const button_submit_jawaban = this.createButton(this.drawingBoardX + 358, this.drawingBoardY + 325, 'button_submit_jawaban', button_click, () => {
            this.drawingBoard.captureCanvasImage(this.checkAnswer.bind(this));
        });

        // Menambahkan latar belakang putih dan gambar soal
        this.questionBackground = this.add.graphics();

        this.questionImage = this.add.image(750, 145, this.questions[this.currentQuestionIndex].imageKey).setScale(0.9).setOrigin(0, 0);
        this.scoreText = this.add.text((window.innerWidth/2) - 20, 65, this.score, { fontSize: '45px', color: '#fff', fontStyle: 'bold', stroke: '#000' ,strokeThickness: 1});

        this.wrongMessage = this.add.image(screenWidth / 2, this.scale.height / 2, 'wrongMessage').setOrigin(0.5, 0.5).setScale(0.8).setVisible(false);

        this.trueMessage = this.add.image(screenWidth / 2, this.scale.height / 2, 'trueMessage').setOrigin(0.5, 0.5).setScale(0.8).setVisible(false);

    }

    resetGame() {
        // Reset score
        this.score = 0;
        this.scoreText.setText(this.score);

        // Reset lives
        this.lives = this.initialLives;

        // Reset hearts visibility
        this.hearts.forEach(heart => heart.setVisible(true));

        // Reset index pertanyaan
        this.usedIndices = [];
        this.currentQuestionIndex = Math.floor(Math.random() * this.questions.length);
        this.questionImage.setTexture(this.questions[this.currentQuestionIndex].imageKey);
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

    createButtonBack(x, y, texture, sound, callback) {
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
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (predictedAnswer === currentQuestion.answer) {
            this.showTrueMessage()
            this.score += 10;
            this.scoreText.setText(this.score);
            this.usedIndices.push(this.currentQuestionIndex); // buat property baru untuk menampung index
          
            if (this.usedIndices.length < this.questions.length) {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * this.questions.length);
                } while (this.usedIndices.includes(nextIndex))
                this.currentQuestionIndex = nextIndex;
                this.questionImage.setTexture(this.questions[this.currentQuestionIndex].imageKey);
            } else {
                const tepukTangan = this.sound.add('tepukTangan');
                const akhirKuis = this.add.image(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 ,
                    'akhirKuis',
                ).setOrigin(0.5);
                tepukTangan.play();

                const finalScore = this.add.text(
                    this.cameras.main.width / 2, 100,
                    this.score, { fontSize: '60px', fill: '#fff', align: 'center' }
                ).setOrigin(0.5, -5);

                finalScore.setText(this.score);

                akhirKuis.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
                console.log('Pertanyaan selesai.');
                console.log(this.score);
                this.time.delayedCall(12000, () => {
                    this.scene.start('Home');
                });
                alert('Anda telah menyelesaikan semua soal!');
            }
        } else {
            if(this.score != 0){
                this.scoreText.setText(this.score);
            }
            this.lives--;
            if (this.lives >= 0) {
                this.hearts[this.lives].setVisible(false);
            }

            if (this.lives <= 0) {
                const tepukTangan = this.sound.add('tepukTangan');
                const akhirKuis = this.add.image(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 ,
                    'akhirKuis',
                ).setOrigin(0.5);
                alert('Game selesai! Anda kehabisan hati.');
                // Tambahkan logika untuk mengakhiri game atau restart
                tepukTangan.play();

                const finalScore = this.add.text(
                    this.cameras.main.width / 2, 100,
                    this.score, { fontSize: '60px', fill: '#fff', align: 'center' }
                ).setOrigin(0.5, -5);

                finalScore.setText(this.score);

                akhirKuis.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
                console.log('Pertanyaan selesai.');
                console.log(this.score);
                this.time.delayedCall(12000, () => {
                    this.scene.start('Home');
                    this.resetGame();
                });
                // this.scene.start('Home');
                // this.resetGame();
            } else {
                this.showWrongMessage()
            }
        }
        this.clearBoard()
    }
}

export default menulisLontara;
