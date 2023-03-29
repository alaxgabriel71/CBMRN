import { useState, useContext, useEffect } from "react"
import { UserContext } from "../components/contexts/UserContext"

import api from "../services/api"
import EditVehicleForm from "../components/forms/EditVehicleForm"

export default function EditVehicle() {
    const { vehicles } = useContext(UserContext)

    const [visible, setVisible] = useState(false)
    const [vehicle, setVehicle] = useState()

    useEffect(()=>{
    
    }, [visible, vehicle])
   
    const handleSelect = (e) => {
        setVisible(false)

        api.get(`/vehicle/${e.target.value}`)
            .then(({data}) => {
                setVehicle(data.vehicle)
                setVisible(true)
            })
            .catch(err => console.error(err))      
    }

    return(
        <>
            <h1>Editar Viatura</h1>
            <fieldset>
                <select onChange={handleSelect}>
                    <option>-- Escolha a Viatura --</option>
                    {vehicles.map(v => (
                        <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                </select>
            </fieldset>
            {visible && (
                <EditVehicleForm cId={vehicle._id} cName={vehicle.name} cActive={vehicle.active} cModel={vehicle.model} cPlate={vehicle.plate} cSeats={vehicle.seats} />
            )}
        </>
    )
}