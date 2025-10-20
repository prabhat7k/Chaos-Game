# Chaos-Game

An interactive fractal visualization project showcasing various mathematical patterns rendered using HTML5 Canvas and JavaScript.

## Overview

This project demonstrates several classic fractals and iterative function systems (IFS), allowing users to explore the beauty of mathematical patterns through an interactive web interface.

### Included Fractals

1. **Sierpiński Triangle (Chaos Game)**

   - A fractal with triangular symmetry
   - Generated through random point plotting using midpoint algorithm
   - Available in both random and equilateral configurations

2. **H-tree Fractal**

   - A recursive geometric pattern
   - Forms an H-shaped structure that branches into smaller H patterns
   - Demonstrates self-similarity at different scales

3. **Barnsley Fern**

   - An iterative function system (IFS) that creates a natural-looking fern
   - Uses four affine transformations with different probabilities
   - Produces a realistic plant-like structure

4. **Mandelbrot Set**
   - The famous mathematical set of points in the complex plane
   - Features smooth coloring based on escape-time algorithm
   - Adjustable iteration count for detail vs. performance

## Technical Implementation

### Files Structure

- `index.html`

  - Main UI container
  - Canvas element setup
  - Control buttons and input elements
  - Responsive layout structure

- `script.js`

  - Core fractal implementations:
    ```javascript
    genRandom(iterations = 50000)      // Random Sierpiński
    genEqui(iterations = 50000)        // Equilateral Sierpiński
    drawChaosTriangle(verts, iter)     // Core triangle algorithm
    hTree(order = 7)                   // H-tree generator
    drawH(x, y, size, order)           // Recursive H-tree drawer
    barnsleyFern(iterations = 100000)  // Fern IFS implementation
    mandelbrot()                       // Mandelbrot set renderer
    ```
  - Canvas management:
    ```javascript
    resizeCanvas()    // Responsive sizing
    clearBoard()      // Canvas reset
    ```

- `style.css`
  - Responsive layout styling
  - UI element formatting
  - Canvas positioning and dimensions

### Technical Features

- **Canvas Management**

  - Responsive sizing (max 1000x700 pixels)
  - Automatic resizing on window changes
  - Background clearing functionality

- **Color Systems**
  - Sierpiński: Single color (#00FF88)
  - H-tree: Golden color (#FFD700)
  - Barnsley Fern: Lime green (#7CFC00)
  - Mandelbrot: HSL-based smooth coloring

## Usage Guide

### Setup

1. Clone or download the repository
2. Open in VS Code:
   ```powershell
   code e:\Hactoberfest\Chaos-Game
   ```

### Running the Project

Choose one of these methods:

1. **VS Code Live Server**

   ```
   Right-click index.html → Open with Live Server
   ```

2. **Python HTTP Server**

   ```powershell
   python -m http.server 8000
   # Then open http://localhost:8000
   ```

3. **Direct Browser Opening**
   ```powershell
   start e:\Hactoberfest\Chaos-Game\index.html
   ```

### Interactive Controls

- **Sierpiński Triangle**

  - "Generate Random": Creates random triangle vertices
  - "Generate Equilateral": Creates symmetrical triangle
  - Default: 50,000 iterations
  - Customization: Modify `iterations` parameter in function calls

- **H-tree Fractal**

  - Single-click generation
  - Order parameter controls depth (default: 7)
  - Higher orders increase detail but slow rendering

- **Barnsley Fern**

  - Single-click generation
  - 100,000 default iterations
  - Adjustable density via iteration count

- **Mandelbrot Set**
  - Adjustable iterations (50-5000)
  - Input field for quality control
  - Smooth color gradients
  - Complex plane viewport: (-2.5, 1) × (-1.25, 1.25)

## Performance Considerations

- **CPU Usage**

  - Heavy calculations run on main thread
  - Large iteration counts may cause temporary UI freezing
  - Consider reducing iterations for slower devices

- **Memory Usage**
  - Canvas size affects memory consumption
  - Mandelbrot set uses ImageData for efficient rendering
  - Cleared automatically between fractal generations

## Optimization Tips

1. **For Smooth Performance**

   - Keep iteration counts below 100,000
   - Reduce H-tree order for faster rendering
   - Use moderate Mandelbrot iteration values (500-1000)

2. **For Higher Quality**
   - Increase iteration counts for denser patterns
   - Use higher H-tree orders for more detail
   - Boost Mandelbrot iterations for smoother gradients

## Troubleshooting

### Common Issues

1. **Blank Display**

   - Check console (F12) for JavaScript errors
   - Verify canvas element ID matches "board"
   - Ensure all files are properly linked

2. **Performance Issues**

   - Reduce iteration counts
   - Lower H-tree recursion order
   - Check browser CPU usage
   - Consider using a different browser

3. **Display Glitches**
   - Clear canvas between generations
   - Refresh page if patterns overlap
   - Check window size constraints

## Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Submit pull request

### Suggested Contributions

- Additional fractal patterns (Koch, Julia sets)
- Interactive parameter controls
- Color scheme customization
- Pattern animation
- Touch/mobile support
- Pattern export functionality

## License

MIT License - See LICENSE file for details.

---

For bug reports or feature requests, please open an issue on the repository.
