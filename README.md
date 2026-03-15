# Eng. Gustavo Freitas - Perícias e Vistorias Técnicas

Site profissional moderno para engenheiro civil especializado em perícias de engenharia, vistorias técnicas de imóveis e laudos técnicos.

## 🎯 Objetivo

Gerar contatos de clientes que precisam de:
- Vistoria de imóvel
- Laudo técnico
- Perícia de engenharia
- Avaliação de imóveis
- Inspeção predial
- Assistência técnica pericial para advogados

## 🎨 Design

**Filosofia:** Minimalismo Corporativo com Precisão Técnica

**Cores:**
- Azul Escuro: #1E3A8A (confiança, profissionalismo)
- Cinza Claro: #F3F4F6 (clareza, separação)
- Laranja: #F59E0B (CTAs, destaque)
- Branco: #FFFFFF (fundo principal)

**Tipografia:** Roboto (300, 400, 500, 700)

**Layout:** Grid 12 colunas, seções alternadas, mobile-first

## 📱 Seções Principais

1. **Header** - Navegação fixa com menu e botão WhatsApp
2. **Hero** - Título impactante com imagem técnica e CTAs
3. **Autoridade** - Números e credenciais (15.000+ laudos, 7 anos, CREA)
4. **Serviços** - 6 serviços especializados em cards
5. **Problemas Resolvidos** - 6 problemas que o engenheiro resolve
6. **Assistência Técnica** - Suporte para advogados
7. **Sobre** - Apresentação do engenheiro
8. **Depoimentos** - Reviews de clientes
9. **FAQ** - Perguntas frequentes
10. **Blog** - Artigos técnicos
11. **Contato** - Formulário e informações
12. **Footer** - Links e informações legais

## 🚀 Tecnologias

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + Custom CSS
- **Build:** Vite
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Routing:** Wouter

## 📁 Estrutura do Projeto

```
engenheiro-perito-campinas/
├── client/
│   ├── public/
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
├── shared/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Desenvolvimento

### Instalar Dependências
```bash
pnpm install
```

### Iniciar Servidor de Desenvolvimento
```bash
pnpm dev
```

Acesse http://localhost:3000

### Build para Produção
```bash
pnpm build
```

Arquivos prontos em `dist/`

### Preview do Build
```bash
pnpm preview
```

## 🌐 SEO

O site está otimizado para os seguintes termos:
- perito judicial campinas
- vistoria de imóvel campinas
- engenheiro perito campinas
- perícia engenharia campinas
- laudo técnico
- inspeção predial

**Metadados inclusos:**
- Title tag otimizado
- Meta description
- Meta keywords
- Open Graph tags
- robots.txt
- sitemap.xml

## 📞 Contato e WhatsApp

**Botão WhatsApp flutuante** sempre visível para facilitar conversão.

URL padrão: `https://wa.me/5519999999999?text=Olá%20Eng.%20Gustavo,...`

**Para atualizar o número:**
1. Abra `client/src/components/Header.tsx`
2. Procure por `const whatsappUrl`
3. Atualize o número de telefone (formato: 55 + DDD + número)
4. Salve e rebuild

## 📊 Performance

- **Imagens otimizadas** em WebP (comprimidas)
- **CSS minificado** via Tailwind
- **JavaScript bundle** otimizado com Vite
- **Lazy loading** de imagens
- **Cache** configurado para assets estáticos

## 🔐 Segurança

- HTTPS/SSL obrigatório
- Sem dados sensíveis no frontend
- Formulários via Formspree (recomendado)
- Proteção contra XSS via React

## 📱 Responsividade

- **Mobile:** 320px+
- **Tablet:** 768px+
- **Desktop:** 1024px+
- **Large Desktop:** 1280px+

Testado e funcional em todos os breakpoints.

## 🚀 Deploy

### Opção 1: Manus Hosting (Recomendado)
- Clique em "Publish" no painel de gerenciamento
- Domínio automático: `engenheiro-perito-campinas.manus.space`
- HTTPS automático
- CDN global incluso

### Opção 2: Hostinger
Veja `DEPLOY_HOSTINGER.md` para instruções detalhadas.

### Opção 3: Outros Hosts
1. Execute `pnpm build`
2. Faça upload da pasta `dist/` para seu servidor
3. Configure `.htaccess` para SPA (veja DEPLOY_HOSTINGER.md)
4. Ative HTTPS/SSL

## 📝 Manutenção

### Atualizar Conteúdo
1. Edite `client/src/pages/Home.tsx`
2. Execute `pnpm dev` para testar
3. Execute `pnpm build` para produção
4. Faça upload dos novos arquivos

### Adicionar Nova Seção
1. Crie novo componente em `client/src/components/`
2. Importe e use em `Home.tsx`
3. Adicione ID para navegação suave
4. Atualize menu no Header

### Atualizar Cores
1. Abra `client/src/index.css`
2. Atualize as variáveis CSS em `:root`
3. Salve e rebuild

## 🐛 Troubleshooting

### Site não carrega
- Verifique conexão com internet
- Limpe cache do navegador (Ctrl+Shift+Delete)
- Verifique console do navegador (F12)

### Imagens não aparecem
- Verifique URLs das imagens (devem ser URLs completas)
- Verifique conexão com CDN
- Teste em navegador privado

### Menu não funciona
- Verifique se IDs das seções existem
- Teste em navegador diferente
- Limpe cache

### WhatsApp não abre
- Verifique URL do WhatsApp
- Teste em dispositivo móvel
- Verifique número de telefone

## 📞 Suporte

Para dúvidas sobre o projeto:
- Documentação React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

## 📄 Licença

© 2026 Eng. Gustavo Freitas. Todos os direitos reservados.

---

**Desenvolvido em:** 15/03/2026
**Versão:** 6734e2b3
**Stack:** React 19 + Tailwind CSS 4 + Vite
