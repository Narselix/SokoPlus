import { PlaceHolderImages } from './placeholder-images';

export const courses: any[] = [];

export const certificates: any[] = [];

export const products = [
    { id: 1, name: 'Café du Kivu', seller: 'Coopérative des fermiers', price: '10$', image: PlaceHolderImages.find(p => p.id === 'product-coffee') },
    { id: 2, name: 'Robe en wax', seller: 'Atelier de couture local', price: '35$', image: PlaceHolderImages.find(p => p.id === 'product-dress') },
    { id: 3, name: 'Panier tressé', seller: 'Artisans de Goma', price: '15$', image: PlaceHolderImages.find(p => p.id === 'product-basket') },
    { id: 4, name: 'Miel de montagne', seller: 'Apiculteurs Virunga', price: '8$', image: PlaceHolderImages.find(p => p.id === 'product-honey') },
];

export const jobs = [
    { id: 1, title: 'Développeur Web Full-Stack', company: 'Startup Tech Goma', location: 'Goma, RDC', type: 'Temps plein', tags: ['React', 'Node.js', 'Firebase'], logo: PlaceHolderImages.find(p => p.id === 'logo-tech') },
    { id: 2, title: 'Assistant Marketing Digital', company: 'Agence ComKivu', location: 'Bukavu, RDC', type: 'Stage', tags: ['SEO', 'Réseaux sociaux'], logo: PlaceHolderImages.find(p => p.id === 'logo-marketing') },
    { id: 3, title: 'Traduction (Français - Swahili)', company: 'ONG locale', location: 'Télétravail', type: 'Freelance', tags: ['Traduction', 'Social'], logo: PlaceHolderImages.find(p => p.id === 'logo-ong') },
];

export const solidarityCampaigns = [
    { id: 1, title: 'Scolarisation des enfants de Masisi', organizer: 'Fondation Kivu Espoir', raised: '4,500$', goal: '10,000$', progress: 45, image: PlaceHolderImages.find(p => p.id === 'solidarity-school') },
    { id: 2, title: 'Accès à l\'eau potable à Minova', organizer: 'Action Eau Propre', raised: '18,200$', goal: '25,000$', progress: 73, image: PlaceHolderImages.find(p => p.id === 'solidarity-water') },
    { id: 3, title: 'Soutien aux micro-entrepreneurs', organizer: 'Crédit Solidaire Kivu', raised: '7,800$', goal: '15,000$', progress: 52, image: PlaceHolderImages.find(p => p.id === 'solidarity-microcredit') },
];

export const pharmacyItems = [
    { id: 1, name: 'Paracétamol 500mg', description: 'Boîte de 16 comprimés', pharmacy: 'Pharmacie La Vie', image: PlaceHolderImages.find(p => p.id === 'pharma-paracetamol') },
    { id: 2, name: 'Sirop pour la toux (Enfant)', description: 'Flacon de 150ml', pharmacy: 'Pharmacie Centrale', image: PlaceHolderImages.find(p => p.id === 'pharma-syrup') },
    { id: 3, name: 'Crème antiseptique', description: 'Tube de 50g', pharmacy: 'Pharmacie du Lac', image: PlaceHolderImages.find(p => p.id === 'pharma-cream') },
    { id: 4, name: 'Vitamines C', description: 'Boîte de 30 comprimés', pharmacy: 'Pharmacie La Vie', image: PlaceHolderImages.find(p => p.id === 'pharma-vitamins') },
];

export const wellBeingArticles = [
    { id: 1, title: '5 techniques pour gérer le stress au quotidien', category: 'Santé Mentale', author: 'Dr. A. Mweni', image: PlaceHolderImages.find(p => p.id === 'wellbeing-stress') },
    { id: 2, title: 'L\'importance du soutien communautaire', category: 'Social', author: 'B. Mufuni', image: PlaceHolderImages.find(p => p.id === 'wellbeing-community') },
];

export const aiPicks = {
    userProfile: "Étudiant en informatique à Goma, intéressé par le développement web et l'entrepreneuriat. A suivi des cours de base sur le marketing.",
    availableCourses: "Développement Web avec React, Les Fondamentaux de l'Entrepreneuriat, Design Graphique pour Débutants, Introduction au Marketing Digital",
    availableProducts: "Café du Kivu, Robe en wax, Panier tressé, Miel de montagne",
    availableJobListings: "Développeur Web Full-Stack, Assistant Marketing Digital, Traduction (Français - Swahili)",
    availableSolidarityCampaigns: "Scolarisation des enfants de Masisi, Accès à l'eau potable à Minova, Soutien aux micro-entrepreneurs",
}
