import { useState } from 'react'

import styles from './DeleteMaterialModal.module.css'
import api from '../../services/api'
import StatusMessage from '../StatusMessage'

export default function DeleteMaterialModal({show, onClose, materialId, materialName, materialQuantity}){
    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    // const today = formatedDate+'/'+(dateObject.getMonth()+1)+'/'+dateObject.getFullYear()
    const date = dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + formatedDate

    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState()

    if(!show) return null

    const deleteMaterial = () => {
        console.log("tentando deletar...")
        api.delete(`/materials/${materialId}`)
            .then(response => console.log(response.status))
            .then(() => {
                const description = `${materialQuantity}x ${materialName} foi(foram) excluídos do almoxarifado.`
                
                api.post('/movements', {
                    operation: "Exclusão",
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
            .catch(err => {
                console.error(err)
                setStatus('Falha')
                setMessage(true)
            })
        setMessage(false)
    }
    
    return(
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <StatusMessage message={message} status={status} />
                    <h4 className={styles.modal_title}>Deletar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <p>Deseja excluir definitivamente da lista o material: {materialName}?</p>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Cancelar</button>
                    <button onClick={deleteMaterial}>Excluir material</button>
                </div>
            </div>
        </div>
    )
}