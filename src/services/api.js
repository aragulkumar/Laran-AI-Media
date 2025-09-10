// API service for connecting to Hugging Face Spaces backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-space-name.hf.space';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async generateImage(prompt, style = 'realistic') {
    try {
      const response = await fetch(`${this.baseURL}/api/generate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style,
          width: 512,
          height: 512
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getHistory() {
    try {
      const response = await fetch(`${this.baseURL}/api/history/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/api/health/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', error: error.message };
    }
  }
}

export default new ApiService();