# Soko+ - L'écosystème qui connecte le Kivu

Soko+ est une plateforme intégrée conçue pour dynamiser la communauté du Kivu en regroupant l'éducation, le commerce local, l'emploi, le logement et la solidarité.

## 🚀 Fonctionnalités Clés

### 🎓 Module Éducation (ERP Scolaire)
Un système complet de gestion pour les établissements d'enseignement :
- **Gestion Administrative** : Inscription des élèves avec génération de matricules uniques.
- **Comptabilité Scolaire** : Configuration des frais, suivi des tranches de paiement et gestion de la caisse.
- **Facturation & Reçus** : Génération et impression automatique de reçus officiels avec logo et cachet de l'école.
- **Saisie Pédagogique** : Gestion des notes, des présences et des cours en ligne par les enseignants.
- **Portail Parent/Élève** : Suivi en temps réel des résultats, de l'assiduité et des finances.

### 🛒 Services Communautaires
- **Marché Local** : Plateforme de vente pour les artisans et commerçants locaux.
- **Emploi & Freelance** : Publication d'offres et de missions pour les talents de la région.
- **Logement** : Annonces vérifiées de location et de vente immobilière.
- **Transport** : Mise en relation pour la mobilité locale.

### 🏥 Santé & Bien-être
- **Annuaire Santé** : Localisation des centres de soins.
- **Espace Écoute** : Soutien psychologique via des articles et des sessions d'écoute anonymes.

### 🤖 Intelligence Artificielle
- **Recommandations Personnalisées** : Suggestions intelligentes de cours, produits et opportunités basées sur le profil utilisateur.

## 🛠️ Stack Technique
- **Framework** : Next.js 15 (App Router)
- **UI** : Shadcn UI, Tailwind CSS, Lucide React
- **Backend** : Firebase (Auth, Firestore, Storage)
- **IA** : Firebase Genkit (Gemini 2.5 Flash)

## 📦 Installation & Configuration

1. **Cloner le dépôt** :
   ```bash
   git clone <votre-url-github>
   cd soko-plus
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configuration Firebase** :
   Mettez à jour le fichier `src/firebase/config.ts` avec vos propres clés API Firebase.

4. **Lancer en mode développement** :
   ```bash
   npm run dev
   ```

## 📄 Licence
Ce projet est destiné au développement de l'écosystème numérique de la région du Kivu.