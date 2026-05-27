# Smells
- lister clairement des valeurs comportementales de `setStorage()` sous forme de variables qui les remplaceront dans les scripts de l'app' :
```js
// Lors d'un appel à setStorage() :
// - l'app n'a besoin que des entiers positifs dans les valeurs stockées
// - les valeurs négatives servent à définir les comportements du stockage
const StoreInit      = 0;
const StoreNoChanges = -1;
const StoreReload    = -2;
```
exemple :
```js
setStorage([-2], -2, 0, 0, -1);
```
devient :
```js
// verbeux mais explicite
setStorage([StoreReload], StoreReload, StoreInit, StoreInit, StoreNoChanges);
```

Pour les utiliser de façon globale, ces variables sont à rassembler dans un module séparé importé dans :
- `createAction.ts`
- `storage.ts`
---
# Cohérence
- uniformiser les recherches d'id du DOM : la plupart sont déjà appelés par `getElementById`
	- remplacer `querySelector("#more_infos")` par `getElementById("more_infos")`
	- idem avec `querySelector("#question")`, `querySelector("#selected")` et `querySelector("#deck")`


# Refacto

## GitHub
- protéger les branches `main` et `dev` pour forcer la revue de code en Pull Requests

## Config
- mettre à jour les dépendances avec `npm install`

## HTML
- dans le fichier `index.html` :
	- virer les balises `<link>` concernant les typo car elles sont dans les assets et appelées par le CSS
	- relever la balise `<base target="_blank" />` pour la mettre en first-child de `<body>` au lieu d'être dans `<main>`

## Javascript
- dans `storage.ts` changer `let` en `const` pour l'objet `storageInfos`

## TypeScript
- fichiers `.ts` :
	- remplacer le type `any` du fichier `createAction.ts` par un typage correct
	- revoir le typage TypeScript :
		- enlever les typages redondants que TypeScript définit tout seul
		- créer un fichier d'*interfaces*/*types* pour y regrouper les autres typages et les appeler dans les scripts qui en ont besoin

## Architecture
- augmenter la modularisation, exemple avec le fichier `storage.ts` :
	- repenser les fonctions `getStorage()` et `setStorage()` et les objets `storageInfos` et `verifStorage` pour une meilleure cohérence et fluidité dans l'utilisation
	- arriver à terme à des fichiers séparés n'ayant qu'une responsabilité avec des `export default` :
		- `getStorage.ts`
		- `setStorage.ts`
		- `storage.ts`