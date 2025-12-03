# AI-Chef
Just tell it what you have in your fridge, and it will tell you what to cook for tonight!

# 🍳 AI-Chef

> A smart desktop app that suggests recipes based on ingredients you have in your fridge!

![Electron](https://img.shields.io/badge/Electron-28.2.3-47848F?logo=electron&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/Platform-Windows-blue)

## ✨ Features

- **Ingredient-Based Suggestions** - Simply enter what ingredients you have on hand, and AI-Chef will suggest matching recipes
- **Smart Matching Algorithm** - Recipes are scored and ranked by how well they match your available ingredients
- **Local Recipe Database** - Includes 1000+ recipes that work completely offline - no API keys required
- **Modern UI** - Clean, glassmorphism-inspired dark theme interface
- **Portable** - Available as a single portable `.exe` file for Windows - no installation needed

## 📸 How It Works

1. **Add Ingredients** - Type ingredients you have in your fridge and click "Add" (or press Enter)
2. **Get Suggestions** - Click "Get Recipe Suggestions" to find recipes matching your ingredients  
3. **View Results** - Browse up to 3 recipe suggestions ranked by match percentage, complete with ingredients list and step-by-step instructions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jerry-1360/AI-Chef.git
   cd AI-Chef
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

### Building for Distribution

To build a portable Windows executable:

```bash
npm run build
```

The portable `.exe` will be created in the `release/` folder.

## 🗂️ Project Structure

```
AI-Chef/
├── main.js          # Electron main process
├── preload.js       # Preload script for IPC
├── app.js           # Renderer process (frontend logic)
├── index.html       # Main HTML file
├── style.css        # Styles (glassmorphism dark theme)
├── package.json     # Project configuration
├── data/
│   └── recipes.json # Local recipe database (1000+ recipes)
├── scripts/
│   └── remove-locales.js  # Build optimization script
└── release/         # Build output directory
```

## 🛠️ Tech Stack

- **[Electron](https://www.electronjs.org/)** - Cross-platform desktop app framework
- **[electron-builder](https://www.electron.build/)** - Packaging and distribution
- **Vanilla JavaScript** - No frontend frameworks, keeping it lightweight
- **CSS3** - Modern styling with CSS variables and glassmorphism effects

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Recipe database curated from various public sources
- UI inspired by modern glassmorphism design trends

---

Made with ❤️ by [Jerry](https://github.com/Entropify)
