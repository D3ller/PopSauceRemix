# Installation

- Récupérer le projet (git clone ou téléchargement).
- Installer les dépendances (composer install).
- Dupliquer le fichier .env et le renommer en .env.local
  
/!\ Si vous êtes sous docker, configurez la base de données correctement et le  fichier symfony.conf pour ajouter l'alias de ce nouveau projet.

- Créez la base de données (`bin/console doctrine:database:create`) puis les migrations (`bin/console doctrine:schema:update -f`).
- Testez si tout fonctionne bien en affichant la page d'accueil du projet.

Un CRUD minimaliste est mis en place. Testez les URL suivantes :

- /article
- /fournisseur

Ajoutez quelques éléments dans les deux tables.
