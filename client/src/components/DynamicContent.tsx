import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface DynamicContentProps {
  trafficSource?: string;
  navigationHistory?: string[];
  userLocation?: string;
}

export default function DynamicContent({ trafficSource, navigationHistory, userLocation }: DynamicContentProps) {
  const [content, setContent] = useState<{
    title: string;
    description: string;
    cta: string;
    service: string;
    image: string;
  }>({
    title: 'Perícias e Vistorias Técnicas',
    description: 'Engenheiro civil especialista em laudos técnicos, perícias judiciais e vistorias imobiliárias.',
    cta: 'Agendar Vistoria',
    service: 'geral',
    image: 'hero-engenheiro'
  });

  useEffect(() => {
    // Adaptar conteúdo baseado na origem do tráfego
    if (trafficSource?.includes('perícia judicial')) {
      setContent({
        title: 'Perícia Judicial Profissional',
        description: 'Laudos técnicos aceitos em tribunal. Experiência comprovada em TJSP, TRT-15 e TRF-3.',
        cta: 'Solicitar Perícia',
        service: 'pericia',
        image: 'pericia-bg'
      });
    } else if (trafficSource?.includes('infiltração')) {
      setContent({
        title: 'Diagnóstico de Infiltração',
        description: 'Identificação precisa de infiltração, fissuras e umidade com laudo técnico completo.',
        cta: 'Solicitar Diagnóstico',
        service: 'patologias',
        image: 'patologias-bg'
      });
    } else if (trafficSource?.includes('avaliação imóvel')) {
      setContent({
        title: 'Avaliação de Imóveis',
        description: 'Laudo técnico conforme NBR 14653 para fins de financiamento ou venda.',
        cta: 'Solicitar Avaliação',
        service: 'avaliacao',
        image: 'avaliacao-bg'
      });
    }

    // Adaptar baseado no histórico de navegação
    if (navigationHistory?.includes('blog') && navigationHistory?.includes('infiltração')) {
      setContent(prev => ({
        ...prev,
        description: 'Você estava lendo sobre infiltração. Veja como podemos ajudar com diagnóstico profissional.'
      }));
    }

    // Adaptar baseado na geolocalização
    if (userLocation) {
      setContent(prev => ({
        ...prev,
        description: `${prev.description} Atendimento em ${userLocation} e região.`
      }));
    }
  }, [trafficSource, navigationHistory, userLocation]);

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{content.title}</h3>
          <p className="text-muted-foreground mb-4">{content.description}</p>
          <button className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            {content.cta}
          </button>
        </div>
      </div>
    </Card>
  );
}
