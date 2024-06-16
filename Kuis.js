class Kuis extends Phaser.Scene {
    constructor() {
        super({ key: 'Kuis' });
        this.score = 0; // Inisialisasi skor awal
    }

    preload() {
        this.load.image('kuisbg', 'assets/Frame quiz.png');
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
            'Skor: ' + this.score, { fontSize: '35px', fill: '#000', align: 'center' }
        ).setOrigin(0.5);

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
            this.cameras.main.height / 2,
            questionData.question, { fontSize: '32px', fill: '#fff', align: 'center' }
        ).setOrigin(0.5, 0.5);

        // Input untuk jawaban
        const inputText = this.add.dom(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 50, 
        'input', 
        'border: 2px solid #000; width: 400px; padding: 10px; font-size: 24px; text-align: center;'
    ).setOrigin(0.5);

         inputText.node.placeholder = 'Masukkan jawaban...';

        // Tombol submit
        const submitButton = this.add.dom(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 150, 
        'button', 
        'border: none; background-color: #4CAF50; color: white; padding: 10px 24px; text-align: center; font-size: 24px; cursor: pointer;'
        ).setOrigin(0.5);
        submitButton.node.textContent = 'Submit';

        // Fungsi untuk mengecek jawaban saat klik tombol submit
        submitButton.addListener('click');

        submitButton.on('click', () => {
            const userAnswer = inputText.node.value.trim().toLowerCase();
            const correctAnswer = questionData.answer.toLowerCase();

            if (userAnswer === correctAnswer) {
                this.score += questionData.score; // Menambahkan skor jika jawaban benar
                this.scoreText.setText('Skor: ' + this.score); // Update teks skor
                console.log('Jawaban benar! Skor Anda bertambah ' + questionData.score + ' poin.');
            } else {
                console.log('Jawaban salah.');
            }

            // Pindah ke pertanyaan berikutnya setelah 1 detik
            this.time.delayedCall(1000, () => {
                questionText.destroy();
                inputText.node.value = ''; // Mengosongkan input setelah setiap jawaban
                submitButton.destroy();

                // Menampilkan pertanyaan berikutnya jika masih ada
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.currentQuestionIndex++;
                    this.showQuestion(this.currentQuestionIndex);
                } else {
                    console.log('Pertanyaan selesai.');
                    // this.scene.start('SkorAkhir');
                }
            });
        });
    }
}

export default Kuis;
