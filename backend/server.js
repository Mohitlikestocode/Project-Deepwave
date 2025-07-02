const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'DeepWave AI Chatbot API is running', 
    status: 'healthy' 
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'DeepWave AI Chatbot',
    version: '1.0.0',
    openai_configured: !!process.env.OPENAI_API_KEY
  });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file.' 
      });
    }

    // Add system context for tsunami prediction
    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant for Project DeepWave, a tsunami prediction system. 
      You help users understand tsunami risks, explain how the AI prediction system works, 
      and provide information about earthquake and tsunami science. 
      Be informative, helpful, and maintain a professional yet approachable tone. 
      Focus on tsunami prediction, seismic activity, and coastal safety.`
    };

    // Prepare messages for OpenAI
    const openaiMessages = [systemMessage, ...messages];

    // Call OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: openaiMessages,
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const assistantReply = response.data.choices[0].message.content;
    
    res.json({ reply: assistantReply });
    
  } catch (error) {
    console.error('Chat error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      res.status(401).json({ 
        error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in the .env file.' 
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({ 
        error: 'OpenAI API rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to get response from AI. Please try again.' 
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DeepWave AI Chatbot server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/health`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  Warning: OPENAI_API_KEY not found in environment variables');
    console.log('   Please create a .env file with your OpenAI API key');
  } else {
    console.log('✅ OpenAI API key configured');
  }
}); 