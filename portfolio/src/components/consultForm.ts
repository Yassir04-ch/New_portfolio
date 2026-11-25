import { h } from '../lib/dom';
import { config } from '../data/config';

const TOPICS = ['Consultation technique', 'Opportunité de stage / emploi', 'Projet freelance', 'Autre'];

export function consultForm(email: string): HTMLFormElement {
  const status = h('p', { class: 'status', 'aria-live': 'polite' });
  const btn = h('button', { class: 'btn primary', type: 'submit' }, 'Envoyer la demande');
  const field = (label: string, control: HTMLElement) => h('label', { class: 'field' }, h('span', {}, label), control);
  const form = h('form', { class: 'card form' },
    h('h3', {}, 'Demander une consultation'),
    h('div', { class: 'two' },
      field('Nom', h('input', { name: 'name', type: 'text', required: '', placeholder: 'Votre nom', autocomplete: 'name' })),
      field('Email', h('input', { name: 'email', type: 'email', required: '', placeholder: 'vous@exemple.com', autocomplete: 'email' }))),
    h('div', { class: 'two' },
      field('Sujet', h('select', { name: 'topic' }, ...TOPICS.map((t) => h('option', { value: t }, t)))),
      field('Date souhaitée', h('input', { name: 'date', type: 'date' }))),
    field('Message', h('textarea', { name: 'message', rows: '5', required: '', placeholder: 'Décrivez votre besoin…' })),
    btn, status);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    status.className = 'status'; btn.disabled = true;
    if (!config.formEndpoint) {
      const body = `Nom : ${data.name}\nEmail : ${data.email}\nDate souhaitée : ${data.date || '—'}\n\n${data.message}`;
      location.href = `mailto:${email}?subject=${encodeURIComponent(`${data.topic} — ${data.name}`)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Ton application mail va s’ouvrir avec le message pré-rempli.';
      btn.disabled = false;
      return;
    }
    try {
      const r = await fetch(config.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(String(r.status));
      form.reset(); status.textContent = '✓ Merci ! Votre demande a bien été envoyée, je reviens vers vous rapidement.'; status.classList.add('ok');
    } catch {
      status.textContent = `Une erreur est survenue. Écrivez-moi directement à ${email}.`; status.classList.add('err');
    } finally { btn.disabled = false; }
  });
  return form;
}
