# Introduction

## Objectif du document

Le but du document est de : 

- Faire un inventaire de tous les sites et outils que nous utilisons
- Documenter les procédures pour la gestion de ceux-ci
- Bien comprendre notre infrastructure actuelle pour pouvoir prendre des décisions informées pour améliorer les performances de nos systèmes, faciliter la collaboration et minimiser les risques 


## Contexte de l'analyse

Il y a quelques semaines nous avons eu des problèmes avec notre serveur principal hébergé chez WHC. Des modifications faites de leur côté ont impactés nos sites, certains d'entre eux ont été "down" pendant plusieurs jours. 

Après beaucoup d'effort et l'intervention de plusieurs personnes nous avons finalement réussi à remettre ça fonctionnel, mais nous avons encore des problèmes (ex: SSL, caching, services qui tombent "down" sans raison) même après des semaines.

Cette panne nous a fait réaliser l'importance d'avoir une bonne compréhension de notre infrastructure et d'avoir une documentation solide et à jour.

Nous voulons aussi revoir notre infrastructure actuelle pour déterminer si une meilleure approche ferait plus de sens pour réduire les coûts et améliorer la fiabilité des services.