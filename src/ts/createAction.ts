import shuffleArray from "./shuffleArray.js";
import arcanesList from "./datas/arcanesList.js";
// fonctions pour gérer les sauvegardes en localStorage
import {setStorage, getStorage, storageInfos} from "./storage.js";


// désactiver les boutons d'un block quand l'un d'eux a été cliqué
function buttonsOff(id: number, buttonClass: string) {
    // on récupère les boutons du block et on en fait un tableau
    const allButtons: HTMLCollection = document.getElementsByClassName(buttonClass);
    const allButtonsArray: Element[] = Array.from(allButtons);
    allButtonsArray.forEach((button: Element) => {
        // on marque le bouton cliqué
        if (button.id == (buttonClass + id)) {
            button.classList.replace("ok", "chosen");
        // on grise tous les autres boutons
        } else {
            button.classList.replace("ok", "off");
        }
    });
}

// affichage d'une carte choisie
function cardDisplay(nb: number) {
    // on retire la carte du paquet
    const cardOff = <HTMLImageElement>document.getElementById(`card${nb}`);
    cardOff.style.display = "none";
    storageInfos.drawSelection.push(nb);
    // on sauvegarde le paquet réduit (on le reformate s'il vient d'être vidé)
    storageInfos.drawSelection = (storageInfos.drawSelection.length > 0) ? storageInfos.drawSelection : [-1];
    setStorage(storageInfos.drawSelection, -1, -1, -1);
    // on affiche la carte tirée
    const cardDisplay = <HTMLImageElement>document.querySelector("#selected");
    cardDisplay.src  = "./src/assets/images/" + nb + ".png";
// --------------------------------------------------------------------
// on arrête le tirage (en utilisant une classe)
// --------------------------------------------------------------------
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
function createDeck(nb: number) {
    // on récupère tous les index des cartes en base de données
    let cardsDeck: number[] = [];
    arcanesList.map((value: any, index: number) => cardsDeck.push(index));
    // on mélange le paquet
    shuffleArray(cardsDeck);
    // on ne garde que le nb demandé de cartes (les premières du paquet)
    console.table(cardsDeck);
    cardsDeck = cardsDeck.splice(0, nb);
    console.table(cardsDeck);
    // on sauvegarde le paquet créé
    setStorage(cardsDeck, -1, -1, -1);
    // on l'affiche
    cardsDeck.forEach((value: number) => {
        // on crée l'élément image de la carte face cachée
        const cardBack: HTMLImageElement = document.createElement("img");
        cardBack.id  = `card${value}`;
        cardBack.src  = "./src/assets/images/back.png";
        cardBack.alt = "Carte de Tarot face cachée";
        // on ajoute la carte au paquet
        document.querySelector("#deck")?.appendChild(cardBack);
        // si la carte est choisie :
        cardBack.addEventListener("click", () => {
            cardDisplay(value);
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
                createDeck(id);
            }
        }
    });
    // on ajoute le bouton à la liste des propositions
    document.getElementById(blockId)?.appendChild(choiceButton);
}
export default createAction;