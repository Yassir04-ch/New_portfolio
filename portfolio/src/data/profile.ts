import type { Profile } from '../types';

export const profile: Profile = {
  name: 'Yassir Cherqui',
  title: 'Développeur Full Stack',
  roles: ['Java / Spring Boot', 'Angular & Vue.js', 'Laravel & API REST', 'IA Générative & RAG'],
  about:
    "Étudiant en 2ᵉ année de Développement Web Full-Stack Java Angular à UM6P | YouCode. Je conçois des applications web robustes, testées et déployables, du backend sécurisé jusqu'à l'interface, avec un intérêt marqué pour l'intégration d'IA (LLM, RAG, agents).",
  email: 'yassircherqui.YC@gmail.com',
  phone: '+212 645019812',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Yassir04-ch' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/search/results/all/?keywords=Yassir%20Cherqui' },
    { label: 'Email', href: 'mailto:yassircherqui.YC@gmail.com' },
  ],
  skills: [
    { title: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Jakarta EE', 'PHP', 'Laravel', 'Hibernate'] },
    { title: 'Frontend', items: ['Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML', 'CSS'] },
    { title: 'API & Données', items: ['REST', 'Swagger / OpenAPI', 'PostgreSQL', 'MySQL', 'SQL', 'JSON'] },
    { title: 'DevOps & Qualité', items: ['Docker', 'Git / GitHub', 'Jenkins', 'SonarQube', 'JaCoCo', 'CI/CD', 'Maven', 'Jira', 'Agile / Scrum'] },
    { title: 'Tests & Sécurité', items: ['JUnit 5', 'Mockito', 'BCrypt', 'Postman'] },
    { title: 'IA & Generative AI', items: ['LLM', 'Spring AI', 'LangChain', 'RAG', 'Embeddings', 'pgvector', 'AI Agents', 'Tool Calling', 'MCP'] },
  ],
  experiences: [
    {
      company: 'DATAXPRESS', role: 'Développeur Full Stack (Stage)', place: 'El Jadida', period: '18/05/2026 — 18/07/2026',
      points: [
        "Conception fonctionnelle et technique d'une application web de gestion des employés, services, projets et offres d'emploi.",
        'Backend Laravel, création et intégration d’API REST ; frontend Vue.js et Tailwind CSS.',
        'Notifications temps réel avec WebSocket et chatbot basé sur l’IA pour assister les utilisateurs.',
        'Authentification, rôles, absences, évaluations ; suivi Agile/Scrum avec Jira.',
      ],
    },
  ],
  projects: [
    {
      name: 'EventPro', subtitle: 'API de billetterie et de réservation', icon: '🎟️', accent: '#3b82f6', image: '/projects/eventpro.png',
      description: 'API REST pour la gestion des événements, réservations et paiements, avec sécurisation des transactions et idempotence. Pipeline CI/CD avec tests automatisés et contrôle qualité.',
      stack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'JUnit 5', 'Mockito', 'Jenkins', 'SonarQube', 'JaCoCo', 'Docker'],
      repo: 'https://github.com/Yassir04-ch/EventProV2',
    },
    {
      name: 'Gestion RH', subtitle: 'Projet de stage — DataXpress', icon: '👥', accent: '#a855f7', image: '/projects/stage.png',
      description: "Application web de gestion des employés, services, projets et offres d'emploi : rôles, absences, évaluations, notifications temps réel (WebSocket) et chatbot IA.",
      stack: ['Laravel', 'Vue.js', 'Tailwind CSS', 'REST API', 'WebSocket', 'Jira'],
      repo: 'https://github.com/Yassir04-ch/Project_Stage',
    },
    {
      name: 'FootEvent', subtitle: 'Gestion de tournois de football amateur', icon: '⚽', accent: '#22c55e', image: '/projects/footevent.png',
      description: 'Plateforme de compétitions : équipes, matchs, calendriers, classements et rôles Admin / Organisateur / Joueur.',
      stack: ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS', 'Docker', 'Jira'],
      repo: 'https://github.com/Yassir04-ch/FootEvenT',
    },
    {
      name: 'Hotel Booking', subtitle: "Application de réservation d'hôtel", icon: '🏨', accent: '#f59e0b', image: '/projects/hotel.png',
      description: "Application web de réservation d'hôtel : consultation des chambres et gestion des réservations. (Complète la stack depuis ton dépôt.)",
      stack: [],
      repo: 'https://github.com/Yassir04-ch/Hotel_Booking_v2',
    },
    {
      name: 'ClinicManager', subtitle: 'Application de gestion de clinique', icon: '🩺', accent: '#06b6d4', image: '/projects/clinic.png',
      description: 'Patients, médecins, spécialités, disponibilités, rendez-vous et dossiers médicaux. Authentification, rôles, architecture MVC avec Services, Repositories et DTO/Mapper.',
      stack: ['Jakarta EE', 'Servlets', 'JSP/JSTL', 'JPA/Hibernate', 'PostgreSQL', 'Docker'],
    },
  ],
  education: [
    { title: 'Développement Web Full-Stack Java Angular', school: 'UM6P | YouCode, Campus Youssoufia', period: '2025 — en cours' },
    { title: 'Licence en Gestion', school: 'Faculté Ibn Zohr, Ait Melloul', period: '2024 — 2025' },
    { title: 'DEUG en Économie et Gestion', school: 'Faculté Ibn Zohr, Ait Melloul', period: '2022 — 2024' },
    { title: 'Baccalauréat Sciences de la Vie et de la Terre', school: 'Lycée Hassan II, Ouled Teima', period: '2020 — 2021' },
  ],
  languages: [{ name: 'Arabe', level: 'Langue maternelle' }, { name: 'Français', level: 'Avancé' }, { name: 'Anglais', level: 'Professionnel' }],
  softSkills: ['Communication', 'Collaboration', 'Autonomie', 'Résolution de problèmes', 'Adaptabilité', 'Gestion du temps'],
};
