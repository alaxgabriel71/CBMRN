import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from 'react-router'
import { Table } from 'react-bootstrap'

import { UserContext } from "../components/contexts/UserContext"
import api from '../services/api'
import VehicleMaterialTD from '../components/VehicleMaterialTD'

export default function EditVehicleList() {
    const { id } = useParams()
    const { vehicles } = useContext(UserContext)

    const [materials, setMaterials] = useState([])
    const [name, setName] = useState()

    useEffect(()=>{
        api.get(`/vehicle-list/${id}`)
            .then(({data}) => setMaterials(data.list))
            .catch(err => console.error(err))
    }, [id])

    const getVehicleParams = useCallback((id) => {
        vehicles.forEach(v => {
            if(v.list === id) {
                setName(v.name)
            }
        })
    }, [vehicles])

    useEffect(() => getVehicleParams(Number(id)), [id, getVehicleParams])


    function removeItem(id) {
        let newArray = []
        materials.forEach(material => {
            if (material.id !== id) {
                newArray.push(material)
            }
        })

        newArray.forEach((material, newId) => {
            material.id = newId
        })

        setMaterials(newArray)
    }

    return (
        <article>
            <h1>Editar Lista de Materiais</h1>
            <select>
                <option>-- Escolher outra VTR --</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
            </select>
            <h2>Viatura: {name}</h2>
            {materials && (
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Quantidade</th>
                        <th>Material</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody>
                    {materials?.map(material => <VehicleMaterialTD key={material.id} id={material.id} name={material.name} quantity={material.quantity} removeItem={removeItem} remark={material.remark}/>)}
                </tbody>
            </Table>
            )}
        </article>
    )
}