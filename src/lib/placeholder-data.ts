import { PlaceHolderImages } from './placeholder-images';

export const courses = [
  {
    id: 1,
    title: 'Introduction au Marketing Digital',
    category: 'Marketing',
    duration: '5h',
    progress: 60,
    image: PlaceHolderImages.find(p => p.id === 'course-1'),
  },
  {
    id: 2,
    title: 'Les Fondamentaux de l\'Entrepreneuriat',
    category: 'Business',
    duration: '8h',
    progress: 25,
    image: PlaceHolderImages.find(p => p.id === 'course-2'),
  },
  {
    id: 3,
    title: 'Design Graphique pour Débutants',
    category: 'Design',
    duration: '12h',
    progress: 0,
    image: PlaceHolderImages.find(p => p.id === 'course-3'),
  },
  {
    id: 4,
    title: 'Développement Web avec React',
    category: 'Tech',
    duration: '20h',
    progress: 90,
    image: PlaceHolderImages.find(p => p.id === 'course-4'),
  },
];

export const products = [
  {
    id: 1,
    name: 'Panier en osier fait main',
    price: '15 USD',
    seller: 'Artisans du Kivu',
    image: PlaceHolderImages.find(p => p.id === 'product-1'),
  },
  {
    id: 2,
    name: 'Café Arabica du Kivu (500g)',
    price: '10 USD',
    seller: 'Café Kivu',
    image: PlaceHolderImages.find(p => p.id === 'product-2'),
  },
  {
    id: 3,
    name: 'Tissu wax coloré',
    price: '25 USD',
    seller: 'Mama Sifa',
    image: PlaceHolderImages.find(p => p.id === 'product-3'),
  },
  {
    id: 4,
    name: 'Statue en bois sculpté',
    price: '40 USD',
    seller: 'Artisans du Kivu',
    image: PlaceHolderImages.find(p => p.id === 'product-4'),
  },
];

export const jobs = [
    {
        id: 1,
        title: "Chef de projet digital",
        company: "KivuTech Solutions",
        location: "Goma, Nord-Kivu",
        type: "Temps plein",
        tags: ["Gestion de projet", "Digital", "Marketing"],
        logo: PlaceHolderImages.find(p => p.id === 'company-logo-1'),
    },
    {
        id: 2,
        title: "Développeur React (Freelance)",
        company: "Remote Work Inc.",
        location: "Télétravail",
        type: "Freelance",
        tags: ["React", "Développement Web", "JavaScript"],
        logo: PlaceHolderImages.find(p => p.id === 'company-logo-1'),
    },
    {
        id: 3,
        title: "Coordinateur Humanitaire",
        company: "Solidarité Kivu",
        location: "Bukavu, Sud-Kivu",
        type: "Contrat",
        tags: ["Humanitaire", "ONG", "Coordination"],
        logo: PlaceHolderImages.find(p => p.id === 'company-logo-2'),
    },
];

export const pharmacyItems = [
    {
        id: 1,
        name: "Paracétamol 500mg",
        description: "Boîte de 20 comprimés",
        pharmacy: "Pharmacie la Confiance",
        image: PlaceHolderImages.find(p => p.id === 'pharmacy-1'),
    },
    {
        id: 2,
        name: "Sirop pour la toux",
        description: "Flacon de 150ml",
        pharmacy: "Pharmacie Centrale",
        image: PlaceHolderImages.find(p => p.id === 'pharmacy-2'),
    },
    {
        id: 3,
        name: "Kit de premiers secours",
        description: "Contient les essentiels",
        pharmacy: "Pharmacie du Lac",
        image: PlaceHolderImages.find(p => p.id === 'pharmacy-3'),
    },
];

export const solidarityCampaigns = [
    {
        id: 1,
        title: "Construction d'une école à Minova",
        organizer: "ONG Éducation Pour Tous",
        goal: "20,000 USD",
        raised: "12,500 USD",
        progress: 62.5,
        image: PlaceHolderImages.find(p => p.id === 'solidarity-1'),
    },
    {
        id: 2,
        title: "Aide alimentaire pour les déplacés",
        organizer: "Action Contre la Faim",
        goal: "50,000 USD",
        raised: "45,000 USD",
        progress: 90,
        image: PlaceHolderImages.find(p => p.id === 'solidarity-2'),
    },
    {
        id: 3,
        title: "Soutien aux familles victimes de guerre",
        organizer: "Croix-Rouge locale",
        goal: "30,000 USD",
        raised: "10,000 USD",
        progress: 33.3,
        image: PlaceHolderImages.find(p => p.id === 'solidarity-3'),
    },
];

export const wellBeingArticles = [
    {
        id: 1,
        title: "Gérer le stress en temps de crise : 5 conseils pratiques",
        category: "Santé Mentale",
        author: "Dr. Aline L.",
        image: PlaceHolderImages.find(p => p.id === 'well-being-1'),
    },
    {
        id: 2,
        title: "L'importance du soutien communautaire pour la résilience",
        category: "Communauté",
        author: "Soko+ Bien-être",
        image: PlaceHolderImages.find(p => p.id === 'well-being-2'),
    }
];

export const aiPicks = {
    userProfile: `Jeune entrepreneur de 25 ans basé à Goma. Intéressé par le commerce en ligne, la technologie et le développement communautaire. A récemment terminé un cours sur les bases du business et cherche maintenant à développer ses compétences en marketing digital.`,
    availableCourses: `Introduction au Marketing Digital, Les Fondamentaux de l'Entrepreneuriat, Design Graphique pour Débutants, Développement Web avec React`,
    availableProducts: `Panier en osier fait main, Café Arabica du Kivu (500g), Tissu wax coloré, Statue en bois sculpté`,
    availableJobListings: `Chef de projet digital (KivuTech Solutions), Développeur React (Freelance), Coordinateur Humanitaire (Solidarité Kivu)`,
    availableSolidarityCampaigns: `Construction d'une école à Minova, Aide alimentaire pour les déplacés, Soutien aux familles victimes de guerre`,
};
