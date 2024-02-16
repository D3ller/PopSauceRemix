# Questions pour un Buisson 🌳

## Présentation

"Questions pour un Buisson" est un jeu de questions-réponses en ligne axé sur l'écologie et la préservation de la planète. Conçu pour jouer entre amis ou en famille, il offre une expérience ludique et éducative, permettant d'en apprendre davantage sur des sujets environnementaux tout en s'amusant.

## Comment jouer ?

1. **Accédez au jeu** : Rendez-vous sur le site [Questions pour un Buisson]().

2. **Lancez une partie** : Une fois sur le site, commencez une nouvelle partie.

3. **Invitez des amis** : Partagez le code de la partie avec vos amis pour qu'ils puissent se joindre à vous.

4. **Choisissez vos thèmes** : Sélectionnez les thèmes des questions selon vos intérêts.

5. **Répondez aux questions** : Testez vos connaissances et gagnez des points. Le premier joueur à atteindre 100 points, ou celui avec le plus de points à la fin de la partie, gagne.

## Installation du projet

Pour installer et lancer le projet sur votre machine locale, suivez ces étapes :

### Prérequis

Assurez-vous d'avoir `npm` et `Node.js` installés sur votre ordinateur pour exécuter les commandes d'installation et de lancement du projet.

**Téléchargez Node.js** : Rendez-vous sur le site officiel de [Node.js](https://nodejs.org/) et téléchargez la dernière version de l'installeur.

### Installation

1. **Installer les dépendances** : Ouvrez un terminal et naviguez jusqu'aux dossiers `pop` et `API`. Exécutez la commande suivante dans chaque dossier pour installer les dépendances nécessaires :

```bash
npm install
```

2. **Installer nodemon** : Si vous ne l'avez pas déjà installé, exécutez la commande suivante pour installer nodemon globalement sur votre machine :

```bash
npm install -g nodemon
```

### Lancement du projet

**Pour le front-end dossier: (pop)** : Lancez le serveur de développement avec la commande :

```bash
npm run dev
```

**Pour le back-end dossier: (API)** : Lancez le serveur de développement avec la commande :

```bash
nodemon server.js
```

## Bugs

- [x] Rejoindre des rooms et en crée
- [ ] Gestions des questions
- [ ] Base de donnée NoSQL
- [ ] Gestion complète des sockets  

## Technologies utilisées

HTML5, CSS3, SCSS, JavaScript, Vue.js, Socket.io, Pinia, Express.js
