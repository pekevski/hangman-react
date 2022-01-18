import { MouseEventHandler } from "react"
import styled from "styled-components"
import { HangmanResult } from "../model/HangmanResult"
import { Container, H1, H2, Button } from "./Layout"

type ResultProps = {
    result: HangmanResult,
    word: string,
    onRetry: MouseEventHandler<HTMLButtonElement>
}

const message = (result: HangmanResult): string => {

    let message = '';

    switch (result) {
        case HangmanResult.LOSER:
            message = 'You Lost 💀'
            break;
        case HangmanResult.WINNER:
            message = 'Congratulations! 🎉'
            break;
        default:
            break;
    }

    return message;
}

const Underline = styled.span`
    text-decoration: underline
`

export const Result = (props: ResultProps) => {

    return (
        <Container>
            <H1>{message(props.result)}</H1>
            <H2>Word: <Underline>{props.word}</Underline></H2>
            <Button onClick={props.onRetry}>
                Retry
            </Button>
        </Container>
    )
}