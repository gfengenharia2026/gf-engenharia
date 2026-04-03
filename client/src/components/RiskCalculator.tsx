import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL, PHONE_DISPLAY } from '@/lib/constants';

export default function RiskCalculator() {
  const [answers, setAnswers] = useState({
    age: '',
    condition: '',
    location: '',
    maintenance: '',
    structure: ''
  });

  const [result, setResult] = useState<null | { risk: string; color: string; description: string }>(null);

  const calculateRisk = () => {
    const riskPoints = {
      age: answers.age === 'novo' ? 0 : answers.age === 'medio' ? 2 : 4,
      condition: answers.condition === 'otimo' ? 0 : answers.condition === 'bom' ? 1 : 3,
      location: answers.location === 'segura' ? 0 : answers.location === 'media' ? 2 : 4,
      maintenance: answers.maintenance === 'regular' ? 0 : answers.maintenance === 'irregular' ? 2 : 4,
      structure: answers.structure === 'integra' ? 0 : answers.structure === 'pequenos' ? 2 : 4
    };

    const total = Object.values(riskPoints).reduce((a, b) => a + b, 0);

    let risk, color, description;
    if (total <= 5) {
      risk = 'BAIXO';
      color = 'green';
      description = 'Seu imóvel está em bom estado. Recomendamos inspeção a cada 5 anos.';
    } else if (total <= 12) {
      risk = 'MÉDIO';
      color = 'yellow';
      description = 'Seu imóvel apresenta alguns pontos de atenção. Recomendamos vistoria em breve.';
    } else {
      risk = 'ALTO';
      color = 'red';
      description = 'Seu imóvel requer atenção imediata. Agende uma vistoria profissional agora.';
    }

    setResult({ risk, color, description });
  };

  const isComplete = Object.values(answers).every(v => v !== '');

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 rounded-lg">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Calculadora de Risco do Imóvel</h2>
        <p className="text-gray-200 mb-8">Responda 5 perguntas rápidas e descubra o nível de risco do seu imóvel</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Questions */}
          <div className="space-y-6">
            {/* Idade */}
            <div>
              <label className="block text-sm font-semibold mb-3">1. Qual é a idade do imóvel?</label>
              <div className="space-y-2">
                {['novo', 'medio', 'antigo'].map(option => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="age"
                      value={option}
                      checked={answers.age === option}
                      onChange={(e) => setAnswers({ ...answers, age: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>
                      {option === 'novo' && 'Menos de 5 anos'}
                      {option === 'medio' && '5 a 15 anos'}
                      {option === 'antigo' && 'Mais de 15 anos'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condição */}
            <div>
              <label className="block text-sm font-semibold mb-3">2. Estado geral do imóvel?</label>
              <div className="space-y-2">
                {['otimo', 'bom', 'ruim'].map(option => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="condition"
                      value={option}
                      checked={answers.condition === option}
                      onChange={(e) => setAnswers({ ...answers, condition: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>
                      {option === 'otimo' && 'Ótimo - Reformado recentemente'}
                      {option === 'bom' && 'Bom - Bem mantido'}
                      {option === 'ruim' && 'Ruim - Necessita reformas'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-semibold mb-3">3. Localização do imóvel?</label>
              <div className="space-y-2">
                {['segura', 'media', 'risco'].map(option => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value={option}
                      checked={answers.location === option}
                      onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>
                      {option === 'segura' && 'Segura - Bairro consolidado'}
                      {option === 'media' && 'Média - Bairro em desenvolvimento'}
                      {option === 'risco' && 'Risco - Área de risco'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Manutenção */}
            <div>
              <label className="block text-sm font-semibold mb-3">4. Frequência de manutenção?</label>
              <div className="space-y-2">
                {['regular', 'irregular', 'nenhuma'].map(option => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="maintenance"
                      value={option}
                      checked={answers.maintenance === option}
                      onChange={(e) => setAnswers({ ...answers, maintenance: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>
                      {option === 'regular' && 'Regular - Mantém em dia'}
                      {option === 'irregular' && 'Irregular - Às vezes'}
                      {option === 'nenhuma' && 'Nenhuma - Nunca'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Estrutura */}
            <div>
              <label className="block text-sm font-semibold mb-3">5. Problemas estruturais visíveis?</label>
              <div className="space-y-2">
                {['integra', 'pequenos', 'graves'].map(option => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="structure"
                      value={option}
                      checked={answers.structure === option}
                      onChange={(e) => setAnswers({ ...answers, structure: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>
                      {option === 'integra' && 'Nenhum - Estrutura íntegra'}
                      {option === 'pequenos' && 'Pequenos - Fissuras leves'}
                      {option === 'graves' && 'Graves - Rachaduras visíveis'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-between">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Resultado</h3>
              
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg bg-${result.color}-100 border-2 border-${result.color}-500`}>
                    <div className="flex items-center gap-2 mb-2">
                      {result.color === 'green' && <CheckCircle2 size={24} className="text-green-600" />}
                      {result.color === 'yellow' && <AlertCircle size={24} className="text-yellow-600" />}
                      {result.color === 'red' && <AlertCircle size={24} className="text-red-600" />}
                      <span className={`text-2xl font-bold text-${result.color}-900`}>{result.risk}</span>
                    </div>
                    <p className={`text-${result.color}-900`}>{result.description}</p>
                  </div>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-lg text-center transition"
                  >
                    Agendar Vistoria Profissional
                  </a>
                </div>
              ) : (
                <p className="text-gray-300">Responda todas as perguntas para ver o resultado</p>
              )}
            </div>

            <button
              onClick={calculateRisk}
              disabled={!isComplete}
              className={`w-full py-3 rounded-lg font-bold transition ${
                isComplete
                  ? 'bg-orange-400 hover:bg-orange-500 text-white cursor-pointer'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              Calcular Risco
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
