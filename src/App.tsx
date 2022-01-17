import "./App.css";
import { Hangman } from "./components/Hangman";

export const App = (): JSX.Element => {
  return (
    <div className="container">
      <Hangman />
    </div>
  );
}

export default App;
