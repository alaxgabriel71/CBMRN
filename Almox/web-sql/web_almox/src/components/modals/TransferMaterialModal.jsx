import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import styles from './Modal.module.css'
import api from '../../services/api'

export default function Modal({ show, onClose, id, material, quantity, remark, origin, updateMaterialQuantity}) {
    const { vehicles } = useContext(UserContext)

    const [totalTransferQuantity, setTotalTransferQuantity] = useState(quantity)
    const [destiny, setDestiny] = useState()

    if (!show) return null

    const handleMaterialTransfer = e => {
        e.preventDefault()
        console.log(totalTransferQuantity, destiny)

        if(destiny === 'almox') {
            console.log('almox')
            api.post("/materials", {
                name: material,
                quantity: totalTransferQuantity,
                remark: remark
            })
                .then(() => {                    
                    updateMaterialQuantity(id, Number(quantity) - Number(totalTransferQuantity))
                })
        } else {
            console.log('vtr')
            const transferMaterial = {id: '', name: material, quantity: totalTransferQuantity, remark: remark? remark:""}
            api.put(`/vehicles-materials-list/${destiny}/insert-new-material`, {
                material: transferMaterial
            })
                .then(() => {                    
                    updateMaterialQuantity(id, Number(quantity) - Number(totalTransferQuantity))
                })
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h4 className={styles.modal_title}>Transferir Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <strong>Material: </strong><span>{material}</span>
                    <br />
                    <strong>Origem: </strong><span>{origin}</span>
                    <form id="transfer-form" onSubmit={handleMaterialTransfer}>
                        <FloatingLabel
                            label="Destino"
                            value={destiny}
                            onChange={e => setDestiny(e.target.value)}
                        >
                            <Form.Select required>
                                <option value="">-- Destino --</option>
                                <option value="almox">Almoxarifado</option>
                                {vehicles.map(v => {
                                    if(origin !== v.name){
                                        return <option key={v._id} value={v.list}>{v.name}</option>
                                    } else {
                                        return null
                                    }
                                })}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                            label="Quantidade a ser transferida"
                            value={totalTransferQuantity}
                            onChange={e => setTotalTransferQuantity(e.target.value)}
                        >
                            <Form.Control type="number" defaultValue={quantity} min="1" max={quantity} />
                        </FloatingLabel>
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