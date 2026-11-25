import type { Project } from '../types';
import { h } from '../lib/dom';

/** Aperçu du projet : capture réelle si /public/projects/xxx.png existe, sinon maquette générée. */
export function cover(p: Project): HTMLElement {
  const el = h('div', { class: 'cover', style: `--c:${p.accent}` },
    h('div', { class: 'bar', html: '<i></i><i></i><i></i>' }),
    h('div', { class: 'mock' }, h('span', { class: 'emoji' }, p.icon), h('b', {}, p.name), h('div', { class: 'lines', html: '<i></i><i></i><i></i>' })));
  if (p.image) {
    const img = h('img', { src: p.image, alt: `Aperçu du projet ${p.name}`, loading: 'lazy' });
    img.addEventListener('error', () => img.remove());
    el.append(img);
  }
  return el;
}
