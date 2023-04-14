import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

import api from '../services/api'
import { UserContext } from '../components/contexts/UserContext'
import { Table } from 'react-bootstrap'

export default function Vehicle() {
    const { id } = useParams()
    const [materials, setMaterials] = useState([])
    const [name, setName] = useState()
    const [active, setActive] = useState()
    const [model, setModel] = useState()
    const [plate, setPlate] = useState()
    const [seats, setSeats] = useState()
    const [list, setList] = useState()

    const { vehicles } = useContext(UserContext)
    const navigate = useNavigate()
    
    useEffect(()=>{
        api.get(`/vehicle/${id}`)
        .then(({data}) => data.vehicle.list)
        .then(list => {
            api.get(`/vehicle-list/${list}`)
                .then(({data}) => setMaterials(data.list))
        })
    })

    useEffect(() => {
        function getVehicleParams(id) {
            vehicles.forEach(v => {
                if(v._id === id) {
                    setName(v.name)
                    setActive(v.active)
                    setModel(v.model)
                    setPlate(v.plate)
                    setSeats(v.seats)
                    console.log(v.list)
                    setList(v.list)
                }
            })
        }
        getVehicleParams(Number(id))
    }, [vehicles, id])

    return (
        <article>
            <h1>{name}</h1>
            <strong>Placa</strong><span>{plate}</span>
            <strong>Modelo</strong><span>{model}</span>
            <strong>Assentos</strong><span>{seats}</span>
            <strong>Ativo</strong><span>{active}</span>
            <strong>Lista de Materiais<button onClick={() => navigate(`/vehicles-lists/${list}`)}>Editar</button></strong>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Quantidade</th>
                        <th>Material</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody>
                    {materials?.map(material => (
                        <tr>
                            <td>{material.quantity}</td>
                            <td>{material.name}</td>
                            <td>{material.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </article>
    )
}