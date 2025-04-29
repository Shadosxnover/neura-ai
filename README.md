# Neura AI - Gemini-powered Chat Interface

Neura AI is a sleek, minimalist chat interface powered by Google's Gemini AI. It features a responsive design, persistent chat storage, and a beautiful neural network visualization.

## 📋 Features

- 🤖 AI chat powered by Google's Gemini Pro API
- 💾 Persistent chat history
- 🌐 Neural network background visualization
- 📱 Responsive design for mobile and desktop
- 🌙 Elegant black and white UI

## ⚙️ Prerequisites

Before setting up the project, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn
- A Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shadosxnover/neura-ai.git
cd neura-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Running the app

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173/`.

### Building for production

Build the app for production:
```bash
npm run build
# or
yarn build
```

## 📦 Dependencies

The project uses the following main dependencies:

- **React**: UI library
- **React Router**: Navigation
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **TailwindCSS**: Styling

Install all dependencies with:
```bash
npm install react react-dom react-router-dom framer-motion lucide-react tailwindcss postcss autoprefixer
```

## 🔑 API Key Setup

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory
3. Add your API key: `VITE_GEMINI_API_KEY=your_api_key_here`
4. Restart the development server if it's running

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
