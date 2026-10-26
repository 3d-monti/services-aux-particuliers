/* Numéro construit seulement après une action volontaire du visiteur.
   Obfuscation anti-scraping basique : le code côté navigateur ne constitue pas un secret. */
(() => {
  const button = document.getElementById('assist-call');
  const result = document.getElementById('assist-call-result');
  if (!button || !result) return;

  function contactNumber() {
    // Deux chiffres par groupe. Un décalage empêche la présence du numéro en clair dans le fichier.
    const groups = [[15, 21], [20, 16], [19, 24], [15, 23], [21, 15]];
    const compact = groups.flat().map(value => String(value - 15)).join('');
    return {
      display: compact.replace(/(\d{2})(?=\d)/g, '$1 ').trim(),
      dial: '+33' + compact.slice(1)
    };
  }

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      result.replaceChildren();
      result.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Demander par téléphone';
      return;
    }

    const number = contactNumber();
    const link = document.createElement('a');
    link.className = 'assist-phone-link';
    link.href = 'tel:' + number.dial;
    link.textContent = number.display;
    link.setAttribute('aria-label', 'Appeler le ' + number.display);

    result.replaceChildren(document.createTextNode('Téléphone : '), link, document.createTextNode(' — touchez le numéro pour appeler.'));
    result.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    button.textContent = 'Masquer le numéro';
  });
})();
