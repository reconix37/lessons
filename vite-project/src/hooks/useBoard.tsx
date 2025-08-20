import { useState } from "react"
import { BOARD, DEFAULT_PLAYER } from "../constants/Constants"
import type { Board, Player } from "../types/Types"
import { calculateWinner } from "../components/Utils"

export function useBoard() {
    const [currentPlayer, setCurrentPlayer] = useState<Player>(DEFAULT_PLAYER)
    const [board, setBoard] = useState<Board>([...BOARD])
    const winner : Player | "" = calculateWinner(board)

    const tooglePlayer = () => {
        setCurrentPlayer((prevPlayer) => {
            switch (prevPlayer) {
                case "X":
                    return "O";
                case "O":
                    return "X"
                default:
                    return DEFAULT_PLAYER;
            }
        })
    }

    const updateBord = (id: string) => {
        setBoard((previousBoard) => {
            const newBoard = previousBoard.map((square) => {
                if (square.id === id) {
                    return { ...square, value: currentPlayer }
                }
                return square
            })
            return newBoard
        })
    }

    const handleSquareClick = (id: string) => {
        updateBord(id)
        tooglePlayer()
    }

    const handleNewGameClick = () => {
        setBoard([...BOARD])
        setCurrentPlayer(DEFAULT_PLAYER)
    }

    return { currentPlayer, board, winner, handleNewGameClick, handleSquareClick }
}