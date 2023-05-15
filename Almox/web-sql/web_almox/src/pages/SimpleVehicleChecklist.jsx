import { useState, useEffect, useContext } from "react";
import { FloatingLabel, Form, Table, Button } from "react-bootstrap";
import { UserContext } from "../components/contexts/UserContext";

export function Item({ id, name, checkeds }) {

    return (
        <tr>
            <td>{name}</td>
            <td><input type="radio" name={'checklist-' + id} onClick={() => checkeds(id, false)} required/></td>
            <td><input type="radio" name={'checklist-' + id} onClick={() => checkeds(id, true)}/></td>
            <td><input type="radio" name={'checklist-' + id} onClick={() => checkeds(id, false)}/></td>
        </tr>
    )
}

export default function SimpleVehicleChecklist() {
    const { vehicles } = useContext(UserContext)
    const [checkeds, setCheckeds] = useState([])

    useEffect(() => console.log(checkeds), [checkeds])

    const items = [
        {id: 1, name: 'Combustível'},
        {id: 2, name: 'Nível de óleo do motor'},
        {id: 3, name: 'Nível do fluido de freio'},
        {id: 4, name: 'Nível do fluido de direção'},
        {id: 5, name: 'Nível de água do parabrisa'},
        {id: 6, name: 'Nível de água do radiador'},
        {id: 7, name: 'Extintor'},
        {id: 8, name: 'Cinto de segurança'},
        {id: 9, name: 'Freio'},
        {id: 10, name: 'Condição dos pneus'},
        {id: 11, name: 'Acessórios para troca de pneus'},
        {id: 12, name: 'Condição do step'},
        {id: 13, name: 'Pisca esquerdo'},
        {id: 14, name: 'Pisca direito'},
        {id: 15, name: 'Luz de freio'},
        {id: 16, name: 'Luz de ré'},
        {id: 17, name: 'Pisca alerta'},
        {id: 18, name: 'Luz alta'},
        {id: 19, name: 'Luz baixa'},
        {id: 20, name: 'Luz de estacionamento'},
        {id: 21, name: 'Farol de milha'},
        {id: 22, name: 'Luz interna'},
        {id: 23, name: 'Giroflex'},
        {id: 24, name: 'Luz do painel'}
    ]

    const handleSubmit = event => {
        event.preventDefault()
        console.log('submit')
    }

    function insertChecked(id, alteration) {
        let exists = false
        checkeds.forEach(check => {
            if(check === id) exists = true
        })
        if(!exists && alteration) setCheckeds([...checkeds, id])
        else if(exists && !alteration) {
            let aux = []
            checkeds.forEach(check => {
                if(check !== id) aux.push(check)
            })
            setCheckeds(aux)
        }
    }

    return (
        <article>
            <h1>Checklist Simples de Viatura</h1>
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    label="Viatura"
                    required
                >
                    <Form.Select required={true}>
                        <option value=''>-- --</option>
                        {vehicles?.map(vehicle => vehicle.active ? <option key={vehicle._id} value={vehicle._id}>{vehicle.name}</option> : null)}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                    label="Hodômetro (km da VTR)"
                >
                    <Form.Control type="number" required />
                </FloatingLabel>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>S/A</th>
                            <th>C/A</th>
                            <th>N/A</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => <Item key={item.id} id={item.id} name={item.name} checkeds={(id, alteration) => insertChecked(id, alteration)} />)}
                    </tbody>
                </Table>
                <FloatingLabel
                    label="Observações"
                >
                    <Form.Control type="textarea" required={checkeds.length > 0 ? true : false} />
                </FloatingLabel>
                <Button type="submit" variant="danger" size="sm">Confirmar Conferência</Button>
            </form>
            <p>*S/A = Sem Alterações</p>
            <p>*C/A = Com Alterações</p>
            <p>*N/A = Não se Aplica</p>
        </article>
    )
}