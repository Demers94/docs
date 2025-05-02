# Aerotalent

![](./../assets/aerotalent.png)

[aerotalent.ca](https://aerotalent.ca) est une plateforme qui permet aux utilisateurs de :

-   Créer et gérer des mandats de placement
-   Rechercher parmis des centaines de milliers de candidatures (recherches par mots-clés du CV, par nom/courriel, par catégorie, par mandat, etc)
-   Gérer les candidats pour un mandat
    -   Communications via courriel, SMS et appels téléphoniques
    -   Formulaires pré-entrevues
    -   Fichiers et commentaires

Les candidatures proviennent directement d'Aeroweb (et donc d'Aéroemploi et des autres sites où les postes sont affichées).

## Pourquoi Aerotalent

Nos recruteurs utilisent présentement Aeroweb pour gérer les candidats. Ça fonctionne bien à petite échelle, mais la structure des candidatures est un problème si on veut scaler notre équipe pour avoir 3-4+ recruteurs qui travaillent en même temps.

Sur Aeroweb, les candidats sont sauvegardés avec les champs suivants :

```
-- table "candidates"
id
company_id
name
email
```

Il y a donc une entrée _par candidat_, _par entreprise_. Si la même personne `charles@example.com` postule sur un poste de Bombardier et un autre d'Airbus, il y a aura deux entrées dans la table des candidats.

C'est par design, et c'est ce qu'on veut - les recruteurs de Bombardier ne sont pas les mêmes que ceux d'Airbus, et on doit maintenir des informations séparées pour chaque entreprise. Si un recruteur d'Airbus commente sur le profil d'un candidat ou lui envoit un SMS, ces informations ne doivent pas apparaitre sur le profil du candidat chez Bombardier.

C'est un problème pour notre équipe, où on a plusieurs recruteurs qui doivent travailler ensemble pour des mandats de diverses entreprises. Dans notre cas, nous **voulons** que les informations soient partagées entre les profils. Si le recruteur A contact le candidat X pour un mandat de Bombardier, nous ne voulons que le recruteur B le contacte aussi pour un mandat d'Airbus.

Pour régler ce problème, nous avons développé Aerotalent qui est une plateforme qui servia **pour nos recruteurs uniquement**. Cette plateforme ne sera pas utilisée par les utilisateurs des entreprises, c'est vraiment juste notre équipe qui y aura accès. Ça nous permet donc de structurer les données et les interfaces differemment, pour mieux supporter nos besoins.

Sur Aerotalent, on a maintenant juste un profil candidat par _personne unique_. On identifie les candidats uniques en se servant de l'adresse courriel, et un système de gestion des doublons permet de combiner des comptes si on se rend compte que c'est la même personne phyisque.

```
--- Table "candidates"
id
name
email
```
