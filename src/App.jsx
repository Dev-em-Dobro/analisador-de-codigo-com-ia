import { useState } from 'react'
import { analyzeCode } from './services/gemini'
import ReactMarkdown from 'react-markdown';
import './App.css'

function App() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!code.trim()) return
    
    setLoading(true)
    setError('')
    setResult('')
    
    try {
      const analysis = await analyzeCode(code)
      setResult(analysis)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="container">
        <h1 className="title">Analisador de Código com IA</h1>
        <p className="subtitle">Cole seu código e descubra como melhorá-lo</p>
        
        <div className="input-group">
          <textarea
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Cole seu código aqui (JavaScript, HTML, CSS)..."
          />
        </div>
        
        <button 
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={!code.trim() || loading}
        >
          {loading ? 'Analisando...' : 'Analisar Código'}
        </button>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {result && (
          <div className="result-container">
            <h2 className="result-title">Análise do Código</h2>
            <div className="result-content">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App