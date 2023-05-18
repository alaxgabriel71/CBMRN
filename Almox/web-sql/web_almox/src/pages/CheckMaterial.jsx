import { useState, useEffect, useContext } from "react";
import { FloatingLabel, Form, Table, Button } from "react-bootstrap";

import { UserContext } from "../components/contexts/UserContext";
//import VehicleMaterialTD from "../components/VehicleMaterialTD"
import api from "../services/api";
import { useNavigate } from "react-router";
import PasswordModal from "../components/modals/PasswordModal";

export default function CheckMaterial() {
    const { vehicles, user } = useContext(UserContext)
    const navigate = useNavigate()

    const [materials, setMaterials] = useState([])
    const [checkeds, setCheckeds] = useState([])
    const [remark, setRemark] = useState()
    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])
    const [commander, setCommander] = useState()
    const [vehicleName, setVehicleName] = useState()
    const [show, setShow] = useState(false)
    const [registration, setRegistration] = useState()
    const [password, setPassword] = useState()

    //setMaterials([])

    const getMaterials = event => {
        vehicles.forEach(vehicle => {
            if (vehicle._id === Number(event.target.value)) {
                setVehicleName(vehicle.name)
                api.get(`/vehicle-materials-list/${vehicle.list}`)
                    .then(({ data }) => setMaterials(data.list))
                    .catch(err => console.error(err))
            }
        })
    }

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
    }, [])

    function getRankName(id) {
        let name
        ranks.forEach(rank => {
            if (id === rank._id) name = rank.rank
        })

        return name
    }

    useEffect(() => { }, [materials])

    const handleCheck = (id) => {
        //console.log("material checked", id)
        const aux = [...checkeds]
        if (!aux.includes(id)) {
            aux.push(id)
        } else {
            const index = aux.indexOf(id)
            aux.splice(index, 1)
        }
        setCheckeds(aux)
    }

    useEffect(() => { console.log("checkeds", checkeds) }, [checkeds])

    const handleSubmit = event => {
        event.preventDefault()
        setShow(true)
    }

    const handleSave = event => {
        event.preventDefault()
        console.log(password, registration)
        const notification = {
            from: user.id,
            to: commander,
            subject: "Conferência de Material",
            content: `Materiais da VTR ${vehicleName} foram conferidos e não há alterações!`
        }
        if (checkeds.length !== materials.length) {
            notification.content = `Materiais da VTR ${vehicleName} foram conferidos e apresentou as seguintes alterações: ${remark}`
        }
        api.post("/notifications", {
            password,
            registration,
            id: user.id,
            from: notification.from,
            to: notification.to,
            subject: notification.subject,
            content: notification.content
        })
            .then(({ data }) => {
                api.post("/knowledges", {
                    password,
                    registration,
                    id: user.id,
                    notification: data.notification,
                    from: notification.from,
                    to: notification.to,
                    subject: notification.subject,
                    content: notification.content
                })
                    .then(() => setShow(false))
                    .then(() => navigate('/'))
            })

        
    }

    return (
        <article>
            <h1>Conferência de Material</h1>
            <FloatingLabel
                label="Viatura"
            >
                <Form.Select onChange={getMaterials} required={true} form="form">
                    <option value=''>-- Escolha a viatura --</option>
                    {vehicles.map(v => {
                        if (v.list) {
                            return <option key={v._id} value={v._id}>{v.name}</option>
                        } else {
                            return null
                        }
                    })}
                </Form.Select>
            </FloatingLabel>
            {vehicleName && <h2>{`Materiais da VTR ${vehicleName}`}</h2>}
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
                    {materials?.map((material, k) => (
                        <tr key={material.id}>
                            <td>{`${k + 1}.`}</td>
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
            <form onSubmit={handleSubmit} id="form">
                <FloatingLabel
                    label="Observações"
                    value={remark}
                    onChange={event => setRemark(event.target.value)}
                >
                    <Form.Control type="text-area" required={checkeds.length !== materials.length} />
                </FloatingLabel>
                <FloatingLabel
                    label="Comandante da Guarnição"
                >
                    <Form.Select onChange={event => setCommander(event.target.value)} required>
                        <option value="">-- Escolher Militar --</option>
                        {users.map(user => <option key={user._id} value={user._id}>{`${getRankName(Number(user.rank))} ${user.qra}`}</option>)}
                    </Form.Select>
                </FloatingLabel>
                <Button variant="danger" type="submit" >Enviar para o Comandante</Button>
            </form>
            <PasswordModal show={show} onClose={() => setShow(false)} save={handleSave} reg={(value) => setRegistration(value)} pass={(value) => setPassword(value)} />
        </article>
    )
}