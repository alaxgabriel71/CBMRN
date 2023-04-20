import { useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Table, Button, FloatingLabel, Form } from 'react-bootstrap'

import { UserContext } from "../components/contexts/UserContext"
import api from '../services/api'
import VehicleMaterialTD from '../components/VehicleMaterialTD'
import UpdateVehicleMaterialsListModal from '../components/modals/UpdateVehicleMaterialsListModal'
import TransferMaterialModal from '../components/modals/TransferMaterialModal'

export default function EditVehicleList() {
    const { id } = useParams()
    const { vehicles } = useContext(UserContext)
    const navigate = useNavigate()

    const [materials, setMaterials] = useState([])
    const [vehicleName, setVehicleName] = useState()
    const [name, setName] = useState()
    const [newName, setNewName] = useState()
    const [quantity, setQuantity] = useState()
    const [newQuantity, setNewQuantity] = useState()
    const [remark, setRemark] = useState()
    const [newRemark, setNewRemark] = useState()
    const [materialId, setMaterialId] = useState()
    const [showUpdate, setShowUpdate] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [transferQuantity, setTransferQuantity] = useState()
    const [transferMaterial, setTransferMaterial] = useState()
    const [transferId, setTransferId] = useState()
    const [transferRemark, setTransferRemark] = useState()

    useEffect(() => {
        api.get(`/vehicle-list/${id}`)
            .then(({ data }) => setMaterials(data.list))
            .catch(err => console.error(err))
    }, [id])

    useEffect(() => {
    }, [newName, newQuantity, newRemark, materialId])

    useEffect(()=>{
        console.log("useEffect", materials)
    },[materials])


    const getVehicleParams = useCallback((id) => {
        //console.log(vehicles)
        vehicles.forEach(v => {
            if (v.list === id) {
                setVehicleName(v.name)
            }
        })
    }, [vehicles])

    useEffect(() => {
        console.log(vehicleName)
    }, [vehicleName])

    useEffect(() => getVehicleParams(Number(id)), [id, getVehicleParams])


    function editingItem(id, name, quantity, remark) {
        //console.log(name, quantity, remark)
        setMaterialId(id)
        setNewName(name)
        setNewQuantity(quantity)
        setNewRemark(remark)
        setShowUpdate(true)
    }

    function editItem(id, name, quantity, remark) {
        let newArray = [...materials]
        console.log("editItem - materials", materials)
        newArray.forEach(material => {
            if (material.id === id) {
                console.log(quantity)
                material.name = name
                material.quantity = quantity
                material.remark = remark
                console.log(material.name, material.quantity, material.remark)
            }
        })
        console.log("editItem - newArray", newArray)
        setMaterials(newArray)
    }

    function removeItem(id) {
        /* let newArray = []
        console.log("removeItem - before", materials)
        materials.forEach(material => {
            if (material.id !== id) {
                newArray.push(material)
            }
        }) */
        let newArray = [...materials]
        newArray.splice(id, 1)
        console.log("removeItem - before", newArray)

        newArray.forEach((material, newId) => {
            material.id = newId
        })
        console.log("removeItem - after", newArray)
        setMaterials(newArray)
    }

    const handleVehicleChange = e => {
        //console.log(e.target.value)
        navigate(`/vehicles-lists/${e.target.value}`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        //console.log(name, quantity, remark)
        let auxArray = [{ id: materials.length + 1, name, quantity, remark }, ...materials]
        auxArray.forEach((material, newId) => {
            material.id = newId
        })
        setMaterials(auxArray)
    }

    const handleTransfer = (id, name, quantity, remark) => {
        setTransferId(id)
        setTransferQuantity(quantity)
        setTransferMaterial(name)
        setTransferRemark(remark)
        setShowTransfer(true)
    }

    const updateMaterialQuantity = (id, newQuantity) => {
        console.log("updateMaterialQuantity - before", materials)
        console.log(newQuantity)
        let newArray = materials
        console.log("updateMaterialQuantity - before", newArray)
        newArray.forEach(material => {
            if (material.id === id) {
                if(newQuantity > 0){
                    material.quantity = newQuantity
                    console.log("updateMaterialQuantity - after", newArray)
                    setMaterials(newArray)
                } else if (newQuantity === 0) {
                    removeItem(id)
                }
            }
        })
    }
    const handleSave = () => {
        console.log("handleSave", materials)
        api.put(`/vehicles-materials-list/${id}`, {
            list: materials
        })
            .then(() => /* window.location.reload(false) */ console.log("salvou"))
            .catch(err => console.error(err))
    }

    return (
        <article>
            <h1>Editar Lista de Materiais</h1>
            <FloatingLabel
                label="Escolher Viatura"
            >
                <Form.Select onChange={handleVehicleChange}>
                    <option>-- Viatura --</option>
                    {vehicles.map(v => <option key={v._id} value={v.list}>{v.name}</option>)}
                </Form.Select>
            </FloatingLabel>
            <h2>Viatura: {vehicleName}</h2>
            <Button variant="danger" size="sm" onClick={handleSave}>Salvar Edição</Button>
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
                <Button type="submit" variant="danger" size="sm" >Adicionar Material</Button>
            </form>
            {materials && (
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
                        {materials?.map(material => <VehicleMaterialTD
                            key={material.id}
                            id={material.id}
                            name={material.name}
                            quantity={material.quantity}
                            removeItem={removeItem}
                            remark={material.remark}
                            editingItem={editingItem}
                            transfer={true}
                            handleTransfer={handleTransfer}
                        />
                        )}
                    </tbody>
                </Table>
            )}
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
            {showTransfer && (
                <TransferMaterialModal
                    show={true}
                    onClose={() => setShowTransfer(false)}
                    origin={vehicleName}
                    id={transferId}
                    material={transferMaterial}
                    quantity={transferQuantity}
                    remark={transferRemark}
                    updateMaterialQuantity={updateMaterialQuantity}
                    handleSave={handleSave}
                />
            )}
        </article>
    )
}