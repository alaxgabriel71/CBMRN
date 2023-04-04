import { useState, useEffect, useContext } from "react"
import { UserContext } from "../components/contexts/UserContext"
import { FloatingLabel, Form, Button, Table } from "react-bootstrap"
import NestedList from "../components/NestedList"

export default function CreateVehicleMaterialsList() {
    const { vehicles } = useContext(UserContext)

    const [ vehicle, setVehicle ] = useState()
    const [ materials, setMaterials ] = useState([])

    useEffect(()=>{
        console.log(vehicle)
    }, [vehicle])

    /* const listExample = [
        {name: "martelo", quantity: 2, size: 0, level: 0, childs: []},
        {name: "gaveta 1", quantity: 0, size: 4, level: 1, childs: [
            {name: "cilindro", quantity: 2, size: 0, level: 2, childs: []}, 
            {name: "mascara", quantity: 2, size: 0, level: 2, childs: []}, 
            {name: "luva", quantity: 2, size: 0, level: 2, childs: []}, 
            {name: "maleta de ferramentas", quantity: 0, size: 2, level: 2, childs: [
                {name: "alicate", quantity: 1, size: 0, level: 3, childs: []},
                {name: "chave de fenda", quantity: 1, size: 0, level: 3, childs: []}
            ]}, 
        ]}
    ] */

    
    /* function showItem(item) {
        item.childs.forEach(child => {
            if(child.size === 0){
                return <li key={child.name}>{child.name}</li>
            } else {
                showItem(child)
                return <li key={child.name}>{child.name}</li>
            }
        })
    }
    
    function getItem(item) {
        if(item.size === 0){
            return(
                <li key={item.name}>{item.name}</li>
                )
            } else {
                showItem(item)
                return <li key={item.name}>{item.name}</li>
            }
        } */
        
        
    
    
    return(
        <>
            <h1>Criar Lista de Materiais</h1>
            {!vehicle && (
                <select value={vehicle} onChange={e => setVehicle(e.target.value)}>
                    <option>-- Escolha a Viatura --</option>
                    {vehicles.map(v => (
                        <option key={v._id} value={v.name}>{v.name}</option>
                    ))}
                </select>
            )}
            {vehicle && <NestedList />}
        </>
    )
}

{/* <fieldset>
                    <h2>Nova Lista de Materiais para a {vehicle}</h2>
                    <Button variant="secondary" onClick={() => window.alert(`A lista da VTR ${vehicle} ainda não foi salva. Deseja realmente sair?`)}>Escolher outra VTR</Button>
                    <form>
                        <FloatingLabel
                            label="Material"
                        >
                            <Form.Control type="text" required />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Quantidade"
                        >
                            <Form.Control type="number" min="1" required />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Observações"
                        >
                            <Form.Control type="text" />
                        </FloatingLabel>
                        <Button type="submit" variant="danger" >Adicionar</Button>
                    </form>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </Table>
                </fieldset> */}