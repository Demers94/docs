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
                { text: "Infrastructure actuelle", link: '/rapport/infrastructure-actuelle' },
                { text: "Détails des sites web", link: '/rapport/details-sites' },
                { text: "Sécurité", link: '/rapport/securite' },
                { text: "Performance et disponibilité", link: '/rapport/performance' },
                { text: "Coûts d'exploitation", link: '/rapport/couts' },
                { text: "Risques et limitations", link: '/rapport/risques' },
                { text: "Recommandations", link: '/rapport/recommandations' },
            ]
        },
    ]
  }
}