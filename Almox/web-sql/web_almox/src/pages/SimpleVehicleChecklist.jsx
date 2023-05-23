import { useState, useEffect, useContext } from "react";
import { FloatingLabel, Form, Table, Button } from "react-bootstrap";

import { UserContext } from "../components/contexts/UserContext";
import api from "../services/api";
import PasswordModal from "../components/modals/PasswordModal";
import { useNavigate } from "react-router";

export function Item({ id, name, checkeds }) {

    return (
        <tr>
            <td>{name}</td>
            <td><input type="radio" name={'checklist-' + id} id="without-alteration" onClick={() => checkeds(id, name, false)} required /></td>
            <td><input type="radio" name={'checklist-' + id} id="with-alteration" onClick={() => checkeds(id, name, true)} /></td>
            <td><input type="radio" name={'checklist-' + id} id="not-aplicable" onClick={() => checkeds(id, name, false)} /></td>
        </tr>
    )
}

export default function SimpleVehicleChecklist() {
    const { vehicles, user } = useContext(UserContext)

    const navigate = useNavigate()

    const [checkeds, setCheckeds] = useState([])
    const [vehicle, setVehicle] = useState()
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState()
    const [registration, setRegistration] = useState()

    useEffect(() => console.log(checkeds), [checkeds])

    const items = [
        { id: 1, name: 'Combustível' },
        { id: 2, name: 'Nível de óleo do motor' },
        { id: 3, name: 'Nível do fluido de freio' },
        { id: 4, name: 'Nível do fluido de direção' },
        { id: 5, name: 'Nível de água do parabrisa' },
        { id: 6, name: 'Nível de água do radiador' },
        { id: 7, name: 'Extintor' },
        { id: 8, name: 'Cinto de segurança' },
        { id: 9, name: 'Freio' },
        { id: 10, name: 'Condição dos pneus' },
        { id: 11, name: 'Acessórios para troca de pneus' },
        { id: 12, name: 'Condição do step' },
        { id: 13, name: 'Pisca esquerdo' },
        { id: 14, name: 'Pisca direito' },
        { id: 15, name: 'Luz de freio' },
        { id: 16, name: 'Luz de ré' },
        { id: 17, name: 'Pisca alerta' },
        { id: 18, name: 'Luz alta' },
        { id: 19, name: 'Luz baixa' },
        { id: 20, name: 'Luz de estacionamento' },
        { id: 21, name: 'Farol de milha' },
        { id: 22, name: 'Luz interna' },
        { id: 23, name: 'Giroflex' },
        { id: 24, name: 'Luz do painel' },
        { id: 25, name: 'Carroceria' }
    ]


    function insertChecked(id, name, alteration) {
        let exists = false
        checkeds.forEach(check => {
            if (check.id === id) exists = true
        })
        if (!exists && alteration) setCheckeds([...checkeds, { id: id, name: name, remark: ''}])
        else if (exists && !alteration) {
            let aux = []
            checkeds.forEach(check => {
                if (check.id !== id) aux.push(check)
            })
            setCheckeds(aux)
        }
    }

    const changeRemark = (event, k) => {
        let aux = [...checkeds]
        aux[k].remark = event.target.value
        setCheckeds(aux)
    }

    const handleSubmit = () => {
        console.log('submit')
        let status = ''
        let alterations = ''
        let remark = ''
        if (checkeds.length === 0) status = 'A viatura não apresentou alterações.'
        else {
            /* items.forEach(item => {
                checkeds.forEach(check => {
                    if(item.id === check) alterations = alterations + item.name + "; "
                })
            }) */
            checkeds.forEach(check => {
                alterations = alterations + check.name + '; '
                remark = remark + check.name + ': ' + check.remark + '; '
            })
            status = `A viatura apresentou alteração nos seguintes items: ${alterations}`
        }
        //console.log(status, remark)

        api.post("/vehicle-checklists", {
            id: user.id,
            registration,
            password,
            vehicle,
            driver: user.id,
            status,
            remark
        })
            .then(() => {
                setShow(false)
                navigate("/")
            })
            .catch((err) => console.error(err))
    }

    return (
        <article>
            <h1>Checklist Simples de Viatura</h1>
            <form onSubmit={event => {
                event.preventDefault()
                setShow(true)
            }}>
                <FloatingLabel
                    label="Viatura"
                    required
                >
                    <Form.Select onChange={(event) => setVehicle(event.target.value)} required={true}>
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
                        {items.map(item => <Item key={item.id} id={item.id} name={item.name} checkeds={(id, name, alteration) => insertChecked(id, name, alteration)} />)}
                    </tbody>
                </Table>
                {checkeds?.map((check, k) => (
                    <FloatingLabel
                        label={"Observações - "+check.name}
                        key={check.id}
                    >
                        <Form.Control onChange={event => changeRemark(event, k)} type="textarea" required/* ={checkeds.length > 0 ? true : false} */ />
                    </FloatingLabel>
                ))}
                <Button type="submit" variant="danger" size="sm">Confirmar Conferência</Button>
            </form>
            <label htmlFor="without-alteration">S/A = Sem Alterações</label>
            <label htmlFor="with-alteration">C/A = Com Alterações</label>
            <label htmlFor="not-aplicable">N/A = Não se Aplica</label>
            <PasswordModal show={show} onClose={() => setShow(false)} save={handleSubmit} reg={(reg) => setRegistration(reg)} pass={(pass) => setPassword(pass)} />
        </article>
    )
}