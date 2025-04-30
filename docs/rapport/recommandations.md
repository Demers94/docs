# Recommandations

Maintenant que nous avons identifié les plus gros problèmes, voici des pistes de solution pour les régler ! 

## Mettre en place une documentation en ligne

Avoir une documentation accessible en ligne qui inclut : 

- Explication et vue d'ensemble de notre infrastructure
- Toutes les procédures nécessaires pour opérer les sites
- Explications plus en détails sur le fonctionnement de certains outils plus complexes (Aeroemploi <-> Aeroweb, Aerotalent, micro-services, etc)

Nous avons utilisé Basecamp par le passé pour documenter certaines fonctionnalités, mais je pense que c'est une meilleure idée d'avoir un site dédié. Une sorte de Wiki, ou "Bible de l'infrastructure" (merci JS pour le nom 😊). Je vois deux gros avantages : 

- On peut plus facilement donner accès à la documentation, c'est juste un lien à partager. On peut le protéger par mot de passe, mais c'est quand même plus simple que de devoir inviter tout le monde sur Basecamp (WHC, contracteurs, support Forge, etc)
- On peut avoir une vue d'ensemble à une seule place. C'est plus facile de se déplacer dans un site comme celui-ci plutôt que de devoir fouiller à travers 10 projets Basecamp. On a une barre de recherche qui permet de trouver rapidement ce qu'on cherche.

J'ai utilisé [VitePress](https://vitepress.dev/) pour écrire ce rapport au lieu d'utiliser un Google Docs ou Basecamp, principalement pour pouvoir tester cet outil. C'est très facile à utiliser et configurer, et avec une bonne documentation les utilisateurs moins techniques vont aussi être en mesure de contribuer.

## Faire un cleanup des sites actuels

Comme on peut voir dans la section [Détails des sites web](./details-sites.md) il y a beaucoup de sites qui ne servent plus ou ne fonctionnent plus.

Ça va être important de faire un cleanup _avant_ de modifier tout notre setup au niveau serveur. Chaque site qu'on peut supprimer est du travail de moins à le migrer par la suite.

## Développer un plan pour améliorer l'infrastructure serveurs

Avec l'aide d'un expert AWS comme Dylan et de l'input de Jean, Charles et JS, développer un plan pour améliorer notre infrastructure pour focuser sur ces points : 

- Minimiser les coûts. Utiliser juste les ressources dont on a besoin (éviter le "overprovisionning")
- Maximiser la robustesse de l'infrastructure. Scaling automatique pour éviter qu'un site tombe down si le trafic explose temporairement. Ça vaudrait la peine de considérer sérieusement une approche de scaling horizontal avec load-balancing je crois

.. le tout en documentant toutes les procédures pour se connecter, redémarrer les serveurs, gestions de certificats SSL, monitoring, etc.

## Mettre en place une cédule de maintenance

Les nouvelles versions de Laravel sortent environ une fois par année (versions majeures, on peut faire les mises à jour mineurs en cours de route sans trop affecter les sites). Les nouvelles versions de PHP sortent aux ans ou deux, même chose pour TailwindCSS.

Quand une nouvelle version de Laravel sort, se réserver du temps pour mettre à jour **tous** les sites que nous maintenons. La plupart des updates se font en moins d'une heure, et une fois qu'on l'a faite sur un des sites c'est encore plus facile de l'ajouter sur un autre.

Je pense que si on prend une journée ou deux par _année_ pour se mettre à jour sur tous les sites en même temps, on va se sauver énormément de temps à la longue.

Ça facilite aussi beaucoup le développement si tous les sites utilisent les mêmes versions de Laravel, Vue, Tailwind, etc.

::: tip Suggestion
Une fois le cleanup des sites fait dans Forge, ça va être plus facile d'estimer le temps requis.

Ce que je propose :

- En premier, on se réserve ~1 semaine pour mettre à jour _tous_ les outils existants
- Ensuite, quand une nouvelle version d'un outil est released, on se réserve une ou deux journées pour faire le tour des sites
:::

### Mises à jour automatiques

Il existe un outil qui permet de faire les mises à jour automatiquement : [Laravel Shift](https://laravelshift.com/)

Je l'ai déjà utilisé par le passé, c'est utile dans certains cas quand les mises à jour sont complexes. On peut sauver beaucoup de temps car l'outil modifie les fichiers (on le connecte à nos repos Git) et ensuite on peut vérifier les modifications et faire nos tests.

## Mettre en place des outils pour le monitoring/debugging

### Uptime monitoring

Utiliser un service comme [Oh Dear](https://ohdear.app/) pour faire le monitoring de nos sites. ce genre d'outil peut nous avertir quand : 

- Un site n'est plus accessible ("tombe down")
- Il y a un problème de SSL
- Il y a des liens sur le site qui ne fonctionnent pas
- Quand les performances se dégradent/ralentissement

S'assurer que les alertes sont envoyés à tous les membres de l'équipe concernés, pour que tout le monde soit rapidement sur la même page et pour éviter à JS de jouer au "téléphone".

### Monitoring spécifiquement pour Laravel

L'équipe Laravel est en train de développer [Nightwatch](https://nightwatch.laravel.com/) qui devrait être released au mois de mai 2025. C'est un outil extrene qu'on peut linker facilement à nos sites (via Forge) pour ensuite voir des détails sur : 

- Les requêtes qui échouent (erreurs 5XX, 4XX)
- Temps des requêtes, requêtes HTTP et SQL qui sont lentes
- Erreur avec les scheduled jobs, queue workers, CRON jobs

Le pricing n'est pas annoncé encore, mais on pourra l'essayer pour un mois sur un de nos sites et voir si ça ajoute de la valeur.

### Monitoring des erreurs (Sentry, Bugsnag)

Ces outils peuvent nous avertir automatiquement quand une nouvelle erreur se produit. On peut s'y connecte et voir plus de détails que les logs Forge pour débugger un problème. On voit aussi des détails sur l'utilisateur qui a eu le problème (IP, navigateur utilisé, autres informations utiles pour identifier l'entreprise ou utilisateur spécifique pour mieux debugger).

[Sentry](https://sentry.io/welcome/) a une bonne intégration avec Forge, c'est ce que j'utilise en ce moment pour Aeroweb. On pourra regarder si Nightwatch répond à tous les besoins, possible que ça nous suffice.

# Long-terme

Je pense qu'à court terme la priorité devrait vraiment être d'avoir une infra stable et d'une excellente compréhension de celle-ci. Il faut pouvoir mettre notre focus sur les autres parties de la business sans être obligé de s'arrêter à toutes les semaines pour éteindre des feux parce que l'infrastructure actuelle n'est pas robuste.

Une fois qu'on aura des fondations solides, on pourra continuer d'améliorer notre setup.

## Gestion des accès

Il faut trouver une alternative pour éviter d'avoir à s'envoyer des accès sur Slack ou Basecamp pour se connecter aux différents outils. Il faut aussi revoir nos politiques d'accès aux différents systèmes, et s'assurer que nous utilisions les méthodes les plus robustes et sécuritaires pour se connecter aux différents outils.

- Password manager : utiliser un outil comme [1Password](https://1password.com/) ou [Dashlane](https://www.dashlane.com/) pour sauvegarder les identifiants. Donner accès seulement aux bonnes personnes, changer les mots de passe actuels qui ne sont pas sécures

- Désactiver la connexion par mot de passe aux bases de données et autres services exposés à l'internet - utilisé seulement des clés SSH

- Améliorer le logging pour les tentatives de connexion et les actions faites sur les différents sites (identifier les attaques contre un compte en particulier, être capable de voir les actions qu'un utilisateur a fait s'il y a des problèmes, etc)

## Caching des pages / assets

Pour un site comme Aéroemploi où les utilisateurs n'ont pas de comptes et que tout le monde voit la même page, on peut utiliser du caching plus agressif pour servir le contenu de la page sans même avoir à faire de requête à notre propre serveur.

Ça serait bon aussi de mettre en place un [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) pour servir les requêtes d'images et de vidéos. Pour les logos des entreprises par exemple, ça ne change pas de requête en requête, c'est le même logo pour tout le monde. Si on peut avoir un CDN qui sert les requêtes sans avoir à faire appel à notre propre serveur, on sauve des ressources.