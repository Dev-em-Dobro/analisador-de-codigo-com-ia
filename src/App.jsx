import { useState } from 'react'
import { analyzeCode } from './services/gemini'
import './App.css'

function App() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    console.log('Analisando código:', code);
    if (!code.trim()) return

    setResult('')
    setError('')

    setLoading(true)
    console.log(loading)

    try {
      const analysis = await analyzeCode(code)
      setResult(analysis)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="container">
        <h1 className="title">Analisador de Código IA</h1>
        <p className="subtitle">Cole seu código e descubra como melhorá-lo</p>

        <div className="input-group">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-textarea"
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
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


export default App