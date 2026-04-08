# 🎨 Modern Meme Generator (Premium Editor)

A high-performance, professional-grade meme generator built with **React 19**, **Vite**, and **Fabric.js**. Designed for a seamless, creative experience with advanced image manipulation tools.

![Screen Recording 2026-04-08 122841.gif](https://via.placeholder.com/800x450/09090b/fafafa?text=Modern+Meme+Generator+Interface) <!-- Placeholder for actual screenshot -->

## 🚀 Key Features

-   **Canvas-Based Editor**: Powered by `Fabric.js` for smooth element manipulation.
-   **Dynamic Template Gallery**: Browse and select from a pre-curated list of trending meme templates.
-   **Advanced Text Controls**: Add multiple text layers with custom fonts (Impact, Arial), strokes, and positioning.
-   **Real-time Filters**: Apply professional filters like Grayscale, Sepia, and Invert instantly.
-   **Smart Cropping**: Integrated cropping tool to focus on the best part of your images.
-   **Custom Uploads**: Drag and drop your own images directly into the workspace.
-   **Premium Export**: Download high-resolution PNG memes ready for social media.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite 6](https://vitejs.dev/)
-   **Canvas Engine**: [Fabric.js 6.x](http://fabricjs.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Styling**: Modern Vanilla CSS with Glassmorphism and CSS Variables.

---

## 💻 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/meme-generator.git
    cd meme-generator
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch the development server**:
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```text
meme-generator/
├── public/             # Static assets (logos, templates, memes.json)
├── src/
│   ├── components/     # UI Components (Sidebar, Toolbar, etc.)
│   ├── App.jsx         # Main application logic and Fabric.js setup
│   ├── main.jsx        # App entry point
│   └── index.css       # Premium design system and layout
├── index.html          # HTML entry point (Fixed for static hosting)
└── vite.config.js      # Vite configuration (Optimized for S3)
```

---

## ☁️ Deployment (AWS S3)

This project is optimized for static hosting on **AWS S3**.

1.  **Build the project**:
    ```bash
    npm run build
    ```
2.  **Prepare S3 Bucket**:
    -   Create a new S3 bucket.
    -   Enable **Static website hosting** in Bucket Properties.
    -   Set `index.html` as the index document.
    -   Set **Block public access** to OFF and apply a public-read policy.
3.  **Upload Files**:
    -   Upload the **contents** of the `dist/` folder directly to the root of the bucket.
    -   **Important**: Do not upload the `dist` folder itself; only its contents.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/meme-generator/issues).

---

*Built with ❤️ for meme creators worldwide.*
