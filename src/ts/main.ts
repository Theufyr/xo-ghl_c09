import arcaneDatabase from "./database.js";
import drawCard from "./draw.js";
console.log(drawCard);

import arcaneTrial from "./trial.js";
arcaneTrial();

import arcaneValidation from "./validation.js";
arcaneValidation();

// GESTION SAUVEGARDE
// fonctions pour gérer les sauvegardes en localStorage
import {setStorage, getStorage} from "./storage.js";
// sauvegarde par défaut
let storageInfos: {drawSelection: number[], selectedCard: number, userScore: number} = {
        drawSelection: new Array,
        selectedCard: -1,           // les index de cartes vont de 0 à 21 compris
        userScore: 0
    }
// récupération de sauvegarde déjà existante
const verifStorage: {drawSelection: number[], selectedCard: number, userScore: number} | null = getStorage();
if (verifStorage !== null) {
    storageInfos  = verifStorage;
}

// TIRAGE
// liste de boutons pour choisir le nombre de cartes du tirage (nb de questions du quizz)
// seulement un nombre pair et entre 4 et 22 compris
let drawNumbers: number = 4;
while (drawNumbers <= 22) {
    // on crée un bouton
    const buttonContent: Text = document.createTextNode(`${drawNumbers}`);
    const choiceButton: HTMLButtonElement = document.createElement("button");
    choiceButton.title  = `Tirage de ${drawNumbers} cartes`;
    choiceButton.appendChild(buttonContent);
    // on crée une action quand le bouton est cliqué
  
    // on ajoute le bouton à la liste des propositions
    document.querySelector("#draw_selection")?.appendChild(choiceButton);
    drawNumbers = (drawNumbers + 2);
}
// si aucune carte n'est sélectionnée, on affiche l'encart "#draw"
const drawDisplay = <HTMLDivElement>document.querySelector("#draw");
drawDisplay.style.display = (storageInfos.selectedCard < 0) ? "flex" : "none";

// choisir le nombre de cartes pour le tirage
    // afficher encart "#draw" :
// lancer le tirage de cartes
    // masquer l'encart "#draw"
    // 1er tirage
        // mélanger toutes les cartes
        // n'en garder que le nombre demandé
        // mettre dans localStorage :
            // drawSelection    : les cartes conservées pour la partie
            // selectedCard     : un champ vide dans lequel sera la carte en cours
            // userScore        : le score à 0
    // les autres tirages
        // mettre dans localStorage :
            // retirer selectedCard de drawSelection
    // dans l'encart "deck"
        // créer et afficher la ou les carte(s) restante(s) face cachée
        // afficher l'encart "deck"
// choisir une carte
    // masquer l'encart "deck"
    // masquer l'encart "draw"
    // mettre dans localStorage :
        // la carte choisie
        // la retirer du paquet
    // afficher la carte, sa question et les réponses
    // afficher et lancer le sablier
// choisir une réponse ou fin du sablier
    // mettre dans localStorage :
        // ajouter 1 point au score si la bonne réponse a été sélectionnée
    // empêcher de cliquer sur les réponses
    // masquer le sablier
    // afficher la bonne réponse
    // afficher bouton "Choisir la carte suivante"
// s'il reste des cartes, masquer la question et afficher le tirage
console.log("test : main");