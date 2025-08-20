import type { SquareProps } from "../types/Types"


export function Square(props: SquareProps){
    const {value, onClick} = props //диструктуризация
    return(
        <button onClick={onClick} type="button" className="square" disabled={!!value}>{value}</button> 
    )
}

