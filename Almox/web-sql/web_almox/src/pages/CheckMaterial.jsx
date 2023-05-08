import { useState, useEffect, useContext } from "react";
import { FloatingLabel, Form, Table, Button } from "react-bootstrap";

import { UserContext } from "../components/contexts/UserContext";
//import VehicleMaterialTD from "../components/VehicleMaterialTD"
import api from "../services/api";

export default function CheckMaterial() {
    const { vehicles } = useContext(UserContext)

    const [materials, setMaterials] = useState([])
    const [checkeds, setCheckeds] = useState([])
    const [remark, setRemark] = useState()
    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])
    const [commander, setCommander] = useState()

    //setMaterials([])

    const getMaterials = (e) => {
        api.get(`/vehicle-materials-list/${e.target.value}`)
            .then(({ data }) => setMaterials(data.list))
            .catch(err => console.error(err))
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

    const handleSave = event => {
        event.preventDefault()
        console.log(commander, remark)
        if (checkeds.length !== materials.length) console.log("alteração")
        else console.log("sem alteração")
    }

    return (
        <article>
            <h1>Conferência de Material</h1>
            <FloatingLabel
                label="Viatura"
            >
                <Form.Select onChange={getMaterials}>
                    <option>-- Escolha a viatura --</option>
                    {vehicles.map(v => {
                        if (v.list) {
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
            <form onSubmit={handleSave}>
                <FloatingLabel
                    label="Observações"
                    onChange={event => setRemark(event.target.value)}
                >
                    <Form.Control type="text-area" value={remark} required={checkeds.length !== materials.length} />
                </FloatingLabel>
                <FloatingLabel
                    label={"Escolher"}
                >
                    <Form.Select onChange={event => setCommander(event.target.value)} required>
                        <option value="">-- Escolher militar --</option>
                        {users.map(user => <option key={user._id} value={user._id}>{`${getRankName(Number(user.rank))} ${user.qra}`}</option>)}
                    </Form.Select>
                </FloatingLabel>
                <Button variant="danger" type="submit" >Salvar Conferência</Button>
            </form>
        </article>
    )
}