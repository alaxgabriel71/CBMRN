import { useState, useContext} from 'react'
import { Table, FloatingLabel, Form } from 'react-bootstrap'

import { UserContext } from "../components/contexts/UserContext"
import api from '../services/api'
import VehicleMaterialTD from '../components/VehicleMaterialTD'

export default function VehicleList() {
    const { vehicles } = useContext(UserContext)
    //const navigate = useNavigate()

    const [materials, setMaterials] = useState([])
    const [vehicleName, setVehicleName] = useState()

    /* useEffect(() => {
        api.get(`/vehicle-materials-list/${id}`)
            .then(({ data }) => setMaterials(data.list))
            .catch(err => console.error(err))
    }, [id]) */


   

    const handleVehicleChange = e => {
        console.log(e.target.value)
        vehicles.forEach(v => {
            if (v.list === Number(e.target.value)) {
                setVehicleName(v.name)
            }
        })
        api.get(`/vehicle-materials-list/${e.target.value}`)
            .then(({ data }) => setMaterials(data.list))
            .catch(err => console.error(err))
    }

    return (
        <article>
            <h1>Lista de Materiais</h1>
            <FloatingLabel
                label="Escolher Viatura"
            >
                <Form.Select onChange={handleVehicleChange}>
                    <option>-- Viatura --</option>
                    {vehicles.map(v => {
                        if (v.list && (vehicleName !== v.name)) return <option key={v._id} value={v.list}>{v.name}</option>
                        else return null
                    })}
                </Form.Select>
            </FloatingLabel>
            <h2>Viatura: {vehicleName}</h2>
            {materials && (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Ordem</th>
                            <th>Material</th>
                            <th>Quantidade</th>
                            <th>Observação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials?.map(material => <VehicleMaterialTD
                            key={material.id}
                            id={material.id}
                            name={material.name}
                            quantity={material.quantity}
                            remove={false}
                            //removeItem={}
                            remark={material.remark}
                            edit={false}
                            //editingItem={}
                            transfer={false}
                           // handleTransfer={}
                        />
                        )}
                    </tbody>
                </Table>
            )}
        </article>
    )
}