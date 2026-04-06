import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, CheckCircle2, Award, Briefcase, Users, FileText, Home as HomeIcon, Zap, AlertCircle, Scale, Building2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import CalendlyWidget from '@/components/CalendlyWidget';
import PriceCalculator from '@/components/PriceCalculator';
import CrispChat from '@/components/CrispChat';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import LeadForm from '@/components/LeadForm';
import { WHATSAPP_URL, PHONE_DISPLAY, PROFESSIONAL_NAME, CREA_NUMBER, YEARS_EXPERIENCE, TOTAL_REPORTS, REGION, RATING, REVIEW_COUNT, TOTAL_CLIENTS } from '@/lib/constants';
import RiskCalculator from '@/components/RiskCalculator';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/hero-engenheiro-YD5NWNMKezgrrJhjC8vjux.webp';

// Padrão técnico SVG para background futurista
const TechPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
    <defs>
      <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
        <circle cx="0" cy="0" r="1" fill="white"/>
        <circle cx="40" cy="40" r="1" fill="white"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tech-grid)" />
  </svg>
);

function CounterNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString('pt-BR')}</span>;
}

// Componente de animação de entrada
const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

// Componente de hover scale
const HoverScale = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-white">
      <CrispChat />
      <Header />

      {/* HERO SECTION - MODERNO COM PADRÃO TÉCNICO */}
      <section id="inicio" className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        {/* Padrão técnico futurista */}
        <TechPattern />
        
        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-blue-900/80 z-5"></div>
        
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="Perícias de Engenharia" className="w-full h-full object-cover opacity-20" />
        </div>

        {/* Elementos decorativos animados */}
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ zIndex: 1 }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ zIndex: 1 }}
        />

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge com amarelo/ouro */}
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 rounded-full px-4 py-2 mb-6">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-yellow-300 font-semibold text-sm">Excelência em Perícias Técnicas</span>
              </div>

              {/* Título impactante com hierarquia */}
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                Perícias e Vistorias
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-6 leading-tight">
                Técnicas de Engenharia
              </h2>
              
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl">
                Engenheiro civil especialista em laudos técnicos, perícias judiciais e vistorias imobiliárias. Mais de <span className="text-yellow-400 font-bold">{TOTAL_REPORTS.toLocaleString('pt-BR')} laudos</span> realizados com precisão e confiabilidade em Campinas e região.
              </p>
            </motion.div>

            {/* CTAs com amarelo/ouro em destaque */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HoverScale>
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  Falar no WhatsApp
                  <ArrowRight size={18} />
                </a>
              </HoverScale>
              
              <HoverScale>
                <button 
                  onClick={() => document.getElementById('calendly')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition backdrop-blur-sm"
                >
                  Agendar Vistoria
                  <ArrowRight size={18} />
                </button>
              </HoverScale>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL - COM AMARELO/OURO */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 relative overflow-hidden">
        {/* Linha amarela decorativa no topo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <FadeInUp delay={0}>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <div className="text-5xl font-black mb-2 text-yellow-400">
                  <CounterNumber target={RATING} duration={2000} />
                </div>
                <p className="text-sm text-gray-200">⭐ {REVIEW_COUNT.toLocaleString('pt-BR')}+ avaliações</p>
              </motion.div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <div className="text-5xl font-black mb-2 text-yellow-400">
                  <CounterNumber target={TOTAL_CLIENTS} duration={2500} />+
                </div>
                <p className="text-sm text-gray-200">Clientes atendidos</p>
              </motion.div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <div className="text-5xl font-black mb-2 text-yellow-400">
                  <CounterNumber target={YEARS_EXPERIENCE} duration={1500} />
                </div>
                <p className="text-sm text-gray-200">Anos de experiência</p>
              </motion.div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <div className="text-5xl font-black mb-2 text-yellow-400">2h</div>
                <p className="text-sm text-gray-200">Resposta garantida</p>
              </motion.div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* AUTORIDADE - COM AMARELO/OURO */}
      <section id="autoridade" className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-blue-900 mb-4">
                Por Que Confiar em Mim?
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Experiência Comprovada', desc: `${YEARS_EXPERIENCE} anos de atuação em perícias e vistorias técnicas`, color: 'from-blue-50 to-blue-100' },
              { icon: FileText, title: `${TOTAL_REPORTS.toLocaleString('pt-BR')}+ Laudos`, desc: 'Laudos técnicos realizados com precisão e confiabilidade', color: 'from-yellow-50 to-yellow-100' },
              { icon: Scale, title: 'Perícias Judiciais', desc: 'Atuação em TJSP, TRT-15 e TRF-3 com credibilidade jurídica', color: 'from-blue-50 to-blue-100' },
              { icon: CheckCircle2, title: `CREA-SP ${CREA_NUMBER}`, desc: 'Registro profissional ativo e regularizado', color: 'from-green-50 to-green-100' },
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <HoverScale>
                  <Card className={`p-6 border-0 bg-gradient-to-br ${item.color} hover:shadow-xl transition relative overflow-hidden group`}>
                    {/* Linha amarela no topo ao hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    
                    <item.icon className="text-blue-900 mb-4 group-hover:text-yellow-500 transition" size={32} />
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </Card>
                </HoverScale>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA DE RISCO */}
      <section id="calculadora" className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <RiskCalculator />
        </div>
      </section>

      {/* SERVIÇOS - COM AMARELO/OURO */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-blue-900 mb-4">
                Serviços Especializados
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: 'Vistoria de Imóvel', desc: 'Laudo detalhado com registro fotográfico completo para locação ou compra', color: 'from-blue-50 to-blue-100', iconColor: 'text-blue-900' },
              { icon: AlertCircle, title: 'Laudo de Patologias', desc: 'Diagnóstico de infiltração, fissuras, umidade e vícios construtivos', color: 'from-yellow-50 to-yellow-100', iconColor: 'text-yellow-600' },
              { icon: TrendingUp, title: 'Avaliação de Imóvel', desc: 'Laudo técnico conforme NBR 14653 para fins de mercado', color: 'from-green-50 to-green-100', iconColor: 'text-green-600' },
              { icon: Zap, title: 'Inspeção Predial', desc: 'Check-up técnico completo conforme NBR 16747', color: 'from-purple-50 to-purple-100', iconColor: 'text-purple-600' },
              { icon: Scale, title: 'Perícia de Engenharia', desc: 'Laudos técnicos utilizados em processos judiciais', color: 'from-red-50 to-red-100', iconColor: 'text-red-600' },
              { icon: Briefcase, title: 'Assistência Técnica', desc: 'Suporte pericial para escritórios de advocacia e clientes', color: 'from-indigo-50 to-indigo-100', iconColor: 'text-indigo-600' },
            ].map((service, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <HoverScale>
                  <Card className={`p-6 border-0 bg-gradient-to-br ${service.color} hover:shadow-xl transition relative overflow-hidden group`}>
                    {/* Linha amarela no topo ao hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    
                    <service.icon className={`${service.iconColor} mb-4 group-hover:text-yellow-500 transition`} size={28} />
                    <h3 className="font-bold text-blue-900 mb-3 text-lg">{service.title}</h3>
                    <p className="text-gray-700 text-sm">{service.desc}</p>
                  </Card>
                </HoverScale>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMAS QUE RESOLVEMOS */}
      <section id="problemas" className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-blue-900 mb-4">
                Problemas Que Resolvemos
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Conflitos entre Locador e Locatário', desc: 'Laudos que comprovam responsabilidades e danos' },
              { title: 'Infiltração e Umidade', desc: 'Diagnóstico preciso de origem e responsabilidade' },
              { title: 'Avaliação para Seguros', desc: 'Laudos aceitos por seguradoras para indenizações' },
              { title: 'Perícia para Advogados', desc: 'Suporte técnico em processos judiciais' },
              { title: 'Inspeção Pré-Compra', desc: 'Identificar problemas antes de fechar negócio' },
              { title: 'Conformidade NBR', desc: 'Laudos que atendem normas técnicas brasileiras' },
            ].map((item, idx) => (
              <FadeInUp key={idx} delay={idx * 0.1}>
                <div className="flex gap-4 p-6 bg-white rounded-lg hover:shadow-lg transition border-l-4 border-yellow-400">
                  <CheckCircle2 className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA DE PREÇOS */}
      <section id="calculadora-preco" className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-blue-900 mb-4">
                Calculadora de Preços
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </FadeInUp>
          <PriceCalculator />
        </div>
      </section>

      {/* AGENDAMENTO CALENDLY */}
      <section id="calendly" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4">
                Agende Sua Vistoria
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Escolha o melhor horário para você. Resposta garantida em até 2 horas.
              </p>
            </div>
          </FadeInUp>
          <CalendlyWidget />
        </div>
      </section>

      {/* FORMULÁRIO DE CONTATO */}
      <section id="contato" className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-blue-900 mb-4">
                Entre em Contato
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
          </FadeInUp>
          <div className="max-w-2xl mx-auto">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-yellow-400">{PROFESSIONAL_NAME}</h3>
              <p className="text-gray-300 text-sm">Engenheiro civil especializado em perícias técnicas, vistorias imobiliárias e laudos técnicos.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-yellow-400">Contato</h3>
              <p className="text-gray-300 text-sm mb-2">📞 {PHONE_DISPLAY}</p>
              <p className="text-gray-300 text-sm mb-2">📧 contato@gfengenhariaepericias.com.br</p>
              <p className="text-gray-300 text-sm">📍 Campinas, SP</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-yellow-400">Registro Profissional</h3>
              <p className="text-gray-300 text-sm">CREA-SP {CREA_NUMBER}</p>
              <p className="text-gray-300 text-sm mt-4">Resposta garantida em 2 horas via WhatsApp</p>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2026 {PROFESSIONAL_NAME}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
