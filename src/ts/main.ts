import {scoreDisplay, createAction} from "./createAction.js";
import {storageInfos} from "./storage.js";

// affichage des scores
scoreDisplay("user_score", storageInfos.userScore);
scoreDisplay("best_score", storageInfos.bestScore);

// lancer le jeu en arrivant sur la page
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
