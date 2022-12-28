/*
Options:
	background: Background color of the pad
	segments: Number of segments on the pad (Only visually)
	segmentsHue: Color for segments
	segmentsValue: Value for segments color
	segmentsWidth: Width of each segment line
	ringColor: Color of ring
	ringWidth: Width of ring if ringFill is false
	ringFill: Boolean if ring should be filled with color
	font: Font to use for texts (e.g. "15px Comic Sans")
	fontColor: Color of fonts
	fontMargin: Margin of fonts from the border
*/


class PickerPad {
	constructor(wrapperEl, size, texts, options={}) {
		this.x = 0;
		this.y = 0;
		this.size = size;

		this.options = options;

		if (texts != undefined && texts.length != 4 && texts.length != undefined && texts.length != 0)
			throw new Error("'texts' array must have 4 or none elements");

		this.texts = texts;  // Array of 4 elements

		this.pickerPad = document.createElement("canvas");
		this.pickerPad.width = this.size;
		this.pickerPad.height = this.size;

		this.pickerPad.style.background = this.options.background || "#111"

		this.pickerPad.classList.add("picker-pad");

		wrapperEl.appendChild(this.pickerPad);

		this.ctx = this.pickerPad.getContext("2d");

		this.onchange = (x, y) => {};

		let mouseDown = false;
		this.pickerPad.addEventListener("mousemove", () => {
			if (!mouseDown) return;

			this.set(event.clientX, event.clientY);
		});

		this.pickerPad.addEventListener("mousedown", (event) => {
			mouseDown = true;
			this.set(event.clientX, event.clientY);
		});

		this.pickerPad.addEventListener("mouseout", () => {
			mouseDown = false;
		});

		this.pickerPad.addEventListener("mouseup", () => {
			mouseDown = false;
		});
	}

	set(posX, posY, unAbsolute=false) {
		let pickerPadX = this.pickerPad.offsetLeft;
		let pickerPadY = this.pickerPad.offsetTop;

		let x, y;

		if (unAbsolute) {
			x = posX * this.size;
			y = posY * this.size;

			this.x = posX;
			this.y = posY;
		} else {
			x = (posX - pickerPadX);
			y = (posY - pickerPadY);

			this.x = x / this.size;
			this.y = y / this.size;
		}

		this.onchange(this.x, this.y);

		this.ctx.clearRect(0, 0, this.size, this.size);

		const SEGMENTS = (this.options.segments || 5) + 1;

		this.ctx.lineWidth = 1;

		// Vertical lines
		for (var lineXindex = 1; lineXindex < SEGMENTS; lineXindex++) {
			let x = (this.size / SEGMENTS * lineXindex);
			let dist = Math.abs(x - (this.size / 2));
			let p = (-1/150) * dist + 1;

			this.ctx.strokeStyle = "hsl(" + (this.options.segmentsHue || 0) + ", " + (this.options.segmentsValue || 0) + "%, " + (Math.pow(p, 2) * 100) + "%)";

			this.ctx.beginPath();
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.size);
			this.ctx.stroke();
		}

		// Horizontal lines
		for (var lineYindex = 1; lineYindex < SEGMENTS; lineYindex++) {
			let y = (this.size / SEGMENTS * lineYindex);
			let dist = Math.abs(y - (this.size / 2));
			let p = (-1/150) * dist + 1;

			this.ctx.strokeStyle = "hsl(" + (this.options.segmentsHue || 0) + ", " + (this.options.segmentsValue || 0) + "%, " + (Math.pow(p, 2) * 100) + "%)";

			this.ctx.beginPath();
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.size, y);
			this.ctx.stroke();
		}

		this.ctx.strokeStyle = this.options.ringColor || "#fff";
		this.ctx.lineWidth = this.options.ringWidth || 3;

		this.ctx.beginPath();
		this.ctx.arc(x, y, 14, 0, 2 * Math.PI);
		this.ctx.stroke();

		if (this.texts == undefined || this.texts.length == 0) return;

		this.ctx.fillStyle = this.options.fontColor || "#fff";
		this.ctx.font = this.options.font || "12px Sans-Serif";

		this.ctx.translate(150, 150);
		this.ctx.rotate(-90 * Math.PI / 180);

		//this.ctx.fillText(this.texts[0], this.size / 2 / 2, 10);
		//this.ctx.fillText(this.texts[1], this.size / 2 * 1.5, 10);
		this.ctx.translate(-150, -150);
		this.ctx.fillText(this.texts[0], this.size / 2 - (this.ctx.measureText(this.texts[0]).width / 2) - 80, this.options.fontMargin || 15);
		this.ctx.fillText(this.texts[1], this.size / 2 - (this.ctx.measureText(this.texts[1]).width / 2) + 80, this.options.fontMargin || 15);
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);

		this.ctx.fillText(this.texts[2], this.size / 2 - (this.ctx.measureText(this.texts[2]).width / 2) - 80, this.options.fontMargin || 15);
		this.ctx.fillText(this.texts[3], this.size / 2 - (this.ctx.measureText(this.texts[3]).width / 2) + 80, this.options.fontMargin || 15);
	}
}
