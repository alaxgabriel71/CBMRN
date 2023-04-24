import { useState, useEffect, useContext } from "react";
import { FloatingLabel, Form, Table } from "react-bootstrap";

import { UserContext } from "../components/contexts/UserContext";
//import VehicleMaterialTD from "../components/VehicleMaterialTD"
import api from "../services/api";

export default function CheckMaterial() {
    const { vehicles } = useContext(UserContext)

    const [materials, setMaterials] = useState([])
    const [checkeds, setCheckeds] = useState([])

    //setMaterials([])

    const getMaterials = (e) => {
        api.get(`/vehicle-materials-list/${e.target.value}`)
            .then(({data}) => setMaterials(data.list))
            .catch(err => console.error(err))
    }

    useEffect(() => {}, [materials])

    const handleCheck = (id) => {
        //console.log("material checked", id)
        const aux = [...checkeds]
        if(!aux.includes(id)){
            aux.push(id)
        } else {
            const index = aux.indexOf(id)
            aux.splice(index, 1)
        }
        setCheckeds(aux)
    }

    useEffect(()=>{ console.log("checkeds", checkeds)}, [checkeds])
    
    return (
        <article>
            <h1>Conferência de Material</h1>
            <FloatingLabel
                    label="Viatura"
                    >
                    <Form.Select onChange={getMaterials}>
                        <option>-- Escolha a viatura --</option>
                        {vehicles.map(v => {
                            if(v.list){
                                return <option key={v._id} value={v.list}>{v.name}</option>
                            } else {
                                return null
                            }
                        })}
                    </Form.Select>
                </FloatingLabel>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Ordem</th>
                            <th>Material</th>
                            <th>Quantidade</th>
                            <th>Observação</th>
                            <th>Confere</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {materials?.map(material => <VehicleMaterialTD
                            key={material.id}
                            id={material.id}
                            name={material.name}
                            quantity={material.quantity}
                            remove={false}
                            removeItem={() => {}}
                            remark={material.remark}
                            edit={false}
                            editingItem={() => {}}
                            transfer={false}
                            handleTransfer={() => {}}
                        />
                        )} */}
                        {materials?.map((material, k) => (
                            <tr key={material.id}>
                                <td>{`${k+1}.`}</td>
                                <td>{material.name}</td>
                                <td>{material.quantity}</td>
                                <td>{material.remark}</td>
                                <td>
                                    <input type="checkbox" onChange={() => handleCheck(material.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </article>
    )
}