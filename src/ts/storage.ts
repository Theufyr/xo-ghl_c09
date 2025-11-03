// on prépare la sauvegarde
function setStorage(dSelect: number[], sCard: number, uScore: number): void {
    let storageInfos = {
        drawSelection: dSelect,
        selectedCard: sCard,
        userScore: uScore
    }
    // on sérialise et on sauvegarde
    localStorage.setItem("storageInfos", JSON.stringify(storageInfos));
}
// on prépare la sauvegarde
function getStorage(): {drawSelection: number[], selectedCard: number, userScore: number} | null {
    let storageInfos: any = localStorage.getItem("storageInfos");
    // on vérifie qu'il y a une sauvegarde
    if (storageInfos !== null) {
        // on la remet au format javascript
        return JSON.parse(storageInfos);
    } else {
        return null;
    }
}
export {setStorage, getStorage};