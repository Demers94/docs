# Aeromails

![](./../assets/aeromails.png)

[aeromails.ca](https://aeromails.ca) est une plateforme qui permet aux utilisateurs de : 

- Créer et gérer des listes d'envois, qui contiennent des abonnés
- Créer et gérer des identités d'envois multiples (nom, `from email`, `reply to`, etc)
- Envoyer des campagnes courriels à une liste spécifique, en utilisant une identité d'envoi
- Voir la progression en temps réel de l'envoi, et les stats (open & click)
- Ré-envoyer une campagne à un segment d'une liste - ex: ceux qui n'ont pas ouvert la campagne X ou qui n'ont pas cliqué dans la campagne Y

Nous utilisons présentement Amazon SES pour envoyer les courriels, mais la plateforme peut assez facilement être modifiée pour supporter d'autres email providers.

## Pourquoi Aeromails

Depuis le début c'est un besoin important de pouvoir envoyer des campagnes courriels à tous les adresses courriels que nous avons, afin de promouvoir des postes, évènements et formations qui sont habituellement affichés sur aeroemploi.ca

Nous avons accès à des centaines de milliers de courriels qui proviennent de : 

- Newsletter Aeroemploi, Placement SPOT
- Utilisateurs inscrits sur nos plateformes (Aeroemploi/Aeroweb/Placement SPOT)
- Banque de candidatures
- Et plus encore

Nous utilisions Mailchimp au début mais c'est un service très dispendieux à notre volume.

Éventuellement nous nous sommes tourné vers [Mailcoach](https://www.mailcoach.app/), plus spécifiquement sur la version self-hosted. C'est un outil qu'on installe sur notre propre serveur et qu'on link à un provider (comme Amazon SES ou Mailgun), qui offre un interface similaire à celui de Mailchimp pour gérer les campagnes et en faire l'envoi. La différence est que nous utilisons nos propres identifiants AWS pour faire l'envoi et ça revient beaucoup moins cher.

Nos besoins ont évolués et dans le but d'avoir une plateforme plus flexible et d'éviter de dépendre sur une license Mailcoach, nous avons développé Aeromails. Ça a commencé comme juste un petit prototype pour voir ce qu'il était possible de faire - et comme en programmation, il n'y a rien de plus permanent qu'un fix temporaire, c'est devenu notre principale plateforme pour faire l'envoi des campagnes de courriels.