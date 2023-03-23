import { useContext } from 'react'
import { UserContext } from '../components/contexts/UserContext';

import GarrisonCard from "../components/GarrisonCard";

export default function ExistingGarrisons() {
    const { garrisons } = useContext(UserContext)
    
    return(
        <>
            <h1>Guarnições Existentes</h1>
            {garrisons.map(garrison => (
                <GarrisonCard key={garrison._id} name={garrison.name} composition={garrison.composition} min={garrison.min} max={garrison.max} active={garrison.active} />
            ))}
            
        </>
    )
}