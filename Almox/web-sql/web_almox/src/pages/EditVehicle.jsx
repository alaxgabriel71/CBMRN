import { useState, useContext, useEffect } from "react"
import { UserContext } from "../components/contexts/UserContext"
import { FloatingLabel, Form } from "react-bootstrap"

import api from "../services/api"
import EditVehicleForm from "../components/forms/EditVehicleForm"

export default function EditVehicle() {
    const { vehicles } = useContext(UserContext)

    const [visible, setVisible] = useState(false)
    const [vehicle, setVehicle] = useState()

    useEffect(() => {

    }, [visible, vehicle])

    const handleSelect = (e) => {
        setVisible(false)

        api.get(`/vehicle/${e.target.value}`)
            .then(({ data }) => {
                setVehicle(data.vehicle)
                setVisible(true)
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <h1>Editar Viatura</h1>
            <FloatingLabel
                label="Viatura"
                className="mb-3"
            >
                <Form.Select value={vehicle} onChange={handleSelect}>
                    <option>-- Escolha a viatura --</option>
                    {vehicles.map(v => (
                        <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            {visible && (
                <EditVehicleForm cId={vehicle._id} cName={vehicle.name} cActive={vehicle.active} cModel={vehicle.model} cPlate={vehicle.plate} cSeats={vehicle.seats} />
            )}
        </>
    )
}