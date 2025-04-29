# Risques et limitations de l'infrastructure actuelle

## Manque de documentation, beaucoup de systèmes qui dépendent d'une seule personne 

Beaucoup de nos systèmes et outils ne sont pas bien documenté. On dépend souvent d'une seule personne pour faire des modifications, et si une panne survient pendant que Charles ou Jean ne sont pas disponible, c'est très dur pour le soutient technique de comprendre notre infrastructure pour pouvoir nous aider à régler les problèmes.

La plupart des sites ont été développé par Charles et bien que nous ayons de la documentation pour certaines nouvelles fonctionnalités, il n'y a pas de documentation complète sur la structure des différents sites. C'est très mêlant pour un contracteur qui se joint à l'équipe de comprendre les distinctions entre Aeroweb, Aeroemploi, Aerotalent, etc.

Jean a aussi développé plusieurs outils (scraping offres avec IA, micro-service Twilio, scraping de candidats) qui ne sont pas documenté, c'est très dur pour Charles ou un autre programmeur de faire des modifications. C'est encore plus difficile quand ces services n'utilisent pas les mêmes technologies que les autres sites (ie, Laravel) car on ne peut pas utiliser Forge pour faire des déploiements, lancer des commandes, etc.

C'est précisement ce point que tente d'adresser le présent document !

## Trop de sites qui sont sur un même serveur

Au début nous avions seulement Aeroemploi et quelques micro-sites sur le serveur. Ensuite nous avons ajouté Aeroweb et remplacé la BD Aeroemploi par des appels d'API, et nous avons développé d'autres micro-sites (Transat, Airbus, Bombardier, etc). Au fur et à mesure que nos besoins évoluent nous développons des nouveaux outils comme Aerotalent et Aeromails, et on met tout sur le même serveur encore une fois.

Même si le serveur est très puissant ça commence à faire pas mal de stock, et les différents sites se "battent" pour des ressources. Il n'est pas rare d'avoir des ralentissements ou du downtime pendant l'envoi de campagnes courriels, ou quand des CRON jobs plus lourd roulent - c'est pourquoi on tente de rouler tout ce qu'on peut la nuit.

Ça introduit aussi des problèmes quand on doit mettre à jour des outils. Ce n'est pas toujours facile d'utiliser des nouvelles versions de PHP ou de NodeJS s'il y a des sites sur le serveur qui ne sont pas à jour.

## Pas de scaling possible

Ce qui nous amène au point qu'il n'y a pas de scaling (horizontal) possible. L'idéal serait d'avoir des petits serveurs moins coûteux pour les périodes plus tranquilles, avec un système qui est en mesure de scaler automatiquement pour les peaks de trafic ou de demande. Nous avons exploré cette option dans le passé, mais nous sommes revenus à l'ancienne méthode rapidement après avoir eu des problèmes.

## Pas (assez) de procédures en place 

Ça touche au même point que le manque de documentation, mais nous n'avons de procédures en place en cas de panne, de fuites de données, d'attaques, etc.

Si une gros panne survient pendant que JS est en déplacement et non rejoignable, c'est à peu près impossible pour Charles et Jean de régler le problème (à moins que ça soit un problème spécifique dans le code). Nous n'avons pas les informations de contact des personnes ressources et nous n'avons pas tous les accès pour se connecter aux différentes plateformes.

Même chose si c'est un problème technique qui survient suite à une mise à jour et que les programmeurs en sont pas là pour le régler : c'est à peu près impossible pour JS de faire des rollbacks, restaurer des backups, mettre les sites en mode maintenance, etc. Le seul recours est souvent d'appeler le support WHC, et ça peut prendre des heures avant que le problème soit réglé.

## Pas de cédule de maintenance pour les sites

À chaque année il sort de nouvelles versions des outils dont dépendent nos sites : 

- PHP (la plupart des sites sont sur 8.1 et 8.2, la dernière version est 8.4)
- Laravel (la plupart des sites sont sur 8-9, la dernière version est 12)
- Vue
- TailwindCSS

Nous n'avons pas de cédule de maintenance et ne dédions pas de temps à mettre à jour ces versions de nos outils, sauf au moment de faire des mises à jour pour ajouter des fonctionnalités. Ça complique souvent ces mises à jour quand on doit mettre à jour plusieurs versions de plusieurs outils en même temps.

Éventuellement on se retrouve avec des versions qui ne sont plus supportées par les développeurs de ces outils et nous nous retrouvons sans mises à jour de sécurités (c'est le cas pour les anciennes versions Laravel et Vue que certains sites utilisent).

C'est _beaucoup_ plus facile de faire des mises à jour au fur et à mesure, une fois par année pour chaque site, plutôt que d'attendre et de se retrouver avec un backlog de 4-5 versions à mettre à jour.

## Pas de monitoring en place

Quand un site tombe down, on s'en rend compte uniquement parce JS s'en apercoit ou c'est un client incommodé qui nous informe.

Nous n'avons pas d'outils en place pour nous envoyer des alertes, et nous n'avons souvent pas assez d'information pour bien diagnostiquer les problèmes au niveau serveur.