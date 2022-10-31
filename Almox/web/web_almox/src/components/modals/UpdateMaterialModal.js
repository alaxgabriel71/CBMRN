import { useState, useEffect } from 'react'

import styles from './UpdateMaterialModal.module.css'
import api from '../../services/api'
import StatusMessage from '../StatusMessage'

export default function UpdateMaterialModal({ show, onClose, materialName, materialId, materialQuantity }) {
    const [newName, setNewName] = useState(materialName);
    const [newQuantity, setNewQuantity] = useState(materialQuantity);
    const [materials, setMaterials] = useState([]);
    const [message, setMessage] = useState(false);
    const [status, setStatus] = useState();

    var dateObject = new Date()
    const today = dateObject.getDate()+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear()
    const date = dateObject.getFullYear()+'-'+(dateObject.getMonth()+1)+'-'+dateObject.getDate()

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
            if(material.name.toLowerCase() === newName.toLowerCase()) {
                materialExists = true
                currentMaterial.name = material.name
                currentMaterial.id = material._id
                currentMaterial.name = material.name
            }
        })

        if(materialExists && (materialId !== currentMaterial.id)){
            event.preventDefault();
            return console.log(`Não foi possível concluir a edição, pois o material ${newName} já existe na lista de materiais.`)
        } 

        updatedMaterial = {
            name: newName[0].toUpperCase() + newName.substring(1).toLowerCase(),
            quantity: newQuantity
        }

        api.put(`/materials/${materialId}`, updatedMaterial)
            .then((response) => {
                console.log("Update status: "+response.status)

                const description = `${materialQuantity}x ${materialName} foi(foram) atualizado(s) para ${newQuantity}x ${newName} em ${today}`
                api.post('/movements', {
                    operation: "Atualização",
                    date,
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
                        <StatusMessage message={message} status={status}/>
                        <h4 className={styles.modal_title}>Editar Material</h4>
                    </div>
                    <div className={styles.modal_body}>
                        <form id="update-form" onSubmit={updateMaterial}>
                            <label>
                                Quantidade
                                <input 
                                    type="number" 
                                    min="1" 
                                    defaultValue={materialQuantity}
                                    value={newQuantity}
                                    onChange={event => setNewQuantity(event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Nome
                                <input 
                                    type="text" 
                                    defaultValue={materialName}
                                    value={newName}
                                    onChange={event => setNewName(event.target.value)}
                                    required 
                                />
                            </label>
                        </form>
                    </div>
                    <div className={styles.modal_footer}>
                        <button onClick={onClose} className={styles.button}>Cancelar</button>
                        <button type="submit" form="update-form">Salvar Edição</button>
                    </div>
                </div>
            </div>
        </>
    )
}