export interface Link { label: string; href: string }
export interface SkillGroup { title: string; items: string[] }
export interface Experience { company: string; role: string; place: string; period: string; points: string[] }
export interface Project { name: string; subtitle: string; description: string; stack: string[]; repo?: string; image?: string; icon: string; accent: string }
export interface Education { title: string; school: string; period: string }
export interface Profile {
  name: string; title: string; roles: string[]; about: string;
  email: string; phone: string; socials: Link[];
  skills: SkillGroup[]; experiences: Experience[]; projects: Project[];
  education: Education[]; languages: { name: string; level: string }[]; softSkills: string[];
}
