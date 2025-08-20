import { Square } from "./Square"
import type { BoardProps } from "../types/Types"

export function Board(props:BoardProps ) {
    const {board, onSquareClick} = props
    return (
        <section className="board">
            {
                board.map((square) => {
                    return <Square key={square.id} value={square.value} onClick={() => onSquareClick(square.id)} />
                })
            }
        </section>
    )
}