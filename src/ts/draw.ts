import arcaneDatabase from "./database.js";
let drawnCards: number[] = [];
// recupere les cartes depuis la base de donnee
let cardsDisplay: number[] = [];
arcaneDatabase.map((value, index) => cardsDisplay.push(index));
let drawCard = 3;
// on eleve les carte déjà tirée de la base de donnée pour éviter les doublons
function arcaneDraw() {
  if (drawnCards.length > 0) {
    drawnCards.forEach((value) => {
      cardsDisplay = cardsDisplay.splice(value);
      console.log(value);
    });
  }
}
arcaneDraw();
console.log("test");

// un melange des cartes est effectué pour garantir l'aléatoire
function shuffleCards(array: any) {
    let m: number = array.length;
    while(m) {
        const i: number = Math.floor(Math.random() * m--);
        [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
}
console.table(cardsDisplay);
shuffleCards(cardsDisplay);

console.table(cardsDisplay);
//affiche toute le carte en face cachee
    let drawStatu: boolean = true;

    cardsDisplay.forEach((value) => {
      const cardsDisplay: any = document.createElement("div");
      cardsDisplay.textContent = value;
      document.querySelector("#cards")?.appendChild(cardsDisplay);
                cardsDisplay.addEventListener("click", () => {
      if (drawStatu === true) {
                    console.log("je choisi la carta:" + value)
                //   on met en memoire la carte tiree
                drawnCards.push(2);
                // affiche la carte tirée 
                cardsDisplay.textContent = "carte choisi";
                //arrete le tirage
                drawStatu = false;
      }
console.log(drawStatu);
                });

    });
// demande une carte a l'utilisateur


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

console.log("test Draw, Arcane Major Arcana cards...");
// Implementation for drawing Arcane Major Arcana cards goes here
export default drawCard;
