# NexChat — Site

Site institucional multipágina da NexChat (plataforma de atendimento omnichannel com Agente de IA), construído na **identidade oficial da marca** (Manual de Marca).

## Identidade
- **Cores:** roxo `#6624ff` (primária) · verde-menta `#4ef5a5` · amarelo `#fcd24d` · creme `#fdf6e9` (fundo) · ink `#121a0f`
- **Tipografia:** Exo 2
- **Estética:** creme + gradiente mesh (menta→roxo) + motivos geométricos + logo oficial
- **Logo:** `assets/brand/logo-roxo-web.png` (header) e `logo-verde-web.png` (footer)

## Stack
Site estático, **sem build**: HTML + CSS + JS puro. Header e footer são injetados por JS (`script.js`) para ficarem idênticos em todas as páginas.

## Páginas
| Arquivo | Página |
|---|---|
| `index.html` | Home |
| `agente-ia.html` | Agente de IA (produto) |
| `para-quem.html` | Para quem — demo interativa por segmento |
| `precos.html` | Preços + Calculadora de ROI + FAQ |
| `sobre.html` | Sobre |
| `contato.html` | Contato (formulário) |

Compartilhados: `styles.css` (design system), `script.js` (nav/footer + interações), `assets/brand/` (logos).

## Rodar local
```bash
python3 -m http.server 8770   # http://localhost:8770
```

## Publicação
GitHub Pages: **https://dalton-lgtm.github.io/nexxchat-site/**
Atualizar: `git add -A && git commit -m "..." && git push` (rebuild automático em ~1 min).

## ⚠️ Validar antes de virar site oficial
1. Maturidade real da IA (só afirmar "agenda/envia boleto sozinho" se houver function-calling em produção).
2. API Oficial × Baileys — só manter "sem risco de bloqueio" se 100% dos planos rodarem na API oficial.
3. Preços **ilustrativos** — alinhar à política real.
4. Números como "média de mercado" — trocar por dados próprios com case.
5. Logos/depoimentos são placeholders — substituir por reais.
