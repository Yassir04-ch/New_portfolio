import type { Profile } from '../types';
import { h } from '../lib/dom';
import { typewriter } from '../lib/effects';
import { config } from '../data/config';
import { cover } from '../components/cover';
import { consultForm } from '../components/consultForm';

export type SectionBuilder = (p: Profile) => HTMLElement;

const reveal = <T extends HTMLElement>(el: T): T => { el.dataset.reveal = ''; return el; };
const heading = (num: string, text: string) => reveal(h('h2', { class: 'sec-title' }, h('span', { class: 'mono' }, num), text));
const chip = (t: string) => h('span', { class: 'chip' }, t);
const words = (text: string) => text.split(' ').map((w, i) => h('span', { class: 'w' }, h('span', { style: `--i:${i}` }, w)));

const NAV = [['about', 'À propos'], ['skills', 'Compétences'], ['experience', 'Expérience'], ['projects', 'Projets'], ['education', 'Formation'], ['contact', 'Contact']] as const;

export const nav: SectionBuilder = (p) =>
  h('header', { class: 'nav' },
    h('a', { class: 'logo', href: '#top' }, `${p.name.split(' ')[0]}.`),
    h('nav', {}, ...NAV.map(([id, label]) => h('a', { href: `#${id}` }, label)),
      h('a', { class: 'nav-cv', href: config.cv, download: '' }, 'CV ↓'),
      h('button', { class: 'icon-btn', id: 'theme', 'aria-label': 'Changer de thème', html: '◐' })));

export const hero: SectionBuilder = (p) => {
  const role = h('span', { class: 'typed' });
  const el = h('section', { class: 'hero', id: 'top' },
    h('canvas', { class: 'particles' }), h('div', { class: 'blob b1' }), h('div', { class: 'blob b2' }),
    h('div', { class: 'hero-text' },
      h('p', { class: 'mono eyebrow fade', style: '--d:100ms' }, 'Salut, je suis'),
      h('h1', { class: 'name', 'aria-label': p.name }, ...words(p.name)),
      h('p', { class: 'lead fade', style: '--d:700ms' }, `${p.title} — `, role, h('span', { class: 'caret' })),
      h('p', { class: 'muted fade', style: '--d:850ms' }, p.about),
      h('div', { class: 'cta fade', style: '--d:1000ms' },
        h('a', { class: 'btn primary', href: '#projects' }, 'Voir mes projets'),
        h('a', { class: 'btn', href: config.cv, download: '' }, 'Télécharger mon CV'),
        h('a', { class: 'btn', href: '#contact' }, 'Consultation')),
      h('div', { class: 'socials fade', style: '--d:1150ms' }, ...p.socials.map((s) => h('a', { href: s.href, target: '_blank', rel: 'noopener' }, s.label)))),
    h('div', { class: 'photo-wrap fade', style: '--d:500ms' },
      h('div', { class: 'photo-frame' }, h('div', { class: 'ring' }), h('img', { src: config.photo, alt: `Portrait de ${p.name}` })),
      h('span', { class: 'badge b-a' }, 'Spring Boot'), h('span', { class: 'badge b-b' }, 'Angular'), h('span', { class: 'badge b-c' }, 'IA · RAG')));
  typewriter(role, p.roles);
  return el;
};

export const marquee: SectionBuilder = (p) => {
  const items = [...new Set(p.skills.flatMap((g) => g.items))];
  return h('div', { class: 'marquee', 'aria-hidden': 'true' }, h('div', { class: 'track' }, ...[...items, ...items].map((t) => h('span', {}, t))));
};

export const stats: SectionBuilder = (p) => {
  const repos = p.projects.filter((x) => x.repo).length;
  const techs = new Set(p.skills.flatMap((g) => g.items)).size;
  const data: [number, string][] = [[p.projects.length, 'Projets'], [repos, 'Dépôts GitHub'], [techs, 'Technologies']];
  return h('section', { class: 'stats' }, ...data.map(([n, l]) =>
    reveal(h('div', { class: 'card stat' }, h('b', { 'data-count': String(n) }, '0'), h('span', { class: 'muted' }, l)))));
};

export const about: SectionBuilder = (p) =>
  h('section', { id: 'about' }, heading('01.', 'À propos'),
    h('div', { class: 'about' },
      reveal(h('div', { class: 'card tilt about-photo' }, h('img', { src: config.photoCasual, alt: p.name, loading: 'lazy' }))),
      h('div', { class: 'about-cols' },
        reveal(h('div', { class: 'card' }, h('h3', {}, 'Qui suis-je ?'), h('p', { class: 'muted' }, p.about))),
        reveal(h('div', { class: 'card' }, h('h3', {}, 'Langues'),
          ...p.languages.map((l) => h('p', { class: 'row' }, h('b', {}, l.name), h('span', { class: 'muted' }, l.level))))),
        reveal(h('div', { class: 'card' }, h('h3', {}, 'Compétences transversales'), h('div', { class: 'chips' }, ...p.softSkills.map(chip)))))));

export const skills: SectionBuilder = (p) =>
  h('section', { id: 'skills' }, heading('02.', 'Compétences'),
    h('div', { class: 'grid3' }, ...p.skills.map((g) =>
      reveal(h('article', { class: 'card tilt' }, h('h3', {}, g.title), h('div', { class: 'chips' }, ...g.items.map(chip)))))));

export const experience: SectionBuilder = (p) =>
  h('section', { id: 'experience' }, heading('03.', 'Expérience'),
    h('div', { class: 'timeline' }, ...p.experiences.map((x) =>
      reveal(h('article', { class: 'card tl-item' },
        h('div', { class: 'row' }, h('h3', {}, `${x.role} · ${x.company}`), h('span', { class: 'mono muted' }, x.period)),
        h('p', { class: 'muted' }, x.place),
        h('ul', {}, ...x.points.map((t) => h('li', {}, t))))))));

export const projects: SectionBuilder = (p) =>
  h('section', { id: 'projects' }, heading('04.', 'Projets'),
    h('div', { class: 'grid3' }, ...p.projects.map((x) =>
      reveal(h('article', { class: 'card tilt project' },
        cover(x), h('h3', {}, x.name), h('p', { class: 'mono accent' }, x.subtitle),
        h('p', { class: 'muted' }, x.description),
        x.stack.length > 0 && h('div', { class: 'chips' }, ...x.stack.map(chip)),
        x.repo && h('a', { class: 'link', href: x.repo, target: '_blank', rel: 'noopener' }, 'Voir sur GitHub ↗'))))));

export const education: SectionBuilder = (p) =>
  h('section', { id: 'education' }, heading('05.', 'Formation'),
    h('div', { class: 'timeline' }, ...p.education.map((e) =>
      reveal(h('article', { class: 'card tl-item' },
        h('div', { class: 'row' }, h('h3', {}, e.title), h('span', { class: 'mono muted' }, e.period)),
        h('p', { class: 'muted' }, e.school))))));

export const contact: SectionBuilder = (p) =>
  h('section', { id: 'contact' }, heading('06.', 'Consultation & contact'),
    h('div', { class: 'grid2 contact' },
      reveal(h('div', { class: 'card' },
        h('h3', {}, 'Travaillons ensemble'),
        h('p', { class: 'muted' }, 'Ouvert aux stages, alternances, premiers postes et missions freelance en développement Full Stack.'),
        h('p', { class: 'row' }, h('b', {}, 'Email'), h('a', { class: 'link', href: `mailto:${p.email}` }, p.email)),
        h('p', { class: 'row' }, h('b', {}, 'Téléphone'), h('a', { class: 'link', href: `tel:${p.phone.replace(/\s/g, '')}` }, p.phone)),
        h('div', { class: 'cta' }, h('a', { class: 'btn primary', href: config.cv, download: '' }, 'Télécharger mon CV')))),
      reveal(consultForm(p.email))),
    h('footer', {}, `© ${new Date().getFullYear()} ${p.name}`));

export const toTop: SectionBuilder = () => h('button', { class: 'top-btn', id: 'top-btn', 'aria-label': 'Haut de page', html: '↑' });
