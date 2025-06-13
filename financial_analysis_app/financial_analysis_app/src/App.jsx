import React, { useState, useEffect } from 'react';
import './App.css'; // Certifique-se de que este arquivo CSS existe e está configurado para Tailwind CSS

// Componente principal do aplicativo
function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [llmRecommendationDetails, setLlmRecommendationDetails] = useState('');
  const [llmFinancialQuestion, setLlmFinancialQuestion] = useState('');
  const [llmFinancialAnswer, setLlmFinancialAnswer] = useState('');
  const [llmLoading, setLlmLoading] = useState(false);
  const [currentRecommendations, setCurrentRecommendations] = useState(''); // Para armazenar as últimas recomendações para detalhamento

  // Simula a classe DataCollector em JavaScript
  class DataCollector {
    // URL base para as APIs (mantidas apenas para referência, não serão usadas diretamente)
    base_url_brapi = "https://brapi.dev/api";
    base_url_coingecko = "https://api.coingecko.com/api/v3";
    base_url_alpha_vantage = "https://www.alphavantage.co/query";

    async get_b3_data(ticker = "PETR4") {
      // Simulação da coleta de dados da B3
      console.log(`Simulando coleta de dados da B3 para ${ticker}...`);
      return {
        "PETR4": {
          "longName": "Petróleo Brasileiro S.A. - Petrobras",
          "regularMarketPrice": 28.50,
          "regularMarketChangePercent": 0.015,
          "marketCap": 350000000000
        }
      };
    }

    async get_crypto_data(coin_id = "bitcoin") {
      // Simulação da coleta de dados de criptomoedas
      console.log(`Simulando coleta de dados de criptomoedas para ${coin_id}...`);
      return {
        "bitcoin": {
          "usd": 68000
        }
      };
    }

    async get_us_stock_data(symbol = "IBM") {
      // Simulação da coleta de dados da bolsa americana
      console.log(`Simulando coleta de dados da bolsa americana para ${symbol}...`);
      return {
        "Global Quote": {
          "05. price": "170.25",
          "06. volume": "5000000",
          "07. latest trading day": "2024-06-11",
          "08. previous close": "169.80"
        }
      };
    }
  }

  // Simula a classe Analyzer em JavaScript
  class Analyzer {
    analyze_financial_data(b3_data, crypto_data, us_stock_data) {
      // Implementação da análise dos dados financeiros
      let financialSummary = "Análise Financeira:\n";
      if (b3_data && b3_data.PETR4) {
        financialSummary += `  B3 (PETR4): Preço ${b3_data.PETR4.regularMarketPrice}, Variação ${b3_data.PETR4.regularMarketChangePercent * 100}%\n`;
      } else {
        financialSummary += `  Dados B3: Indisponíveis\n`;
      }
      if (crypto_data && crypto_data.bitcoin) {
        financialSummary += `  Cripto (Bitcoin): Preço $${crypto_data.bitcoin.usd}\n`;
      } else {
        financialSummary += `  Dados Cripto: Indisponíveis\n`;
      }
      if (us_stock_data && us_stock_data["Global Quote"]) {
        financialSummary += `  EUA (IBM): Preço $${us_stock_data["Global Quote"]["05. price"]}\n`;
      } else {
        financialSummary += `  Dados EUA: Indisponíveis\n`;
      }
      return financialSummary;
    }

    analyze_political_data(political_news_sentiment) {
      // A análise política agora é baseada em um valor de sentimento simulado que varia
      if (political_news_sentiment > 0.5) {
        return "Análise Política: Cenário político brasileiro favorável.";
      } else if (political_news_sentiment < -0.5) {
        return "Análise Política: Cenário político brasileiro desfavorável.";
      } else {
        return "Análise Política: Cenário político brasileiro neutro.";
      }
    }

    analyze_geopolitical_data(geopolitical_news_sentiment) {
      // A análise geopolítica agora é baseada em um valor de sentimento simulado que varia
      if (geopolitical_news_sentiment > 0.5) {
        return "Análise Geopolítica: Cenário geopolítico global favorável.";
      } else if (geopolitical_news_sentiment < -0.5) {
        return "Análise Geopolítica: Cenário geopolítico global desfavorável.";
      } else {
        return "Análise Geopolítica: Cenário geopolítico global neutro.";
      }
    }

    recommend_investments(financial_analysis, political_analysis, geopolitical_analysis) {
      const recommendations = [];

      if (political_analysis.includes("favorável") && geopolitical_analysis.includes("favorável")) {
        recommendations.push("Considerar investimentos de maior risco devido ao cenário político e geopolítico favorável.");
      } else if (political_analysis.includes("desfavorável") || geopolitical_analysis.includes("desfavorável")) {
        recommendations.push("Considerar investimentos mais conservadores devido ao cenário político ou geopolítico desfavorável.");
      } else {
        recommendations.push("Manter cautela e diversificação devido ao cenário político e geopolítico neutro.");
      }

      if (financial_analysis.includes("B3 (PETR4)")) {
        recommendations.push("Analisar PETR4 na B3 para oportunidades.");
      }
      if (financial_analysis.includes("Cripto (Bitcoin)")) {
        recommendations.push("Analisar Bitcoin no mercado de criptomoedas para oportunidades.");
      }
      if (financial_analysis.includes("EUA (IBM)")) {
        recommendations.push("Analisar IBM na bolsa americana para oportunidades.");
      }

      return recommendations.join("\n");
    }
  }

  // Função para chamar o Gemini API
  const callGeminiApi = async (prompt) => {
    setLlmLoading(true);
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // A chave de API será fornecida pelo ambiente Canvas
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setLlmLoading(false);
        return text;
      } else {
        setLlmLoading(false);
        return "Não foi possível obter uma resposta do Gemini API.";
      }
    } catch (error) {
      console.error("Erro ao chamar o Gemini API:", error);
      setLlmLoading(false);
      return "Erro ao comunicar com o Gemini API. Tente novamente.";
    }
  };

  // Função para executar a análise
  const runAnalysis = async () => {
    setLoading(true);
    setLlmRecommendationDetails(''); // Limpa o detalhe anterior
    setLlmFinancialAnswer(''); // Limpa a resposta da pergunta

    const data_collector = new DataCollector();
    const analyzer = new Analyzer();

    // Coleta de dados (simulada)
    const b3_data = await data_collector.get_b3_data();
    const crypto_data = await data_collector.get_crypto_data();
    const us_stock_data = await data_collector.get_us_stock_data();

    // Análise de dados financeiros
    const financial_analysis = analyzer.analyze_financial_data(b3_data, crypto_data, us_stock_data);

    // Análise de dados políticos e geopolíticos (agora com valores de exemplo aleatórios)
    // Gera um número aleatório entre -1 e 1
    const political_news_sentiment = (Math.random() * 2) - 1;
    const geopolitical_news_sentiment = (Math.random() * 2) - 1;

    console.log(`Sentimento político simulado: ${political_news_sentiment.toFixed(2)}`);
    console.log(`Sentimento geopolítico simulado: ${geopolitical_news_sentiment.toFixed(2)}`);

    const political_analysis = analyzer.analyze_political_data(political_news_sentiment);
    const geopolitical_analysis = analyzer.analyze_geopolitical_data(geopolitical_news_sentiment);

    // Recomendação de investimentos
    const recommendations = analyzer.recommend_investments(financial_analysis, political_analysis, geopolitical_analysis);
    setCurrentRecommendations(recommendations); // Armazena as recomendações atuais

    setAnalysisResult(
      `--- Resultados da Análise ---\n` +
      `${financial_analysis}\n` +
      `${political_analysis}\n` +
      `${geopolitical_analysis}\n\n` +
      `--- Recomendações de Investimento ---\n` +
      `${recommendations}`
    );
    setLoading(false);
  };

  // Função para detalhar as recomendações com o Gemini
  const elaborateRecommendations = async () => {
    if (!currentRecommendations) {
      setLlmRecommendationDetails('Por favor, execute a análise primeiro para gerar recomendações.');
      return;
    }
    const prompt = `Detalhe as seguintes recomendações de investimento financeiro, explicando o contexto e as implicações de cada uma de forma acessível para um leigo: ${currentRecommendations}`;
    const details = await callGeminiApi(prompt);
    setLlmRecommendationDetails(details);
  };

  // Função para responder a perguntas financeiras com o Gemini
  const answerFinancialQuestion = async () => {
    if (!llmFinancialQuestion.trim()) {
      setLlmFinancialAnswer('Por favor, digite sua pergunta.');
      return;
    }
    const prompt = `Responda à seguinte pergunta sobre finanças: "${llmFinancialQuestion}". Forneça uma explicação clara e concisa.`;
    const answer = await callGeminiApi(prompt);
    setLlmFinancialAnswer(answer);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Análise Financeira Diária</h1>
        <p className="text-gray-600 mb-6 text-center">
          Clique no botão abaixo para iniciar a análise. Todos os dados são simulados para demonstração, incluindo o sentimento político e geopolítico.
        </p>
        <button
          onClick={runAnalysis}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition duration-300 ease-in-out
            ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'}`}
        >
          {loading ? 'Analisando...' : 'Executar Análise'}
        </button>

        {analysisResult && (
          <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200 whitespace-pre-wrap text-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Resultados:</h2>
            <p>{analysisResult}</p>

            <button
              onClick={elaborateRecommendations}
              disabled={llmLoading || !currentRecommendations}
              className={`mt-4 w-full py-2 px-4 rounded-xl text-white font-semibold transition duration-300 ease-in-out
                ${llmLoading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-md'}`}
            >
              {llmLoading ? 'Detalhando...' : '✨ Detalhar Recomendação'}
            </button>
            {llmRecommendationDetails && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-800">
                <h3 className="font-bold mb-2">Detalhes do Gemini:</h3>
                <p>{llmRecommendationDetails}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Perguntar ao Gemini sobre Finanças</h2>
          <textarea
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="3"
            placeholder="Ex: O que é inflação? Explique risco e retorno."
            value={llmFinancialQuestion}
            onChange={(e) => setLlmFinancialQuestion(e.target.value)}
          ></textarea>
          <button
            onClick={answerFinancialQuestion}
            disabled={llmLoading}
            className={`w-full py-2 px-4 rounded-xl text-white font-semibold transition duration-300 ease-in-out
              ${llmLoading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-md'}`}
          >
            {llmLoading ? 'Consultando Gemini...' : '✨ Perguntar ao Gemini'}
          </button>
          {llmFinancialAnswer && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 text-green-800">
              <h3 className="font-bold mb-2">Resposta do Gemini:</h3>
              <p>{llmFinancialAnswer}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;


