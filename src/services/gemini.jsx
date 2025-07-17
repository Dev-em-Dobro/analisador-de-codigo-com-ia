import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeCode(code) {
  const prompt = `
    Analise o seguinte código e forneça sugestões de melhorias de forma didática e clara:
    
    ${code}
    
    Por favor, avalie:
    1. Possíveis bugs ou erros
    2. Melhorias de performance
    3. Boas práticas de código
    4. Legibilidade e manutenibilidade
    5. Sugestões específicas de otimização
    
    IMPORTANTE: 
    - Formate a resposta usando markdown
    - Use ### para títulos das seções
    - Use **negrito** para destacar pontos importantes
    - Use \`código\` para trechos de código
    - Use - para listas
    - Seja claro e didático em português

    FORMATO DA RESPOSTA:
- Use apenas parágrafos normais
- Para destacar problemas use: ❌ Problema:
- Para sugestões use: ✅ Solução:
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Erro ao analisar código:', error);
    throw new Error('Erro ao conectar com a IA. Verifique sua chave de API e tente novamente.');
  }
}