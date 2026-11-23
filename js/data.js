/* =========================================================
   CONTEÚDO DO SITE — edite tudo aqui.
   Imagens são provisórias (picsum.photos). Troque por arquivos
   seus, ex.: "img/projeto-1.jpg". Para usar vídeo no fundo de um
   projeto, preencha "video" com o caminho de um .mp4.
   ========================================================= */
const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

window.SITE = {
  brand: "Miza Creative",
  logo: "img/logo-miza.webp", // PNG/WebP com fundo transparente
  name: "Mizael Gomes",
  tagline: "Entre o design, o movimento e o digital, transformo ideias em experiências visuais que expressam identidade e propósito.",
  email: "mizaelwgr@gmail.com",
  phone: "(86) 99486-5381",
  whatsapp: "https://wa.link/60bghf", // link do WhatsApp (contato e botão "Vamos conversar")
  address: "Teresina, PI",
  bookingUrl: "https://wa.link/60bghf", // link do botão "Vamos conversar"
  footerLine: ["Teresina – PI", "Disponível para remoto e PJ"],
  slogan: ["Design com criatividade, estratégia e propósito para transformar ideias em resultados."],
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/mizaelgomes_rocha/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mizael-wanderson-gomes-338294100/" }
  ],

  /* Slides do topo da home: palavra que aparece depois de "PARA".
     from = cor de baixo, to = cor de cima, text = cor do título.
     dark: true para fundos escuros (a foto se mistura em modo claro). */
  heroSlides: [
    { word: "Design", from: "#1c1c1c", to: "#ededed", text: "#0d0d0d", image: "img/hero-design-estudio.webp", studio: true },
    { word: "Web", from: "#5a5a5a", to: "#c4c4c4", text: "#0d0d0d", image: "img/hero-web.webp", studio: true },
    { word: "Motion", from: "#1c1c1c", to: "#ededed", text: "#0d0d0d", studio: true, image: "img/hero-motion.webp" }
  ],

  projects: [
    {
      slug: "iluve",
      title: "ILÚVE",
      category: "Confecção",
      year: "2026",
      service: "Identidade visual",
      cover: "img/iluve-capa.webp",
      thumb: "img/iluve-logo.png",
      video: "",
      featured: true,
      intro: "Identidade visual para uma loja de camisas inspirada na cultura pop.",
      body: [
        "O projeto começou com uma conversa sobre a personalidade da marca e a visão do proprietário para o negócio. A proposta era criar uma identidade moderna, autêntica e cheia de personalidade, com referências ao universo de *O Senhor dos Anéis* e à cultura geek.",
        "Desenvolvemos um conceito visual que conecta o universo da fantasia à moda urbana, explorando símbolos, tipografia, cores e elementos gráficos. A identidade foi pensada para ser versátil, permitindo diferentes aplicações, composições e possibilidades de uso em embalagens, etiquetas, redes sociais, estampas e materiais promocionais."
      ],
      services: ["Conceito de marca", "Logotipo", "Design visual", "Conteúdo"],
      link: "#",
      /* Galeria: "full" = largura inteira, "half" = metade, "third" = um terço */
      gallery: [
        { src: "img/iluve-logo.png", size: "full" },
        { src: "img/iluve-simbolo.webp", size: "half" },
        { src: "img/iluve-camiseta-simbolo.webp", size: "half" },
        { src: "img/iluve-tag-simbolo.webp", size: "full" },
        { src: "img/iluve-camiseta-bege.webp", size: "third" },
        { src: "img/iluve-camiseta-preta.webp", size: "third" },
        { src: "img/iluve-camiseta-branca.webp", size: "third" },
        { src: "img/iluve-meias.webp", size: "full" },
        { src: "img/iluve-modelo-rua.webp", size: "half" },
        { src: "img/iluve-modelo-skate.webp", size: "half" },
        { src: "img/iluve-tag-gola.webp", size: "half" },
        { src: "img/iluve-tag.webp", size: "half" }
      ]
    },
    {
      slug: "prime-beers",
      title: "Prime Beers",
      category: "Distribuidora",
      year: "2026",
      service: "Identidade visual",
      cover: "img/prime-capa.webp",
      thumb: "img/prime-logo.webp",
      video: "",
      featured: true,
      intro: "Identidade visual para uma distribuidora de bebidas.",
      body: [
        "O projeto nasceu da proposta de unir tradição e modernidade. Inspirada nos antigos selos de bebidas e rótulos de cerveja em cromolitografia, a identidade resgata arabescos e elementos ornamentais em uma linguagem contemporânea.",
        "Criamos uma marca marcante e versátil, com personalidade própria e aplicações que valorizam sua essência em diferentes materiais e composições."
      ],
      services: ["Conceito de marca", "Logotipo", "Design visual", "Conteúdo"],
      link: "#",
      /* Galeria: "full" = largura inteira, "half" = metade, "third" = um terço */
      gallery: [
        { src: "img/prime-logo.webp", size: "full" },
        { src: "img/prime-fachada.jpg", size: "full" },
        { src: "img/prime-polo-vertical.jpg", size: "third" },
        { src: "img/prime-bone.jpg", size: "third" },
        { src: "img/prime-porta-copos.jpg", size: "third" },
        { src: "img/prime-polo.jpg", size: "full" },
        { src: "img/prime-van-frente.jpg", size: "half" },
        { src: "img/prime-van-lateral.jpg", size: "half" }
      ]
    },
    {
      slug: "elevare",
      title: "Elevare",
      /* RASCUNHO: confirme setor, ano e textos */
      category: "Marketing",
      year: "2024",
      service: "Identidade visual",
      cover: "img/elevare-capa.webp",
      thumb: "img/elevare-logo.webp",
      video: "",
      featured: true,
      intro: "Identidade visual para a Elevare.",
      body: [
        "A marca nasceu do conceito de elevar: um monograma que une o “e” e o “V” em um movimento ascendente, traduzindo crescimento e direção.",
        "A paleta em grafite e laranja e a tipografia de linhas limpas formam um sistema consistente, aplicado em papelaria, site, brindes e manual de marca."
      ],
      services: ["Conceito de marca", "Logotipo", "Design visual", "Manual de marca"],
      link: "#",
      gallery: [
        { src: "img/elevare-logo.webp", size: "full" },
        { src: "img/elevare-capa.webp", size: "full" }
      ]
    }
  ],

  /* =========================================================
     PORTFÓLIO: cada seção vira um bloco clicável na página
     Portfólio e abre a sua própria página (portfolio.html?s=slug).
     cover = imagem do bloco (horizontal, ~1920×1080)
     items = imagens da galeria (qualquer formato). Vídeos .mp4
     também funcionam: basta colocar o caminho, ex. "img/motion-1.mp4".
     ========================================================= */
  portfolio: [
    {
      slug: "design",
      title: "Design",
      text: "Identidades visuais, logotipos e aplicações de marca.",
      cover: "img/prime-fachada.jpg",
      items: [
        "img/iluve-capa.webp",
        "img/iluve-camiseta-simbolo.webp",
        "img/prime-polo-vertical.jpg",
        "img/elevare-capa.webp",
        "img/iluve-modelo-skate.webp",
        "img/prime-bone.jpg",
        "img/prime-fachada.jpg",
        "img/iluve-tag.webp",
        "img/prime-porta-copos.jpg",
        "img/iluve-meias.webp",
        "img/iluve-camiseta-preta.webp",
        "img/prime-van-lateral.jpg"
      ]
    },
    {
      slug: "motion",
      title: "Motion",
      text: "Animações, vinhetas e vídeos para marcas e redes sociais.",
      cover: "img/Motion-web/Abertura - apresentação.mp4", // vídeo leve (1 MB) para o bloco
      items: [
        "img/Motion-web/_ Forno- Ativação animação---2.mp4",
        "img/Motion-web/Abertura - apresentação.mp4",
        "img/Motion-web/Animação - Camarote Timbre -Final--2.mp4",
        "img/Motion-web/BBQ Dia -alter.mp4",
        "img/Motion-web/Buteco - campanha São Luis - 2026.mp4",
        "img/Motion-web/BUTECO - SÃO LUIS -  PROV.mp4",
        "img/Motion-web/Buteco dia  - 18.mp4",
        "img/Motion-web/Comp 2.mp4",
        "img/Motion-web/Donselle  - Dell -ok.mp4",
        "img/Motion-web/É Hoje!.mp4",
        "img/Motion-web/É HOJE!-.mp4",
        "img/Motion-web/Festival -mod -01.mp4",
        "img/Motion-web/logo empresas.mp4",
        "img/Motion-web/oktoberfestparnaiba - AGNES -2026.mp4",
        "img/Motion-web/oktoberfestparnaiba - BBQ.mp4",
        "img/Motion-web/Para telão - final.mp4",
        "img/Motion-web/Quem te Grava.mp4",
        "img/Motion-web/Silas Tv na copa - 5 minutos.mp4",
        "img/Motion-web/Smart.mp4",
        "img/Motion-web/Star - final top.mp4",
        "img/Motion-web/The brás contorno- stories.mp4",
        "img/Motion-web/The brás contorno-ok.mp4",
        "img/Motion-web/video - Andreia Imoveis.mp4"
      ]
    },
    {
      slug: "web-design",
      title: "Web Design",
      text: "Sites e experiências digitais bonitas e fáceis de usar.",
      cover: "img/Web/mobelle-desktop.jpg",
      coverPosition: "top", // mostra o topo do site no bloco
      layout: "pages", // páginas inteiras: miniatura rola ao passar o mouse
      items: [
        "img/Web/box-juridico-desktop.webp",
        "img/Web/box-juridico-mobile.webp",
        "img/Web/nomerkado-desktop.webp",
        "img/Web/idealnet-desktop.webp",
        "img/Web/idealnet-mobile.webp",
        "img/Web/mobelle-desktop.jpg",
        "img/Web/mobelle-mobile.jpg",
        "img/Web/sandra-gomes-desktop.webp",
        "img/Web/sandra-gomes-mobile.webp"
      ]
    }
  ],

  about: {
    fullName: "Mizael Wanderson Gomes Rocha",
    roles: ["Designer Gráfico", "Motion Designer", "UI Design"],
    availability: "Disponível para remoto e PJ",
    lead: "Designer gráfico e motion designer com 10 anos de experiência criando marcas, campanhas e animações — do impresso à landing page.",
    bio: [
      "Crio identidades visuais, peças para redes sociais, campanhas publicitárias e animações institucionais para pequenas, médias e grandes empresas.",
      "Uno design, motion e edição de vídeo a UI/UX e front-end, o que me permite entregar um projeto completo: da marca à interface, do impresso à landing page.",
      "Hoje também uso IA generativa no meu processo para acelerar a produção, sem abrir mão do olhar de design."
    ],
    portrait: "img/sobre-retrato.webp",

    /* Experiência: da mais recente para a mais antiga.
       recent: true = aparece em destaque, com as atividades. */
    experience: [
      { years: "2024 – 2025", company: "Hospital Gastrovita / Achemed", role: "Designer e Motion Designer", recent: true,
        items: ["Animações institucionais e vídeos com motion design e edição.", "Identidades visuais, logotipos e peças para redes sociais.", "Interfaces web com foco em UI/UX (HTML, CSS, JavaScript)."] },
      { years: "2023 – 2024", company: "Idealnet", role: "Designer e UI/UX Designer", recent: true,
        items: ["Desenho e implementação de interfaces para sites e aplicações web.", "Peças para redes sociais, identidades visuais e animações institucionais."] },
      { years: "2023", company: "Propagtel Comunicação", role: "Designer Gráfico e Motion Designer", recent: true,
        items: ["Peças para campanhas em redes sociais, anúncios online e e-mail marketing.", "Animações, vídeos e tratamento de imagens para materiais publicitários."] },
      { years: "2020 – 2023", company: "Ícone Comunicação", role: "Designer Gráfico",
        items: ["Peças publicitárias para redes sociais junto ao departamento de comunicação.", "Identidades visuais, logotipos e animações institucionais."] },
      { years: "2020", company: "Grupo CEV", role: "Designer Gráfico",
        items: ["Lonas de palco, backdrops, flyers e folhetos de programação para eventos.", "Banners, interfaces web e complementos de identidades visuais."] },
      { years: "2016 – 2018", company: "Norte Cópias", role: "Arte-finalista",
        items: ["Cartões de visita, folders, folhetos e cartazes.", "Fechamento de arquivos para impressão e entrega de materiais."] }
    ],

    /* Competências: ferramentas por área */
    skills: [
      { area: "Design gráfico", tools: ["Photoshop (avançado)", "Illustrator (avançado)", "InDesign", "CorelDRAW"] },
      { area: "Motion e vídeo", tools: ["After Effects", "Premiere"] },
      { area: "UI/UX", tools: ["Figma", "Adobe XD"] },
      { area: "Web", tools: ["HTML5", "CSS3", "WordPress", "Elementor", "JavaScript (básico)"] },
      { area: "IA generativa", tools: ["Gemini", "Claude", "Claude Design", "Google Flow", "HeyGen", "Veo"] },
      { area: "Apresentações", tools: ["PowerPoint", "Google Slides"] }
    ],

    /* Formação e cursos: do mais recente para o mais antigo */
    education: [
      { years: "2023", title: "UI/UX Design", place: "Mentorama" },
      { years: "2022 – 2023", title: "After Effects Avançado", place: "Carlos “Zenzuke” Albarrán" },
      { years: "2022 – 2023", title: "Front-end (12 meses)", place: "B7Web" },
      { years: "2021", title: "Motion Designer (4 meses)", place: "Layer Lemonade" },
      { years: "2018 – 2020", title: "Tecnólogo em Design Gráfico", place: "Faculdade CET, Teresina", degree: true },
      { years: "2014", title: "Ruby on Rails (4 meses)", place: "Interaje" },
      { years: "2011 – 2012", title: "Desenvolvedor Web (12 meses)", place: "Senac" }
    ],
    services: [
      { title: "Branding", text: "Identidades que se destacam e contam uma história.", items: ["Logotipo", "Estratégia", "Manual de marca"] },
      { title: "Portfólio", text: "Seus trabalhos apresentados com curadoria e narrativa visual.", items: ["Curadoria", "Apresentação", "Book digital"] },
      { title: "Direção de arte", text: "Conceitos transformados em peças, com planejamento cuidadoso.", items: ["Moodboard", "Pesquisa", "Gestão de parceiros"] },
      { title: "Web design", text: "Experiências digitais intuitivas e bonitas.", items: ["Design system", "Protótipo", "Domínio e manutenção"] }
    ]
  },

  greetings: ["olá", "hello", "hola", "bonjour", "ciao", "hallo", "こんにちは", "你好", "привіт"]
};
