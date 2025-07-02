# DeepWave AI Chatbot Backend

A backend server for the DeepWave tsunami prediction AI chatbot. Available in both Python (FastAPI) and Node.js (Express) versions.

## Quick Start (Node.js - Recommended)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Get an OpenAI API Key
- Go to [OpenAI Platform](https://platform.openai.com/)
- Create an account and get your API key
- Add it to the `.env` file

### 4. Run the Server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

## Alternative: Python Setup (FastAPI)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set up Environment Variables
- Copy `env_example.txt` to `.env`
- Add your OpenAI API key

### 3. Run the Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

Both versions provide the same endpoints:

- `GET /` - Health check
- `GET /health` - Detailed health check
- `POST /chat` - Chat with AI

### Chat Endpoint Usage

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "How does tsunami prediction work?"}
  ]
}
```

**Response:**
```json
{
  "reply": "Tsunami prediction involves monitoring seismic activity..."
}
```

## Features

- ✅ CORS enabled for frontend integration
- ✅ OpenAI GPT-3.5-turbo integration
- ✅ Environment variable configuration
- ✅ Error handling
- ✅ Health check endpoints
- ✅ Tsunami-focused system prompt

## Troubleshooting

- **CORS errors:** The server allows all origins by default
- **OpenAI errors:** Check your API key and quota
- **Port conflicts:** Change the port in the server configuration
- **Node.js not found:** Install Node.js from [nodejs.org](https://nodejs.org/)

## Server Status

Once running, you should see:
```
🚀 DeepWave AI Chatbot server running on http://localhost:8000
📝 API Documentation: http://localhost:8000/health
✅ OpenAI API key configured
``` 