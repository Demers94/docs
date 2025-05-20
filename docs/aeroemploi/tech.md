# Détails techniques

## Technologies utilisées

L'application Aéroemploi est développée avec les technologies suivantes :

-   Back-end Laravel (v.12)
-   Front-end Vue 3 et TailwindCSS 3, avec [InertiaJS](https://www.inertiajs.com/)
-   Typesense (v.28) pour la recherche des emplois, formations, évènements

## Architecture

Le site ne possède pas de base de données. Pour aller chercher les détails des postes et sauvegarder les nouvelles applications, on utilise un API offert par la plateforme Aeroweb.

## Recherche Typesense

Depuis le mois de mai 2025, le site interface avec le moteur de recherche Typesense pour aller chercher la liste des postes, formations et évènements. Typesense remplace le moteur de recherche Meilisearch qui a servit pour quelques années, et maintenant on ne fait plus d'appels au back-end Aeroweb du tout pour rechercher les offres.

Quand on clique sur les détails d'un poste, on fait à ce moment là une requête à l'API Aeroweb pour aller chercher les détails.

Typesense est installé sur notre serveur WHC_1.

### Clés de recherche

Puisque la recherche Typesense se fait maintenant "client-side", ça veut dire que les utilisateurs peuvent modifier le code Javascript pour accéder aux données qui sont sur Typesense.

Pour limiter les accès, nous utilisons des clés d'API "search only" qui sont générés via le dashboard admin d'Aeroweb. Ces clés permettent uniquement de faire des recherches.

### Configuration

La configuration se fait via des variables d'ENV :

```
TYPESENSE_SEARCH_KEY=XXX
TYPESENSE_HOST=typesense.zeustechnologie.com
TYPESENSE_PORT=443
TYPESENSE_PROTOCOL=https

SCOUT_OFFERS_INDEX_NAME=aeroweb_production_offers
SCOUT_FORMATIONS_INDEX_NAME=aeroweb_production_formations
SCOUT_EVENTS_INDEX_NAME=aeroweb_production_events
```

Puisqu'il y a un seul serveur Typesense pour les différents sites (Aeroweb, Aeroemploi, Aerotalent) on utilise des préfixes sur les noms d'indexes pour éviter les collisions.

Par exemple, le site de staging `aeroemploi.zeus` se connecte à un index "aeroweb_staging_offers" à la place.

### Gestion des offres

Puisque le site Aeroemploi n'a pas de base de données, les offres sont sauvegardées du côté d'Aeroweb et c'est Aeroweb qui intéragit avec Typesense pour y pousser les offres.

Le site `aeroweb.zeus` utilise les indexes "aeroweb_staging_x" et le site `aeroweb.ca` utilise les indexes "aeroweb_production_x".

Puisque les données qui sont dans Typesense sont pratiquement publique, il faut éviter de pousser des informations confidentiels et non nécessaires. Sur Aeroweb, on limite les informations qu'on envoit à Typesense. Par exemple, si un poste est anonyme, on stocke "Aéroemploi" comme `company_name` à la place de la vraie entreprise.
