import { PlaceHolderImages } from './placeholder-images';

export const courses = [
  {
    id: 1,
    title: 'Introduction au Marketing Digital',
    category: 'Marketing',
    duration: '5h',
    progress: 60,
    image: PlaceHolderImages.find(p => p.id === 'course-1'),
    level: 'Débutant',
    description: 'Apprenez les bases du marketing en ligne, du SEO aux médias sociaux.',
    teacher: 'Jean Dupont',
    modules: [
      {
        id: 1,
        title: 'Module 1: Fondamentaux du SEO',
        lessons: [
          { id: 1, title: 'Introduction au SEO', completed: true, duration: '15min' },
          { id: 2, title: 'Recherche de mots-clés', completed: true, duration: '25min' },
          { id: 3, title: 'SEO On-Page', completed: false, duration: '30min' },
        ],
      },
      {
        id: 2,
        title: 'Module 2: Marketing sur les réseaux sociaux',
        lessons: [
          { id: 4, title: 'Choisir sa plateforme', completed: false, duration: '20min' },
          { id: 5, title: 'Créer du contenu engageant', completed: false, duration: '35min' },
        ],
      },
    ]
  },
  {
    id: 2,
    title: 'Les Fondamentaux de l\'Entrepreneuriat',
    category: 'Business',
    duration: '8h',
    progress: 25,
    image: PlaceHolderImages.find(p => p.id === 'course-2'),
    level: 'Débutant',
    description: 'De l\'idée au business plan, lancez votre projet avec succès.',
    teacher: 'Amina Diallo',
    modules: [
        {
        id: 1,
        title: 'Module 1: De l\'idée au concept',
        lessons: [
          { id: 1, title: 'Trouver son idée', completed: true, duration: '45min' },
          { id: 2, title: 'Valider son marché', completed: false, duration: '1h' },
        ],
      },
    ]
  },
  {
    id: 3,
    title: 'Design Graphique pour Débutants',
    category: 'Design',
    duration: '12h',
    progress: 0,
    image: PlaceHolderImages.find(p => p.id === 'course-3'),
    level: 'Intermédiaire',
    description: 'Maîtrisez les outils de design et les principes de la composition visuelle.',
    teacher: 'David Kim',
     modules: []
  },
  {
    id: 4,
    title: 'Développement Web avec React',
    category: 'Tech',
    duration: '20h',
    progress: 90,
    image: PlaceHolderImages.find(p => p.id === 'course-4'),
    level: 'Avancé',
    description: 'Construisez des applications web modernes et interactives avec React.',
    teacher: 'Fatou Ndiaye',
    modules: []
  },
];

export const certificates = [
    {
        id: 1,
        courseTitle: 'Développement Web avec React',
        date: '2023-05-15',
        image: PlaceHolderImages.find(p => p.id === 'certificate')
    }
];
