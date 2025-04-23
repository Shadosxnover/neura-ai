import { useState, useRef } from 'react';
import { generateImage } from '../utils/gemini';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestCount = useRef(0);
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateImage(prompt);
      setResponse(result);
      requestCount.current++;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="w-full p-2 border rounded-lg min-h-[100px]"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Response'}
        </button>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        {response && (
          <div className="border rounded-lg p-4 bg-white">
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
