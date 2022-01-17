

export async function getRandomWord() {
    let word = "Hangman";
    try {
      const data = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const wordJSON = await data.json();
      word = wordJSON[0];
      console.log(word);
    } catch (err) {
      // noop
    }
  
    return word
}

// Check result 
export const checkResult = (letters, remainingGuesses) => {

    if (letters.length === 0) {
      return undefined
    }

    const allShown = letters.every(l => l.isShown);

    if (allShown) {
      return "WINNER! :)";
    } else if (remainingGuesses === 0) {
      return "DEAD :(";
    } else {
      return undefined;
    }
};