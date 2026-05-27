# GitHub
- protéger les branches `main` et `dev` pour forcer la revue de code en Pull Requests

# Config
- mettre à jour les dépendances avec `npm install`

# HTML
- dans le fichier `index.html` :
	- virer les balises `{html} <link>` concernant les typo car elles sont dans les assets et appelées par le CSS
	- relever la balise `{html} <base target="_blank" />` pour la mettre en first-child de `{html} <body>` au lieu d'être dans `{html} <main>`

# Javascript
- dans `storage.ts` changer `{js} let` en `{js} const` pour l'objet `storageInfos`

# TypeScript
- fichiers `.ts` :
	- remplacer le type `any` du fichier `createAction.ts` par un typage correct
	- revoir le typage TypeScript :
		- enlever les typages redondants que TypeScript définit tout seul
		- créer un fichier d'*interfaces*/*types* pour y regrouper les autres typages et les appeler dans les scripts qui en ont besoin

# Architecture
- augmenter la modularisation, exemple avec le fichier `storage.ts` :
	- repenser les fonctions `{js} getStorage()` et `{js} setStorage()` et les objets `storageInfos` et `verifStorage` pour une meilleure cohérence et fluidité dans l'utilisation
	- arriver à terme à des fichiers séparés n'ayant qu'une responsabilité avec des `{js} export default` :
		- `getStorage.ts`
		- `setStorage.ts`
		- `storage.ts`