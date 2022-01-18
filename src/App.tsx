import styled from "styled-components";
import "./App.css";
import { Hangman } from "./components/Hangman";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const App = (): JSX.Element => {
  return (
    <Container>
      <Hangman />
    </Container>
  );
};

export default App;
