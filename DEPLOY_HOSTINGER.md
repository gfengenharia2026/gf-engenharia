# Guia de Deploy no Hostinger

## Resumo do Projeto
Site profissional para Eng. Gustavo da Silva Freitas - Perícias e Vistorias Técnicas de Engenharia.

**Características:**
- Design corporativo minimalista com cores azul escuro, cinza claro e laranja
- Totalmente responsivo (mobile-first)
- Otimizado para SEO
- Botão WhatsApp flutuante para conversão
- 8 seções principais: Hero, Autoridade, Serviços, Problemas Resolvidos, Assistência Técnica, Sobre, Depoimentos, FAQ, Blog, Contato

---

## Pré-requisitos
- Conta ativa no Hostinger
- Acesso ao painel de controle do Hostinger
- Domínio configurado (ou usar subdomínio do Hostinger)

---

## Passo 1: Preparar os Arquivos para Deploy

### Opção A: Build Local (Recomendado)
```bash
cd /home/ubuntu/engenheiro-perito-campinas
pnpm build
```

Isso criará a pasta `dist/` com todos os arquivos prontos para deploy.

### Opção B: Usar Manus Hosting (Mais Fácil)
O site está hospedado no Manus e pode ser publicado com um clique no botão "Publish" no painel de gerenciamento.

---

## Passo 2: Upload via FTP no Hostinger

### 1. Acessar o Hostinger
- Faça login em https://www.hostinger.com.br
- Acesse o painel de controle
- Vá para **Gerenciador de Arquivos** ou **FTP**

### 2. Conectar via FTP
Se preferir usar FTP, use as credenciais:
- **Host**: ftp.seu-dominio.com
- **Usuário**: seu-usuario-ftp
- **Senha**: sua-senha-ftp
- **Porta**: 21

### 3. Fazer Upload
1. Abra a pasta `dist/` (resultado do build)
2. Faça upload de todos os arquivos para a pasta `public_html/` no Hostinger
3. Certifique-se de que o arquivo `index.html` está na raiz de `public_html/`

---

## Passo 3: Configurar o Hostinger

### 1. Configurar Domínio
- Vá para **Domínios** no painel do Hostinger
- Aponte o domínio para o servidor correto
- Aguarde a propagação DNS (até 24 horas)

### 2. Ativar HTTPS (SSL)
- No painel do Hostinger, vá para **SSL**
- Ative o certificado Let's Encrypt (geralmente automático)
- Redirecione HTTP para HTTPS

### 3. Configurar .htaccess (Importante para SPA)
Crie um arquivo `.htaccess` na raiz de `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Isso garante que todas as rotas sejam redirecionadas para `index.html` (necessário para SPAs React).

---

## Passo 4: Testar o Site

1. Acesse seu domínio no navegador
2. Verifique se todas as seções carregam corretamente
3. Teste o botão WhatsApp flutuante
4. Teste a navegação do menu
5. Verifique a responsividade em dispositivos móveis

---

## Passo 5: Otimizações Adicionais

### 1. Ativar Compressão GZIP
No painel do Hostinger:
- Vá para **Otimizações**
- Ative **Compressão GZIP**

### 2. Ativar Cache
- Vá para **Cache**
- Ative **Cache do Navegador**
- Configure TTL para 30 dias

### 3. Configurar CDN (Opcional)
- Se disponível no seu plano, ative CDN para servir imagens mais rápido

---

## Passo 6: Configurar Email (Opcional)

Se quiser receber mensagens do formulário de contato:

### Opção 1: Usar Formspree (Recomendado)
1. Acesse https://formspree.io
2. Crie uma conta e novo formulário
3. Obtenha o endpoint
4. Atualize o formulário no `Home.tsx`:

```tsx
<form action="https://formspree.io/f/SEU_ID" method="POST">
  {/* campos do formulário */}
</form>
```

### Opção 2: Usar Email do Hostinger
Configure um email profissional no painel do Hostinger e configure encaminhamento.

---

## Passo 7: Monitoramento e Manutenção

### Monitorar Performance
- Use Google PageSpeed Insights: https://pagespeed.web.dev
- Use GTmetrix: https://gtmetrix.com

### Backup Regular
- Configure backups automáticos no painel do Hostinger
- Faça backup semanal dos arquivos

### Atualizar Conteúdo
Para atualizar o site:
1. Faça as alterações localmente
2. Execute `pnpm build`
3. Faça upload dos novos arquivos via FTP
4. Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## Troubleshooting

### Site não carrega
- Verifique se o arquivo `index.html` está em `public_html/`
- Verifique o arquivo `.htaccess`
- Limpe o cache do navegador

### Imagens não carregam
- Verifique se as URLs das imagens estão corretas
- As imagens estão hospedadas no CDN do Manus (URLs externas)

### WhatsApp não funciona
- Verifique a URL do WhatsApp no código
- Atualize o número de telefone: `https://wa.me/5519999999999`

### Menu não funciona
- Verifique se o `.htaccess` está configurado corretamente
- Limpe o cache do navegador

---

## Contato e Suporte

Para dúvidas sobre o deploy:
- Suporte do Hostinger: https://www.hostinger.com.br/suporte
- Documentação Hostinger: https://www.hostinger.com.br/tutoriais

---

## Checklist Final

- [ ] Arquivos enviados via FTP
- [ ] Domínio configurado e apontando
- [ ] HTTPS/SSL ativado
- [ ] `.htaccess` configurado
- [ ] Site testado em desktop e mobile
- [ ] Botão WhatsApp funcionando
- [ ] Menu navegando corretamente
- [ ] Imagens carregando
- [ ] Cache ativado
- [ ] GZIP ativado
- [ ] Email de contato configurado
- [ ] Backup configurado

---

**Data de Deploy:** 15/03/2026
**Versão:** 6734e2b3
**Desenvolvido com:** React 19 + Tailwind CSS 4 + Vite
