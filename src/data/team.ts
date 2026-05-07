export type TeamMember = {
  name: string;
  image: string;
  foregroundImage?: string;
  role: {
    pt: string;
    en: string;
  };
  bio: {
    pt: string;
    en: string;
  };
  creatureLeft?: string;
  creatureRight?: string;
  creatureLeftAlt?: string;
  creatureRightAlt?: string;
  creatureLeftClass?: string;
  creatureRightClass?: string;
  creatureLeftSize?: number;
  creatureRightSize?: number;
  links?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
};

export const teamMembers: TeamMember[] = [
  {
    name: "Francisco Quintela",
    image: "/team/francisco.png",
    foregroundImage: "/team/francisco-face.png",
    role: {
      pt: "Co-fundador / Youth Worker",
      en: "Co-founder / Youth Worker",
    },
bio: {
  pt: "Co-fundador da Pó de Ser, está envolvido na vida criativa, educativa e organizacional da associação. Escreve, desenha, coordena e facilita projetos que ligam arte, bem-estar, mobilidade internacional e desenvolvimento pessoal.",
  en: "Co-founder of Pó de Ser, involved in the creative, educational, and organisational life of the association. He writes, designs, coordinates, and facilitates projects connected to art, well-being, international mobility, and personal development.",
},
    creatureLeft: "/creatures/monster.png",
    creatureRight: "/creatures/bird.png",
    creatureLeftAlt: "Monster creature",
    creatureRightAlt: "Bird creature",
    creatureLeftSize: 118,
    creatureRightSize: 120,
    creatureLeftClass:
      "left-[-1.9rem] top-[11.25rem] group-hover:left-[-2.6rem] group-hover:top-[12.2rem]",
    creatureRightClass:
      "right-[-0.5rem] top-[-0.5rem] group-hover:right-[-2.8rem] group-hover:top-[-2.9rem]",
  },
  {
    name: "Filipe Freire",
    image: "/team/filipe.jpg",
    foregroundImage: "/team/filipe-face.png",
    role: {
      pt: "Co-fundador / Gestão e Coordenação",
      en: "Co-founder / Management and Coordination",
    },
bio: {
  pt: "Co-fundador da Pó de Ser, acompanha o desenho, coordenação, gestão e facilitação de projetos. Com uma forte ligação ao teatro, à música, às danças tradicionais, à tecnologia e ao universo Erasmus+, traz estrutura e criatividade ao trabalho da organização.",
  en: "Co-founder of Pó de Ser, he supports project design, coordination, management, and facilitation. With a strong connection to theatre, music, traditional dance, technology, and the Erasmus+ field, he brings structure and creativity to the organisation’s work.",
},
    creatureLeft: "/creatures/dragon.png",
    creatureRight: "/creatures/unicorn.png",
    creatureLeftAlt: "Dragon creature",
    creatureRightAlt: "Unicorn creature",
    creatureLeftSize: 145,
    creatureRightSize: 135,
    creatureLeftClass:
      "left-[-1.2rem] top-[-0.5rem] group-hover:left-[-2rem] group-hover:top-[-1.2rem]",
    creatureRightClass:
      "right-[-1rem] top-[-0.2rem] group-hover:right-[-1.8rem] group-hover:top-[-0.8rem]",
  },
  {
    name: "Natália Azevedo",
    image: "/team/nat.png",
    foregroundImage: "/team/nat-face.png",
    role: {
      pt: "Psicóloga / Facilitadora",
      en: "Psychologist / Facilitator",
    },
bio: {
  pt: "Psicóloga e facilitadora, dedicada ao empoderamento juvenil, à aprendizagem criativa, à saúde mental e aos direitos humanos. Cria espaços inclusivos onde as pessoas podem explorar emoções, partilhar histórias e construir ligações autênticas.",
  en: "Psychologist and facilitator dedicated to youth empowerment, creative learning, mental health, and human rights. She creates inclusive spaces where people can explore emotions, share stories, and build authentic connections.",
},
    creatureLeft: "/creatures/snake.png",
    creatureRight: "/creatures/forest.png",
    creatureLeftAlt: "Snake creature",
    creatureRightAlt: "Forest creature",
    creatureLeftSize: 120,
    creatureRightSize: 115,
    creatureLeftClass:
      "left-[-1.2rem] top-[-0.3rem] group-hover:left-[-2rem] group-hover:top-[-1rem]",
    creatureRightClass:
      "right-[-1rem] top-[-0.1rem] group-hover:right-[-1.8rem] group-hover:top-[-0.8rem]",
  },
];