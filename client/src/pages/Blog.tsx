import { useState } from 'react';
import { Search, Calendar, User, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';

const blogPosts = [
  {
    id: 1,
    title: 'Como Identificar Infiltração em Imóveis: Guia Completo',
    excerpt: 'Aprenda a reconhecer os sinais de infiltração, causas comuns e soluções eficazes para proteger seu imóvel.',
    content: `
# Como Identificar Infiltração em Imóveis: Guia Completo

## Introdução
A infiltração é um dos problemas mais comuns em imóveis brasileiros. Ela pode causar danos estruturais graves se não for tratada adequadamente. Neste guia, você aprenderá a identificar os sinais de infiltração, entender suas causas e conhecer as soluções disponíveis.

## Sinais de Infiltração
- Manchas de umidade nas paredes
- Mofo e bolor em cantos e rodapés
- Pintura descascando
- Eflorescência (manchas brancas)
- Odor de mofo
- Rachaduras em alvenaria

## Causas Comuns
1. **Falha em impermeabilização** - Lajes e terraços sem proteção adequada
2. **Canaletas entupidas** - Água não escoada corretamente
3. **Fissuras estruturais** - Movimentação da estrutura
4. **Infiltração capilar** - Umidade sobe pela alvenaria
5. **Vazamento de tubulações** - Canos com furos ou trincas

## Como Diagnosticar
- Inspecionar visualmente toda a estrutura
- Usar medidor de umidade
- Realizar teste de estanqueidade
- Análise de manchas e padrões
- Investigar histórico do imóvel

## Soluções Disponíveis
- Impermeabilização com manta asfáltica
- Aplicação de hidrofugante
- Injeção de resina
- Drenagem periférica
- Revestimento impermeável

## Conclusão
A detecção precoce de infiltração é essencial para evitar danos maiores. Se você suspeita de infiltração, procure um engenheiro especializado para diagnóstico profissional.
    `,
    date: '15 de março de 2026',
    author: 'Eng. Gustavo Freitas',
    category: 'Patologias',
    readTime: '8 min'
  },
  {
    id: 2,
    title: 'NBR 14653: Tudo que Você Precisa Saber sobre Avaliação de Imóveis',
    excerpt: 'Conheça a norma técnica brasileira para avaliação de imóveis e como ela garante precisão nos laudos.',
    content: `
# NBR 14653: Avaliação de Imóveis

## O que é NBR 14653?
A NBR 14653 é a norma técnica brasileira que estabelece os procedimentos para avaliação de imóveis. Ela garante que todos os laudos sejam elaborados com metodologia científica e reconhecida.

## Metodologias de Avaliação
1. **Método Comparativo** - Compara com imóveis similares
2. **Método de Custo** - Calcula custo de reprodução
3. **Método de Renda** - Baseado em fluxo de caixa

## Elementos Essenciais
- Localização e acessibilidade
- Características físicas
- Estado de conservação
- Comparação com mercado
- Análise de tendências

## Aplicações Práticas
- Financiamento imobiliário
- Seguros
- Processos judiciais
- Transações comerciais
- Avaliação patrimonial

## Conclusão
Seguir a NBR 14653 garante que sua avaliação seja aceita em qualquer tribunal ou instituição financeira.
    `,
    date: '10 de março de 2026',
    author: 'Eng. Gustavo Freitas',
    category: 'Normas Técnicas',
    readTime: '10 min'
  },
  {
    id: 3,
    title: 'Perícia Judicial: Passo a Passo do Processo',
    excerpt: 'Entenda como funciona uma perícia judicial e qual é o papel do perito na resolução de conflitos.',
    content: `
# Perícia Judicial: Passo a Passo

## O que é Perícia Judicial?
Perícia judicial é a investigação técnica realizada por um profissional especializado para esclarecer fatos relevantes em um processo judicial.

## Etapas do Processo
1. **Nomeação do Perito** - Juiz nomeia profissional qualificado
2. **Aceitação do Cargo** - Perito aceita e compromete-se
3. **Elaboração do Laudo** - Investigação técnica completa
4. **Apresentação do Laudo** - Documento entregue ao tribunal
5. **Esclarecimentos** - Respostas a questionamentos
6. **Sentença** - Juiz usa laudo na decisão

## Responsabilidades do Perito
- Imparcialidade absoluta
- Competência técnica
- Sigilo profissional
- Cumprimento de prazos
- Clareza nas conclusões

## Conclusão
O perito é fundamental para a justiça, fornecendo informações técnicas que auxiliam na tomada de decisão judicial.
    `,
    date: '05 de março de 2026',
    author: 'Eng. Gustavo Freitas',
    category: 'Perícia',
    readTime: '7 min'
  },
  {
    id: 4,
    title: 'Inspeção Predial: Checklist Completo para Proprietários',
    excerpt: 'Saiba o que verificar em uma inspeção predial e como manter seu imóvel em perfeito estado.',
    content: `
# Inspeção Predial: Checklist Completo

## O que é Inspeção Predial?
Inspeção predial é a avaliação técnica completa de um imóvel, conforme NBR 16747, que identifica problemas estruturais, funcionais e de segurança.

## Áreas Inspecionadas
- Estrutura e fundações
- Cobertura e telhado
- Fachada e revestimentos
- Instalações hidráulicas
- Instalações elétricas
- Sistemas de segurança
- Acessibilidade

## Checklist Essencial
- [ ] Rachaduras em paredes
- [ ] Infiltrações
- [ ] Mofo e umidade
- [ ] Funcionamento de encanamentos
- [ ] Fiação elétrica
- [ ] Portas e janelas
- [ ] Piso e revestimentos
- [ ] Extintores de incêndio

## Frequência Recomendada
- Imóveis novos: 1 ano após entrega
- Imóveis com 10+ anos: anualmente
- Após eventos climáticos extremos

## Conclusão
Inspeções regulares previnem problemas maiores e economizam dinheiro a longo prazo.
    `,
    date: '28 de fevereiro de 2026',
    author: 'Eng. Gustavo Freitas',
    category: 'Inspeção',
    readTime: '6 min'
  },
  {
    id: 5,
    title: 'Avaliação de Imóvel: Quanto Custa e Como Funciona',
    excerpt: 'Guia prático sobre avaliação imobiliária, fatores que influenciam o preço e como obter um laudo confiável.',
    content: `
# Avaliação de Imóvel: Guia Completo

## O que é Avaliação Imobiliária?
Avaliação imobiliária é a determinação técnica do valor de um imóvel baseada em análise de mercado e características físicas.

## Fatores que Influenciam o Valor
1. **Localização** - Bairro, proximidade a comércios
2. **Tamanho** - Metragem total e útil
3. **Idade** - Imóvel novo vs. antigo
4. **Estado de Conservação** - Reformas necessárias
5. **Amenidades** - Piscina, garagem, jardim
6. **Mercado** - Oferta e demanda local

## Custo da Avaliação
- Imóvel residencial: R$ 800 a R$ 2.000
- Imóvel comercial: R$ 1.500 a R$ 5.000
- Imóvel industrial: R$ 2.000 a R$ 10.000

## Quando Solicitar
- Financiamento bancário
- Venda do imóvel
- Seguros
- Processos judiciais
- Herança e sucessão

## Conclusão
Uma avaliação profissional garante que você tenha informação precisa sobre o valor do seu imóvel.
    `,
    date: '20 de fevereiro de 2026',
    author: 'Eng. Gustavo Freitas',
    category: 'Avaliação',
    readTime: '7 min'
  }
];

const faqItems = [
  {
    question: 'Quanto custa uma vistoria?',
    answer: 'O valor varia conforme o tipo de vistoria e tamanho do imóvel. Oferecemos orçamento personalizado sem compromisso. Entre em contato via WhatsApp para mais informações.'
  },
  {
    question: 'Qual é o prazo para entrega do laudo?',
    answer: 'O prazo varia de 5 a 15 dias úteis conforme a complexidade do caso. Vistorias simples podem ser entregues em até 3 dias. Oferecemos expedição em casos urgentes.'
  },
  {
    question: 'O laudo tem validade jurídica?',
    answer: 'Sim. Todos os nossos laudos são elaborados conforme normas técnicas brasileiras (NBR 14653, NBR 16747) e têm validade jurídica comprovada em processos judiciais nos tribunais.'
  },
  {
    question: 'Vocês atendem fora de Campinas?',
    answer: 'Sim, atendemos Campinas, Hortolândia, Sumaré, Paulínia, Valinhos e região. Consulte-nos para outras localidades.'
  },
  {
    question: 'Como é feita uma vistoria?',
    answer: 'Realizamos inspeção visual completa, fotografias, medições, testes técnicos e análise de documentação. Ao final, elaboramos relatório detalhado com conclusões e recomendações.'
  },
  {
    question: 'Qual é a diferença entre vistoria e perícia?',
    answer: 'Vistoria é inspeção técnica geral. Perícia é investigação profunda para fins judiciais. Ambas usam metodologias técnicas, mas perícia tem maior rigor e validade jurídica.'
  },
  {
    question: 'Posso usar o laudo em processos judiciais?',
    answer: 'Sim. Nossos laudos são aceitos em tribunais (TJSP, TRT-15, TRF-3) como prova técnica. Somos peritos judiciais cadastrados.'
  },
  {
    question: 'Qual é a validade do laudo?',
    answer: 'Laudos técnicos têm validade indefinida se o imóvel não sofrer alterações. Recomendamos atualização a cada 5 anos para imóveis antigos.'
  },
  {
    question: 'Como faço para agendar uma vistoria?',
    answer: 'Clique em "Agendar Vistoria" no site, envie mensagem via WhatsApp ou preencha o formulário de contato. Retornaremos em até 2 horas.'
  },
  {
    question: 'Qual é o horário de atendimento?',
    answer: 'Atendemos de segunda a sexta, 8h às 18h. Agendamentos para sábados podem ser realizados conforme disponibilidade.'
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', 'Patologias', 'Normas Técnicas', 'Perícia', 'Inspeção', 'Avaliação'];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Blog Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Técnico</h1>
          <p className="text-xl text-gray-100">Artigos, guias e dicas sobre perícias, vistorias e avaliação de imóveis</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white py-8 border-b">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar size={16} /> {post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><User size={16} /> {post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum artigo encontrado. Tente outra busca.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 text-left">{item.question}</h3>
                  <ChevronDown
                    size={24}
                    className={`text-blue-900 transition ${expandedFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
