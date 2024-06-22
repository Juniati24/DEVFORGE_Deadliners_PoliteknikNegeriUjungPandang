// import DrawingBoard from "./object/drawingBoard.js";
// class menulisLontara extends Phaser.Scene {
//     constructor() {
//         super({ key: 'menulisLontara' });
//     }

//     preload() {
//         this.load.image('menulisbg', 'assets/Frame pengenalan lontara.png');
//     }

//     create() {
//         const menulisbg = this.add.image(0, 0, 'menulisbg').setOrigin(0, 0);
//         this.resizeImage(menulisbg);

//         // Responsif saat ukuran jendela berubah
//         window.addEventListener('resize', () => {
//             this.game.scale.resize(window.innerWidth, window.innerHeight);
//             this.resizeImage(menulisbg);
//         });

//         this.drawingBoard = new DrawingBoard(this, 100, 170, 400, 300);
//         // Menambahkan tombol "Mulai Menulis"
//         this.startButton = this.add.text(50, 500, 'Mulai Menulis', { fontSize: '20px', fill: '#000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.drawingBoard.isDrawingEnabled = true;
//             });

//         // Menambahkan tombol "Hapus"
//         this.clearButton = this.add.text(200, 500, 'Hapus', { fontSize: '20px', fill: '#000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.drawingBoard.clear();
//                 this.drawingBoard.fillStyle(0xffffff, 1);
//                 this.drawingBoard.fillRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
//                 this.drawingBoard.strokeRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
//             });

//         // Menambahkan tombol "Tangkap Gambar"
//         this.captureButton = this.add.text(350, 500, 'Tangkap Gambar', { fontSize: '20px', fill: '#000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.drawingBoard.captureCanvasImage();
//             });
//     }
//     resizeImage(image) {
//         image.setDisplaySize(window.innerWidth, window.innerHeight);
//     }    

// }

// export default menulisLontara;

// ------------------------dibawah ini bagus----------------------------

// import DrawingBoard from "./object/drawingBoard.js";

// class menulisLontara extends Phaser.Scene {
//     constructor() {
//         super({ key: 'menulisLontara' });
//     }

//     preload() {
//         this.load.image('menulisbg', 'assets/Frame pengenalan lontara.png');
//     }

//     create() {
//         const menulisbg = this.add.image(0, 0, 'menulisbg').setOrigin(0, 0);
//         this.resizeImage(menulisbg);

//         window.addEventListener('resize', () => {
//             this.game.scale.resize(window.innerWidth, window.innerHeight);
//             this.resizeImage(menulisbg);
//         });

//         this.drawingBoard = new DrawingBoard(this, 100, 170, 400, 300);

//         this.startButton = this.add.text(50, 500, 'Mulai Menulis', { fontSize: '20px', fill: '#000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.drawingBoard.isDrawingEnabled = true;
//             });

//         this.clearButton = this.add.text(200, 500, 'Hapus', { fontSize: '20px', fill: '#000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.drawingBoard.clear();
//                 this.drawingBoard.fillStyle(0xffffff, 1);
//                 this.drawingBoard.fillRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
//                 this.drawingBoard.strokeRect(0, 0, this.drawingBoard.width, this.drawingBoard.height);
//                 this.drawingBoard.lineStyle(10, 0x000000); // Pastikan ketebalan garis tetap 10
//             });

//         this.captureButton = this.add.text(350, 500, 'Tangkap Gambar', { fontSize: '20px', fill: '#000' })
//             .setInteractive()
//             .on('pointerdown', () => {
//                 this.drawingBoard.captureCanvasImage();
//             });
//     }

//     resizeImage(image) {
//         image.setDisplaySize(window.innerWidth, window.innerHeight);
//     }
// }

// export default menulisLontara;

// ------------------------diatas ini bagus

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
            // Tambahkan soal lainnya
        ];
        this.score = 0;
        this.usedIndices = [];
        this.currentQuestionIndex = Math.floor(Math.random() * this.questions.length);
    }

    preload() {
        this.load.image('menulisbg', 'assets/Frame pengenalan lontara.png');
        this.questions.forEach(question => {
            this.load.image(question.imageKey, `assets/lontara/${question.imageKey}.png`);
        });
        console.log(this.questions);
    }

    create() {
        const menulisbg = this.add.image(0, 0, 'menulisbg').setOrigin(0, 0);
        this.resizeImage(menulisbg);

        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(menulisbg);
        });

        this.drawingBoard = new DrawingBoard(this, 100, 170, 400, 300);

        this.startButton = this.add.text(50, 500, 'Mulai Menulis', { fontSize: '20px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.drawingBoard.isDrawingEnabled = true;
            });

        this.clearButton = this.add.text(200, 500, 'Hapus', { fontSize: '20px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.clearBoard()
            });

        this.captureButton = this.add.text(350, 500, 'Tangkap Gambar', { fontSize: '20px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.drawingBoard.captureCanvasImage(this.checkAnswer.bind(this));
            });

        // Menambahkan latar belakang putih dan gambar soal
        this.questionBackground = this.add.graphics();
        this.questionBackground.fillStyle(0xffffff, 1);
        this.questionBackground.fillRect(679, 167, 530, 378); // Ukuran latar belakang sesuai dengan gambar soal

        this.questionImage = this.add.image(850, 270, this.questions[this.currentQuestionIndex].imageKey).setOrigin(0, 0);
        this.scoreText = this.add.text(700, 50, `Skor: ${this.score}`, { fontSize: '20px', fill: '#000' });
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

    checkAnswer(predictedAnswer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (predictedAnswer === currentQuestion.answer) {
            this.score += 10;
            this.scoreText.setText(`Skor: ${this.score}`);
            this.usedIndices.push(this.currentQuestionIndex); // buat property baru untuk menampung index
          
            if (this.usedIndices.length < this.questions.length) {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * this.questions.length);
                } while (this.usedIndices.includes(nextIndex))
                this.currentQuestionIndex = nextIndex;
                this.questionImage.setTexture(this.questions[this.currentQuestionIndex].imageKey);
            } else {
                alert('Anda telah menyelesaikan semua soal!');
            }
        } else {
            if(this.score != 0){
                this.score -= 15;
                this.scoreText.setText(`Skor: ${this.score}`);
                alert('Jawaban salah, coba lagi.');

            }
        }
        this.clearBoard()
    }
}

export default menulisLontara;
