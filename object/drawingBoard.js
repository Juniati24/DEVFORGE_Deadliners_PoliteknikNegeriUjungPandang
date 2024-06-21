class DrawingBoard extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y, width, height, options) {
    super(scene, options);
    this.scene = scene;
    this.setPosition(x, y);
    this.width = width;
    this.height = height;
    this.isDrawing = false;
    this.isDrawingEnabled = false;
    this.lineStyle(2, 0x000000); // Mengatur ketebalan dan warna garis
    // Menggambar latar belakang putih
    this.fillStyle(0xffffff, 1); // Warna putih dengan opasitas penuh
    this.fillRect(0, 0, this.width, this.height);
    // Menggambar area papan tulis sebagai batas
    this.strokeRect(0, 0, this.width, this.height);

    // Menambahkan objek ini ke dalam scene
    this.scene.add.existing(this);

    // Mengatur event listener untuk input mouse
    this.scene.input.on('pointerdown', this.startDrawing, this);
    this.scene.input.on('pointermove', this.draw, this);
    this.scene.input.on('pointerup', this.stopDrawing, this);
}

startDrawing(pointer) {
    if (this.isPointerInBounds(pointer) && this.isDrawingEnabled) {
        this.isDrawing = true;
        this.moveTo(pointer.x - this.x, pointer.y - this.y);
    }
}

draw(pointer) {
    if (this.isDrawing) {
        if (this.isPointerInBounds(pointer)) {
            this.lineTo(pointer.x - this.x, pointer.y - this.y);
            this.strokePath();
            this.moveTo(pointer.x - this.x, pointer.y - this.y); // Update posisi untuk menggambar garis kontinu
        } else {
            this.stopDrawing();
        }
    }
}

stopDrawing() {
    this.isDrawing = false;
}

isPointerInBounds(pointer) {
    return (
        pointer.x >= this.x &&
        pointer.x <= this.x + this.width &&
        pointer.y >= this.y &&
        pointer.y <= this.y + this.height
    );
}

captureCanvasImage() {
  const canvas = Phaser.Display.Canvas.CanvasPool.create(this, this.width, this.height);
  const context = canvas.getContext('2d');

  // Menggambar konten dari Graphics ke kanvas
  this.scene.game.renderer.snapshotArea(this.x, this.y, this.width, this.height, image => {
      context.drawImage(image, 0, 0);
      const canvasImage = canvas.toDataURL('image/png');
      console.log(canvasImage);

      // Cleanup
      Phaser.Display.Canvas.CanvasPool.remove(canvas);
  });
}
}

export default DrawingBoard;
  