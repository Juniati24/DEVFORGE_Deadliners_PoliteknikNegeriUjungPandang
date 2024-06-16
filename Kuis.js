class Kuis extends Phaser.Scene {
    constructor() {
        super({ key: 'Kuis' });
        this.score = 0; // Inisialisasi skor awal
    }

    preload() {
        this.load.image('kuisbg', 'assets/Frame quiz.png');
        this.load.image('benar', 'assets/Frame benar.png');
        this.load.image('salah', 'assets/Frame salah.png');
        this.load.image('akhirKuis', 'assets/Frame skor1.png');
        this.load.audio('jawabanSalah', 'music/negative_beeps-6008.mp3');
        this.load.audio('jawabanBenar', 'music/correct-2-46134.mp3');
        this.load.json('soal', 'soal.json'); // file json
    }

    create() {
        const kuisbg = this.add.image(0, 0, 'kuisbg').setOrigin(0, 0);
        this.resizeImage(kuisbg);

        // mengambil data json
        this.questions = this.cache.json.get('soal');

        // Menampilkan skor 
        this.scoreText = this.add.text(
            this.cameras.main.width / 2, 100,
            this.score, { fontSize: '35px', fill: '#000', align: 'center' }
        ).setOrigin(0.5, 0.2);

        // Menampilkan pertanyaan pertama
        this.currentQuestionIndex = 0;
        this.showQuestion(this.currentQuestionIndex);

        // Responsif saat ukuran jendela berubah
        window.addEventListener('resize', () => {
            this.game.scale.resize(window.innerWidth, window.innerHeight);
            this.resizeImage(kuisbg);
            this.scoreText.setPosition(this.cameras.main.width / 2, 50);
        });
    }

    resizeImage(image) {
        image.setDisplaySize(window.innerWidth, window.innerHeight);
    }

    showQuestion(index) {
        const questionData = this.questions[index];

        // Menampilkan pertanyaan 
        const questionText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2.5,
            questionData.question, { fontSize: '32px', fill: '#fff', align: 'center' }
        ).setOrigin(0.5, 0.5);

        // Input untuk jawaban
        const inputText = this.add.dom(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2, 
            'input', 
            ' width: 50%; padding: 10px; font-size: 24px; text-align: center;'
        ).setOrigin(0.5);

         inputText.node.placeholder = 'Masukkan jawaban...';

        // Tombol submit
        const submitButton = this.add.dom(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 150, 
            'button', 
            'border: none; background-color: #4CAF50; color: white; padding: 10px 24px; text-align: center; font-size: 24px; cursor: pointer; margin-left: -30px;'
        ).setOrigin(0.5);
        submitButton.node.textContent = 'Submit';

        // Fungsi untuk mengecek jawaban saat klik tombol submit
        submitButton.addListener('click');

        submitButton.on('click', () => {
            const userAnswer = inputText.node.value.trim().toLowerCase();
            const correctAnswer = questionData.answer.toLowerCase();

            if (userAnswer === correctAnswer) {
                this.score += questionData.score; // Menambahkan skor jika jawaban benar
                this.scoreText.setText(this.score); // Update teks skor
                // this.add.image(0, 0, 'benar').setOrigin(0, 0);

                // menampilkan asset jawaban benar
                const jawabanBenar = this.sound.add('jawabanBenar');
                const correctImage = this.add.image(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 ,
                    'benar',
                ).setOrigin(0.5);
                jawabanBenar.play();
                correctImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

                submitButton.destroy();
                inputText.destroy();

                // Hapus gambar jawaban benar setelah 1 detik
                this.time.delayedCall(1000, () => {
                    correctImage.destroy();
                });
                console.log('Jawaban benar! Skor Anda bertambah ' + questionData.score + ' poin.');
            } else {

                // menampilkan asset jawaban salah
                const jawabanSalah = this.sound.add('jawabanSalah');
                const wrongImage = this.add.image(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2 ,
                    'salah',
                ).setOrigin(0.5);
                jawabanSalah.play();
                wrongImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

                submitButton.destroy();
                inputText.destroy();

                // Hapus gambar jawaban salah setelah 1 detik
                this.time.delayedCall(1000, () => {
                    wrongImage.destroy();
                });
                console.log('Jawaban salah.');
            }

            // Pindah ke pertanyaan berikutnya setelah 1 detik
            this.time.delayedCall(1000, () => {
                questionText.destroy();
                // inputText.node.value = ''; // Mengosongkan input setelah setiap jawaban
                submitButton.destroy();

                // Menampilkan pertanyaan berikutnya jika masih ada
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.currentQuestionIndex++;
                    this.showQuestion(this.currentQuestionIndex);
                } else {
                    const akhirKuis = this.add.image(
                        this.cameras.main.width / 2,
                        this.cameras.main.height / 2 ,
                        'akhirKuis',
                    ).setOrigin(0.5);

                    const finalScore = this.add.text(
                        this.cameras.main.width / 2, 100,
                        this.score, { fontSize: '60px', fill: '#fff', align: 'center' }
                    ).setOrigin(0.5, -5);

                    finalScore.setText(this.score);

                    akhirKuis.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
                    console.log('Pertanyaan selesai.');
                    console.log(this.score);
                    this.time.delayedCall(3000, () => {
                        this.scene.start('Home');
                    });
                }
            });
        });
    }
}

export default Kuis;
