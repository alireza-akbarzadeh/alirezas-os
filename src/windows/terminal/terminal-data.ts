export const COMMANDS = {
  help: {
    description: "Show available commands",
    output: `Available commands:\nhelp      - Show this help message\nabout     - Learn about me\nskills    - View my technical skills\nprojects  - List my projects\ncontact   - Get my contact information\nclear     - Clear the terminal\nportfolio - Open portfolio window\nresume    - Open resume\ngithub    - Visit my GitHub profile\nlinkedin  - Visit my LinkedIn profile`,
  },
  about: {
    description: "About me",
    output: `👋 Hey! I'm Alireza\n\nI'm a Full-Stack Developer who loves building modern web applications.\nPassionate about creating seamless user experiences and clean code.\n\nType 'skills' to see my tech stack!`,
  },
  skills: {
    description: "Technical skills",
    output: null, // Will render custom component
  },
  projects: {
    description: "My projects",
    output: null, // Will be fetched from API
  },
  contact: {
    description: "Contact information",
    output: null, // Will be fetched from API
  },
  github: {
    description: "Open GitHub profile",
    output: "🔗 Opening GitHub profile...",
  },
  linkedin: {
    description: "Open LinkedIn profile",
    output: "🔗 Opening LinkedIn profile...",
  },
  portfolio: {
    description: "Open portfolio window",
    output: "📂 Opening portfolio...",
  },
  resume: {
    description: "Download resume",
    output: "📄 Downloading resume...",
  },
  clear: {
    description: "Clear terminal",
    output: "",
  },
};

export const techStack = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript"] },
  { category: "Mobile", items: ["React Native", "Expo"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS", "Hono"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL"] },
  { category: "Dev Tools", items: ["Git", "GitHub", "Docker"] },
];
