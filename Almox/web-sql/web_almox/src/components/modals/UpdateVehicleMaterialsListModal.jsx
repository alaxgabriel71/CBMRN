import { useState } from 'react'

import styles from './UpdateMaterialModal.module.css'
import { Button, FloatingLabel, Form } from 'react-bootstrap';

export default function UpdateVehicleMaterialsListModal({ show, onClose, materialName, materialQuantity, materialId, materialRemark, editItem }) {
    const [newName, setNewName] = useState(materialName);
    const [newQuantity, setNewQuantity] = useState(materialQuantity);
    const [newRemark, setNewRemark] = useState(materialRemark);

    if (!show) {
        return null
    }

    const updateMaterial = (e) => {
        e.preventDefault()
        editItem(materialId, materialName, materialQuantity, materialRemark)
        onClose()
    }

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modal_content}>
                    <div className={styles.modal_header}>
                        <h4 className={styles.modal_title}>Editar Material</h4>
                    </div>
                    <div className={styles.modal_body}>
                        <form id="update-form" onSubmit={updateMaterial}>
                            <FloatingLabel
                                label="Quantidade"
                                value={newQuantity}
                                onChange={event => setNewQuantity(event.target.value)}
                                required
                                className={styles.QuantityFloatingLabel}
                            >
                                <Form.Control type="number" min="1" defaultValue={materialQuantity} />
                            </FloatingLabel>
                            <FloatingLabel
                                label="Nome"
                                value={newName}
                                onChange={event => setNewName(event.target.value)}
                                required
                                className={styles.NameFloatingLabel}
                            >
                                <Form.Control type="text" defaultValue={materialName} />
                            </FloatingLabel>
                            <FloatingLabel
                                label="Observações"
                                value={newRemark}
                                onChange={e => setNewRemark(e.target.value)}
                                className={styles.NameFloatingLabel}
                            >
                                <Form.Control type="text-area" defaultValue={materialRemark} />
                            </FloatingLabel>
                        </form>
                    </div>
                    <div className={styles.modal_footer}>
                        <Button id="cancel" variant="secondary" onClick={onClose} className={styles.button}>Cancelar</Button>
                        <Button id="confirm" variant="danger" type="submit" form="update-form">Confirmar Edição</Button>
                    </div>
                </div>
            </div>
        </>
    )
}