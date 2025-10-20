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

// --- Mandelbrot set (pixel-based) ---
function mandelbrot() {
    clearBoard();
    const maxIter = parseInt(document.getElementById('mandelbrot-iter').value, 10) || 800;
    const width = canvas.width;
    const height = canvas.height;
    const img = ctx.createImageData(width, height);
    const data = img.data;

    // viewport in complex plane
    const xmin = -2.5, xmax = 1;
    const xrange = xmax - xmin;
    const yrange = xrange * (height / width); // preserve aspect
    const ymin = -yrange / 2;
    // iterate pixels
    for (let py = 0; py < height; py++) {
        const cy = ymin + (py / (height - 1)) * yrange;
        for (let px = 0; px < width; px++) {
            const cx = xmin + (px / (width - 1)) * xrange;

            let zx = 0, zy = 0;
            let iter = 0;
            let zx2 = 0, zy2 = 0;
            while (iter < maxIter && (zx2 + zy2) <= 4) {
                // z = z^2 + c
                zy = 2 * zx * zy + cy;
                zx = zx2 - zy2 + cx;
                zx2 = zx * zx;
                zy2 = zy * zy;
                iter++;
            }

            let r = 0, g = 0, b = 0;
            if (iter < maxIter) {
                // smooth coloring
                const mag = Math.sqrt(zx2 + zy2);
                const nu = iter + 1 - Math.log(Math.log(Math.max(mag, 1e-10))) / Math.log(2);
                const hue = 360 * (nu / maxIter);
                const rgb = hslToRgb(hue / 360, 1, 0.5 * (1 - Math.exp(-nu / (maxIter * 0.2))));
                r = rgb[0]; g = rgb[1]; b = rgb[2];
            } else {
                // inside set: black
                r = g = b = 0;
            }
            const idx = (py * width + px) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
        }
    }

    ctx.putImageData(img, 0, 0);
}

// helper: convert HSL (h in [0,1]) to [r,g,b] bytes
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = function(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Initialize board
clearBoard();
