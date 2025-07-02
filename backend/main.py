from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="DeepWave AI Chatbot API",
    description="AI-powered tsunami prediction chatbot backend",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

class ChatResponse(BaseModel):
    reply: str

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "DeepWave AI Chatbot API is running", "status": "healthy"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint that processes messages and returns AI responses
    
    Args:
        request: ChatRequest containing messages array
        
    Returns:
        ChatResponse with AI reply
    """
    try:
        # Convert messages to OpenAI format
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        # Add system context for tsunami prediction
        system_message = {
            "role": "system",
            "content": """You are an AI assistant for Project DeepWave, a tsunami prediction system. 
            You help users understand tsunami risks, explain how the AI prediction system works, 
            and provide information about earthquake and tsunami science. 
            Be informative, helpful, and maintain a professional yet approachable tone. 
            Focus on tsunami prediction, seismic activity, and coastal safety."""
        }
        
        # Add system message at the beginning
        messages.insert(0, system_message)
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        # Extract the assistant's reply
        assistant_reply = response.choices[0].message.content
        
        return ChatResponse(reply=assistant_reply)
        
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    """Detailed health check endpoint"""
    return {
        "status": "healthy",
        "service": "DeepWave AI Chatbot",
        "version": "1.0.0",
        "openai_configured": bool(openai.api_key)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 