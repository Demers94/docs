# Limitations et améliorations possibles

Le système Aeromails a été développé assez rapidement (c'était initialement juste un prototype pour tester si on pouvait remplacer Mailcoach) et nous n'avons jamais vraiment prit le temps de designer l'architecture de l'application.

Il y a donc quelques limitations avec le système actuel - mais plusieurs améliorations possibles.

## Job qui fait l'envoi d'une campagne

Quand on clique sur Envoyer, c'est d'abord une grosse job `SendCampaignV2Job` qui est dispatch. C'est ensuite cette job là qui est responsable de tout générer le reste des jobs, ce qui ultimement correspondra à des centaines de milliers de jobs additionnels pour les grosses campagnes.

Par conséquent, cette job prend beaucoup de temps à s'executer. Puisque toutes les jobs (à l'exception du processing des stats) sont dans la même queue (`default`), les workers se pilent un peu sur les pieds et on commence à envoyer des courriels avant même d'avoir terminé de créer tous les envois dans la BD. On a donc un problème avec les stats qui ne sont pas tout le temps correctes, et le % de progression monte et descend.

### Amélioration possible

Retravailler notre approche pour faire les tâches en étapes : 

1. Création de tous les sends dans la BD
2. Ensuite on commence à faire l'envoi

Ça serait aussi une bonne occasion d'optimiser le code pour s'assurer que cette job se fasse le plus rapidement possible. On ne devrait pas avoir une très grosse job qui prend plusieurs minutes à runner, si ça plante en cours de route on se retrouve avec juste la moitiée des envois qui sont créés, etc. C'est mieux d'avoir plusieurs petites jobs et de faire les choses en étape.

## Système de proxy pour les URLs

On utilise le proxy `click.email.aeromails.ca` pour éviter de surcharger nos sites (Aeroemploi) quand on fait l'envoi de campagnes avec beaucoup de liens.

En ce moment il y a juste une page qui utilise le proxy (Employeurs de la semaine sur Aeroweb). Si tu copy/paste un template de quelque part d'autre, ça n'utilisera pas le proxy par défaut.

Idéalement, il faudrait que le système de proxy soit utilisé automatiquement pour tous les liens dans l'application. Au moment de créer le campagne, analyse le template pour y extraire tous les liens, et on remplace l'URL de destination pour utiliser le proxy.

## Statistiques

Sur la page des détails d'une campagne, on affiche les statistiques suivantes : 

- Ouverts
- Ouverts uniques
- Clics
- Clics uniques
- Information sur les clics

Pour l'information sur les clics, on inclut uniquement le top 10 des résultats.

Ça pourrait être bien d'avoir toutes les statistiques dans une section dédiée (ex: `/campagnes/70/stats`) et de pouvoir consulter toutes les infos, rechercher, etc.

En ce moment si on veut des détails il faut écrire des requêtes SQL manuellement pour générer les données dont on a besoin.

## Annulation de l'envoi d'une campagne

Quand on clic sur Annuler, on modifie le statut de la campagne pour `cancelled`. Par contre, toutes les jobs sont encore dans la base de données et les workers doivent quand même les process une par une. Au début de chaque job on vérifie si la campagne est à `cancelled` et si c'est le cas, on arrête et on ne fait pas l'envoi.

Si on imagine un scénario où : 

1. Tu crées et envois une campagne A, envoyé à 200K abonnés
2. Après quelques minutes, tu annules l'envoi
3. Tu crées et envois une campagne B, envoyé aux mêmes 200K abonnées

... alors l'envoi de la campagne B ne commencera pas avant potentiellement plusieurs heures, avant que les workers aient fini de process toutes les jobs qui sont dans la BD pour la campagne A qui est été annulée.

On pourrait améliorer ce système en ajoutant un mécanisme qui permet de supprimer les jobs de la base de données lorsqu'on annule l'envoi d'une campagne. Par défaut Laravel ne permet pas de supprimer juste certaines jobs de la base de données, mais on peut modifier le code pour supporter ça.