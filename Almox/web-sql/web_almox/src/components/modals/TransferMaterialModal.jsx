import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'

import { UserContext } from '../contexts/UserContext'
import styles from './Modal.module.css'
import api from '../../services/api'

export default function Modal({ show, onClose, id, material, quantity, remark, origin, updateMaterialQuantity, handleSave, total, totalTransferAlmox, listId, vehicleId }) {
    const { vehicles, user } = useContext(UserContext)

    const navigate = useNavigate()

    const [totalTransferQuantity, setTotalTransferQuantity] = useState(quantity)
    const [destiny, setDestiny] = useState()
    const [destinyName, setDestinyName] = useState()

    if (!show) return null

    const getDestinyName = to => {
        let name = ''
        if(to === 'almox') name = 'Almoxarifado'
        else if(total) {
            vehicles.forEach(v => {
                if (Number(v._id) === Number(to)) name = v.name
            })
        } else {
            vehicles.forEach(v => {
                if (Number(v.list) === Number(to)) name = v.name
            })
        }
        console.log('destino', name)
        return name
    }

    const handleMaterialTransfer = e => {
        e.preventDefault()
        console.log(totalTransferQuantity, destiny)
        const remainingQuantity = Number(quantity) - Number(totalTransferQuantity)
        const date = new Date()
        const mili = date.getTime()

        if (!total) {
            if (destiny === 'almox') {
                console.log('almox')
                api.post("/materials", {
                    name: material,
                    quantity: totalTransferQuantity,
                    remark: remark
                })
                    .then(() => {
                        api.post("/movements", {
                            user_id: user.id,
                            user_name: user.name,
                            operation: "Transferência",
                            date: date.toLocaleDateString('pt-BR'),
                            mili,
                            description: `Material transferido -> ${totalTransferQuantity}x ${material}. Da VTR -> ${origin}. Para -> ${destinyName}.`,
                            remark: ''
                        })
                            .then(() => {
                                updateMaterialQuantity(id, remainingQuantity)
                            })
                            .then(() => onClose())
                    })
            } else {
                console.log('vtr')
                const transferMaterial = { id: '', name: material, quantity: totalTransferQuantity, remark: remark }
                api.put(`/vehicles-materials-list/${destiny}/insert-new-material`, {
                    material: transferMaterial
                })
                    .then(() => {
                        api.post("/movements", {
                            user_id: user.id,
                            user_name: user.name,
                            operation: "Transferência",
                            date: date.toLocaleDateString('pt-BR'),
                            mili,
                            description: `Material transferido -> ${totalTransferQuantity}x ${material}. Da VTR -> ${origin}. Para -> ${destinyName}.`,
                            remark: ""
                        })
                            .then(() => {
                                updateMaterialQuantity(id, remainingQuantity)
                            })
                            .then(() => handleSave())
                            .then(() => onClose())
                    })
            }
        } else {
            if (destiny === 'almox') {
                totalTransferAlmox(origin, destinyName)
                onClose()
                navigate("/vehicles-tabs")
            } else {
                console.log("destiny", destiny)
                api.put(`/vehicle/materials-list/${destiny}`, { list: listId })
                    .then(() => {
                        api.put(`/vehicle/materials-list/${vehicleId}`, { list: null })
                            .then(() => {
                                api.post("/movements", {
                                    user_id: user.id,
                                    user_name: user.name,
                                    operation: "Transferência",
                                    date: date.toLocaleDateString('pt-BR'),
                                    mili,
                                    description: `Lista de materiais da VTR ${origin} foi transferido para -> ${destinyName}.`,
                                    remark: ''
                                })
                                    .then(() => onClose())
                                    .then(() => window.location.reload(false))
                            })
                    })
            }
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Transferir Material</h4>
                </div>
                <div className={styles.modal_body}>
                    {material && <><strong>Material: </strong><span>{material}</span></>}
                    <br />
                    <strong>Origem: </strong><span>{origin}</span>
                    <form id="transfer-form" onSubmit={handleMaterialTransfer}>
                        <FloatingLabel
                            label="Destino"
                            value={destiny}
                            onChange={e => {
                                setDestiny(e.target.value)
                                setDestinyName(getDestinyName(e.target.value))
                            }}
                        >
                            {!total && (
                                <Form.Select required>
                                    <option value="">-- Destino --</option>
                                    <option value="almox">Almoxarifado</option>
                                    {vehicles.map(v => {
                                        if (origin !== v.name && v.list && !total) {
                                            return <option key={v._id} value={v.list}>{v.name}</option>
                                        } else {
                                            return null
                                        }
                                    })}
                                </Form.Select>
                            )}
                            {total && (
                                <Form.Select required>
                                    <option value="">-- Destino --</option>
                                    <option value="almox">Almoxarifado</option>
                                    {vehicles.map(v => {
                                        if (v.list === null) {
                                            return <option key={v._id} value={v._id}>{v.name}</option>
                                        } else {
                                            return null
                                        }
                                    })}
                                </Form.Select>
                            )}
                        </FloatingLabel>
                        {!total && (
                            <FloatingLabel
                                label="Quantidade a ser transferida"
                                value={totalTransferQuantity}
                                onChange={e => setTotalTransferQuantity(e.target.value)}
                            >
                                <Form.Control type="number" defaultValue={quantity} min="1" max={quantity} />
                            </FloatingLabel>
                        )}
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <Button variant="secondary" onClick={onClose} className={styles.button}>Cancelar</Button>
                    <Button type='submit' form='transfer-form' variant="danger" className={styles.button}>Confirmar Transferência</Button>
                </div>
            </div>
        </div>
    )
}