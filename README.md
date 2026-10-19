# DM Études et Méthodes — services et tarifs pour les particuliers

Site statique indépendant pour `https://services-aux-particuliers.montironi.fr/`. HTML/CSS avec le script de thème clair/sombre repris du site principal ; formulaire sur une page `contact.html` distincte, et aucun paiement automatique. Le formulaire utilise son propre point de réception Form.taxi et un champ `origine` pour identifier les demandes.

## Avant publication

Lire et traiter **VALIDATION-AVANT-PUBLICATION.md**. La balise `noindex` est volontaire tant que ces points ne sont pas résolus. Ne pas publier comme offre commerciale finale avec la mention « à compléter » du pied de page. Une validation par le professionnel des tarifs, de la situation fiscale, des coordonnées légales, de la médiation et des CGV est indispensable.

## Formulaire de contact

La page d’accueil présente tous les tarifs, sans formulaire. `contact.html` reprend la structure de la page Contact du site principal et envoie vers le nouveau point de réception dédié. Les liens de chaque prestation y présélectionnent l’objet et préparent un début de message modifiable. Les champs nom et e-mail restent vides. Le formulaire envoie par POST vers le point dédié `https://form.taxi/s/ckeej8k7`. Le lien « Contact » dans la navigation mène à `contact.html` depuis toutes les pages. Avant la mise en ligne, vérifier dans Form.taxi que `services-aux-particuliers.montironi.fr` est autorisé si une restriction de domaine est activée ; sinon les demandes peuvent être classées comme spam. Vérifier aussi les notifications, le champ piège `site_web` selon le réglage de ce nouveau formulaire et réaliser un envoi de test après publication. La copie de confidentialité contient des formulations inachevées et décrit un champ « entreprise » qui n’est pas présent dans le nouveau formulaire : corriger ces points avant publication, après validation par le propriétaire.

## Déploiement dans un dépôt distinct

1. Créer un **nouveau dépôt public GitHub** (par exemple `services-aux-particuliers`). Il doit être distinct du dépôt de `www.montironi.fr`.
2. Ajouter à la **racine** du nouveau dépôt le contenu de ce dossier (`index.html`, `CNAME`, `.nojekyll`, `robots.txt`, `assets/`, etc.). Si vous téléversez l’archive ZIP sur GitHub, il faut d’abord la décompresser ; GitHub Pages ne sert pas directement un ZIP.
3. Dans **Settings → Pages → Build and deployment**, choisir **Deploy from a branch**, puis `main` et `/ (root)` ; enregistrer. Dans **Custom domain**, saisir `services-aux-particuliers.montironi.fr` et enregistrer. Le fichier `CNAME` fourni contient déjà ce domaine.
4. Chez IONOS, dans la zone DNS de `montironi.fr`, créer **un seul enregistrement CNAME** : hôte/sous-domaine `services-aux-particuliers` ; cible `<nom-du-compte-GitHub>.github.io`. Remplacer la cible par le domaine Pages de votre compte, **sans nom de dépôt, protocole ou barre oblique**. Ne pas modifier les enregistrements de `www` ou du domaine racine. En cas d’enregistrement existant pour ce sous-domaine, vérifier le conflit avant d’en créer un autre.
5. Attendre la propagation, contrôler le DNS (`nslookup -type=CNAME services-aux-particuliers.montironi.fr`), puis la page Pages. Cocher **Enforce HTTPS** quand l’option devient disponible (cela peut prendre jusqu’à 24 h). Visiter l’URL `https://services-aux-particuliers.montironi.fr/`, vérifier le cadenas et l’absence d’alerte de certificat.
6. Après validation juridique et retrait de l’avertissement légal visible, remplacer `<meta name="robots" content="noindex,follow">` par `index,follow` dans `index.html`. Le `robots.txt` laisse les robots lire la page afin qu’ils voient cette directive. Vérifier alors le titre, la description et la carte de partage.

GitHub Pages sert normalement le site public depuis un dépôt public avec l’offre gratuite. L’émission du certificat et le test HTTPS réel nécessitent que GitHub Pages et le DNS soient configurés.

## Vérification locale

Dans le dossier décompressé :

```bash
python -m http.server 8000
```

Ouvrir `http://localhost:8000/` sur ordinateur et avec les outils de développement en largeur 390 px. Tester les liens vers Contact et les différents préremplissages, la lecture de toutes les cartes, l’absence de défilement horizontal et le zoom à 200 %.

## Fichiers

- `index.html` : contenu, métadonnées SEO et Open Graph.
- `contact.html` : copie adaptée de la page Contact du site principal, formulaire et nouveau point Form.taxi.
- `assets/style.css` : feuille de style du site principal ; `assets/tarifs.css` : ajouts pour la grille tarifaire.
- `assets/logo-dm.png` et `assets/favicon.png` : éléments issus du site principal.
- `assets/partage.png` : aperçu social local, sans ressource externe.
- `assets/main.js` : bascule du thème comme sur le site principal ; `assets/contact.js` : présélection et message suggéré.
- `confidentialite.html` et `mentions-legales.html` : textes repris du site principal, avec navigation adaptée au page de contact distincte.
- `CNAME` : nom d’hôte personnalisé.
- `.nojekyll` : diffusion statique directe.
- `VALIDATION-AVANT-PUBLICATION.md` : points commerciaux et juridiques à trancher.

Documentation officielle : [domaine personnalisé GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [CGV consommateurs](https://entreprendre.service-public.gouv.fr/vosdroits/F33527), [mentions obligatoires du site](https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter).
