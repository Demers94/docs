export default {
    title: "La bible de l'infrastructure",
    lang: 'fr-CA',
    themeConfig: {
        search: {
            provider: 'local',
        },
        sidebar: [
            {
                text: "Rapport d'analyse",
                collapsed: false,
                items: [
                    { text: 'Introduction', link: '/rapport/intro' },
                    { text: 'Infrastructure actuelle', link: '/rapport/infrastructure-actuelle' },
                    { text: 'Détails des sites web', link: '/rapport/details-sites' },
                    { text: 'Sécurité', link: '/rapport/securite' },
                    { text: 'Performance et disponibilité', link: '/rapport/performance' },
                    { text: "Coûts d'exploitation", link: '/rapport/couts' },
                    { text: 'Risques et limitations', link: '/rapport/risques' },
                    { text: 'Recommandations', link: '/rapport/recommandations' },
                ],
            },
            {
                text: 'Aeromails',
                collapsed: false,
                items: [
                    { text: 'Introduction', link: '/aeromails/intro' },
                    { text: 'Détails techniques', link: '/aeromails/tech' },
                ],
            },
            {
                text: 'Aerotalent',
                collapsed: false,
                items: [
                    { text: 'Introduction', link: '/aerotalent/intro' },
                    { text: 'Détails techniques', link: '/aerotalent/tech' },
                ],
            },
            {
                text: 'Aeroweb',
                collapsed: false,
                items: [
                    { text: 'Introduction', link: '/aeroweb/intro' },
                    { text: 'Détails techniques', link: '/aeroweb/tech' },
                ],
            },
            {
                text: 'Aeroemploi',
                collapsed: false,
                items: [
                    { text: 'Introduction', link: '/aeroemploi/intro' },
                    { text: 'Détails techniques', link: '/aeroemploi/tech' },
                ],
            },
        ],
    },
};
