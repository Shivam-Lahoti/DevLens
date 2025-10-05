# DevLens 🔍

An AI-powered browser for developers featuring Claude AI integration for intelligent code explanations, documentation analysis, and technical Q&A.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Overview

DevLens is a specialized web browser built for developers that integrates Claude AI (Anthropic) to provide real-time explanations, code analysis, and contextual assistance while browsing technical documentation, Stack Overflow, GitHub, and other development resources.

## ✨ Features

### Current Features (MVP)
- 🌐 **Basic Web Browsing** - Full-featured browser with navigation controls
- 🤖 **Claude AI Integration** - Powered by Claude 3.5 Sonnet for superior technical understanding
- 💬 **Interactive AI Chat** - Ask questions about the current page with context awareness
- 📄 **Page Explanation** - Get instant AI-powered summaries of technical documentation
- 🎨 **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- ⚡ **Fast & Responsive** - Async FastAPI backend for optimal performance

### Planned Features (Phase 2)
- 🔖 Multiple tab support
- 💾 Session persistence with conversation history
- 🎯 Code snippet selection and explanation
- 📚 Bookmarks and history
- 🔍 Smart search across documentation
- 📊 Usage analytics and insights

### Future Enhancements (Phase 3)
- 🗄️ Vector database integration (Pinecone) for semantic search
- 🔄 Streaming responses for real-time AI feedback
- 🔌 Browser extension version
- 🤝 Multi-LLM support (GPT-4, Gemini, etc.)
- 🧠 Advanced context management with memory
- 🎨 Custom themes and layouts
- 📱 Cross-platform support (Windows, macOS, Linux)

## 🏗️ Architecture

### Tech Stack

**Frontend**
- **Electron** - Cross-platform desktop app framework
- **React 18** - UI library for building interactive interfaces
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

**Backend**
- **FastAPI** - Modern, high-performance Python web framework
- **Claude API (Anthropic)** - AI language model for code explanation and Q&A
- **BeautifulSoup4** - Web scraping and content extraction
- **httpx** - Async HTTP client for Python
- **Pydantic** - Data validation and settings management

**Infrastructure**
- **Docker** - Containerization (optional)
- **Git** - Version control
- **GitHub** - Repository hosting

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                         DevLens Browser                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Electron (Main Process)                               │ │
│  │  - Window Management                                   │ │
│  │  - Native OS Integration                               │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React Frontend (Renderer Process)                     │ │
│  │  ┌──────────────┐  ┌─────────────────────────────────┐│ │
│  │  │   Browser    │  │      AI Assistant Panel         ││ │
│  │  │   WebView    │  │  - Chat Interface               ││ │
│  │  │              │  │  - Page Explanation             ││ │
│  │  │              │  │  - Code Analysis                ││ │
│  │  └──────────────┘  └─────────────────────────────────┘│ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ REST API / WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend Server                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API Routes                                            │ │
│  │  /api/explain-page  /api/explain-code  /api/chat      │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Services Layer                                        │ │
│  │  - LLM Service (Claude Integration)                    │ │
│  │  - Content Extraction Service                          │ │
│  │  - Context Management                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
                    ┌──────────────────┐
                    │   Claude API     │
                    │   (Anthropic)    │
                    └──────────────────┘
```

## 📁 Project Structure

```
DevLens/
├── venv/                          # Python virtual environment (not committed)
├── DevLens/                       # Main application code
│   ├── frontend/                  # Electron + React application
│   │   ├── src/
│   │   │   ├── components/        # React components
│   │   │   │   ├── Browser/       # Browser UI components
│   │   │   │   │   ├── AddressBar.jsx
│   │   │   │   │   ├── NavigationButtons.jsx
│   │   │   │   │   └── WebView.jsx
│   │   │   │   └── AI/            # AI assistant components
│   │   │   │       ├── AIPanel.jsx
│   │   │   │       ├── ChatMessage.jsx
│   │   │   │       └── ChatInput.jsx
│   │   │   ├── services/          # API client services
│   │   │   │   └── api.js
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── styles/            # CSS and styling
│   │   │   │   └── index.css
│   │   │   ├── main.jsx           # React entry point
│   │   │   └── App.jsx            # Main App component
│   │   ├── public/                # Static assets
│   │   ├── electron.js            # Electron main process
│   │   ├── preload.js             # Electron preload script
│   │   ├── index.html             # HTML entry point
│   │   ├── vite.config.js         # Vite configuration
│   │   ├── tailwind.config.js     # Tailwind configuration
│   │   └── package.json           # Node.js dependencies
│   │
│   ├── backend/                   # FastAPI backend
│   │   ├── app/
│   │   │   ├── api/               # API routes
│   │   │   │   └── routes.py
│   │   │   ├── services/          # Business logic
│   │   │   │   ├── llm_service.py      # Claude integration
│   │   │   │   └── extractor.py        # Content extraction
│   │   │   ├── models/            # Pydantic models
│   │   │   │   └── schemas.py
│   │   │   └── core/              # Configuration
│   │   │       └── config.py
│   │   ├── tests/                 # Unit tests
│   │   ├── main.py                # FastAPI entry point
│   │   ├── requirements.txt       # Python dependencies
│   │   ├── .env                   # Environment variables (not committed)
│   │   └── Dockerfile             # Docker configuration
│   │
│   └── docs/                      # Documentation
│
├── .gitignore                     # Git ignore rules
├── .gitattributes                 # Git attributes for line endings
├── README.md                      # This file
└── docker-compose.yml             # Docker Compose configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**
- **Anthropic API Key** - Get yours at https://console.anthropic.com/

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Shivam-Lahoti/DevLens.git
cd DevLens
```

#### 2. Create Python Virtual Environment

```bash
# Create virtual environment at root level
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### 3. Setup Backend

```bash
cd DevLens/backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Anthropic API key
# ANTHROPIC_API_KEY=your_api_key_here
```

#### 4. Setup Frontend

```bash
cd ../frontend

# Install Node.js dependencies
npm install
```

### Running the Application

You'll need **three terminal windows**:

#### Terminal 1 - Backend Server

```bash
cd DevLens
venv\Scripts\activate  # or source venv/bin/activate on macOS/Linux
cd DevLens/backend
uvicorn main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000

#### Terminal 2 - Frontend Dev Server

```bash
cd DevLens/DevLens/frontend
npm run dev
```

Vite dev server will run at: http://localhost:5173

#### Terminal 3 - Electron Application

```bash
cd DevLens/DevLens/frontend
npm run electron:dev
```

The DevLens browser window will open automatically.

### Using Docker (Alternative)

```bash
# Set environment variables
export ANTHROPIC_API_KEY=your_key_here

# Run backend with Docker Compose
docker-compose up

# Run frontend normally
cd DevLens/frontend
npm run dev
npm run electron:dev
```

## 🎯 Usage

1. **Launch DevLens** - The browser window opens automatically
2. **Navigate** - Enter a URL in the address bar or use navigation buttons
3. **Get AI Explanations** - Click "Explain This Page" to get an AI summary
4. **Ask Questions** - Use the chat interface to ask specific questions about the content
5. **Code Analysis** - Select code snippets for detailed explanations (coming soon)

### Example Workflows

**Learning New Technology:**
1. Navigate to framework documentation (e.g., React, FastAPI)
2. Click "Explain This Page" for a high-level overview
3. Ask follow-up questions like "How does this compare to Vue?"

**Debugging Code:**
1. Visit Stack Overflow answer
2. Ask "Explain why this solution works"
3. Get detailed breakdown of the code logic

**API Documentation:**
1. Browse API docs (e.g., Stripe, AWS)
2. Ask "What are the authentication requirements?"
3. Get concise, relevant answers without reading entire docs

## 📚 API Documentation

### Backend Endpoints

#### `GET /api/health`
Health check endpoint
- **Response**: `{ "status": "ok", "version": "1.0.0" }`

#### `POST /api/explain-page`
Get AI explanation of a webpage
- **Request Body**:
  ```json
  {
    "url": "https://example.com",
    "content": "optional page content"
  }
  ```
- **Response**:
  ```json
  {
    "explanation": "AI-generated explanation..."
  }
  ```

#### `POST /api/explain-code`
Get explanation of code snippet
- **Request Body**:
  ```json
  {
    "code": "function example() { ... }",
    "language": "javascript"
  }
  ```
- **Response**:
  ```json
  {
    "explanation": "This code does..."
  }
  ```

#### `POST /api/chat`
Chat with AI about current context
- **Request Body**:
  ```json
  {
    "message": "What is this page about?",
    "context": "https://current-url.com"
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI response..."
  }
  ```

Full API documentation available at: http://localhost:8000/docs (when backend is running)

## 🧪 Testing

### Backend Tests

```bash
cd DevLens/backend
pytest tests/ -v
```

### Frontend Tests

```bash
cd DevLens/frontend
npm test
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

### Development Guidelines

1. **Branch Naming**: `feature/feature-name`, `fix/bug-name`
2. **Commit Messages**: Use conventional commits format
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Adding tests
3. **Code Style**: 
   - Python: Follow PEP 8
   - JavaScript: Follow ESLint configuration

## 📝 Development Roadmap

### ✅ Phase 1 - MVP (Current)
- [x] Basic browser functionality
- [x] Claude AI integration
- [x] Page explanation feature
- [x] Chat interface
- [x] FastAPI backend
- [x] Electron + React frontend

### 🚧 Phase 2 - Enhanced Features (Next)
- [ ] Multiple tab support
- [ ] Code snippet selection and explanation
- [ ] Session persistence
- [ ] Conversation history
- [ ] Bookmarks manager
- [ ] Browse history
- [ ] Improved error handling
- [ ] Loading states and animations

### 🔮 Phase 3 - Advanced Features (Future)
- [ ] Vector database (Pinecone) for semantic search
- [ ] Streaming AI responses
- [ ] Multiple LLM support (GPT-4, Gemini)
- [ ] Browser extension version (Chrome, Firefox)
- [ ] Advanced context management
- [ ] Plugin/extension system
- [ ] Custom themes
- [ ] Keyboard shortcuts
- [ ] Performance optimizations
- [ ] Mobile companion app

## 🐛 Known Issues

- Tailwind initialization may require manual config file creation
- CORS warnings on first run (resolved with proper configuration)
- Large pages may take longer to process with AI

## 💡 Why Claude AI?

DevLens uses Claude 3.5 Sonnet for several key reasons:

- **Superior Code Understanding**: Claude excels at explaining technical content and code
- **Longer Context Window**: 200K tokens vs competitors' 8K-128K
- **Better Reasoning**: More thorough, step-by-step technical explanations
- **Cost-Effective**: Great performance-to-cost ratio for portfolio projects
- **Modern API**: Clean, well-documented Python SDK

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Shivam Lahoti**
- GitHub: [@Shivam-Lahoti](https://github.com/Shivam-Lahoti)


## 🙏 Acknowledgments

- **Anthropic** for Claude AI API
- **Electron** team for the desktop framework
- **FastAPI** for the excellent Python framework
- **React** team for the UI library
- **Tailwind CSS** for the styling framework

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact via email: [shivam.2199@gmail.com]

---

**Built with ❤️ as a portfolio project to showcase full-stack development, AI integration, and modern software engineering practices.**

**Status**: 🚧 Active Development | 