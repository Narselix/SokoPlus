import { PlaceHolderImages } from './placeholder-images';

export const courses: any[] = [];

export const certificates: any[] = [];

export const products: any[] = [];

export const jobs: any[] = [];

export const freelanceMissions: any[] = [];

export const solidarityCampaigns: any[] = [];

export const pharmacyItems: any[] = [];

export const wellBeingArticles: any[] = [];

export const aiPicks = {
    userProfile: "Je suis un jeune entrepreneur à Goma, intéressé par la tech et le design. J'aime aussi soutenir les causes locales.",
    availableCourses: "Design Graphique, React pour débutants, Comptabilité de base, Marketing Digital",
    availableProducts: "Miel pur de Bukavu, Café arabica de Minova, Paniers tressés à la main",
    availableJobListings: "Développeur Web Junior, Designer de logo freelance, Formateur en informatique",
    availableSolidarityCampaigns: "Reboisement des collines, Accès à l'eau potable à Goma, Bourses d'études",
}

export const healthCenters: any[] = [];

export const healthArticles: any[] = [];

export const housingListings: any[] = [];

export const transportServices: any[] = [];

export const adminProcedures: any[] = [
    { id: 1, title: "Demande de carte d'électeur (Duplicata)", description: "Procédure pour obtenir un duplicata en cas de perte.", requiredDocuments: ["Attestation de perte", "Ancienne carte (si possible)"], estimatedCost: "Gratuit", estimatedTime: "24h - 48h" },
    { id: 2, title: "Enregistrement de commerce (RCCM)", description: "Pour les petits entrepreneurs locaux.", requiredDocuments: ["Pièce d'identité", "Statuts de l'entreprise"], estimatedCost: "30$ - 50$", estimatedTime: "7 jours" },
];

export const publicAlerts: any[] = [
    { id: 1, title: "Coupure d'eau préventive", category: "Sécurité", publishedDate: new Date().toISOString(), content: "Maintenance sur le réseau Regideso quartier Les Volcans ce jeudi." },
    { id: 2, title: "Campagne de propreté", category: "Santé", publishedDate: new Date().toISOString(), content: "Grand Salongo communautaire ce samedi à 8h." },
];
