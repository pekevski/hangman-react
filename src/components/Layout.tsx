import styled, { css } from "styled-components";

export const H1 = styled.h1``;
export const H2 = styled.h2``;
export const H3 = styled.h3``;
export const Paragraph = styled.p``;

export const LetterStyle = css`
    border: none;
    padding: 0;
    background: repeating-linear-gradient(
        90deg,
        dimgrey 0,
        dimgrey 1ch,
        transparent 0,
        transparent 1.5ch
    )
    0 100%/ 10ch 2px no-repeat;
    font: 5ch droid sans mono, consolas, monospace;
`

export const Container = styled.div`
    padding: 0.5rem;
`

type SectionProps = {
    horizontal: boolean;
}

export const Section = styled.div<SectionProps>`
    margin-top: 1rem;
    margin-bottom: 1rem;

    ${props => props.horizontal && css`
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-start;
    `}
`

export const Button = styled.button`
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 0.5rem;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`