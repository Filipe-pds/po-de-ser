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
      pt: "Escreve, organiza e facilita projetos ligados à arte, bem-estar, mobilidade internacional e desenvolvimento pessoal.",
      en: "He writes, organises, and facilitates projects connected to art, well-being, international mobility, and personal development.",
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
    links: {
      email: "info@podeser.pt",
    },
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
      pt: "Acompanha a organização, coordenação e desenvolvimento dos projetos, contribuindo para a visão e estrutura da associação.",
      en: "He supports the organisation, coordination, and development of projects, helping shape the association’s vision and structure.",
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
    links: {
      email: "projects@podeser.pt",
    },
  },
  {
    name: "Natália Azevedo",
    image: "/team/nat.png",
    foregroundImage: "/team/nat-face.png",
    role: {
      pt: "Função na equipa",
      en: "Role in the team",
    },
    bio: {
      pt: "Pequena descrição da pessoa, da sua energia, experiência ou contributo para a associação.",
      en: "Short description of the person, their energy, experience, or contribution to the association.",
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