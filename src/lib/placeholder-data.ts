import { PlaceHolderImages } from './placeholder-images';

export const courses = [
    { 
        id: 1, 
        title: 'Mathématiques de Base (Primaire)', 
        description: "Apprenez les bases de l'addition, de la soustraction, de la multiplication et de la division de manière ludique.",
        category: 'Mathématiques',
        level: 'Débutant',
        duration: '15 Heures',
        teacher: 'Mme. Anifa',
        progress: 25,
        image: PlaceHolderImages.find(p => p.id === 'course-math-primary'),
        modules: [
            { id: 1, title: 'Module 1: Addition et Soustraction', lessons: [
                { id: 1, title: 'Introduction à l\'addition', duration: '20 min', completed: true },
                { id: 2, title: 'Pratiquer la soustraction', duration: '25 min', completed: true },
                { id: 3, title: 'Problèmes simples', duration: '30 min', completed: false },
            ]},
            { id: 2, title: 'Module 2: Multiplication et Division', lessons: [
                { id: 4, title: 'Les tables de multiplication', duration: '20 min', completed: false },
                { id: 5, title: 'Introduction à la division', duration: '25 min', completed: false },
                { id: 6, title: 'Exercices pratiques', duration: '30 min', completed: false },
            ]},
        ]
    },
    { 
        id: 2, 
        title: 'Introduction à la Biologie (Secondaire)', 
        description: "Découvrez le monde fascinant du vivant, de la cellule aux écosystèmes.",
        category: 'Science',
        level: 'Débutant',
        duration: '25 Heures',
        teacher: 'Mr. Baraka',
        progress: 75,
        image: PlaceHolderImages.find(p => p.id === 'course-biology-secondary'),
        modules: [
             { id: 1, title: 'Module 1: La Cellule', lessons: [
                { id: 1, title: 'Qu\'est-ce qu\'une cellule ?', duration: '30 min', completed: true },
                { id: 2, title: 'Cellules animales vs végétales', duration: '35 min', completed: true },
                { id: 3, title: 'La division cellulaire', duration: '40 min', completed: true },
             ]},
             { id: 2, title: 'Module 2: Le Corps Humain', lessons: [
                { id: 4, title: 'Le système digestif', duration: '30 min', completed: true },
                { id: 5, title: 'Le système respiratoire', duration: '30 min', completed: false },
             ]},
        ]
    },
    { 
        id: 3, 
        title: 'Droit Constitutionnel (Université)', 
        description: "Comprenez les principes fondamentaux qui régissent l'État et les institutions.",
        category: 'Droit',
        level: 'Intermédiaire',
        duration: '40 Heures',
        teacher: 'Prof. Ndeko',
        progress: 10,
        image: PlaceHolderImages.find(p => p.id === 'course-law-university'),
        modules: []
    },
    { 
        id: 4, 
        title: 'Histoire du Congo : Des Origines à Nos Jours', 
        description: "Un voyage à travers le temps pour comprendre l'histoire riche et complexe de la République Démocratique du Congo.",
        category: 'Histoire',
        level: 'Tous niveaux',
        duration: '30 Heures',
        teacher: 'Dr. Zawadi',
        progress: 0,
        image: PlaceHolderImages.find(p => p.id === 'course-history'),
        modules: [
             { id: 1, title: 'Module 1: Période pré-coloniale', lessons: [
                { id: 1, title: 'Les grands royaumes', duration: '45 min', completed: false },
                { id: 2, title: 'Les routes commerciales', duration: '40 min', completed: false },
             ]},
        ]
    },
    { 
        id: 5, 
        title: 'Développement Web : Devenez Full-Stack', 
        description: "Apprenez les bases du HTML, CSS, JavaScript et construisez vos premières applications web interactives.",
        category: 'Tech',
        level: 'Débutant',
        duration: '50 Heures',
        teacher: 'Mr. Patrick',
        progress: 50,
        image: PlaceHolderImages.find(p => p.id === 'course-tech'),
        modules: []
    },
    { 
        id: 6, 
        title: 'Principes de Chimie Générale', 
        description: "Explorez les atomes, les molécules, les réactions chimiques et les lois fondamentales de la chimie.",
        category: 'Science',
        level: 'Intermédiaire',
        duration: '35 Heures',
        teacher: 'Mme. Amani',
        progress: 0,
        image: PlaceHolderImages.find(p => p.id === 'course-chemistry'),
        modules: []
    },
    { 
        id: 7, 
        title: "Littérature Francophone d'Afrique", 
        description: "Découvrez les auteurs majeurs et les grands courants de la littérature africaine d'expression française.",
        category: 'Littérature',
        level: 'Avancé',
        duration: '45 Heures',
        teacher: 'Prof. Lema',
        progress: 0,
        image: PlaceHolderImages.find(p => p.id === 'course-literature'),
        modules: []
    },
    { 
        id: 8, 
        title: "Entrepreneuriat pour débutants", 
        description: "Apprenez à créer votre plan d'affaires, trouver des financements et lancer votre propre entreprise.",
        category: 'Business',
        level: 'Débutant',
        duration: '20 Heures',
        teacher: 'Mr. David',
        progress: 0,
        image: PlaceHolderImages.find(p => p.id === 'course-economics'),
        modules: []
    },
];

export const certificates = [
];

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
    { id: 1, title: 'Scolarisation des enfants de Masisi', organizer: 'Fondation Kivu Espoir', raised: '4,500$', goal: '10,000$', progress: 45, image: PlaceHolderImages.find(p => p.id === 'solidarity-school'), category: 'Éducation', location: 'Masisi, RDC' },
    { id: 2, title: 'Accès à l\'eau potable à Minova', organizer: 'Action Eau Propre', raised: '18,200$', goal: '25,000$', progress: 73, image: PlaceHolderImages.find(p => p.id === 'solidarity-water'), category: 'Santé', location: 'Minova, RDC' },
    { id: 3, title: 'Soutien aux micro-entrepreneurs', organizer: 'Crédit Solidaire Kivu', raised: '7,800$', goal: '15,000$', progress: 52, image: PlaceHolderImages.find(p => p.id === 'solidarity-microcredit'), category: 'Économie', location: 'Bukavu, RDC' },
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

export const healthCenters = [
    { id: 1, name: 'Hôpital Général de Référence de Goma', type: 'Hôpital', location: 'Goma, RDC', services: ['Urgences', 'Chirurgie', 'Maternité'], image: PlaceHolderImages.find(p => p.id === 'health-hospital') },
    { id: 2, name: 'Centre de Santé Carmel', type: 'Centre de Santé', location: 'Bukavu, RDC', services: ['Consultation générale', 'Petite chirurgie'], image: PlaceHolderImages.find(p => p.id === 'health-center') },
    { id: 3, name: 'Dispensaire La Providence', type: 'Dispensaire', location: 'Uvira, RDC', services: ['Soins primaires', 'Vaccination'], image: PlaceHolderImages.find(p => p.id === 'health-clinic') },
];

export const healthArticles = [
    { id: 1, title: "Prévention du paludisme : 5 gestes qui sauvent", category: "Prévention", image: PlaceHolderImages.find(p => p.id === 'health-malaria') },
    { id: 2, title: "Bien manger pour rester en bonne santé", category: "Nutrition", image: PlaceHolderImages.find(p => p.id === 'health-nutrition') },
    { id: 3, title: "L'importance de l'hygiène des mains", category: "Hygiène", image: PlaceHolderImages.find(p => p.id === 'health-hygiene') },
];

export const housingListings = [
    { 
        id: 1, 
        title: 'Maison familiale avec jardin', 
        type: 'Maison', 
        location: 'Goma, Les Volcans', 
        price: '450$/mois',
        description: 'Spacieuse maison de 3 chambres avec un grand jardin, idéale pour une famille. Proche des écoles et des commerces.',
        owner: 'Propriétaire A',
        image: PlaceHolderImages.find(p => p.id === 'housing-house') 
    },
    { 
        id: 2, 
        title: 'Chambre meublée pour étudiant', 
        type: 'Chambre', 
        location: 'Bukavu, Ibanda', 
        price: '80$/mois',
        description: 'Chambre simple et propre dans un appartement partagé, parfaite pour un étudiant. Accès cuisine et salle de bain communes.',
        owner: 'Propriétaire B',
        image: PlaceHolderImages.find(p => p.id === 'housing-room') 
    },
    { 
        id: 3, 
        title: 'Studio moderne en centre-ville', 
        type: 'Studio', 
        location: 'Goma, Centre-ville', 
        price: '200$/mois',
        description: 'Studio neuf et lumineux avec kitchenette et salle de bain privée. Situé au coeur de la ville.',
        owner: 'Propriétaire C',
        image: PlaceHolderImages.find(p => p.id === 'housing-studio') 
    },
    { 
        id: 4, 
        title: 'Terrain à bâtir avec vue sur le lac', 
        type: 'Terrain', 
        location: 'Route de Sake, Goma', 
        price: '15,000$',
        description: 'Grande parcelle de 400m² avec une vue imprenable sur le lac Kivu. Idéal pour construire la maison de vos rêves.',
        owner: 'Propriétaire D',
        image: PlaceHolderImages.find(p => p.id === 'housing-land') 
    },
];

export const transportServices = [
    { 
        id: 1, 
        type: 'Taxi Moto', 
        driver: 'John B.',
        vehicle: 'Bajaj Boxer', 
        location: 'Centre-ville, Goma', 
        rating: 4.8,
        image: PlaceHolderImages.find(p => p.id === 'transport-moto') 
    },
    { 
        id: 2, 
        type: 'Taxi Voiture', 
        driver: 'Marie-Claire A.',
        vehicle: 'Toyota Corolla', 
        location: 'Les Volcans, Goma', 
        rating: 4.9,
        image: PlaceHolderImages.find(p => p.id === 'transport-car') 
    },
    { 
        id: 3, 
        type: 'Transport Marchandises', 
        driver: 'David K.',
        vehicle: 'Camion Canter', 
        location: 'Port de Goma', 
        rating: 4.7,
        image: PlaceHolderImages.find(p => p.id === 'transport-truck') 
    },
    { 
        id: 4, 
        type: 'Bus Collectif', 
        driver: 'Coopérative TUSHIRIKIANE',
        vehicle: 'Ligne Majengo - Centre', 
        location: 'Goma', 
        rating: 4.5,
        image: PlaceHolderImages.find(p => p.id === 'transport-bus') 
    },
];

export const adminProcedures = [
    {
        id: 1,
        title: "Obtenir une Carte d'Identité",
        category: "État Civil",
        description: "Procédure pour l'obtention de la carte d'identité nationale pour les citoyens congolais.",
        requiredDocuments: ["Acte de naissance", "Certificat de nationalité", "Photos passeport"],
        estimatedCost: "25$",
        estimatedTime: "30-60 jours",
    },
    {
        id: 2,
        title: "Créer une Petite Entreprise (RCCM)",
        category: "Commerce",
        description: "Étapes pour enregistrer une nouvelle entreprise au Registre de Commerce et de Crédit Mobilier.",
        requiredDocuments: ["Statuts de l'entreprise", "Pièce d'identité du gérant", "Preuve de l'adresse"],
        estimatedCost: "150$",
        estimatedTime: "15-30 jours",
    },
];

export const publicAlerts = [
    {
        id: 1,
        title: "Campagne de vaccination contre la rougeole",
        category: "Santé",
        content: "Une campagne de vaccination pour les enfants de 6 mois à 5 ans aura lieu dans tous les centres de santé de la ville du 10 au 15 du mois prochain.",
        publishedDate: "2024-07-20",
    },
    {
        id: 2,
        title: "Alerte sécurité : Mouvements suspects signalés",
        category: "Sécurité",
        content: "Les autorités demandent aux résidents du quartier Majengo de rester vigilants suite à des rapports de mouvements suspects. Limitez les déplacements nocturnes.",
        publishedDate: "2024-07-22",
    },
    {
        id: 3,
        title: "Info Travaux : Route principale en réfection",
        category: "Circulation",
        content: "Des travaux de réfection de la chaussée sur le boulevard principal causeront des perturbations du 25 au 28 du mois. Des déviations seront mises en place.",
        publishedDate: "2024-07-21",
    },
];
