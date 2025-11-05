// sauvegarde par défaut
let storageInfos: {drawSelection: number[], selectedCard: number, userScore: number, bestScore: number} = {
        drawSelection: new Array,   // les index des cartes restantes du tirage
        selectedCard: -1,           // carte en cours de (-1 pour aucune sélectionnée)
        userScore: 0,               // score en cours
        bestScore: 0
    }
// récupérer la sauvegarde
function getStorage(): {drawSelection: number[], selectedCard: number, userScore: number, bestScore: number} | null {
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
const verifStorage: {drawSelection: number[], selectedCard: number, userScore: number, bestScore: number} | null = getStorage();
if (verifStorage !== null) {
    storageInfos  = verifStorage;
}
// préparer la sauvegarde
function setStorage(dSelect: number[], sCard: number, uScore: number, bScore: number): void {
    // les valeurs -1 indique de ne faire aucun changement
    dSelect[0]  = dSelect[0] as number;
    dSelect     = (dSelect[0] < 0) ? storageInfos.drawSelection : dSelect;
    sCard       = (sCard < 0) ? storageInfos.selectedCard : sCard;
    uScore      = (uScore < 0) ? storageInfos.userScore : uScore;
    bScore      = (bScore < 0) ? storageInfos.bestScore : bScore;
    storageInfos = {
        drawSelection: dSelect,
        selectedCard: sCard,
        userScore: uScore,
        bestScore: bScore
    }
    // on sérialise et on sauvegarde
    localStorage.setItem("storageInfos", JSON.stringify(storageInfos));
}
export {setStorage, getStorage, storageInfos};