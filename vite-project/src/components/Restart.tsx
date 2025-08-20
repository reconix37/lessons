import type { RestartProps } from "../types/Types";

export function Restart(props:RestartProps){
    return (<button onClick={props.onClick} type="button">Restart</button>)
}