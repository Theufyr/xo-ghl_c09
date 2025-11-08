// sauvegarde par défaut
let storageInfos: {drawSelection: number[], selectedCard: number, scoreMax: number, userScore: number, bestScore: number} = {
        drawSelection: [-1],    // les index des cartes restantes du tirage
        selectedCard: -1,       // carte en cours de (-1 pour aucune sélectionnée)
        scoreMax: 0,            // score maximum possible dans la partie
        userScore: 0,           // score en cours
        bestScore: 0
    }
// récupérer la sauvegarde
function getStorage(): {drawSelection: number[], selectedCard: number, scoreMax: number, userScore: number, bestScore: number} | null {
    let storageInfos: string | null = localStorage.getItem("storageInfos");
    // on vérifie qu'il y a une sauvegarde
    if (storageInfos !== null) {
        // on la remet au format javascript
        return JSON.parse(storageInfos);
    } else {
        return null;
    }
}
// récupération de sauvegarde déjà existante
const verifStorage: {drawSelection: number[], selectedCard: number, scoreMax: number, userScore: number, bestScore: number} | null = getStorage();
if (verifStorage !== null) {
    storageInfos  = verifStorage;
}
// préparer la sauvegarde
function setStorage(dSelect: number[], sCard: number, sMax: number, uScore: number, bScore: number): void {
    // envoyer la valeur -1 indique de ne faire aucun changement
    // envoyer la valeur -2 signifie de réinitialiser
    dSelect[0]  = dSelect[0] as number;
    if (dSelect[0] == -2) {
        dSelect = [];
    } else {
        dSelect = (dSelect[0] < 0) ? storageInfos.drawSelection : dSelect;
    }
    sCard       = (sCard < 0) ? storageInfos.selectedCard : sCard;
    sCard       = (sCard == -2) ? -1 : sCard;
    sMax        = (sMax < 0) ? storageInfos.scoreMax : sMax;
    uScore      = (uScore < 0) ? storageInfos.userScore : uScore;
    bScore      = (bScore < 0) ? storageInfos.bestScore : bScore;
    storageInfos = {
        drawSelection: dSelect,
        selectedCard: sCard,
        scoreMax: sMax,
        userScore: uScore,
        bestScore: bScore
    }
    // on sérialise et on sauvegarde
    localStorage.setItem("storageInfos", JSON.stringify(storageInfos));
}
export {setStorage, storageInfos};