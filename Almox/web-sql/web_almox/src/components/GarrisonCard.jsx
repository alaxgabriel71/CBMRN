import { useContext } from "react"
import { UserContext } from "./contexts/UserContext"

export default function GarrisonCard({ name, composition, min, max, active }) {
    const { functions } = useContext(UserContext)

    function getFunctions(id) {
        let name
        functions.forEach(func => {
            if(id === func._id){
                name = func.name
            }
        })
        return name
    }
    
    return(
        <fieldset>
            <h2>{name}</h2>
            <fieldset>
                <h3>Componentes:</h3>
                <ul>
                    {composition.map(comp => (
                        <li key={comp}>{getFunctions(comp)}</li>
                    ))}
                </ul>
                <span>Min: {min}</span>
                <span>Max: {max}</span>
            </fieldset>
            {active && <strong>Ativada</strong>}
            {!active && <strong>Desativada</strong>}
        </fieldset>
    )
}