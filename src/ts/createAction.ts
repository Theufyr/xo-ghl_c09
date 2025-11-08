import shuffleArray from "./shuffleArray.js";
import arcanesList from "./datas/arcanesList.js";
import arcanesComments from "./datas/arcanesComments.js";
import {setStorage, storageInfos} from "./storage.js";
// page principale
const mainPage = <HTMLElement>document.getElementById("main_page");
// paquet de cartes
const deckDisplay = <HTMLImageElement>document.getElementById("deck");
// carte tirée
const cardSelected   = <HTMLImageElement>document.querySelector("#selected");
// la question
const questionElement = <HTMLElement>document.querySelector("#question");
// bouton pour réinitialiser le meilleur score
const initBestScore = <HTMLButtonElement>document.getElementById("init_best_score");
initBestScore.addEventListener("click", () => {
    setStorage(storageInfos.drawSelection, storageInfos.selectedCard, storageInfos.scoreMax, storageInfos.userScore, 0);
    scoreDisplay("best_score", storageInfos.bestScore);
});
// ---------------------------------------------
// ELEMENTS A MASQUER AU DEPART
// ---------------------------------------------
// les informations supplémentaires à propos d'une carte
const moreInfos = <HTMLDivElement>document.querySelector("#more_infos");
moreInfos.style.display = "none";
// le message d'invitation à tirer une carte
const drawInvite = <HTMLElement>document.getElementById("draw_invite");
drawInvite.style.visibility = "hidden";
// le message de félicitation lors d'un meilleur score
const congratsMessage = <HTMLElement>document.getElementById("congrats");
congratsMessage.style.display = "none";
// encart de certification pour fin de partie
const certifBlock = <HTMLElement>document.getElementById("confirmation");
certifBlock.style.display = "none";
// bouton pour valider la fin de partie
const validationButton = <HTMLButtonElement>document.getElementById("validation");
validationButton.style.display = "none";
validationButton.addEventListener("click", () => {
    // on masque la page principale
    mainPage.style.display = "none";
    // on affiche la page de certificat
    validationButton.style.display = "none";
    certifBlock.style.display = "inherit";
});
// ---------------------------------------------
// ELEMENTS A AFFICHER LORS D'UN RECHARGEMENT
// DE LA PAGE S'IL Y AVAIT UNE PARTIE EN COURS
// ---------------------------------------------
// 
// __________________________________________________________________________


// ---------------------------------------------
// NETTOYAGE D'UN ELEMENT
// ---------------------------------------------
function cleanBlock(idBlock: string): void {
    let oldElements = document.getElementById(idBlock);
    while (oldElements?.firstChild) {
        oldElements.removeChild(oldElements.firstChild);
    }
}

// ---------------------------------------------
// LANCER/RELANCER UN JEU
// ---------------------------------------------
function restartGame(): void {
    // on masque la page de certificat
    certifBlock.style.display = "none";
    // réinitialisation de la sauvegarde
    setStorage([-2], -2, 0, 0, -1);
    // on réinitialise le score
    scoreDisplay("user_score", storageInfos.userScore);
    // on efface l'éventuel ancien paquet
    cleanBlock("deck");
    // on refait apparaître le paquet de cartes
    deckDisplay.style.display = "grid";
    // on efface l'éventuel message de félicitation
    congratsMessage.style.display = "none";
    // on remet une carte face cachée dans la sélection
    cardSelected.src     = "./src/assets/images/back.png";
    cardSelected.alt     = "Carte de Tarot face cachée";
    // on efface l'éventuelle question
    questionElement.textContent  = "";
    // on efface les éventuelles anciennes réponses
    cleanBlock("answers");
    // on supprime les informations éventuelles sur la carte précédente
    moreInfos.textContent   = "";
    moreInfos.style.display = "none";
    // on réinitialise les boutons de choix de tirage
    buttonsOff(-1, "draw_selection", true);
    // on affiche la page principale
    mainPage.style.display = "flex";
}

// bouton pour relancer un jeu
const restartButton = <HTMLButtonElement>document.getElementById("restart");
restartButton.addEventListener("click", () => {
    restartGame();
});

// ---------------------------------------------
// AFFICHAGE DES SCORES
// ---------------------------------------------
function scoreDisplay(id: string, score: number): void {
    let newScore: string = `${score}`;
    if (id == "best_score") {
        const certificatesImg: string[] = ["Le Fou", "Le Chariot", "La Force", "Les Étoiles", "La Papesse"];
        newScore = certificatesImg[score] as string;
    }
    const changeScore: Text = document.createTextNode(newScore);
    const oldScore = <HTMLDivElement>document.getElementById(id);
    oldScore.textContent = changeScore.textContent;
}

// ---------------------------------------------
// DESACTIVATION/REACTIVATION DES BOUTONS
// ---------------------------------------------
function buttonsOff(id: number, buttonClass: string, activate: boolean) {
    // on récupère les boutons du block et on en fait un tableau
    const allButtons: HTMLCollection = document.getElementsByClassName(buttonClass);
    const allButtonsArray: Element[] = Array.from(allButtons);
    allButtonsArray.forEach((button: Element) => {
        if (buttonClass == "card") {
            // on désactive le tirage de cartes
            if (activate !== true) {
                button.classList.remove("ok");
            } else {
                // sinon on réactive le tirage de cartes
                // si le paquet n'est pas vide
                if (storageInfos.drawSelection[0] !== undefined) {
                    button.classList.add("ok");
                }
            }
        } else {
            // on désactive les boutons
            if (activate !== true) {
                // on marque le bouton cliqué
                if (button.id == (buttonClass + id)) {
                    button.classList.replace("ok", "chosen");
                // on grise tous les autres boutons
                } else {
                    button.classList.replace("ok", "off");
                }
            // on réinitialise les boutons
            } else {
                // on supprime d'abord les éventuels ancien boutons
                cleanBlock("draw_selection");
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
            }
        }
    });
}

// ---------------------------------------------
// GESTION GRID DU PAQUET DE CARTES
// ---------------------------------------------
let gridColumnValues: number[] = [1, 3];
let gridTemplate: string = "100%";
function createGrid(): void {
    const gridPercent = Math.floor(100 / storageInfos.drawSelection.length);
    gridTemplate = "";
    // on rajoute 1 colonne pour que les cartes se superposent de moitié
    let i: number = (storageInfos.drawSelection.length + 1);
    while (i) {
        gridTemplate += ` ${gridPercent}%`;
        i--;
    }
    deckDisplay.style.gridTemplateColumns = gridTemplate;
    gridColumnValues = [1, 3];
}

// ---------------------------------------------
// AFFICHAGE DE LA CARTE CHOISIE
// ---------------------------------------------
function cardDisplay(nb: number) {
    // on retire la carte du paquet et on la garde en mémoire
    let cardIndex: number = storageInfos.drawSelection.indexOf(nb);
    storageInfos.drawSelection.splice(cardIndex, 1);
    // on sauvegarde le paquet réduit
    setStorage(storageInfos.drawSelection, nb, -1, -1, -1);
    // s'il vient d'être vidé on ne l'affiche plus
    if (storageInfos.drawSelection[0] === undefined) {
        deckDisplay.style.display = "none";
    } else {
        // on re-génère l'affichage du paquet sans la carte tirée
        generateDeck(storageInfos.drawSelection.length, false);
    }
    // on affiche la carte tirée
    cardSelected.src     = "./src/assets/images/" + nb + ".png";
    cardSelected.alt     = "Arcane " + arcanesList[nb]?.cardname;
    // on met le tirage en pause
    buttonsOff(nb, "card", false);
    // on affiche la question
    const questionDisplay: string = arcanesList[nb]?.question + " :";
    questionElement.textContent  = questionDisplay;
    // on mélange et on affiche les réponses
    let answersList = [
            arcanesList[nb]?.proposition1,
            arcanesList[nb]?.proposition2,
            arcanesList[nb]?.proposition3,
            arcanesList[nb]?.answer
        ];
    shuffleArray(answersList);
    // on supprime d'abord l'éventuel affichage d'anciennes réponses
    cleanBlock("answers");
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
    // on supprime les informations éventuelles sur la carte précédente
    moreInfos.textContent   = "";
    moreInfos.style.display = "none";
}

// ---------------------------------------------
// CREATION DU PAQUET DE CARTES
// ---------------------------------------------
function generateDeck(nb: number, refresh: boolean) {
    // on supprime d'abord l'éventuel paquet précédemment affiché
    cleanBlock("deck");
    // on re-génère le paquet si un refresh est demandé
    if (refresh == true) {
        // on récupère tous les index des cartes en base de données
        let cardsDeck: number[] = [];
        arcanesList.map((value: any, index: number) => cardsDeck.push(index));
        // on mélange le paquet
        shuffleArray(cardsDeck);
        // on ne garde que le nb demandé de cartes (les premières du paquet)
        cardsDeck = cardsDeck.splice(0, nb);
        // on sauvegarde le paquet créé et le score max
        setStorage(cardsDeck, -1, nb, -1, -1);
        // on affiche le message d'invitation à tirer une carte
        drawInvite.style.visibility = "visible";
    }
    // calcul du Grid pour le paquet
    createGrid();
    // on l'affiche
    storageInfos.drawSelection.forEach((value: number) => {
        // on crée l'élément image de la carte face cachée
        const cardBack: HTMLImageElement = document.createElement("img");
        cardBack.id     = `card${value}`;
        cardBack.className = "card ok";
        cardBack.src    = "./src/assets/images/back.png";
        cardBack.alt    = "Carte de Tarot face cachée";
        cardBack.style.gridColumn = `${gridColumnValues[0]} / ${gridColumnValues[1]}`;
        // on décale le Grid pour l'éventuelle prochaine carte
        gridColumnValues[0] = (gridColumnValues[0] as number + 1);
        gridColumnValues[1] = (gridColumnValues[1] as number + 1);
        // on ajoute la carte au paquet
        document.querySelector("#deck")?.appendChild(cardBack);
        // si la carte est choisie :
        cardBack.addEventListener("click", () => {
            // si la carte est clickable
            if (cardBack.classList.contains("ok")) {
                cardDisplay(value);
                // on masque  le message d'invitation à tirer une carte
                drawInvite.style.visibility = "hidden";
            }
        });
    });
}

// ---------------------------------------------
// CREATION DES BOUTONS/CARTES
// ---------------------------------------------
// envoyer l'ID du block auquel ajouter l'élément
// envoyer le "text" à afficher à l'intérieur
// envoyer le "title" à afficher lors du passage de la souris ou pour le alt
function createAction(id: number, blockId: string, text: string, title: string): void {
    // le bouton créé est une réponse
    let goodAnswer: string = "";
    if (blockId == "answers") {
        // si c'est la bonne réponse
        if (text == arcanesList[storageInfos.selectedCard]?.answer) {
                goodAnswer = " good";
        }
    }
    // on intègre le texte qu'affiche le bouton
    const buttonContent: Text = document.createTextNode(text);
    const choiceButton: HTMLButtonElement = document.createElement("button");
    choiceButton.appendChild(buttonContent);
    // on définit son ID qu'on met en mémoire
    choiceButton.id      = `${blockId}${id}`;
    // on le rend clickable et on l'identifie avec une classe
    choiceButton.className  = "ok " + blockId + goodAnswer;
    // on intègre son titre
    choiceButton.title      = title;
    // on crée une action quand le bouton est cliqué
    choiceButton.addEventListener("click", () => {
        // s'il est clickable
        if (choiceButton.classList.contains("ok")) {
            // on change l'affichage des boutons
            buttonsOff(id, blockId, false);
            // on crée l'action pour le choix du tirage de cartes
            if (blockId == "draw_selection") {
                // on prépare le paquet de cartes
                generateDeck(id, true);
            }
            if (blockId == "answers") {
                // on change la couleur du bouton pour signaler la bonne réponse
                const allAnwsers: HTMLCollection = document.getElementsByClassName("good");
                const allAnwsersArray: Element[] = Array.from(allAnwsers);
                allAnwsersArray.forEach((button: Element) => {
                    button.classList.add("good_answer");
                });
                // on vérifie la réponse
                if (text == arcanesList[storageInfos.selectedCard]?.answer) {
                    // bonne réponse
                    // on gagne 1 point
                    storageInfos.userScore++;
                    // on enregistre et on affiche le nouveau score
                    setStorage(storageInfos.drawSelection, storageInfos.selectedCard, storageInfos.scoreMax, storageInfos.userScore, storageInfos.bestScore);
                    scoreDisplay("user_score", storageInfos.userScore);
                } else {
                    // mauvaise réponse
                }
                // on affiche les informations supplémentaires à propos de la carte
                const moreInfosText: string = arcanesComments[storageInfos.selectedCard] as string;
                moreInfos.textContent   = moreInfosText;
                moreInfos.style.display = "inherit";
                // on réactive le tirage de cartes
                buttonsOff(id, "card", true);
                // si c'était la dernière carte
                if (storageInfos.drawSelection[0] === undefined) {
                    // on compare le score pour définir le niveau
                    // on choisit le certificat
                    const certificatesLevels: number[] = [0, 1, 2, 3, 4];
                    let certificationImage: number = Math.floor((storageInfos.userScore * 4) / storageInfos.scoreMax);
                    // 5 cerfications possibles :
                    // - score 0
                    // - score entre 0 et la moyenne
                    certificationImage = ((storageInfos.userScore > 0) && (storageInfos.userScore < (storageInfos.scoreMax / 2))) ? 1 : 0;
                    // - score = à la moyenne
                    certificationImage = (storageInfos.userScore == (storageInfos.scoreMax / 2)) ? 2 : certificationImage;
                    // - score entre la moyenne et le score max
                    certificationImage = ((storageInfos.userScore > (storageInfos.scoreMax / 2)) && (storageInfos.userScore < storageInfos.scoreMax)) ? 3 : certificationImage;
                    // - score max
                    certificationImage = (storageInfos.userScore == storageInfos.scoreMax) ? 4 : certificationImage;
                    // on met en mémoire si c'est un meilleur score
                    if (certificationImage > storageInfos.bestScore) {
                        storageInfos.bestScore = certificationImage;
                        setStorage(storageInfos.drawSelection, storageInfos.selectedCard, storageInfos.scoreMax, storageInfos.userScore, storageInfos.bestScore);
                        scoreDisplay("best_score", storageInfos.bestScore);
                        // on affiche le message de félicitation
                        congratsMessage.style.display = "inherit";
                    }
                    const certifImage = <HTMLImageElement>document.getElementById("certif_image");
                    certifImage.src = `./src/assets/images/certificats/${certificationImage}.png`;
                    // on affiche le bouton pour passer au cerfificat de fin de partie
                    validationButton.style.display = "inherit";
                // sinon on reprend
                } else {
                    // on affiche le message d'invitation à tirer une carte
                    drawInvite.style.visibility = "visible";
                }
            }
        }
    });
    // on ajoute le bouton à la liste des propositions
    document.getElementById(blockId)?.appendChild(choiceButton);
}
export {scoreDisplay, createAction};