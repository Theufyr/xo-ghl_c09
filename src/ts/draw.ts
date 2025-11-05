import arcanesList from "./datas/arcanesList.js";
import createAction from "./createAction.js";
import shuffleArray from "./shuffleArray.js";

// déclaration de variables
let drawnCards: number[] = [];  // tous les index des cartes déjà tirées
let cardsDeck: number[] = [];   // tous les index des cartes en base de données
arcanesList.map((value: any, index: number) => cardsDeck.push(index));

// on enlève les cartes déjà tirées qu'elles soient à nouveau tirées
function deckUpdate(drawned: number[], all: number[]): number[] {
  if (drawned.length > 0) {
    drawned.forEach((value) => {
      all = all.splice(value);
    });
  }
  return all;
}

// on enlève du paquet les cartes déjà titrées
// et on mélange le paquet
cardsDeck = deckUpdate(drawnCards, cardsDeck);
shuffleArray(cardsDeck);

// on affiche toutes le cartes face cachée
let drawStatus: boolean = true;
cardsDeck.forEach((value) => {
  // on crée l'élément image de la carte face cachée
  const cardBack: HTMLImageElement = document.createElement("img");
  cardBack.src  = "./src/assets/images/back.png";
  cardBack.alt = "Carte de Tarot face cachée";
  // on ajoute la carte au paquet
  document.querySelector("#deck")?.appendChild(cardBack);

  // si la carte est choisie :
  cardBack.addEventListener("click", () => {
    if (drawStatus === true) {
      // on retire la carte du paquet
      cardBack.style.display = "none";
      drawnCards.push(value);
// --------------------------------------------------------------------
// save localStorage
// --------------------------------------------------------------------
      // on affiche la carte tirée
      const cardDisplay = <HTMLImageElement>document.querySelector("#selected");
      cardDisplay.src  = "./src/assets/images/" + value + ".png";
      // on arrête le tirage
      drawStatus = false;
      // on affiche la question
      const questionElement = <HTMLElement>document.querySelector("#question");
      const questionDisplay: string = arcanesList[value]?.question + " :";
      questionElement.textContent  = questionDisplay;
      // on mélange et on affiche les réponses
      let answersList = [
                          arcanesList[value]?.proposition1,
                          arcanesList[value]?.proposition2,
                          arcanesList[value]?.proposition3,
                          arcanesList[value]?.answer
                        ];
      shuffleArray(answersList);
      answersList.forEach((answerText: string | undefined, index: number) => {
        const answerTextSend: string = answerText as string;
        // envoyer :
        // - id du bouton
        // - id du block dans lequel ajouter les boutons
        //   (qui servira aussi à savoir quel type d'action aura le bouton)
        // - le texte affiché dans le bouton
        // - le titre ou alt informant de sa fonctionnalité
        createAction(index, "answers", answerTextSend, "Réponse possible");
      });
    }
  });
});

//--------------------- TAROT MAJEUR ---------------------------------//
// verifie la reponse de l'utilisateur
// donne un feedback a l'utilisateur
// puis passe a la carte suivante
// jusqu'a ce que toutes les cartes aient ete tirees
// enfin, affiche le score final de l'utilisateur
// possibilité de recommencer le jeu
// le score doit etre calcule en fonction des reponses correctes
// le jeu doit etre interactif et convivial
// le jeu doit etre accessible sur differentes plateformes
// le jeu doit etre optimisé pour de bonnes performances
// le code doit etre propre et bien documente
// le jeu doit etre testable et maintenable
// le jeu doit respecter les bonnes pratiques de developpement
// le jeu doit etre evolutif pour permettre l'ajout de nouvelles fonctionnalites
// le jeu doit etre securise pour proteger les donnees des utilisateurs
// le jeu doit respecter la vie privee des utilisateurs

console.log("test");
// Implementation for drawing Arcane Major Arcana cards goes here
let drawCard = 3;
export default drawCard;
