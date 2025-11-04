// désactiver les boutons d'un block quand l'un d'eux a été cliqué
function actionOff(id: number, buttonClass: string) {
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

// créer un element interactif
// envoyer l'ID du block auquel ajouter l'élément
// envoyer le "text" à afficher à l'intérieur
// envoyer le "title" à afficher lors du passage de la souris ou pour le alt
function createAction(id: number, blockId: string, text: string, title: string): void {
    // on intègre le texte qu'affiche le bouton
    const buttonContent: Text = document.createTextNode(text);
    const choiceButton: HTMLButtonElement = document.createElement("button");
    choiceButton.appendChild(buttonContent);
    // on intègre son titre
    choiceButton.title      = title;
    // on le rend clickable et on l'identifie avec une classe
    choiceButton.className  = "ok " + blockId;
    // on définit son ID qu'on met en mémoire
    choiceButton.id      = `${blockId}${id}`;
    // on crée une action quand le bouton est cliqué
    choiceButton.addEventListener("click", () => {
        // s'il est clickable
        if (choiceButton.classList.contains("ok")) {
            // on change l'affichage des boutons
            actionOff(id, blockId);
        }
        });
    // on ajoute le bouton à la liste des propositions
    document.querySelector("#" + blockId)?.appendChild(choiceButton);
}
export default createAction;