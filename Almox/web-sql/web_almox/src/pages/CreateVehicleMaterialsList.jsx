import { useState, useEffect, useContext } from "react"
import { UserContext } from "../components/contexts/UserContext"
import { FloatingLabel, Form, Button, Table } from "react-bootstrap"

//import NestedList from "../components/NestedList"
import VehicleMaterialTD from "../components/VehicleMaterialTD"
import api from "../services/api"

export default function CreateVehicleMaterialsList() {
    const { vehicles } = useContext(UserContext)

    const [vehicle, setVehicle ] = useState()
    const [name, setName] = useState()
    const [quantity, setQuantity] = useState()
    const [remark, setRemark] = useState()
    const [ materials, setMaterials ] = useState([])

    useEffect(()=>{
        console.log(vehicle)
    }, [vehicle, materials])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setMaterials([{id: materials.length, name, quantity}, ...materials])
    }

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

    function getName(id) {
        let name
        vehicles.forEach(v => {
            if (id === v._id) {
                name = v.name
            }
        })
        return name
    }
    
    const handleSave = () => {
        let vehicleName = getName(vehicle)
        /* console.log(vehicle)
        console.log(vehicleName)
        console.log(materials) */
        api.post("/vehicles-lists", {
            name: vehicleName,
            vehicle,
            list: materials
        })
            .then((response) => response.data.id)
            .then(id => {
                api.put(`/vehicle-list/${vehicle}`, {
                    list: id
                })
                    .then((response) => console.log(response.status))
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }
    return(
        <>
            <h1>Criar Lista de Materiais</h1>
            {!vehicle && (
                <select value={vehicle} onChange={e => setVehicle(JSON.parse(e.target.value))}>
                    <option>-- Escolha a Viatura --</option>
                    {vehicles.map(v => (
                        <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                </select>
            )}
            {vehicle && (
                <fieldset>
                    <h2>{getName(vehicle)}</h2>
                    <button onClick={() => setVehicle('')}>Escolher outra Viatura</button>
                    <button onClick={handleSave}>Salvar Lista</button>
                    <form onSubmit={handleSubmit}>
                        <FloatingLabel 
                            label="Quantidade"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}                        
                        >
                            <Form.Control type="number" min="1" required />
                        </FloatingLabel>
                        <FloatingLabel 
                            label="Material"
                            value={name}
                            onChange={e => setName(e.target.value)}  
                        >
                            <Form.Control type="text" required/>
                        </FloatingLabel>
                        <FloatingLabel 
                            label="Observação"
                            value={remark}
                            onChange={e => setRemark(e.target.value)}  
                        >
                            <Form.Control type="text" />
                        </FloatingLabel>
                        <Button type="submit" variant="danger" >Adicionar Material</Button>
                    </form>
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
                                <VehicleMaterialTD key={material.id} id={material.id} name={material.name} quantity={material.quantity} removeItem={removeItem} remark={material.remark}/>
                            ))}
                        </tbody>
                    </Table>
                </fieldset>
            )}
        </>
    )
}