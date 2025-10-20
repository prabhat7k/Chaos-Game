const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
	canvas.width = Math.min(window.innerWidth - 40, 1000);
	canvas.height = Math.min(window.innerHeight - 120, 700);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function clearBoard() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// --- Sierpiński (chaos game) ---
function genRandom(iterations = 50000) {
	clearBoard();
	// random triangle vertices
	const verts = [
		{x: Math.random() * canvas.width, y: Math.random() * canvas.height},
		{x: Math.random() * canvas.width, y: Math.random() * canvas.height},
		{x: Math.random() * canvas.width, y: Math.random() * canvas.height},
	];
	drawChaosTriangle(verts, iterations);
}

function genEqui(iterations = 50000) {
	clearBoard();
	// equilateral triangle centered horizontally
	const cx = canvas.width / 2;
	const top = {x: cx, y: canvas.height * 0.05};
	const left = {x: canvas.width * 0.1, y: canvas.height * 0.9};
	const right = {x: canvas.width * 0.9, y: canvas.height * 0.9};
	drawChaosTriangle([top, left, right], iterations);
}

function drawChaosTriangle(verts, iterations) {
	let p = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
	ctx.fillStyle = "#00FF88";
	for (let i = 0; i < iterations; i++) {
		const v = verts[Math.floor(Math.random() * verts.length)];
		p.x = (p.x + v.x) / 2;
		p.y = (p.y + v.y) / 2;
		ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
	}
}

// --- H-tree ---
function hTree(order = 7) {
	clearBoard();
	ctx.strokeStyle = "#FFD700";
	ctx.lineWidth = 1;
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;
	const size = Math.min(canvas.width, canvas.height) * 0.5;
	drawH(cx, cy, size / 2, order);
}

function drawH(x, y, half, order) {
	if (order === 0 || half < 1) return;
	// draw H: verticals and connecting horizontal
	ctx.beginPath();
	ctx.moveTo(x - half, y - half);
	ctx.lineTo(x - half, y + half);
	ctx.moveTo(x + half, y - half);
	ctx.lineTo(x + half, y + half);
	ctx.moveTo(x - half, y);
	ctx.lineTo(x + half, y);
	ctx.stroke();

	const nh = half / 2;
	drawH(x - half, y - half, nh, order - 1);
	drawH(x - half, y + half, nh, order - 1);
	drawH(x + half, y - half, nh, order - 1);
	drawH(x + half, y + half, nh, order - 1);
}

// --- Barnsley fern (IFS) ---
function barnsleyFern(iterations = 100000) {
	clearBoard();
	// Barnsley fern uses four affine transforms with given probabilities
	// We'll scale the fern to canvas coordinates.
	const width = canvas.width;
	const height = canvas.height;
	// Logical coordinate bounds for the classic fern: x in [-2.1820, 2.6558], y in [0, 9.9983]
	const xMin = -2.182,
		xMax = 2.6558;
	const yMin = 0,
		yMax = 9.9983;

	function toCanvas(pt) {
		// map logical (x,y) -> canvas (cx, cy) with y inverted (so fern grows up)
		const cx = ((pt.x - xMin) / (xMax - xMin)) * width;
		const cy = height - ((pt.y - yMin) / (yMax - yMin)) * height;
		return {cx: Math.round(cx), cy: Math.round(cy)};
	}

	let x = 0,
		y = 0;
	ctx.fillStyle = "#7CFC00";
	for (let i = 0; i < iterations; i++) {
		const r = Math.random();
		let xn, yn;
		if (r < 0.01) {
			// f1
			xn = 0;
			yn = 0.16 * y;
		} else if (r < 0.86) {
			// f2
			xn = 0.85 * x + 0.04 * y;
			yn = -0.04 * x + 0.85 * y + 1.6;
		} else if (r < 0.93) {
			// f3
			xn = 0.2 * x - 0.26 * y;
			yn = 0.23 * x + 0.22 * y + 1.6;
		} else {
			// f4
			xn = -0.15 * x + 0.28 * y;
			yn = 0.26 * x + 0.24 * y + 0.44;
		}
		x = xn;
		y = yn;
		const p = toCanvas({x, y});
		// draw pixel if inside canvas
		if (p.cx >= 0 && p.cx < width && p.cy >= 0 && p.cy < height) {
			ctx.fillRect(p.cx, p.cy, 1, 1);
		}
	}
}

// Initialize board
clearBoard();
