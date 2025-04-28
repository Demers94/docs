# Infrastructure actuelle

Nous avons présentement trois serveurs : 

- AWS_01 chez Amazon
- WHC et WHC_2 chez WHC

Presque tous les sites sont sur le serveur WHC. Le serveur AWS_01 sert pour l'envoi de courriel avec Aeromails et le serveur WHC_2 sert pour le SPOT uniquement.

Le serveur WHC est un très gros serveur avec beaucoup de puissance, mais il n'y a pas de scaling en place. Puisque tous les sites sont sur le même serveur, quand un site demande plus de "jus" ça impacte aussi les autres. S'il tombe down, alors tous les sites sont down.

Il n'y a pas d'infrastructure en place pour le scaling horizontal (load-balancing).

## Noms de domaines et DNS

::: tip Note
Confirmer ces infos avec JS
:::

La plupart des noms de domaines sont chez GoDaddy. Pour la gestion des DNS, ça semble aussi être soit sur GoDaddy ou sur Amazon.

## Laravel Forge

Laravel Forge est installé sur les serveurs et permet de gérer facilement les applications Laravel. La plupart des sites et outils sont codés en PHP avec le framework Laravel, et Forge nous permet facilement de : 

- Déployer des nouveaux sites (intégration avec Git, scripts de déploiements optimisés pour Laravel, etc)
- Runner des commandes, modifier les variables d'environnement
- Installer et renouveller automatiquement des certificats SSL
- Consulter les logs
- Configurer les workers et base de données
- Et plus encore

Nous avons besoin d'un outil comme Forge. Il existe des alternatives, mais sans Forge nous serions obligé de toujours nous connecter en ligne de commande pour faire les actions ci-dessus et c'est beaucoup moins évident surtout pour les non-développeurs.

Un point important à noter losqu'on utilise Forge : il faut éviter le plus possible de faire des interventions manuellement sur le serveur - **sauf si on est certain que c'est pour modifier des choses que Forge ne gère pas lui-même**. Si on modifie manuellement quelque chose que Forge gère normalement, il est possible qu'on cause des problèmes et que Forge ne soit plus "en sync" avec le serveur.

## Bases de données

Sur le serveur principal (WHC) : 

- aeroemploi_prod
- aerotalent
- aerotechnologie
- aerotechnology
- aeroweb_dev
- aeroweb_staging
- blcpa
- inscriptionuqac_prod
- mail_aeroemploi_prod
- mail_blcpa_prod
- mail_placementspot_prod
- placementspot_dev
- placementspot_prod
- scraping
- sms_aeroemploi_prod

Sur le serveur AWS_01 : 

- campaigns (pour Aeromails)

La plupart sont des BD MySQL mais il y a aussi deux bases de données Postgres (aerotalent et aeroweb).

Il faudrait faire un bon cleanup pour supprimer les BDs qui ne sont plus utilitées, afin de libérer de l'espace et simplifier la structure.

## Moteurs de recherche

### Typesense

Nous avons installé un moteur de recherche Typesense qui sert actuellement pour Aerotalent et qui va bientôt servir pour Aeroweb aussi.

### Meilisearch

Nous avons aussi un moteur de recherche Meilisearch qui est présentement utilisé par Aeroweb pour la banque de candidatures. Nous sommes en train de le remplacer par Typesense, le serveur Meilisearch pourra ensuite être supprimé.