import { useState, useEffect, useContext } from "react"
import { UserContext } from "../components/contexts/UserContext"
import { FloatingLabel, Form, Button, Table } from "react-bootstrap"

//import NestedList from "../components/NestedList"
import VehicleMaterialTD from "../components/VehicleMaterialTD"
import api from "../services/api"
import UpdateVehicleMaterialsListModal from "../components/modals/UpdateVehicleMaterialsListModal"

export default function CreateVehicleMaterialsList() {
    const { vehicles } = useContext(UserContext)

    const [vehicle, setVehicle] = useState()
    const [name, setName] = useState()
    const [quantity, setQuantity] = useState()
    const [remark, setRemark] = useState()
    const [materials, setMaterials] = useState([])
    const [newName, setNewName] = useState()
    const [newQuantity, setNewQuantity] = useState()
    const [newRemark, setNewRemark] = useState()
    const [materialId, setMaterialId] = useState()
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        console.log("vehicle", vehicle)
    }, [vehicle, materials])

    const handleSubmit = (e) => {
        e.preventDefault()
        setMaterials([{ id: materials.length, name, quantity }, ...materials])
    }

    function editingItem(id, name, quantity, remark) {
        console.log(name, quantity, remark)
        setMaterialId(id)
        setNewName(name)
        setNewQuantity(quantity)
        setNewRemark(remark)
        setShowUpdate(true)
    }

    function editItem(id, name, quantity, remark) {
        let newArray = [...materials]
        console.log(materials)
        newArray.forEach(material => {
            if(material.id === id) {
                console.log(quantity)
                material.name = name
                material.quantity = quantity
                material.remark = remark
                console.log(material.name, material.quantity, material.remark)
            }
        })
        console.log(newArray)
        setMaterials(newArray)
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

    const handleTransfer = (id, destiny) => {
        console.log(id, destiny)
    }

    const handleSave = () => {
        let vehicleName = getName(vehicle)
        /* console.log(vehicle)
        console.log(vehicleName)
        console.log(materials) */
        api.post("/vehicles-materials-lists", {
            name: vehicleName,
            vehicle,
            list: materials
        })
            .then((response) => response.data.id)
            .then(id => {
                console.log("vehicle materials list id", id)
                api.put(`/vehicle/materials-list/${vehicle}`, {
                    list: id
                })
                    .then(() => window.location.reload(false))
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }
    return (
        <>
            <h1>Criar Lista de Materiais</h1>
            <fieldset>
                <FloatingLabel
                    label="Para"
                    >
                    <Form.Select value={vehicle} onChange={e => setVehicle(JSON.parse(e.target.value))}>
                        <option>-- Escolha a viatura --</option>
                        {vehicles.map(v => {
                            if (!v.list) {
                                return <option key={v._id} value={v._id}>{v.name}</option>
                            } else {
                                return null
                            }
                        })}
                    </Form.Select>
                </FloatingLabel>
                {/* <button onClick={() => setVehicle('')}>Escolher outra Viatura</button> */}
                <Button variant="danger" onClick={handleSave}>Salvar Lista</Button>
                <h2>{getName(vehicle)}</h2>
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
                        <Form.Control type="text" required />
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials?.map(material => (
                            <VehicleMaterialTD
                              key={material.id}
                              id={material.id}
                              name={material.name}
                              quantity={material.quantity}
                              remove={true}
                              removeItem={removeItem}
                              remark={material.remark}
                              edit={true}
                              editingItem={editingItem} 
                              transfer={false}
                              handleTransfer={handleTransfer}
                              />
                        ))}
                    </tbody>
                </Table>
            </fieldset>
            {showUpdate && (
                <UpdateVehicleMaterialsListModal
                    onClose={() => setShowUpdate(false)}
                    show={showUpdate}
                    materialName={newName}
                    materialId={materialId}
                    materialQuantity={newQuantity}
                    materialRemark={newRemark}
                    editItem={editItem}
                />
            )}
        </>
    )
}