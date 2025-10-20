# Chaos-Game

Small collection of fractal demos drawn to an HTML5 canvas.

## Overview

This project demonstrates a few classic fractals and iterative function systems (IFS) implemented in plain JavaScript and rendered on a canvas in the browser.

Included fractals:

- Sierpiński triangle (chaos game)
- H-tree (recursive H fractal)
- Barnsley fern (IFS)

## Files

- `index.html` — UI and canvas. Buttons trigger fractal generation functions.
- `script.js` — Canvas setup and fractal implementations:
  - `genRandom()` — Sierpiński using three random vertices.
  - `genEqui()` — Sierpiński using an equilateral triangle.
  - `drawChaosTriangle(verts, iterations)` — core chaos-game loop.
  - `hTree(order = 7)` / `drawH(...)` — draws recursive H-tree.
  - `barnsleyFern(iterations = 100000)` — Barnsley fern IFS implementation.
  - `clearBoard()` — clears the canvas.
  - `resizeCanvas()` — keeps canvas size responsive.
- `style.css` — basic layout and styles.

## Usage

1. Open the project folder in VS Code: code e:\Hactoberfest\Chaos-Game
2. Open `index.html` in a browser:

   - Double-click `index.html`, or
   - Use VS Code Live Server: "Live Server: Open with Live Server", or
   - From PowerShell in the project folder: python -m http.server 8000 then open http://localhost:8000

3. Click the buttons in the UI to generate fractals. Use "Clear" to reset the canvas.

## Controls & Parameters

- Sierpiński:
  - Two buttons: "Generate Random" (random triangle) and "Generate Equilateral".
  - Iteration count is passed as an optional argument to `genRandom(iterations)` / `genEqui(iterations)` and defaults to ~50k.
- H-tree:
  - `hTree(order)` accepts recursion order (default 7). Higher values increase depth and draw time.
- Barnsley fern:
  - `barnsleyFern(iterations)` accepts iteration count (default 100k). More iterations produce denser images.

To change defaults or colors, edit `script.js`:

- Iteration counts are function parameters (change the default values).
- Fill/stroke styles are set with `ctx.fillStyle` / `ctx.strokeStyle`.
- Canvas size and responsive behavior in `resizeCanvas()`.

## Development notes

- Rendering is immediate and done on the main thread; very large iteration counts may block the UI. For interactive tuning consider batching draws with `requestAnimationFrame` or Web Workers.
- Pixel coordinates are rounded to draw single-pixel points for IFS fractals.
- The Barnsley fern maps logical coordinates into canvas space — adjust mapping constants in `barnsleyFern` if you change canvas aspect ratio or want different framing.

## Contributing

- Fork the repo, create a feature branch, and submit a PR.
- Good first contributions: add more fractals (Mandelbrot/Julia/Koch), add UI controls for parameters, or add color gradients and save/export functionality.

## Troubleshooting

- Blank canvas: open browser console (F12) for errors; ensure `script.js` is loaded and that the canvas exists (`id="board"`).
- Very slow draws: reduce iteration counts or recursion order.

## License

MIT License — feel free to reuse and extend.
