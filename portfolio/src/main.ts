import './styles/main.css';
import { profile } from './data/profile';
import { nav, hero, marquee, stats, about, skills, experience, projects, education, contact, toTop, type SectionBuilder } from './sections';
import { initReveal, initScroll, initPointer, initTheme, initCounters, initMagnetic, initParallax, initTopButton, particles } from './lib/effects';

const sections: SectionBuilder[] = [nav, hero, marquee, stats, about, skills, experience, projects, education, contact, toTop];

function bootstrap(): void {
  const app = document.getElementById('app');
  const bar = document.getElementById('progress');
  if (!app || !bar) throw new Error('Conteneur introuvable');
  sections.forEach((build) => app.append(build(profile)));
  initTheme(document.getElementById('theme') as HTMLButtonElement);
  initReveal(); initScroll(bar); initPointer(); initCounters(); initMagnetic(); initParallax(); initTopButton();
  const canvas = document.querySelector<HTMLCanvasElement>('canvas.particles');
  if (canvas) particles(canvas);
}
bootstrap();
