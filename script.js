const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const maxH = window.innerHeight - 100;
const maxW = window.innerWidth - 100;

let type = 0;
let c1, c2, c3;
board.width = maxW;
board.height = maxH;
let x1, x2, x3, y1, y2, y3, x, y;

function getColor(choice) {
	if (type === 1) {
		switch (choice) {
			case 1:
				ctx.fillStyle = c1;
				break;
			case 2:
				ctx.fillStyle = c2;
				break;
			case 3:
				ctx.fillStyle = c3;
				break;

			default:
				break;
		}
	}
}

function cordinatesXY() {
	let choice = Math.floor(Math.random() * 3);

	switch (choice) {
		case 0:
			x = (x1 + x) / 2;
			y = (y1 + y) / 2;
			getColor(1);
			break;
		case 1:
			x = (x2 + x) / 2;
			y = (y2 + y) / 2;

			getColor(2);
			break;
		case 2:
			x = (x3 + x) / 2;
			y = (y3 + y) / 2;

			getColor(3);
			break;
		default:
			break;
	}

	return [Math.floor(x), Math.floor(y)];
}

function choasBuild() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let index = 0; index < 100000; index++) {
		let arr = cordinatesXY();

		// ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
		// 	Math.random() * 255
		// })`;
		ctx.fillRect(arr[0], arr[1], 1, 1);
	}
}

function genEqui() {
	let side = maxW / 2;
	let height = side * Math.cos(Math.PI / 6);

	x1 = maxW / 2;
	y1 = 10;

	x3 = x1 + side / 2;
	x2 = x1 - side / 2;

	y2 = height;
	y3 = height;
	x = x1;
	y = y1;

	type = 1;
	c1 =
		"hsl(" +
		360 * Math.random() +
		",100%," +
		(50 * Math.random() + 50) +
		"%)";
	c2 =
		"hsl(" +
		360 * Math.random() +
		",100%," +
		(50 * Math.random() + 50) +
		"%)";
	c3 =
		"hsl(" +
		360 * Math.random() +
		",100%," +
		(50 * Math.random() + 50) +
		"%)";
	choasBuild();
}

function genRandom() {
	x1 = Math.random() * maxW;
	x2 = Math.random() * maxW;
	x3 = Math.random() * maxW;

	y1 = Math.random() * maxH;
	y2 = Math.random() * maxH;
	y3 = Math.random() * maxH;
	x = x1;
	y = y1;
	type = 0;
	ctx.fillStyle = "hsl(" + 360 * Math.random() + ",100%,50%)";
	choasBuild();
}
