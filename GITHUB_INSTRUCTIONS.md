# Instructions pour le dépôt GitHub

Comme vous avez déjà une autre version de ce projet sur GitHub, voici les étapes pour mettre à jour votre dépôt avec cette nouvelle version améliorée (Module Éducation ERP Complet).

## Option 1 : Écraser l'ancienne version (Recommandé)
Utilisez cette option si vous voulez que cette version soit la version principale et officielle.

1. Ouvrez votre terminal dans le dossier du projet.
2. Initialisez git (si ce n'est pas déjà fait) :
   ```bash
   git init
   ```
3. Ajoutez tous les fichiers :
   ```bash
   git add .
   ```
4. Créez votre commit :
   ```bash
   git commit -m "Upgrade: Soko+ Infrastructure Numérique avec Module ERP Scolaire Complet"
   ```
5. Liez votre dossier local à GitHub (remplacez l'URL par la vôtre) :
   ```bash
   git remote add origin <URL_DE_VOTRE_DEPOT_GITHUB>
   ```
   *Note: Si git dit que 'origin' existe déjà, tapez : `git remote set-url origin <URL_DE_VOTRE_DEPOT_GITHUB>`*
6. Envoyez le code en écrasant l'ancienne version :
   ```bash
   git push -u origin main --force
   ```

## Option 2 : Créer une nouvelle branche (Plus prudent)
Utilisez cette option si vous voulez garder l'ancienne version intacte et travailler sur celle-ci séparément.

1. `git checkout -b version-2-erp`
2. `git add .`
3. `git commit -m "Ajout du module de gestion scolaire complet"`
4. `git push -u origin version-2-erp`

---
*Projet optimisé pour l'écosystème numérique du Kivu.*
