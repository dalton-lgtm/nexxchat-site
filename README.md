# NexxChat — Novo site

Landing page de alta conversão para a NexxChat (plataforma de atendimento omnichannel com Agente de IA), construída a partir do documento de contexto estratégico.

**Conceito visual:** "Deep-tech com confiança brasileira" — fundo grafite cinematográfico, cor-assinatura azul-elétrico (IA) + verde-voltagem (ação), fugindo do "mar de roxo" dos concorrentes. Preços e FAQ em bloco claro para leitura densa.

## Stack
Site estático, **sem build**: `HTML + CSS + JS` puro. Abre em qualquer navegador e hospeda em qualquer lugar (Vercel, Netlify, Railway, GitHub Pages, Hostinger).

- `index.html` — estrutura + conteúdo (15 seções)
- `styles.css` — design system completo (tokens, componentes, responsivo, dark/light)
- `script.js` — interações (sem dependências)

## Como visualizar
```bash
# opção 1: abrir direto
open index.html

# opção 2: servidor local (recomendado)
python3 -m http.server 8770
# depois acesse http://localhost:8770
```

## O que já funciona
- Demo do **agente de IA conversando ao vivo** no hero (loop animado — a arma que nenhum concorrente tem)
- Contagem animada das métricas (count-up)
- Toggle **Fluxo simples ⇄ Agente de IA**
- **Calculadora de ROI** interativa (sliders)
- Acordeão de FAQ · toggle de preço mensal/anual
- Reveal on-scroll · header com blur · menu mobile · **CTA fixo no rodapé mobile**
- Respeita `prefers-reduced-motion` (acessibilidade)

## ⚠️ Validar ANTES de publicar (ver contexto estratégico)
1. **Maturidade real da IA** — só afirmar "agenda/envia boleto sozinho" se houver function-calling em produção. Senão, marcar como "em breve".
2. **API Oficial × Baileys** — só estampar "sem risco de bloqueio" se 100% dos planos rodarem na API oficial da Meta.
3. **Preço × público** — os valores dos planos são **ILUSTRATIVOS**; alinhar à política real e ao ICP (PME).
4. **Números de mercado** (47s, -70%, 73%, ~4 meses) estão rotulados como "média de mercado" — trocar por dados próprios com case quando tiver.
5. **Prova social** — logos e depoimentos são placeholders; substituir por cases reais com nome, foto e resultado.

## Próximos passos de produção
- [ ] Trocar placeholders (logos, depoimentos, números) por reais
- [ ] Ligar CTAs ao fluxo real (link do WhatsApp, cadastro de trial, login)
- [ ] Conectar a demo do agente a um sandbox real (com rate-limit e escopo restrito)
- [ ] SEO técnico: schema markup (FAQPage, Organization/LocalBusiness, Product), sitemap.xml, meta por página
- [ ] Landings de intenção (/multiplos-atendimentos-whatsapp, /agente-de-ia-whatsapp) e verticais (/clinicas, /imobiliarias)
- [ ] Analytics (GA4 + eventos de funil) e baseline de conversão
- [ ] Otimização de performance (imagens AVIF/WebP, lazy-load da demo, orçamento mobile)
