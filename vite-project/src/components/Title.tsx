import type { TitleProps } from "../types/Types"

export function Title(props: TitleProps){
    const {winner, currentPlayer} = props
    return(
        <>{winner ? <h1>The winner is {winner}</h1> : <h1>Current Player: {currentPlayer}</h1>}</>
    )
}