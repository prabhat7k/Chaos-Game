# Chaos-Game

An interactive fractal visualization project showcasing various mathematical patterns rendered using HTML5 Canvas and JavaScript.

## Overview

This project demonstrates several classic fractals and iterative function systems (IFS), allowing users to explore the beauty of mathematical patterns through an interactive web interface.

### Included Fractals

1. **Sierpiński Triangle (Chaos Game)**

   - A fractal with triangular symmetry
   - Two generation methods:
     - Random vertices: Creates unique variations
     - Equilateral: Creates perfect symmetrical pattern
   - Parameters:
     - Default iterations: 50,000
     - Color: #00FF88 (Bright Green)

2. **H-tree Fractal**

   - Recursive geometric pattern forming H-shaped structures
   - Parameters:
     - Default recursion depth: 7
     - Color: #FFD700 (Golden)
     - Size: Adapts to canvas dimensions

3. **Barnsley Fern**

   - IFS-based realistic fern pattern
   - Uses four affine transformations:
     - f1 (1%): Stem
     - f2 (85%): Successive fronds
     - f3 (7%): Left leaflets
     - f4 (7%): Right leaflets
   - Parameters:
     - Default iterations: 100,000
     - Color: #7CFC00 (Lime Green)

4. **Mandelbrot Set**

   - Complex plane visualization
   - Features:
     - Smooth coloring algorithm
     - HSL-based color mapping
     - Adjustable detail level
   - Parameters:
     - Iterations: 50-5000 (default 800)
     - Viewport: (-2.5,1) × (-1.25,1.25)
     - Color: HSL gradient

5. **Koch Snowflake**
   - Recursive curve forming a snowflake pattern
   - Features:
     - Symmetric triangular base
     - 60° angle peaks
     - Recursive subdivision
   - Parameters:
     - Iterations: 0-7 (default 4)
     - Color: #4169E1 (Royal Blue)

## Technical Implementation

### Files Structure

- `index.html`: UI container and controls
- `script.js`: Fractal implementations and canvas management
- `style.css`: Layout and styling

### Canvas Features

- Responsive sizing (max 1000×700 pixels)
- Auto-resize on window changes
- Black background (#000000)

### Performance Optimization

- Pixel-perfect rendering using rounded coordinates
- Efficient ImageData usage for Mandelbrot set
- Iteration limits to prevent browser hanging

## Usage

1. **Setup**

   ```powershell
   git clone <repository-url>
   cd Chaos-Game
   code .
   ```

2. **Running**

   - Use VS Code Live Server, or
   - Open index.html directly in browser

3. **Controls**
   - Generate fractals using respective buttons
   - Adjust iterations where available
   - Clear canvas between generations

### Fractal-Specific Controls

- **Sierpiński Triangle**

  ```javascript
  genRandom(iterations = 50000)
  genEqui(iterations = 50000)
  ```

- **H-tree**

  ```javascript
  hTree(order = 7)
  ```

- **Barnsley Fern**

  ```javascript
  barnsleyFern(iterations = 100000)
  ```

- **Mandelbrot Set**

  ```javascript
  mandelbrot()  // iterations from UI input
  ```

- **Koch Snowflake**
  ```javascript
  kochSnowflake()  // iterations from UI input
  ```

## Contributing

1. Fork repository
2. Create feature branch
3. Add features or improvements
4. Submit pull request

### Suggested Contributions

- Additional fractals (Julia sets, Dragon curve)
- Interactive parameter controls
- Color scheme customization
- Animation support
- Pattern export functionality
- Touch/mobile support

## License

MIT License - See LICENSE file for details.

---

For bug reports or feature requests, please open an issue on the repository.
