import shuffleArray from "./shuffleArray.js";
import arcanesList from "./datas/arcanesList.js";
import {setStorage, getStorage, storageInfos} from "./storage.js";


// désactiver les boutons d'un block quand l'un d'eux a été cliqué
function buttonsOff(id: number, buttonClass: string) {
    // on récupère les boutons du block et on en fait un tableau
    const allButtons: HTMLCollection = document.getElementsByClassName(buttonClass);
    const allButtonsArray: Element[] = Array.from(allButtons);
    allButtonsArray.forEach((button: Element) => {
        if (buttonClass == "deck") {
            button.classList.remove("ok");
        } else {
            // on marque le bouton cliqué
            if (button.id == (buttonClass + id)) {
                button.classList.replace("ok", "chosen");
            // on grise tous les autres boutons
            } else {
                button.classList.replace("ok", "off");
            }
        }
    });
}

// gestion du Grid pour l'affichage du paquet de carte
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
        console.log(i);
    }
    const deckOff = <HTMLImageElement>document.getElementById("deck");
    deckOff.style.gridTemplateColumns = gridTemplate;
    // 22 cartes max à afficher
    // pour chacune 4.5%
//    deckOff.style.width = (storageInfos.drawSelection.length * 4.5) + "%";
    gridColumnValues = [1, 3];
}

// affichage d'une carte choisie
function cardDisplay(nb: number) {
    // on retire la carte du paquet
    storageInfos.drawSelection.push(nb);
    // on sauvegarde le paquet réduit
    // s'il vient d'être vidé, on le réinitialise et on ne l'affiche plus
    if (storageInfos.drawSelection.length < 0) {
        storageInfos.drawSelection = [-1];
        const deckOff = <HTMLImageElement>document.getElementById("deck");
        deckOff.style.display = "none";
    } else {
        // on re-génère l'affichage du paquet sans la carte tirée
//        generateDeck(id, false); {
    }
    // on sauvegarde le paquet réduit
    setStorage(storageInfos.drawSelection, -1, -1, -1);
    // on affiche la carte tirée
    const cardDisplay   = <HTMLImageElement>document.querySelector("#selected");
    cardDisplay.src     = "./src/assets/images/" + nb + ".png";
    cardDisplay.alt     = "Arcane " + arcanesList[nb]?.cardname;
    // on met le tirage en pause
    buttonsOff(nb, "deck");
    // on affiche la question
    const questionElement = <HTMLElement>document.querySelector("#question");
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
    let oldAnswers = document.getElementById("answers");
    while (oldAnswers?.firstChild) {
        oldAnswers.removeChild(oldAnswers.firstChild);
    }
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

// préparation du jeu de cartes
function generateDeck(nb: number, refresh: boolean) {
// --------------------------------------------------------------------
// ne pas regénérer le paquet si refresh = false
// --------------------------------------------------------------------
    // on récupère tous les index des cartes en base de données
    let cardsDeck: number[] = [];
    arcanesList.map((value: any, index: number) => cardsDeck.push(index));
    // on mélange le paquet
    shuffleArray(cardsDeck);
    // on ne garde que le nb demandé de cartes (les premières du paquet)
    cardsDeck = cardsDeck.splice(0, nb);
    // on sauvegarde le paquet créé
    setStorage(cardsDeck, -1, -1, -1);
    // calcul du Grid pour le paquet
    createGrid();
    // on l'affiche
    cardsDeck.forEach((value: number) => {
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
            }
        });
    });
}

// créer un element interactif
// envoyer l'ID du block auquel ajouter l'élément
// envoyer le "text" à afficher à l'intérieur
// envoyer le "title" à afficher lors du passage de la souris ou pour le alt
function createAction(id: number, blockId: string, text: string, title: string): void {
    // on intègre le texte qu'affiche le bouton
    const buttonContent: Text = document.createTextNode(text);
    const choiceButton: HTMLButtonElement = document.createElement("button");
    choiceButton.appendChild(buttonContent);
    // on définit son ID qu'on met en mémoire
    choiceButton.id      = `${blockId}${id}`;
    // on le rend clickable et on l'identifie avec une classe
    choiceButton.className  = "ok " + blockId;
    // on intègre son titre
    choiceButton.title      = title;
    // on crée une action quand le bouton est cliqué
    choiceButton.addEventListener("click", () => {
        // s'il est clickable
        if (choiceButton.classList.contains("ok")) {
            // on change l'affichage des boutons
            buttonsOff(id, blockId);
            // on crée l'action pour le choix du tirage de cartes
            if (blockId == "draw_selection") {
                // on prépare le paquet de cartes
                generateDeck(id, true);
            }
            if (blockId == "answers") {
// --------------------------------------------------------------------
// on réagit à la réponse choisie
// --------------------------------------------------------------------
            }
        }
    });
    // on ajoute le bouton à la liste des propositions
    document.getElementById(blockId)?.appendChild(choiceButton);
}
export default createAction;