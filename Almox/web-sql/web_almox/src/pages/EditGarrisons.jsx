import { useState, useEffect, useContext } from "react"

import { UserContext } from "../components/contexts/UserContext"
import EditGarrisonForm from "../components/forms/EditGarrisonForm"

import api from "../services/api"

export default function EditGarrisons() {
    const { garrisons } = useContext(UserContext)
    const [choice, setChoice] = useState(false)
    const [choiced, setChoiced] = useState(false)
    
    function getGarrison(id) {
        
        api.get(`/garrison/${id}`)
            .then(({data}) => {
                setChoiced(data.garrison)
                //console.log(data.garrison.composition.composition)
            })
            .catch(err => console.error(err))
    }

    useEffect(()=>{
        if(choiced) console.log(choiced.composition.composition)
    },[choiced])

    return(
        <>
            <h1>Editar Guarnição</h1>
            <fieldset>
                <h4>Escolha a Guarnição</h4>
                <select onChange={e => {
                    setChoice(e.target.value)
                    getGarrison(e.target.value)
                }}>
                    <option key="0" value=''>-- Guarnição --</option>
                    {garrisons?.map(garrison => (
                        <option key={garrison._id} value={garrison._id}>{garrison.name}</option>
                    ))}
                </select>
            </fieldset>
            {(choice && choiced) && (
                <EditGarrisonForm 
                    cId={choice} 
                    cComposition={choiced} 
                    cName={choiced.name} 
                    cActive={choiced.active}
                    cMax={choiced.max} 
                    cMin={choiced.min} 
                />
            )}
        </>
    )
}