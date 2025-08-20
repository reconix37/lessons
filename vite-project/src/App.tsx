import "./App.css"
import { Title } from "./components/Title";
import { Restart } from "./components/Restart";
import { Board as BoardComponent } from "./components/Board";
import { useBoard } from "./hooks/useBoard";

function App() {
  const { currentPlayer, board, winner, handleNewGameClick, handleSquareClick } = useBoard()

  return (
    <>
      <Title currentPlayer={currentPlayer} winner={winner} />
      <BoardComponent board={board} onSquareClick={handleSquareClick} />
      <Restart onClick={handleNewGameClick} />
    </>
  );
}

export default App
