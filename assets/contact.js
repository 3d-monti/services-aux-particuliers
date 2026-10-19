(() => {
  const form = document.getElementById('contact-form');
  const subject = document.getElementById('objet');
  const message = document.getElementById('message');
  if (!form || !subject || !message) return;

  const choices = {
    distance: ['Assistance informatique à distance', 'Bonjour, je souhaite une assistance informatique à distance.\n\nMon besoin : '],
    domicile: ['Intervention à domicile', 'Bonjour, je souhaite une intervention à domicile.\n\nMon besoin et ma commune : '],
    depot: ['Dépôt de matériel', 'Bonjour, je souhaite déposer du matériel pour un diagnostic.\n\nLe matériel et le problème rencontré : '],
    formation: ['Formation informatique', 'Bonjour, je souhaite une formation informatique.\n\nLe sujet et mon niveau actuel : '],
    web: ['Internet et services web', 'Bonjour, je souhaite parler d’un projet web.\n\nMon projet : '],
    autre: ['Autre demande', 'Bonjour, je souhaite vous contacter au sujet de : ']
  };
  let generated = '';
  function choose(key) {
    if (!Object.hasOwn(choices, key)) return;
    const [label, draft] = choices[key];
    subject.value = label;
    if (!message.value.trim() || message.value === generated) {
      generated = draft;
      message.value = draft;
    }
    message.setCustomValidity('');
  }
  subject.addEventListener('change', () => {
    const key = Object.keys(choices).find(k => choices[k][0] === subject.value);
    if (key) choose(key);
  });
  message.addEventListener('input', () => message.setCustomValidity(''));
  form.addEventListener('submit', event => {
    if (generated && message.value.trim() === generated.trim()) {
      event.preventDefault();
      message.setCustomValidity('Ajoutez quelques détails à votre message.');
      message.reportValidity();
    }
  });
  const requested = new URLSearchParams(location.search).get('prestation');
  if (requested) choose(requested);
})();
