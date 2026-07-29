/* =====================================================================
   NexxChat — interações do site
   Vanilla JS, sem dependências. Respeita prefers-reduced-motion.
   ===================================================================== */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------- HEADER scroll state ------------------------- */
  var header = $("#header");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------- Mobile nav ------------------------- */
  var toggle = $("#navToggle");
  var closeNav = function () {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeNav); });
  window.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* ------------------------- Reveal on scroll ------------------------- */
  var revealEls = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------- Count-up métricas ------------------------- */
  var counters = $$("[data-count]");
  var runCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cObs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  } else {
    counters.forEach(runCount);
  }

  /* ------------------------- Dashboard bars grow ------------------------- */
  var bars = $("#bars");
  if (bars) {
    var barEls = $$(".bar", bars);
    var setBars = function () { barEls.forEach(function (b) { b.style.height = b.style.getPropertyValue("--h"); }); };
    if (reduceMotion) { setBars(); }
    else if ("IntersectionObserver" in window) {
      barEls.forEach(function (b) { b.style.height = "8px"; });
      var bObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { setBars(); bObs.disconnect(); } });
      }, { threshold: 0.4 });
      bObs.observe(bars);
    } else { setBars(); }
  }

  /* ------------------------- Hero: demo do agente ao vivo ------------------------- */
  var chatBody = $("#chatBody");
  var chatResult = $("#chatResult");
  var script = [
    { who: "in",  text: "Oi! Vocês atendem em Chapecó? Queria marcar uma avaliação 😊" },
    { who: "typing" },
    { who: "out", text: "Oi! Sim, atendemos 💙 Consigo já ver um horário pra você. É pra estética facial ou corporal?", tick: "✓✓" },
    { who: "in",  text: "Facial" },
    { who: "typing" },
    { who: "out", text: "Perfeito! Tenho <b>amanhã às 14h</b> ou <b>quinta às 10h</b>. Qual fica melhor?", tick: "✓✓" },
    { who: "in",  text: "Amanhã 14h pode ser" },
    { who: "typing" },
    { who: "out", text: "Agendado! ✅ Enviei a confirmação e o endereço aqui no seu WhatsApp. Até amanhã! 🙌", tick: "✓✓" }
  ];

  var buildBubble = function (item) {
    if (item.who === "typing") {
      var t = document.createElement("div");
      t.className = "typing";
      t.innerHTML = "<span></span><span></span><span></span>";
      return t;
    }
    var b = document.createElement("div");
    b.className = "bubble bubble--" + item.who;
    b.innerHTML = item.text + (item.tick ? '<span class="meta">14:02 <span class="tick">' + item.tick + "</span></span>" : "");
    return b;
  };

  var MAX_BUBBLES = 6; // mantém a conversa dentro da tela
  var trim = function () {
    var kids = $$(".bubble, .typing", chatBody);
    while (kids.length > MAX_BUBBLES) { chatBody.removeChild(kids.shift()); }
  };

  var runChat = function () {
    if (!chatBody) return;
    chatBody.innerHTML = "";
    if (chatResult) chatResult.hidden = true;
    var i = 0;
    var next = function () {
      if (i >= script.length) {
        if (chatResult) { chatResult.hidden = false; }
        // reinicia o loop após uma pausa
        setTimeout(runChat, 4200);
        return;
      }
      var item = script[i++];
      var node = buildBubble(item);
      chatBody.appendChild(node);
      trim();
      if (item.who === "typing") {
        setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); next(); }, 1000);
      } else {
        setTimeout(next, item.who === "in" ? 900 : 1500);
      }
    };
    next();
  };

  if (chatBody) {
    if (reduceMotion) {
      // versão estática: mostra a conversa final + resultado
      script.filter(function (s) { return s.who !== "typing"; }).slice(-MAX_BUBBLES).forEach(function (item) {
        chatBody.appendChild(buildBubble(item));
      });
      if (chatResult) chatResult.hidden = false;
    } else if ("IntersectionObserver" in window) {
      var started = false;
      var chatObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !started) { started = true; runChat(); }
        });
      }, { threshold: 0.35 });
      chatObs.observe(chatBody);
    } else {
      runChat();
    }
  }

  /* ------------------------- Tabs Fluxo x IA ------------------------- */
  $$(".ai-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var panel = tab.getAttribute("data-panel");
      $$(".ai-tab").forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      $$(".ai-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-panel") === panel);
      });
    });
  });

  /* ------------------------- FAQ accordion ------------------------- */
  $$(".qa").forEach(function (qa) {
    var q = $(".qa__q", qa);
    var a = $(".qa__a", qa);
    q.addEventListener("click", function () {
      var open = qa.classList.contains("is-open");
      // fecha os demais (comportamento accordion)
      $$(".qa.is-open").forEach(function (other) {
        if (other !== qa) { other.classList.remove("is-open"); $(".qa__a", other).style.maxHeight = null; }
      });
      if (open) { qa.classList.remove("is-open"); a.style.maxHeight = null; }
      else { qa.classList.add("is-open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ------------------------- Toggle de preço ------------------------- */
  var billMonthly = $("#billMonthly");
  var billYearly = $("#billYearly");
  var setBilling = function (yearly) {
    billMonthly.classList.toggle("is-active", !yearly);
    billYearly.classList.toggle("is-active", yearly);
    billMonthly.setAttribute("aria-selected", (!yearly).toString());
    billYearly.setAttribute("aria-selected", yearly.toString());
    $$(".plan__price .amt").forEach(function (el) {
      var v = el.getAttribute(yearly ? "data-y" : "data-m");
      if (v) el.textContent = v;
    });
    $$(".plan__meta").forEach(function (el) {
      var v = el.getAttribute(yearly ? "data-y" : "data-m");
      el.textContent = v && v.length ? v : " ";
    });
  };
  if (billMonthly && billYearly) {
    billMonthly.addEventListener("click", function () { setBilling(false); });
    billYearly.addEventListener("click", function () { setBilling(true); });
  }

  /* ------------------------- Calculadora de ROI ------------------------- */
  var rLeads = $("#rLeads"), rTicket = $("#rTicket"), rConv = $("#rConv"), rLost = $("#rLost");
  var brl = function (n) {
    return "R$ " + Math.round(n).toLocaleString("pt-BR");
  };
  var calcROI = function () {
    if (!rLeads) return;
    var leads = +rLeads.value, ticket = +rTicket.value, conv = +rConv.value / 100, lost = +rLost.value / 100;
    // vendas perdidas = leads perdidos por demora * conversão * ticket
    var lostRevenue = leads * lost * conv * ticket;
    var recovered = lostRevenue * 0.5;
    $("#vLeads").textContent = leads.toLocaleString("pt-BR");
    $("#vTicket").textContent = brl(ticket);
    $("#vConv").textContent = rConv.value + "%";
    $("#vLost").textContent = rLost.value + "%";
    $("#roiBig").textContent = brl(lostRevenue);
    $("#roiRecover").textContent = "+ " + brl(recovered) + "/mês";
    $("#roiYear").textContent = "+ " + brl(recovered * 12);
  };
  [rLeads, rTicket, rConv, rLost].forEach(function (el) {
    if (el) el.addEventListener("input", calcROI);
  });
  calcROI();

  /* ------------------------- Sticky CTA mobile ------------------------- */
  var sticky = $("#stickyCta");
  var hero = $(".hero");
  if (sticky && hero) {
    var stickyObs = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        // mostra depois que o hero saiu da tela
        sticky.classList.toggle("is-visible", !en.isIntersecting);
      });
    }, { threshold: 0 }) : null;
    if (stickyObs) stickyObs.observe(hero);
  }

})();

/* =====================================================================
   DEMO INTERATIVA DE SEGMENTOS — a mesma IA, moldada a cada negócio
   ===================================================================== */
(function () {
  "use strict";
  var segChat = document.getElementById("segChat");
  if (!segChat) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tabsWrap = document.getElementById("segTabs");
  var elName = document.getElementById("segName");
  var elAvatar = document.getElementById("segAvatar");
  var elResult = document.getElementById("segResult");
  var elResultText = document.getElementById("segResultText");
  var elResultTime = document.getElementById("segResultTime");
  var elTitle = document.getElementById("segTitle");
  var elDesc = document.getElementById("segDesc");
  var elList = document.getElementById("segList");

  var IC = {
    clinica: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 8v5M9.5 10.5h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    imob: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    geral: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    construtora: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 19h18M5 19v-3a7 7 0 0114 0v3M10 9V6a2 2 0 014 0v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    industria: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M4 21V11l5 3V11l5 3V7l5 3v11" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    varejo: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 8h14l-1 12H6L5 8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    concessionaria: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 13l1.6-4.6A2 2 0 017.5 7h9a2 2 0 011.9 1.4L20 13v4h-2v-1H6v1H4v-4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="15" r="1.1" fill="currentColor"/><circle cx="16.5" cy="15" r="1.1" fill="currentColor"/></svg>',
    ecommerce: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.2 11.2a1 1 0 001 .8h8.3a1 1 0 001-.8L20 8H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="20" r="1.3" fill="currentColor"/><circle cx="17" cy="20" r="1.3" fill="currentColor"/></svg>'
  };
  var SEGMENTS = [
    {
      id: "clinica", label: "Clínicas & Saúde", icon: IC.clinica,
      biz: "Clínica Bella", initials: "CB", color: "linear-gradient(140deg,#5ad4ff,#2b6fff)",
      title: "Clínicas & Saúde",
      desc: "Odonto, estética, veterinária. Menos faltas na agenda e mais avaliações marcadas — com a segurança que dado de paciente exige.",
      bullets: ["Agenda e confirma sozinha — reduz o no-show", "Lembretes de retorno e pós-consulta 24/7", "Conforme a LGPD para dados sensíveis de saúde"],
      result: "Agendou sozinha · sem no-show", time: "38s",
      chat: [
        { who: "in", text: "Oi, queria marcar uma avaliação de estética 😊" },
        { who: "typing" },
        { who: "out", text: "Oi! Claro 💙 Tenho <b>quinta 10h</b> ou <b>sexta 15h</b>. Qual prefere?" },
        { who: "in", text: "Sexta 15h" },
        { who: "typing" },
        { who: "out", text: "Agendado! ✅ Já enviei a confirmação e o endereço aqui. Até sexta! 🙌" }
      ]
    },
    {
      id: "imob", label: "Imobiliárias", icon: IC.imob,
      biz: "Imob Horizonte", initials: "IH", color: "linear-gradient(140deg,#b6ff43,#25d366)",
      title: "Imobiliárias",
      desc: "78% dos leads chegam pelo WhatsApp e esfriam em minutos. O agente responde na hora, qualifica o perfil e agenda a visita antes do corretor concorrente.",
      bullets: ["Responde o lead do portal em segundos, 24/7", "Qualifica (bairro, faixa de preço, financiamento)", "Agenda a visita e aciona o corretor certo"],
      result: "Qualificou + agendou visita", time: "54s",
      chat: [
        { who: "in", text: "Vi o apê de 2 quartos no anúncio, ainda tá disponível?" },
        { who: "typing" },
        { who: "out", text: "Está sim! 🙌 Você busca pra <b>morar</b> ou <b>investir</b>? E qual faixa de valor?" },
        { who: "in", text: "Pra morar, até 350 mil" },
        { who: "typing" },
        { who: "out", text: "Perfeito. Consigo agendar uma visita amanhã 10h com o corretor Bruno. Confirmo?" },
        { who: "in", text: "Pode ser!" },
        { who: "typing" },
        { who: "out", text: "Marcado ✅ Enviei os detalhes e a localização aqui no seu WhatsApp." }
      ]
    },
    {
      id: "geral", label: "Empresas em geral", icon: IC.geral,
      biz: "Grupo Andrade", initials: "GA", color: "linear-gradient(140deg,#8ce2ff,#2b6fff)",
      title: "Empresas em geral",
      desc: "Serviços, agências, consultorias, prestadores. A IA atende, entende o pedido e já adianta o orçamento — 24/7, sem deixar ninguém esperando.",
      bullets: ["Responde e qualifica todo lead na hora", "Coleta os dados e adianta o orçamento", "Encaminha o cliente certo pro vendedor certo"],
      result: "Coletou dados + gerou proposta", time: "52s",
      chat: [
        { who: "in", text: "Vocês fazem orçamento pra manutenção predial?" },
        { who: "typing" },
        { who: "out", text: "Fazemos sim! É prédio <b>comercial</b> ou <b>residencial</b>? E quantos andares? Já adianto uma estimativa 😊" },
        { who: "in", text: "Comercial, 8 andares" },
        { who: "typing" },
        { who: "out", text: "Anotado ✅ Preparo a proposta e te envio ainda hoje. Confirma seu e-mail pra eu mandar o contrato junto?" }
      ]
    },
    {
      id: "construtora", label: "Construtora", icon: IC.construtora,
      biz: "Construtora Cume", initials: "CC", color: "linear-gradient(140deg,#ffcf5c,#ff9a5a)",
      title: "Construtoras & Incorporadoras",
      desc: "Lançamentos, lotes, financiamento. O agente qualifica o interessado, simula e agenda a visita ao stand antes do concorrente responder.",
      bullets: ["Qualifica o lead (perfil, financiamento) na hora", "Agenda visita ao stand e ao decorado", "Envia planta, tabela e simulação automaticamente"],
      result: "Qualificou + agendou no stand", time: "1min",
      chat: [
        { who: "in", text: "Quero informações dos lotes do novo empreendimento" },
        { who: "typing" },
        { who: "out", text: "Claro! 🏗 Temos lotes de <b>200 a 450m²</b>. É pra construir agora ou investir? Tem interesse em financiamento?" },
        { who: "in", text: "Construir, e sim financiamento" },
        { who: "typing" },
        { who: "out", text: "Perfeito. Simulo o financiamento e agendo uma visita ao stand com o consultor. Qual o melhor dia?" },
        { who: "in", text: "Sábado de manhã" },
        { who: "typing" },
        { who: "out", text: "Agendado ✅ Envio a planta e a simulação por aqui. Até sábado! 🙌" }
      ]
    },
    {
      id: "industria", label: "Indústria", icon: IC.industria,
      biz: "Metalúrgica Sul", initials: "MS", color: "linear-gradient(140deg,#b7c2d6,#5ad4ff)",
      title: "Indústria & B2B",
      desc: "Metalúrgicas, fábricas, distribuidoras. A IA faz a triagem do pedido, abre a cotação e prioriza o lead quente para o time comercial.",
      bullets: ["Faz a triagem técnica do pedido B2B", "Registra a cotação e aciona o comercial", "Integra com o seu ERP e o histórico do cliente"],
      result: "Triagem B2B + abriu cotação", time: "47s",
      chat: [
        { who: "in", text: "Preciso de cotação de 500 peças usinadas, atendem?" },
        { who: "typing" },
        { who: "out", text: "Atendemos sim! Pode enviar o desenho técnico ou a especificação? Já direciono ao comercial com prioridade." },
        { who: "in", text: "Mando o PDF agora" },
        { who: "typing" },
        { who: "out", text: "Recebido ✅ Abri a cotação <b>#4821</b> e acionei o setor de vendas. Retorno em até 24h — te aviso por aqui." }
      ]
    },
    {
      id: "varejo", label: "Varejo & Lojas", icon: IC.varejo,
      biz: "Loja Vitrine", initials: "LV", color: "linear-gradient(140deg,#c9ff6e,#98e61f)",
      title: "Varejo & Lojas",
      desc: "Moda, calçados, óticas, mercados. A IA tira a dúvida de produto, fecha a venda e manda o link de pagamento — sem o cliente sair da conversa.",
      bullets: ["Responde estoque e tira dúvida na hora", "Fecha a venda e envia o link de pagamento", "Recupera carrinho e avisa quando chega novidade"],
      result: "Vendeu + enviou pagamento", time: "35s",
      chat: [
        { who: "in", text: "Esse tênis tem no 42?" },
        { who: "typing" },
        { who: "out", text: "Tem sim! 👟 No 42 temos <b>preto</b> e <b>branco</b>. Quer que eu já separe e mande o link de pagamento?" },
        { who: "in", text: "Pode ser, o preto" },
        { who: "typing" },
        { who: "out", text: "Separado ✅ Aqui está o link de pagamento. Assim que confirmar, preparo pra envio hoje mesmo 🚀" }
      ]
    },
    {
      id: "concessionaria", label: "Concessionárias", icon: IC.concessionaria,
      biz: "Auto Prime", initials: "AP", color: "linear-gradient(140deg,#5ad4ff,#34c8ff)",
      title: "Concessionárias",
      desc: "Veículos novos e seminovos. A IA responde estoque, qualifica forma de pagamento e troca, e agenda o test drive antes do concorrente.",
      bullets: ["Qualifica (troca, à vista/financiado) na hora", "Simula o financiamento e avalia o usado", "Agenda o test drive com o consultor certo"],
      result: "Avaliou troca + agendou test drive", time: "58s",
      chat: [
        { who: "in", text: "Vi o SUV 2024 no site, ainda tem em estoque?" },
        { who: "typing" },
        { who: "out", text: "Temos sim! 🚗 Você tem carro na troca? E prefere <b>à vista</b> ou <b>financiado</b>? Já adianto as condições." },
        { who: "in", text: "Tenho um na troca, financiado" },
        { who: "typing" },
        { who: "out", text: "Perfeito. Avalio seu usado e simulo o financiamento. Quer agendar um <b>test drive</b> pra amanhã?" },
        { who: "in", text: "Quero, de tarde" },
        { who: "typing" },
        { who: "out", text: "Agendado ✅ Test drive amanhã 15h com o consultor Diego. Enviei o endereço e a ficha do SUV aqui. 🚀" }
      ]
    },
    {
      id: "ecommerce", label: "E-commerce", icon: IC.ecommerce,
      biz: "Loja Online", initials: "LO", color: "linear-gradient(140deg,#c9ff6e,#34c8ff)",
      title: "E-commerce",
      desc: "Lojas virtuais e marketplaces. A IA rastreia pedidos, recupera carrinho abandonado e ainda faz upsell — tudo dentro do WhatsApp.",
      bullets: ["Rastreia o pedido e responde status 24/7", "Recupera carrinho abandonado automaticamente", "Faz upsell e envia o link de pagamento na conversa"],
      result: "Rastreou pedido + fez upsell", time: "40s",
      chat: [
        { who: "in", text: "Comprei ontem e queria saber quando chega meu pedido" },
        { who: "typing" },
        { who: "out", text: "Oi! 📦 Achei seu pedido <b>#20488</b>: já está <b>a caminho</b>, entrega prevista quinta. Quer o código de rastreio?" },
        { who: "in", text: "Quero sim" },
        { who: "typing" },
        { who: "out", text: "Aqui está 🚚 E aproveitando: quem levou esse item pegou a capa com <b>15% off</b>. Quer adicionar?" },
        { who: "in", text: "Pode adicionar!" },
        { who: "typing" },
        { who: "out", text: "Adicionado ✅ Mandei o link de pagamento do extra. Confirmando, já vai junto no envio. 🚀" }
      ]
    }
  ];

  var MAXB = 6, runId = 0, timers = [];
  var clearTimers = function () { timers.forEach(clearTimeout); timers = []; };

  var makeBubble = function (item) {
    if (item.who === "typing") {
      var tp = document.createElement("div");
      tp.className = "typing";
      tp.innerHTML = "<span></span><span></span><span></span>";
      return tp;
    }
    var b = document.createElement("div");
    b.className = "bubble bubble--" + item.who;
    b.innerHTML = item.text + (item.who === "out" ? '<span class="meta">agora <span class="tick">✓✓</span></span>' : "");
    return b;
  };
  var trim = function () {
    var kids = segChat.querySelectorAll(".bubble, .typing");
    while (kids.length > MAXB) { segChat.removeChild(kids[0]); kids = segChat.querySelectorAll(".bubble, .typing"); }
  };

  var renderInfo = function (s) {
    elName.textContent = s.biz;
    elAvatar.style.background = s.color;
    elAvatar.textContent = s.initials;
    elTitle.textContent = s.title;
    elDesc.textContent = s.desc;
    elResultText.textContent = s.result;
    elResultTime.textContent = s.time;
    elList.innerHTML = s.bullets.map(function (b) {
      return '<li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> ' + b + "</li>";
    }).join("");
  };

  var play = function (idx) {
    var s = SEGMENTS[idx];
    runId++; var my = runId; clearTimers();
    Array.prototype.forEach.call(tabsWrap.children, function (b, i) {
      b.setAttribute("aria-selected", i === idx ? "true" : "false");
    });
    renderInfo(s);
    segChat.innerHTML = "";
    elResult.hidden = true;

    if (reduce) {
      s.chat.filter(function (x) { return x.who !== "typing"; }).forEach(function (x) { segChat.appendChild(makeBubble(x)); });
      elResult.hidden = false;
      return;
    }
    var i = 0;
    var next = function () {
      if (my !== runId) return;
      if (i >= s.chat.length) { elResult.hidden = false; return; }
      var item = s.chat[i++];
      var node = makeBubble(item);
      segChat.appendChild(node);
      trim();
      if (item.who === "typing") {
        timers.push(setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); next(); }, 1000));
      } else {
        timers.push(setTimeout(next, item.who === "in" ? 850 : 1500));
      }
    };
    next();
  };

  // monta as abas
  SEGMENTS.forEach(function (s, i) {
    var btn = document.createElement("button");
    btn.className = "seg-tab";
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.innerHTML = s.icon + "<span>" + s.label + "</span>";
    btn.addEventListener("click", function () { play(i); btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); });
    tabsWrap.appendChild(btn);
  });

  // inicia o primeiro segmento quando entra na tela
  var started = false;
  if (!reduce && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting && !started) { started = true; play(0); } });
    }, { threshold: 0.3 });
    obs.observe(segChat);
  } else {
    play(0);
  }
})();
