import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'minimalist', label: 'Minimalist' }
  ];

  useEffect(() => {
    loadHistory();
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await ApiService.healthCheck();
      console.log('API Health:', health);
    } catch (error) {
      console.error('API Health Check Failed:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const historyData = await ApiService.getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await ApiService.generateImage(prompt, style);
      
      if (result.success) {
        setGeneratedImage(result.data);
        await loadHistory(); // Refresh history
      } else {
        setError(result.error || 'Failed to generate image');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Text-to-Image Generator
        </h1>

        {/* Generation Form */}
        <form onSubmit={handleGenerate} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your prompt:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful sunset over mountains..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
              Style:
            </label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            >
              {styles.map((styleOption) => (
                <option key={styleOption.value} value={styleOption.value}>
                  {styleOption.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              loading || !prompt.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
            } text-white transition duration-200`}
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-500 bg-blue-100">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating your image...
            </div>
          </div>
        )}

        {/* Generated Image Display */}
        {generatedImage && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
            <div className="text-center">
              <img
                src={`${ApiService.baseURL}${generatedImage.image}`}
                alt={generatedImage.prompt}
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              />
              <p className="text-gray-600 mt-2 text-sm">
                Style: {generatedImage.style} | 
                Generation time: {generatedImage.generation_time?.toFixed(2)}s
              </p>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Generations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.slice(0, 6).map((item) => (
                <div key={item.id} className="border rounded-lg p-3">
                  <img
                    src={`${ApiService.baseURL}${item.image}`}
                    alt={item.prompt}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm text-gray-800 truncate" title={item.prompt}>
                    {item.prompt}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.style} | {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;