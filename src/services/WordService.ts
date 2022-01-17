import { HangmanLetter } from "../model/HangmanLetter";
import { HangmanResult } from "../model/HangmanResult";


export async function getRandomWord(): Promise<string> {
    let word = "Hangman";
    try {
      const data = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const wordJSON = await data.json();
      word = wordJSON[0];
    } catch (err) {
      // noop
    }
  
    return word
}

// Check result 
export const checkResult = (letters: Array<HangmanLetter>, remainingGuesses: number): HangmanResult | undefined  => {

    if (letters.length === 0) {
      return undefined
    }

    const allShown = letters.every(l => l.isShown);

    if (allShown) {
      return HangmanResult.WINNER;
    } else if (remainingGuesses === 0) {
      return HangmanResult.LOSER;
    } else {
      return undefined;
    }
};