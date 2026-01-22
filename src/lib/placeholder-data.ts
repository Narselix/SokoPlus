import { PlaceHolderImages } from './placeholder-images';

export const courses: any[] = [];

export const certificates: any[] = [];

export const products = [
    { id: 1, name: 'Café du Kivu', seller: 'Coopérative des fermiers', price: '10$', category: 'Alimentaire', location: 'Goma, RDC', description: 'Un café Arabica de haute qualité cultivé sur les pentes fertiles des volcans du Kivu. Notes de dégustation : chocolat, agrumes, et une touche florale.', image: PlaceHolderImages.find(p => p.id === 'product-coffee') },
    { id: 2, name: 'Robe en wax', seller: 'Atelier de couture local', price: '35$', category: 'Mode', location: 'Bukavu, RDC', description: 'Robe élégante fabriquée à la main avec du tissu wax authentique. Parfait pour toutes les occasions.', image: PlaceHolderImages.find(p => p.id === 'product-dress') },
    { id: 3, name: 'Panier tressé', seller: 'Artisans de Goma', price: '15$', category: 'Artisanat', location: 'Goma, RDC', description: 'Panier robuste et décoratif, tressé à la main avec des matériaux locaux. Idéal pour le marché ou comme décoration intérieure.', image: PlaceHolderImages.find(p => p.id === 'product-basket') },
    { id: 4, name: 'Miel de montagne', seller: 'Apiculteurs Virunga', price: '8$', category: 'Alimentaire', location: 'Parc des Virunga', description: 'Miel pur et biologique récolté dans les montagnes du parc national des Virunga. Un goût unique et sauvage.', image: PlaceHolderImages.find(p => p.id === 'product-honey') },
    { id: 5, name: 'Smartphone d\'occasion - Tecno', seller: 'John D.', price: '80$', category: 'Électronique', location: 'Goma, RDC', description: 'Smartphone Tecno Spark en bon état. 64Go de stockage, 4Go de RAM. Vendu avec chargeur.', image: PlaceHolderImages.find(p => p.id === 'product-phone') },
    { id: 6, name: 'Table basse en bois recyclé', seller: 'Menuiserie Ébène', price: '120$', category: 'Maison', location: 'Bukavu, RDC', description: 'Table basse unique fabriquée à partir de bois de palettes recyclées. Style rustique et moderne.', image: PlaceHolderImages.find(p => p.id === 'product-table') },
    { id: 7, name: 'Sandales en cuir', seller: 'Cordonnerie du Lac', price: '25$', category: 'Mode', location: 'Goma, RDC', description: 'Sandales pour homme en cuir véritable, fabriquées à la main. Solides et confortables.', image: PlaceHolderImages.find(p => p.id === 'product-sandals') },
    { id: 8, name: 'Peinture abstraite "Volcan"', seller: 'Artiste Maria', price: '200$', category: 'Artisanat', location: 'Goma, RDC', description: 'Toile originale inspirée par les couleurs du volcan Nyiragongo. Dimensions : 80x60cm.', image: PlaceHolderImages.find(p => p.id === 'product-painting') },
];

export const jobs = [
    { id: 1, title: 'Développeur Web Full-Stack', company: 'Startup Tech Goma', location: 'Goma, RDC', type: 'Temps plein', tags: ['React', 'Node.js', 'Firebase'], logo: PlaceHolderImages.find(p => p.id === 'logo-tech'), description: 'Nous recherchons un développeur full-stack passionné pour rejoindre notre équipe à Goma. Vous travaillerez sur des projets innovants qui ont un impact direct sur la communauté locale, en utilisant les dernières technologies comme React, Node.js, et Firebase. Expérience souhaitée : 2 ans minimum.' },
    { id: 2, title: 'Assistant Marketing Digital', company: 'Agence ComKivu', location: 'Bukavu, RDC', type: 'Stage', tags: ['SEO', 'Réseaux sociaux'], logo: PlaceHolderImages.find(p => p.id === 'logo-marketing'), description: 'Stage de 6 mois pour un étudiant ou jeune diplômé en marketing. Vous participerez à la création de campagnes digitales, à la gestion de nos réseaux sociaux et à l\'analyse des performances. C\'est une excellente opportunité d\'apprendre auprès d\'experts.' },
    { id: 3, title: 'Traduction (Français - Swahili)', company: 'ONG locale', location: 'Télétravail', type: 'Freelance', tags: ['Traduction', 'Social'], logo: PlaceHolderImages.find(p => p.id === 'logo-ong'), description: 'Mission freelance pour traduire des documents importants relatifs à nos projets sociaux dans la région. Une parfaite maîtrise du français et du swahili, ainsi qu\'une sensibilité culturelle, sont exigées. Mission ponctuelle avec possibilité de collaboration à long terme.' },
];

export const freelanceMissions = [
    { id: 1, title: 'Création de logo pour un café local', client: 'Café de la Paix', budget: '100$', tags: ['Design Graphique', 'Logo', 'Branding'], logo: PlaceHolderImages.find(p => p.id === 'logo-client-a'), description: 'Nous ouvrons un nouveau café à Goma et avons besoin d\'un logo moderne qui représente notre identité. Le logo doit être simple, mémorable et utilisable sur divers supports (enseigne, tasses, menus).', type: 'Projet ponctuel' },
    { id: 2, title: 'Rédaction d\'articles de blog sur la tech', client: 'Kivu Tech Hub', budget: '50$ / article', tags: ['Rédaction', 'Contenu Web', 'Technologie'], logo: PlaceHolderImages.find(p => p.id === 'logo-client-b'), description: 'Nous recherchons un rédacteur pour créer 4 articles de blog par mois sur les dernières tendances technologiques en Afrique. Chaque article doit faire environ 800 mots et être optimisé pour le SEO.', type: 'Mission récurrente' },
    { id: 3, title: 'Montage vidéo pour une campagne de sensibilisation', client: 'ONG Santé Pour Tous', budget: '250$', tags: ['Montage Vidéo', 'Adobe Premiere', 'Social'], logo: PlaceHolderImages.find(p => p.id === 'logo-ong'), description: 'Nous avons besoin d\'un monteur vidéo pour assembler des séquences brutes en une vidéo de 2 minutes pour notre prochaine campagne sur les réseaux sociaux. La vidéo doit être dynamique et percutante.', type: 'Projet ponctuel' },
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
