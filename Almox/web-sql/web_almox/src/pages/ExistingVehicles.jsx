import { useContext } from 'react'

import { UserContext } from '../components/contexts/UserContext'
import VehicleCard from '../components/VehicleCard'

export default function ExistingVehicles() {
    const { vehicles } = useContext(UserContext)

    return(
        <>
            <h1>Viaturas Existentes</h1>
            <fieldset>
                <ul>
                    {vehicles.map(v => (
                        <VehicleCard key={v._id} name={v.name} active={v.active} model={v.model} plate={v.plate} seats={v.seats} />
                    ))}
                </ul>
            </fieldset>
        </>
    )
}