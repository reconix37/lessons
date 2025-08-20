export type Player = "X" | "O"

export type Board = {
  id: string
  value: Player | ""
}[]

export type SquareProps = {
    value: "X" | "O" | ""
    onClick: () => void 
}

export type TitleProps = {
    winner: SquareProps["value"]
    currentPlayer: Player
}

export type RestartProps = {
    onClick: () => void
}

export type BoardProps = {
    board: Board
    onSquareClick: (id: string) => void
}