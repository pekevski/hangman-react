import { HangmanLetter } from "../model/HangmanLetter";
import styled, { css } from 'styled-components' 
import { H1, LetterStyle, Section } from "./Layout";

type LetterProps = {
  show: boolean;
  letter?: string;
};

const LetterSpan = styled.span<LetterProps>`
  ${LetterStyle}
  letter-spacing: 0.5ch;

  ${props => props.show && css`
    color: darkgreen;
  `}
`

export const Letter = ({show, letter}: {show: boolean, letter: string}) => {
  return (
    <LetterSpan show={show}>
      {(show) ? letter : '?'}
    </LetterSpan>
  );
};

type LettersProps = {
  letters: Array<HangmanLetter>;
};

export const Letters = (props: LettersProps): JSX.Element => {
  if (!props.letters.length) {
    return <H1>Wrapping rope around someones neck...</H1>;
  }

  return (
    <Section horizontal={true}>
      {props.letters.map((value, index) => (
        <Letter key={index} letter={value.character} show={value.isShown} />
      ))}
    </Section>
  );
};
