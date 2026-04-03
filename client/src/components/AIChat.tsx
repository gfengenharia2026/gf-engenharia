import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const BOT_RESPONSES: Record<string, string> = {
  'olá': 'Olá! Bem-vindo ao GF Engenharia. Como posso ajudá-lo hoje? Você está procurando por vistoria, perícia, avaliação ou outro serviço?',
  'vistoria': 'Ótimo! Oferecemos vistorias completas de imóveis com laudo detalhado e registro fotográfico. Qual é o tipo de imóvel? (Apartamento, casa, comercial)',
  'perícia': 'Excelente! Realizamos perícias judiciais aceitas em tribunal (TJSP, TRT-15, TRF-3). Qual é o tipo de perícia que você precisa?',
  'infiltração': 'Infiltração é um dos nossos principais serviços. Realizamos diagnóstico completo com identificação de causas e recomendações. Quer agendar uma vistoria?',
  'preço': 'Os preços variam conforme o tipo e complexidade da vistoria. Posso te passar um orçamento personalizado. Qual é seu tipo de imóvel?',
  'agendar': 'Perfeito! Você pode agendar diretamente pelo Calendly ou enviar uma mensagem no WhatsApp. Qual data você prefere?',
  'default': 'Entendi sua pergunta. Para mais informações específicas, posso conectá-lo com nosso engenheiro. Quer agendar uma consulta?'
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Olá! Sou o assistente de IA do GF Engenharia. Como posso ajudá-lo?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simular resposta do bot
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let botResponse = BOT_RESPONSES['default'];

      for (const [key, response] of Object.entries(BOT_RESPONSES)) {
        if (lowerInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-border">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
        <h3 className="font-semibold">Assistente IA - GF Engenharia</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-primary/80 p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-foreground'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-foreground px-4 py-2 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite sua pergunta..."
          className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
