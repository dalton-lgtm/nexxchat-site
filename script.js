/* =====================================================================
   NexChat — script compartilhado do site (multipágina)
   Injeta header + footer, controla nav e todas as interações.
   Cada módulo é "guardado": só roda se os elementos existirem na página.
   ===================================================================== */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Marca (X-seta) ---------- */
  var XMARK = '<svg class="brand__x" viewBox="0 0 32 24" fill="none" aria-hidden="true"><path d="M4 3l9 9-9 9" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 3l-9 9 9 9" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var brandHTML = function (variant) {
    var img = variant === "verde" ? "assets/brand/logo-verde-web.png" : "assets/brand/logo-roxo-web.png";
    return '<a href="index.html" class="brand" aria-label="NexChat — início"><img src="' + img + '" alt="NexChat" class="brand__logo" width="139" height="40" loading="eager"></a>';
  };

  var NAV = [
    { key: "ia", label: "Agente de IA", href: "agente-ia.html" },
    { key: "para-quem", label: "Para quem", href: "para-quem.html" },
    { key: "precos", label: "Preços", href: "precos.html" },
    { key: "blog", label: "Blog", href: "blog.html" },
    { key: "sobre", label: "Sobre", href: "sobre.html" }
  ];
  var current = document.body.getAttribute("data-page") || "home";

  /* ---------- Injeta HEADER ---------- */
  var navRoot = $("#nav-root");
  if (navRoot) {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.key === current ? ' class="is-active"' : "") + '>' + n.label + "</a>";
    }).join("");
    navRoot.innerHTML =
      '<header class="site-header" id="site-header"><div class="container nav">' +
        brandHTML() +
        '<nav class="nav__links" aria-label="Principal">' + links + "</nav>" +
        '<div class="nav__actions"><a href="#" class="nav__login">Entrar</a>' +
        '<a href="precos.html" class="btn btn--primary">Testar grátis</a></div>' +
        '<button class="nav__toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false"><span></span></button>' +
      "</div></header>" +
      '<div class="mobile-menu" id="mobileMenu">' +
        NAV.map(function (n) { return '<a href="' + n.href + '"' + (n.key === current ? ' class="is-active"' : "") + '>' + n.label + "</a>"; }).join("") +
        '<a href="contato.html"' + (current === "contato" ? ' class="is-active"' : "") + '>Contato</a>' +
        '<a href="#" class="nav__login" style="border:0">Entrar na plataforma →</a>' +
        '<a href="precos.html" class="btn btn--primary btn--block btn--lg">Testar grátis 7 dias</a>' +
      "</div>";
  }

  /* ---------- Injeta FOOTER ---------- */
  var footRoot = $("#footer-root");
  if (footRoot) {
    footRoot.innerHTML =
      '<footer class="footer"><div class="container"><div class="footer__grid">' +
        '<div class="footer__brand">' + brandHTML("verde") +
          "<p>A plataforma de atendimento com agente de IA para empresas que vendem pelo WhatsApp.</p>" +
          '<div class="footer__addr"><span>Chapecó · Santa Catarina · Brasil</span>' +
          '<a href="contato.html">Fale com a gente</a>' +
          '<a href="mailto:contato@nexxchat.com.br">contato@nexxchat.com.br</a></div>' +
          '<div class="footer__social">' +
            '<a class="footer__soc footer__soc--wa" href="https://wa.me/554933402091?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20NexChat%20e%20quero%20colocar%20a%20IA%20para%20vender%20no%20meu%20WhatsApp." target="_blank" rel="noopener" aria-label="Falar no WhatsApp da NexChat"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.18-1.15l-.3-.18-3 .79.8-2.92-.2-.31A8.2 8.2 0 1112 20.2z"/></svg></a>' +
            '<a class="footer__soc footer__soc--ig" href="https://www.instagram.com/nexchat_sgi/" target="_blank" rel="noopener" aria-label="Instagram da NexChat"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="7" r="1.1" fill="currentColor"/></svg></a>' +
          '</div></div>' +
        '<div class="footer__col"><h3>Produto</h3><ul>' +
          '<li><a href="agente-ia.html">Agente de IA</a></li>' +
          '<li><a href="agente-ia.html#canais">Canais</a></li>' +
          '<li><a href="precos.html">Preços</a></li>' +
          '<li><a href="precos.html#roi">Calculadora de ROI</a></li></ul></div>' +
        '<div class="footer__col"><h3>Para quem</h3><ul>' +
          '<li><a href="para-quem.html">Qualquer mercado</a></li>' +
          '<li><a href="para-quem.html">Clínicas &amp; Saúde</a></li>' +
          '<li><a href="para-quem.html">Imobiliárias</a></li>' +
          '<li><a href="para-quem.html">Varejo &amp; Serviços</a></li></ul></div>' +
        '<div class="footer__col"><h3>Empresa</h3><ul>' +
          '<li><a href="sobre.html">Sobre</a></li>' +
          '<li><a href="blog.html">Blog</a></li>' +
          '<li><a href="contato.html">Contato</a></li>' +
          '<li><a href="precos.html#faq">Dúvidas</a></li>' +
          '<li><a href="https://wiki.nexxchat.com.br" target="_blank" rel="noopener">Central de ajuda</a></li></ul></div>' +
      "</div>" +
      '<div class="footer__bottom"><div class="footer__badges">' +
        '<span class="b"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V5l7-3z" stroke="currentColor" stroke-width="1.6"/></svg> API Oficial Meta</span>' +
        '<span class="b"><svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.6"/></svg> LGPD</span>' +
        '<span class="b">Sem fidelidade</span></div>' +
        '<span>© 2026 NexChat · X Solução em Tecnologia LTDA · <a href="#" style="text-decoration:underline">Privacidade</a> · <a href="#" style="text-decoration:underline">Termos</a></span>' +
      "</div></div></footer>";
  }

  /* ---------- Header scroll ---------- */
  var header = $("#site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav ---------- */
  var toggle = $("#navToggle");
  if (toggle) {
    var closeNav = function () { document.body.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeNav); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Count-up ---------- */
  var counters = $$("[data-count]");
  var runCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
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
  if (counters.length && "IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cObs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  } else { counters.forEach(runCount); }

  /* ---------- Bars (dashboard) ---------- */
  var bars = $("#bars");
  if (bars) {
    var barEls = $$(".bar", bars);
    var setBars = function () { barEls.forEach(function (b) { b.style.height = b.style.getPropertyValue("--h"); }); };
    if (reduce) { setBars(); }
    else if ("IntersectionObserver" in window) {
      barEls.forEach(function (b) { b.style.height = "8px"; });
      var bObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { setBars(); bObs.disconnect(); } });
      }, { threshold: 0.4 });
      bObs.observe(bars);
    } else { setBars(); }
  }

  /* ---------- Bubble builder (compartilhado) ---------- */
  var makeBubble = function (item, outLabel) {
    if (item.who === "typing") {
      var tp = document.createElement("div"); tp.className = "typing";
      tp.innerHTML = "<span></span><span></span><span></span>"; return tp;
    }
    var b = document.createElement("div");
    b.className = "bubble bubble--" + item.who;
    b.innerHTML = item.text + (item.who === "out" ? '<span class="meta">' + (outLabel || "agora") + ' <span class="tick">✓✓</span></span>' : "");
    return b;
  };

  /* ---------- Hero: demo do agente (clínica) ---------- */
  var chatBody = $("#chatBody");
  var chatResult = $("#chatResult");
  if (chatBody) {
    var script = [
      { who: "in", text: "Oi! Vocês atendem em Chapecó? Queria marcar uma avaliação 😊" },
      { who: "typing" },
      { who: "out", text: "Oi! Sim, atendemos 💜 Consigo já ver um horário. É pra estética facial ou corporal?" },
      { who: "in", text: "Facial" },
      { who: "typing" },
      { who: "out", text: "Perfeito! Tenho <b>amanhã 14h</b> ou <b>quinta 10h</b>. Qual fica melhor?" },
      { who: "in", text: "Amanhã 14h pode ser" },
      { who: "typing" },
      { who: "out", text: "Agendado! ✅ Enviei a confirmação e o endereço aqui. Até amanhã! 🙌" }
    ];
    var MAXB = 6;
    var trim = function () { var k = $$(".bubble, .typing", chatBody); while (k.length > MAXB) { chatBody.removeChild(k.shift()); } };
    var run = function () {
      chatBody.innerHTML = ""; if (chatResult) chatResult.hidden = true;
      var i = 0;
      var next = function () {
        if (i >= script.length) { if (chatResult) chatResult.hidden = false; setTimeout(run, 4200); return; }
        var item = script[i++]; var node = makeBubble(item, "14:02"); chatBody.appendChild(node); trim();
        if (item.who === "typing") setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); next(); }, 1000);
        else setTimeout(next, item.who === "in" ? 900 : 1500);
      };
      next();
    };
    if (reduce) {
      script.filter(function (s) { return s.who !== "typing"; }).slice(-MAXB).forEach(function (it) { chatBody.appendChild(makeBubble(it, "14:02")); });
      if (chatResult) chatResult.hidden = false;
    } else if ("IntersectionObserver" in window) {
      var started = false;
      var o = new IntersectionObserver(function (e) { e.forEach(function (en) { if (en.isIntersecting && !started) { started = true; run(); } }); }, { threshold: 0.35 });
      o.observe(chatBody);
    } else { run(); }
  }

  /* ---------- Tabs Fluxo x IA ---------- */
  $$(".ai-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var panel = tab.getAttribute("data-panel");
      $$(".ai-tab").forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      $$(".ai-panel").forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-panel") === panel); });
    });
  });

  /* ---------- FAQ ---------- */
  $$(".qa").forEach(function (qa) {
    var q = $(".qa__q", qa), a = $(".qa__a", qa);
    q.addEventListener("click", function () {
      var open = qa.classList.contains("is-open");
      $$(".qa.is-open").forEach(function (o) { if (o !== qa) { o.classList.remove("is-open"); $(".qa__a", o).style.maxHeight = null; } });
      if (open) { qa.classList.remove("is-open"); a.style.maxHeight = null; }
      else { qa.classList.add("is-open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------- Toggle de preço ---------- */
  var billM = $("#billMonthly"), billY = $("#billYearly");
  if (billM && billY) {
    var setBilling = function (yearly) {
      billM.classList.toggle("is-active", !yearly); billY.classList.toggle("is-active", yearly);
      billM.setAttribute("aria-selected", (!yearly).toString()); billY.setAttribute("aria-selected", yearly.toString());
      $$(".plan__price .amt").forEach(function (el) { var v = el.getAttribute(yearly ? "data-y" : "data-m"); if (v) el.textContent = v; });
      $$(".plan__meta").forEach(function (el) { var v = el.getAttribute(yearly ? "data-y" : "data-m"); el.textContent = v && v.length ? v : " "; });
    };
    billM.addEventListener("click", function () { setBilling(false); });
    billY.addEventListener("click", function () { setBilling(true); });
  }

  /* ---------- ROI ---------- */
  var rLeads = $("#rLeads"), rTicket = $("#rTicket"), rConv = $("#rConv"), rLost = $("#rLost");
  if (rLeads) {
    var brl = function (n) { return "R$ " + Math.round(n).toLocaleString("pt-BR"); };
    var calc = function () {
      var leads = +rLeads.value, ticket = +rTicket.value, conv = +rConv.value / 100, lost = +rLost.value / 100;
      var lostRev = leads * lost * conv * ticket, rec = lostRev * 0.5;
      $("#vLeads").textContent = leads.toLocaleString("pt-BR");
      $("#vTicket").textContent = brl(ticket);
      $("#vConv").textContent = rConv.value + "%";
      $("#vLost").textContent = rLost.value + "%";
      $("#roiBig").textContent = brl(lostRev);
      $("#roiRecover").textContent = "+ " + brl(rec) + "/mês";
      $("#roiYear").textContent = "+ " + brl(rec * 12);
    };
    [rLeads, rTicket, rConv, rLost].forEach(function (el) { el.addEventListener("input", calc); });
    calc();
  }

  /* ---------- Marquee (faixa de clientes) ---------- */
  var mqTrack = $(".marquee__track");
  if (mqTrack && !reduce) {
    Array.prototype.slice.call(mqTrack.children).forEach(function (el) {
      var clone = el.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      mqTrack.appendChild(clone);
    });
  }

  /* ---------- Depoimentos em vídeo (lightbox) ---------- */
  var vCards = $$(".vtesti");
  if (vCards.length) {
    var vmodal = document.createElement("div");
    vmodal.className = "vmodal";
    vmodal.setAttribute("role", "dialog");
    vmodal.setAttribute("aria-modal", "true");
    vmodal.setAttribute("aria-label", "Depoimento em vídeo");
    vmodal.innerHTML =
      '<button class="vmodal__close" type="button" aria-label="Fechar vídeo">&times;</button>' +
      '<div class="vmodal__box"><div class="vmodal__frame" id="vmodalFrame"></div></div>';
    document.body.appendChild(vmodal);
    var vFrame = vmodal.querySelector("#vmodalFrame");
    var vClose = vmodal.querySelector(".vmodal__close");
    var lastFocus = null;
    var bgRegions = ["#nav-root", "main", "#footer-root", "#stickyCta"]
      .map(function (s) { return $(s); }).filter(Boolean);
    var setBgInert = function (on) { bgRegions.forEach(function (el) { el.inert = on; }); };
    var openVideo = function (yt) {
      if (yt) {
        vFrame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(yt) +
          '?autoplay=1&rel=0" title="Depoimento em vídeo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      } else {
        vFrame.innerHTML = '<div class="vmodal__ph"><div><strong style="font-size:1.15rem">🎬 Vídeo em breve</strong><br><br>' +
          '<span style="color:var(--on-dark-soft)">Depoimento em produção. Para publicar, cole o ID do YouTube no atributo <code>data-yt</code> do card.</span></div></div>';
      }
      setBgInert(true);
      vmodal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      vClose.focus();
    };
    var closeVideo = function () {
      vmodal.classList.remove("is-open");
      vFrame.innerHTML = "";
      document.body.style.overflow = "";
      setBgInert(false);
      if (lastFocus) lastFocus.focus();
    };
    vCards.forEach(function (card) {
      card.addEventListener("click", function () { lastFocus = card; openVideo(card.getAttribute("data-yt")); });
    });
    vClose.addEventListener("click", closeVideo);
    vmodal.addEventListener("click", function (e) { if (e.target === vmodal) closeVideo(); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape" && vmodal.classList.contains("is-open")) closeVideo(); });
  }

  /* ---------- Sticky CTA mobile ---------- */
  var sticky = $("#stickyCta");
  var heroRef = $(".hero") || $("main");
  if (sticky && heroRef && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (e) { e.forEach(function (en) { sticky.classList.toggle("is-visible", !en.isIntersecting); }); }, { threshold: 0 });
    so.observe(heroRef);
  }

  /* =====================================================================
     DEMO INTERATIVA DE SEGMENTOS (página Para quem)
     ===================================================================== */
  var segChat = $("#segChat");
  if (segChat) {
    var tabsWrap = $("#segTabs"), elName = $("#segName"), elAvatar = $("#segAvatar"),
        elResult = $("#segResult"), elResultText = $("#segResultText"), elResultTime = $("#segResultTime"),
        elTitle = $("#segTitle"), elDesc = $("#segDesc"), elList = $("#segList");
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
    var SEG = [
      { id: "clinica", label: "Clínicas & Saúde", icon: IC.clinica, biz: "Clínica Bella", initials: "CB", color: "#6624ff",
        title: "Clínicas & Saúde", desc: "Odonto, estética, veterinária. Menos faltas na agenda e mais avaliações marcadas — com a segurança que dado de paciente exige.",
        bullets: ["Agenda e confirma sozinha — reduz o no-show", "Lembretes de retorno e pós-consulta 24/7", "Conforme a LGPD para dados sensíveis de saúde"],
        result: "Agendou sozinha · sem no-show", time: "38s",
        chat: [{who:"in",text:"Oi, queria marcar uma avaliação de estética 😊"},{who:"typing"},{who:"out",text:"Oi! Claro 💜 Tenho <b>quinta 10h</b> ou <b>sexta 15h</b>. Qual prefere?"},{who:"in",text:"Sexta 15h"},{who:"typing"},{who:"out",text:"Agendado! ✅ Já enviei a confirmação e o endereço aqui. Até sexta! 🙌"}] },
      { id: "imob", label: "Imobiliárias", icon: IC.imob, biz: "Imob Horizonte", initials: "IH", color: "#16c079",
        title: "Imobiliárias", desc: "78% dos leads chegam pelo WhatsApp e esfriam em minutos. O agente responde na hora, qualifica o perfil e agenda a visita antes do corretor concorrente.",
        bullets: ["Responde o lead do portal em segundos, 24/7", "Qualifica (bairro, faixa de preço, financiamento)", "Agenda a visita e aciona o corretor certo"],
        result: "Qualificou + agendou visita", time: "54s",
        chat: [{who:"in",text:"Vi o apê de 2 quartos no anúncio, ainda tá disponível?"},{who:"typing"},{who:"out",text:"Está sim! 🙌 Você busca pra <b>morar</b> ou <b>investir</b>? E qual faixa de valor?"},{who:"in",text:"Pra morar, até 350 mil"},{who:"typing"},{who:"out",text:"Perfeito. Consigo agendar uma visita amanhã 10h com o corretor Bruno. Confirmo?"},{who:"in",text:"Pode ser!"},{who:"typing"},{who:"out",text:"Marcado ✅ Enviei os detalhes e a localização aqui no seu WhatsApp."}] },
      { id: "geral", label: "Empresas em geral", icon: IC.geral, biz: "Grupo Andrade", initials: "GA", color: "#6624ff",
        title: "Empresas em geral", desc: "Serviços, agências, consultorias, prestadores. A IA atende, entende o pedido e já adianta o orçamento — 24/7, sem deixar ninguém esperando.",
        bullets: ["Responde e qualifica todo lead na hora", "Coleta os dados e adianta o orçamento", "Encaminha o cliente certo pro vendedor certo"],
        result: "Coletou dados + gerou proposta", time: "52s",
        chat: [{who:"in",text:"Vocês fazem orçamento pra manutenção predial?"},{who:"typing"},{who:"out",text:"Fazemos sim! É prédio <b>comercial</b> ou <b>residencial</b>? E quantos andares? Já adianto uma estimativa 😊"},{who:"in",text:"Comercial, 8 andares"},{who:"typing"},{who:"out",text:"Anotado ✅ Preparo a proposta e te envio ainda hoje. Confirma seu e-mail pra eu mandar o contrato junto?"}] },
      { id: "construtora", label: "Construtora", icon: IC.construtora, biz: "Construtora Cume", initials: "CC", color: "#e0ad14",
        title: "Construtoras & Incorporadoras", desc: "Lançamentos, lotes, financiamento. O agente qualifica o interessado, simula e agenda a visita ao stand antes do concorrente responder.",
        bullets: ["Qualifica o lead (perfil, financiamento) na hora", "Agenda visita ao stand e ao decorado", "Envia planta, tabela e simulação automaticamente"],
        result: "Qualificou + agendou no stand", time: "1min",
        chat: [{who:"in",text:"Quero informações dos lotes do novo empreendimento"},{who:"typing"},{who:"out",text:"Claro! 🏗 Temos lotes de <b>200 a 450m²</b>. É pra construir agora ou investir? Tem interesse em financiamento?"},{who:"in",text:"Construir, e sim financiamento"},{who:"typing"},{who:"out",text:"Perfeito. Simulo o financiamento e agendo uma visita ao stand com o consultor. Qual o melhor dia?"},{who:"in",text:"Sábado de manhã"},{who:"typing"},{who:"out",text:"Agendado ✅ Envio a planta e a simulação por aqui. Até sábado! 🙌"}] },
      { id: "industria", label: "Indústria", icon: IC.industria, biz: "Metalúrgica Sul", initials: "MS", color: "#16c079",
        title: "Indústria & B2B", desc: "Metalúrgicas, fábricas, distribuidoras. A IA faz a triagem do pedido, abre a cotação e prioriza o lead quente para o time comercial.",
        bullets: ["Faz a triagem técnica do pedido B2B", "Registra a cotação e aciona o comercial", "Integra com o seu ERP e o histórico do cliente"],
        result: "Triagem B2B + abriu cotação", time: "47s",
        chat: [{who:"in",text:"Preciso de cotação de 500 peças usinadas, atendem?"},{who:"typing"},{who:"out",text:"Atendemos sim! Pode enviar o desenho técnico ou a especificação? Já direciono ao comercial com prioridade."},{who:"in",text:"Mando o PDF agora"},{who:"typing"},{who:"out",text:"Recebido ✅ Abri a cotação <b>#4821</b> e acionei o setor de vendas. Retorno em até 24h — te aviso por aqui."}] },
      { id: "varejo", label: "Varejo & Lojas", icon: IC.varejo, biz: "Loja Vitrine", initials: "LV", color: "#6624ff",
        title: "Varejo & Lojas", desc: "Moda, calçados, óticas, mercados. A IA tira a dúvida de produto, fecha a venda e manda o link de pagamento — sem o cliente sair da conversa.",
        bullets: ["Responde estoque e tira dúvida na hora", "Fecha a venda e envia o link de pagamento", "Recupera carrinho e avisa quando chega novidade"],
        result: "Vendeu + enviou pagamento", time: "35s",
        chat: [{who:"in",text:"Esse tênis tem no 42?"},{who:"typing"},{who:"out",text:"Tem sim! 👟 No 42 temos <b>preto</b> e <b>branco</b>. Quer que eu já separe e mande o link de pagamento?"},{who:"in",text:"Pode ser, o preto"},{who:"typing"},{who:"out",text:"Separado ✅ Aqui está o link de pagamento. Assim que confirmar, preparo pra envio hoje mesmo 🚀"}] },
      { id: "concessionaria", label: "Concessionárias", icon: IC.concessionaria, biz: "Auto Prime", initials: "AP", color: "#16c079",
        title: "Concessionárias", desc: "Veículos novos e seminovos. A IA responde estoque, qualifica forma de pagamento e troca, e agenda o test drive antes do concorrente.",
        bullets: ["Qualifica (troca, à vista/financiado) na hora", "Simula o financiamento e avalia o usado", "Agenda o test drive com o consultor certo"],
        result: "Avaliou troca + agendou test drive", time: "58s",
        chat: [{who:"in",text:"Vi o SUV 2024 no site, ainda tem em estoque?"},{who:"typing"},{who:"out",text:"Temos sim! 🚗 Você tem carro na troca? E prefere <b>à vista</b> ou <b>financiado</b>? Já adianto as condições."},{who:"in",text:"Tenho um na troca, financiado"},{who:"typing"},{who:"out",text:"Perfeito. Avalio seu usado e simulo o financiamento. Quer agendar um <b>test drive</b> pra amanhã?"},{who:"in",text:"Quero, de tarde"},{who:"typing"},{who:"out",text:"Agendado ✅ Test drive amanhã 15h com o consultor Diego. Enviei o endereço e a ficha do SUV aqui. 🚀"}] },
      { id: "ecommerce", label: "E-commerce", icon: IC.ecommerce, biz: "Loja Online", initials: "LO", color: "#6624ff",
        title: "E-commerce", desc: "Lojas virtuais e marketplaces. A IA rastreia pedidos, recupera carrinho abandonado e ainda faz upsell — tudo dentro do WhatsApp.",
        bullets: ["Rastreia o pedido e responde status 24/7", "Recupera carrinho abandonado automaticamente", "Faz upsell e envia o link de pagamento na conversa"],
        result: "Rastreou pedido + fez upsell", time: "40s",
        chat: [{who:"in",text:"Comprei ontem e queria saber quando chega meu pedido"},{who:"typing"},{who:"out",text:"Oi! 📦 Achei seu pedido <b>#20488</b>: já está <b>a caminho</b>, entrega prevista quinta. Quer o código de rastreio?"},{who:"in",text:"Quero sim"},{who:"typing"},{who:"out",text:"Aqui está 🚚 E aproveitando: quem levou esse item pegou a capa com <b>15% off</b>. Quer adicionar?"},{who:"in",text:"Pode adicionar!"},{who:"typing"},{who:"out",text:"Adicionado ✅ Mandei o link de pagamento do extra. Confirmando, já vai junto no envio. 🚀"}] }
    ];
    var MAXS = 6, runId = 0, timers = [];
    var clearT = function () { timers.forEach(clearTimeout); timers = []; };
    var trimS = function () { var k = $$(".bubble, .typing", segChat); while (k.length > MAXS) { segChat.removeChild(k[0]); k = $$(".bubble, .typing", segChat); } };
    var renderInfo = function (s) {
      elName.textContent = s.biz; elAvatar.style.background = s.color; elAvatar.textContent = s.initials;
      elTitle.textContent = s.title; elDesc.textContent = s.desc;
      elResultText.textContent = s.result; elResultTime.textContent = s.time;
      elList.innerHTML = s.bullets.map(function (b) { return '<li><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> ' + b + "</li>"; }).join("");
    };
    var play = function (idx) {
      var s = SEG[idx]; runId++; var my = runId; clearT();
      Array.prototype.forEach.call(tabsWrap.children, function (b, i) { b.setAttribute("aria-selected", i === idx ? "true" : "false"); });
      renderInfo(s); segChat.innerHTML = ""; elResult.hidden = true;
      if (reduce) { s.chat.filter(function (x) { return x.who !== "typing"; }).forEach(function (x) { segChat.appendChild(makeBubble(x)); }); elResult.hidden = false; return; }
      var i = 0;
      var next = function () {
        if (my !== runId) return;
        if (i >= s.chat.length) { elResult.hidden = false; return; }
        var item = s.chat[i++], node = makeBubble(item); segChat.appendChild(node); trimS();
        if (item.who === "typing") timers.push(setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); next(); }, 1000));
        else timers.push(setTimeout(next, item.who === "in" ? 850 : 1500));
      };
      next();
    };
    SEG.forEach(function (s, i) {
      var btn = document.createElement("button"); btn.className = "seg-tab"; btn.type = "button"; btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false"); btn.innerHTML = s.icon + "<span>" + s.label + "</span>";
      btn.addEventListener("click", function () { play(i); btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); });
      tabsWrap.appendChild(btn);
    });
    var startedS = false;
    if (!reduce && "IntersectionObserver" in window) {
      var oS = new IntersectionObserver(function (e) { e.forEach(function (en) { if (en.isIntersecting && !startedS) { startedS = true; play(0); } }); }, { threshold: 0.3 });
      oS.observe(segChat);
    } else { play(0); }
  }

})();
