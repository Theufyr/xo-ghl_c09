import arcanesList from "./datas/arcanesList.js";
// import drawCard from "./draw.js";
import createAction from "./createAction.js";

// GESTION SAUVEGARDE
import {setStorage, getStorage, storageInfos} from "./storage.js";
// affichage des scores
function scoreDisplay(id: string, score: number): void {
    const changeScore: Text = document.createTextNode(`${score}`);
    const oldScore = <HTMLDivElement>document.getElementById(id);
    oldScore.textContent = changeScore.textContent;
}
scoreDisplay("user_score", storageInfos.userScore);
scoreDisplay("best_score", storageInfos.bestScore);

// CERTIFICAT EN FIN DE PARTIE
// on masque l'encart de certification
const certifBlock = <HTMLElement>document.getElementById("confirmation");
certifBlock.style.display = "none";

// TIRAGE
// liste de boutons pour choisir le nombre de cartes du tirage (nb de questions du quizz)
// seulement un nombre pair et entre 4 et 22 compris
let drawNumbers: number = 4;
// on crée un bouton pour chaque type de tirage
while (drawNumbers <= 22) {
    // envoyer :
    // - id du bouton
    // - id du block dans lequel ajouter les boutons
    //   (qui servira aussi à savoir quel type d'action aura le bouton)
    // - le texte affiché dans le bouton
    // - le titre ou alt informant de sa fonctionnalité
    createAction(drawNumbers, "draw_selection", `${drawNumbers}`, `Tirage de ${drawNumbers} cartes`);
    drawNumbers = (drawNumbers + 2);
}

// afficher dans "#deck" le nb de cartes choisies (ou restantes)
// lancer le tirage de cartes
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
