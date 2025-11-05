// fonction de mélange
function shuffleArray(array: (number | string | undefined)[]): void {
  let i: number = array.length;
  while (i) {
    const j: number = Math.floor(Math.random() * i--);
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export default shuffleArray;