import { useState } from 'react'

import styles from './DeleteHistoryModal.module.css'
import api from '../../services/api'
import StatusMessage from '../StatusMessage'
import { Button } from 'react-bootstrap'

export default function DeleteHistoryModal({ show, onClose }) {
    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState()

    if (!show) return null

    const handleClick = () => {
        api.delete('/movements')
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
        setMessage(false)
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <StatusMessage message={message} status={status} />
                    <h4 className={styles.modal_title}>Apagar histórico de movimentações</h4>
                </div>
                <div className={styles.modal_body}>
                    <p>Deseja realmente <strong>apagar todo o histórico</strong> de movimentações do almoxarifado?</p>
                </div>
                <div className={styles.modal_footer}>
                    <Button id="cancel" variant="secondary" onClick={onClose} className={styles.button}>Cancelar</Button>
                    <Button id="confirm" variant="danger" onClick={handleClick}>Sim, desejo apagar o histórico!</Button>
                </div>
            </div>
        </div>
    )
}