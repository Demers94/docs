# Performance et disponibilité

## Surveillance et alertes

Nous n'avons présentement pas de surveillance automatique en place pour nous aviser quand un site "tombe down". C'est généralement JS qui s'en rend compte après avoir reçu des plaintes des clients. Certains sites dans Forge ne sont plus accessibles depuis plusieurs jours, semaines (ou mois possiblement) et nous ne somme pas alerté.

Lorsqu'un problème se produit, la procédure pour débugger consiste généralement à envoyer un message à la personne concernée sur Slack, ouvrir un ticket sur Basecamp et attendre d'avoir des informations supplémentaires. Les développeurs peuvent ensuite se connecter à Forge pour aller chercher les logs des sites. Ce ne sont pas tous les problèmes qui apparaissent dans les logs.

Pour certains sites, [Sentry](https://sentry.io/welcome/) est configuré pour envoyer des alertes courriels quand un nouveau bug est détecté. On peut aussi voir plus de détails sur le problème. En ce moment, les courriels sont envoyés à Charles uniquement et il est le seul à s'en servir. Sentry n'est pas configuré pour tous les sites.

## Temps de réponse des sites

Forge envoit des alertes lorsque le "CPU usage" atteint certaines valeurs, mais c'est la seule information qu'on peut avoir. Nous ne sommes pas avisé quand le temps de réponse moyen augmente, ou quand un site est inaccessible même si le serveur est opérationnel.

Il y a deux facteurs qui affectent beaucoup le temps de réponse des sites : 

1. Presque tous les sites sont sur un même serveur (WHC). C'est un serveur très puissant, mais puisque les ressources sont partagées entre les sites, si un des sites prend plus de ressource alors ça affecte tous les autres aussi

2. L'envoi de campagnes de courriels, surtout quand c'est un courriel qui contient beaucoup de lien vers Aéroemploi ou un autre de nos sites, cause très souvent du downtime sur Aeroemploi et Aeroweb. Nous soupconnons que c'est un service extrene (ex: Outlook) qui fait des requêtes à toutes les URLs inclus, pour scanner pour les virus ou générer des previews. Puisque le site Aeroemploi fait des dizaines de requêtes à Aeroweb, on se retrouve rapidement avec des milliers de requêtes par secondes ce qui impact le serveur

::: tip Note
C'est juste un théorie en ce moment, nous n'avons jamais réussi à confirmer que c'était la raison pour laquelle l'envoi de courriel affectait Aeroemploi. Nous avons migré l'application en charge de l'envoi sur un serveur à part, et nous avons développer un système de proxy de liens (click.email.aeromails.ca) pour tenter de régler ce problème.
:::

## Scalabilité

Nous avons trois serveurs différents, mais chacun à ses propres responsabilités et nous n'avons pas la possibilité de faire du scaling horizontal. Si un site demande soudainement plus de ressource, la seule option est de faire du scaling vertical et de prendre un plus gros serveur. C'est très couteux et ne peut pas être fait rapidement.

Nous avons testé une approche de load-balancing dans le passé, mais suite à des mauvaises experiences nous avons retourné vers l'approche "grosse bertha". Ça a fonctionné pendant un temps mais nous commencons à voir les limitations du modèle actuel.

## Charge sur les sites

La plupart des sites n'ont pas de bases de données et ne recoivent pas beaucoup de trafic.

Les sites qui demandent le plus de ressources sont : 

- Aeroemploi : beaucoup de visiteurs simultanés, évènements clavardages qui causent des spikes de visites, envoi de campagnes courriels qui génèrent beaucoup de requêtes

- Aeroweb : C'est le site le plus sollicité car nous avons une dizaine de sites qui font tous appel à l'API de Aeroweb pour aller chercher les infos. Pas beaucoup de visiteurs sur le site en même temps (relativement), mais beaucoup de requêtes à cause des autres sites. Il y a aussi beaucoup de scripts automatisés qui utilisent des ressources (CRON jobs, flux XML, scraping, etc)

- Aeromails : le site à très peu de visiteurs (seulement JS s'en sert, et ensuite les désabonnements lors de l'envoi de campagnes) mais c'est un site qui est responsable d'envoyer des centaines de milliers de courriels. Nous utilisons le système de queues de Laravel, on se retrouve souvent avec 300-400K+ jobs dans la BD au moment de l'envoi d'une campagne

- PlacementSPOT : Similaire à Aeroweb/Aeroemploi. Il est sur son propre serveur (WHC_2) et ne se retrouve donc que très rarement impacté par les problèmes des autres sites

À part ces 4 là, la majorité des sites pourraient être hébergé sur un "droplet" DigitalOcean à 5$/mois et ça serait assez.