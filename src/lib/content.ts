export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const siteContent = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      pillars: "Áreas",
      impact: "Impacto",
      contact: "Contacto",
      language: "EN",
    },
    hero: {
      eyebrow: "Associação Juvenil",
      title: "Sê qualquer coisa, sê tu mesmo.",
      subtitle:
        "Um espaço de descoberta, expressão e crescimento através da arte, do bem-estar, da mobilidade internacional e da ligação humana.",
      ctaPrimary: "Conhecer Pó de Ser",
      ctaSecondary: "Entrar em contacto",
    },
    about: {
      title: "Quem somos",
      text: "A Pó de Ser nasceu em Palmela, em 2022, a partir do encontro de amigos marcados pelo Erasmus+. Queremos criar oportunidades para jovens explorarem a sua essência, desenvolverem o seu potencial e encontrarem novas formas de se relacionarem consigo, com os outros e com o mundo.",
      quote:
        "Acreditamos que cada pessoa tem algo único e especial que merece ser vivido, expresso e partilhado.",
    },
    pillars: {
      title: "O que fazemos",
      items: [
        {
          title: "Arte & Criatividade",
          description:
            "Usamos expressão artística, performance, música, teatro e criação como ferramentas de descoberta e transformação.",
        },
        {
          title: "Saúde, Bem-estar & Mindfulness",
          description:
            "Criamos espaços de pausa, reflexão, consciência emocional e cuidado individual e coletivo.",
        },
        {
          title: "Mobilidade Internacional",
          description:
            "Ligamos jovens a experiências Erasmus+ e outras oportunidades internacionais de aprendizagem.",
        },
        {
          title: "Sustentabilidade",
          description:
            "Promovemos contacto com a natureza, consciência ecológica e formas mais sustentáveis de viver e criar.",
        },
        {
          title: "Inclusão & Diversidade",
          description:
            "Valorizamos ambientes seguros, humanos e acessíveis, onde cada pessoa possa participar como é.",
        },
      ],
    },
    impact: {
      title: "Alguns marcos",
      stats: [
        { value: "2022", label: "Ano de criação" },
        { value: "15", label: "Jovens ativos na equipa" },
        { value: "2024", label: "Primeiro Youth Exchange organizado" },
        { value: "30", label: "Participantes no The Art of Life" },
        { value: "6", label: "Países no The Art of Life" },
      ],
    },
    contact: {
      title: "Vamos ligar-nos?",
      text: "Se queres participar, colaborar, ou simplesmente conhecer melhor o que fazemos, fala connosco.",
      email: "info@podeser.pt",
      projectEmail: "projects@podeser.pt",
      instagram: "https://www.instagram.com/po.de.ser/",
      facebook: "https://www.facebook.com/po.de.ser.ngo/",
      button: "Enviar email",
    },
    footer: {
      line: "Pó de Ser — Be anything, be yourself.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      pillars: "Areas",
      impact: "Impact",
      contact: "Contact",
      language: "PT",
    },
    hero: {
      eyebrow: "Youth Association",
      title: "Be anything, be yourself.",
      subtitle:
        "A space for discovery, expression, and growth through art, well-being, international mobility, and human connection.",
      ctaPrimary: "Discover Pó de Ser",
      ctaSecondary: "Get in touch",
    },
    about: {
      title: "Who we are",
      text: "Pó de Ser was born in Palmela in 2022 from the encounter of friends shaped by Erasmus+ experiences. We create opportunities for young people to explore their essence, develop their potential, and find new ways to connect with themselves, with others, and with the world.",
      quote:
        "We believe each person carries something unique and special that deserves to be lived, expressed, and shared.",
    },
    pillars: {
      title: "What we do",
      items: [
        {
          title: "Art & Creativity",
          description:
            "We use artistic expression, performance, music, theatre, and creation as tools for discovery and transformation.",
        },
        {
          title: "Health, Well-being & Mindfulness",
          description:
            "We create spaces for pause, reflection, emotional awareness, and individual and collective care.",
        },
        {
          title: "International Mobility",
          description:
            "We connect young people with Erasmus+ experiences and other international learning opportunities.",
        },
        {
          title: "Sustainability",
          description:
            "We promote contact with nature, ecological awareness, and more sustainable ways of living and creating.",
        },
        {
          title: "Inclusion & Diversity",
          description:
            "We value safe, human, and accessible spaces where each person can participate as they are.",
        },
      ],
    },
    impact: {
      title: "Some milestones",
      stats: [
        { value: "2022", label: "Founded" },
        { value: "15", label: "Active young people in the team" },
        { value: "2024", label: "First organized Youth Exchange" },
        { value: "30", label: "Participants in The Art of Life" },
        { value: "6", label: "Countries in The Art of Life" },
      ],
    },
    contact: {
      title: "Let’s connect",
      text: "If you want to participate, collaborate, or simply get to know our work better, reach out to us.",
      email: "info@podeser.pt",
      projectEmail: "projects@podeser.pt",
      instagram: "https://www.instagram.com/po.de.ser/",
      facebook: "https://www.facebook.com/po.de.ser.ngo/",
      button: "Send email",
    },
    footer: {
      line: "Pó de Ser — Sê qualquer coisa, sê tu mesmo.",
    },
  },
} as const;