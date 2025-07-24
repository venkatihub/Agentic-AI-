# AI UI Generator

An AI-powered UI generation tool that creates responsive web interfaces from natural language descriptions. Built with Next.js, FastAPI, and Google's Generative AI.

## Features

- 🎨 Generate UI components from text descriptions
- 🖼️ Image-to-UI conversion support
- 💻 Live preview and code view
- 🔄 Real-time UI refinements
- 📱 Responsive design
- 🎯 High-quality code generation
- 💾 Save and version UI components

## Project Structure

```
AI_agents/
├── FE/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/       # Next.js app router
│   │   ├── components/# React components
│   │   ├── hooks/     # Custom React hooks
│   │   └── lib/       # Utilities and API
│   └── public/        # Static assets
└── BE/                # Backend (FastAPI)
    ├── app.py         # Main FastAPI application
    └── requirements.txt# Python dependencies
```

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Google Gemini API key
- MongoDB instance

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd BE
```

2. Create and activate virtual environment:
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

5. Start the backend server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd fe
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a natural language description of your desired UI
2. Optionally upload a reference image
3. Click "Generate" to create the UI
4. Use the preview/code tabs to view the result
5. Refine the UI using the modification input
6. Save your UI when satisfied

## API Endpoints

- `POST /generate-ui`: Generate UI from text description
- `POST /generate-ui-image`: Generate UI from image
- `POST /update-ui`: Modify existing UI
- `POST /save-ui`: Save UI to database

## Technologies Used

- **Frontend**:
  - Next.js 13
  - React 18
  - TailwindCSS
  - Axios
  - React Syntax Highlighter

- **Backend**:
  - FastAPI
  - LangChain
  - Google Gemini
  - ChromaDB
  - MongoDB

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
