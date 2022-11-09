import { useState, useEffect } from 'react'

import styles from './UpdateMaterialModal.module.css'
import api from '../../services/api'
import StatusMessage from '../StatusMessage'
import { Button, FloatingLabel, Form } from 'react-bootstrap';

export default function UpdateMaterialModal({ show, onClose, materialName, materialId, materialQuantity }) {
    const [newName, setNewName] = useState(materialName);
    const [newQuantity, setNewQuantity] = useState(materialQuantity);
    const [materials, setMaterials] = useState([]);
    const [message, setMessage] = useState(false);
    const [status, setStatus] = useState();

    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    const today = formatedDate + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear()
    const date = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    useEffect(() => {
        api.get("/materials")
            .then(({ data }) => {
                setMaterials(data.materials)
            })
            .catch((err) => {
                console.log("deu erro: " + err)
            });
    }, [])
    // console.log(materials)

    if (!show) {
        return null
    }

    const updateMaterial = (event) => {
        event.preventDefault()
        const mili = dateObject.getTime()
        var materialExists = false;
        var currentMaterial = {
            id: '',
            name: '',
            quantity: 0
        }

        var updatedMaterial = {
            name: '',
            quantity: ''
        };

        materials.forEach(material => {
            if (material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentMaterial.quantity = material.quantity
                currentMaterial.id = material._id
                currentMaterial.name = material.name
            }
        })

        if (materialExists && (materialId !== currentMaterial.id)) {
            event.preventDefault();
            return console.log(`Não foi possível concluir a edição, pois o material ${newName} já existe na lista de materiais.`)
        }

        if(materialExists && currentMaterial.quantity === materialQuantity){
            return console.log(`A atualização não foi concluída, pois as características informadas já são as existentes.`)
        }

        updatedMaterial = {
            name: newName[0].toUpperCase() + newName.substring(1).toLowerCase(),
            quantity: newQuantity
        }

        api.put(`/materials/${materialId}`, updatedMaterial)
            .then((response) => {
                console.log("Update status: " + response.status)

                const description = `${materialQuantity}x ${materialName} foi(foram) atualizado(s) para ${newQuantity}x ${newName} em ${today}`
                api.post('/movements', {
                    operation: "Atualização",
                    date,
                    mili,
                    description
                })
                    .then(response => {
                        console.log(response.status)
                        setStatus('Sucesso')
                        setMessage(true)
                    })
                    .catch(err => {
                        console.error(err)
                        setStatus('Falha')
                        setMessage(true)
                    })
            })
            .catch(err => console.error(err))
        setMessage(false)
    }

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modal_content}>
                    <div className={styles.modal_header}>
                        <StatusMessage message={message} status={status} />
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
                        </form>
                    </div>
                    <div className={styles.modal_footer}>
                        <Button id="cancel" variant="secondary" onClick={onClose} className={styles.button}>Cancelar</Button>
                        <Button id="confirm" variant="danger" type="submit" form="update-form">Salvar Edição</Button>
                    </div>
                </div>
            </div>
        </>
    )
}